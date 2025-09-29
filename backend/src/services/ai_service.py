import os
import json
import hashlib
from typing import Tuple
from uuid import UUID
import openai
from ..config import get_settings

# In-memory cache for AI explanations (in production, use Redis or database)
_explanation_cache = {}

def get_ai_explanation(log_id: UUID, message: str, stack_trace: str) -> Tuple[str, bool]:
    """
    Get AI explanation for a log error with caching
    
    Args:
        log_id: UUID of the log entry
        message: Error message
        stack_trace: Full stack trace
        
    Returns:
        Tuple of (explanation, cached) where cached indicates if result came from cache
    """
    settings = get_settings()
    
    # Create cache key based on message and stack trace
    cache_key = hashlib.md5(f"{message}|{stack_trace}".encode()).hexdigest()
    
    # Check if we have a cached explanation
    if cache_key in _explanation_cache:
        return _explanation_cache[cache_key], True
    
    # Check if OpenAI API key is available
    if not settings.openai_api_key or settings.openai_api_key == "sk-REPLACE_ME":
        return "AI explanation unavailable: OpenAI API key not configured", False
    
    try:
        # Set OpenAI API key
        openai.api_key = settings.openai_api_key
        
        # Prepare the prompt
        prompt = f"""
You are a senior software engineer helping to debug an error. 
Analyze the following error and provide a concise explanation of:
1. What the error means
2. Likely causes
3. Suggested fixes

Error Message: {message}

Stack Trace:
{stack_trace}

Please provide a clear, actionable explanation in 2-3 paragraphs.
"""
        
        # Call OpenAI API
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful debugging assistant that explains JavaScript/Python/web application errors clearly and concisely."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=500,
            temperature=0.3
        )
        
        explanation = response.choices[0].message.content.strip()
        
        # Cache the result
        _explanation_cache[cache_key] = explanation
        
        return explanation, False
        
    except Exception as e:
        # Return a fallback explanation if OpenAI fails
        fallback_explanation = f"Unable to generate AI explanation: {str(e)}. Please review the error message '{message}' and stack trace manually."
        return fallback_explanation, False

def clear_explanation_cache():
    """Clear the in-memory explanation cache"""
    global _explanation_cache
    _explanation_cache.clear()

def get_cache_stats():
    """Get statistics about the explanation cache"""
    return {
        "cached_explanations": len(_explanation_cache),
        "cache_keys": list(_explanation_cache.keys())
    }

# Alternative implementation using a simpler approach without OpenAI
def get_simple_explanation(message: str, stack_trace: str) -> str:
    """
    Provide a simple rule-based explanation when OpenAI is not available
    """
    message_lower = message.lower()
    
    if "typeerror" in message_lower:
        return "TypeError: This error occurs when you try to use a value in a way that's not compatible with its type. Check if variables are properly defined and have the expected type."
    
    elif "referenceerror" in message_lower:
        return "ReferenceError: This error happens when trying to use a variable that hasn't been declared or is out of scope. Check variable names and their scope."
    
    elif "syntaxerror" in message_lower:
        return "SyntaxError: There's a syntax problem in your code. Check for missing brackets, semicolons, or incorrect syntax."
    
    elif "network" in message_lower or "fetch" in message_lower:
        return "Network Error: This appears to be a network-related issue. Check your internet connection, API endpoints, and CORS settings."
    
    elif "permission" in message_lower or "cors" in message_lower:
        return "Permission/CORS Error: The request is being blocked. Check CORS settings on your server and ensure proper headers are set."
    
    else:
        return f"Error Analysis: '{message}' - Review the stack trace for the exact location where this error occurred and check the surrounding code logic."