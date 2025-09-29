from dotenv import load_dotenv
import os

load_dotenv()

class Settings:
    """Application settings loaded from environment variables"""
    def __init__(self):
        self.database_url = os.getenv("DATABASE_URL", "sqlite:///./traceiq.db")
        self.clerk_secret_key = os.getenv("CLERK_SECRET_KEY", "")
        self.openai_api_key = os.getenv("OPENAI_API_KEY", "")
        self.frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")

def get_settings() -> Settings:
    """Get application settings singleton"""
    return Settings()

# Legacy export for backward compatibility
DATABASE_URL = get_settings().database_url
