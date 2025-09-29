from fastapi import APIRouter, HTTPException, Depends, Query
from sqlmodel import Session, select
from typing import List, Optional
from uuid import UUID
from datetime import datetime

from ..database import get_session
from ..models.log_model import Log
from ..models.project_model import Project
from ..schemas.log_schemas import LogCreate, LogRead, LogFilter, LogExplanation
from ..services.ai_service import get_ai_explanation

# Create router with /logs prefix
router = APIRouter(prefix="/logs", tags=["logs"])

@router.post("/", response_model=LogRead)
def create_log(log: LogCreate, session: Session = Depends(get_session)):
    """
    Create a new log entry
    """
    # Verify project exists
    project = session.get(Project, log.project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Convert the schema to a database model
    db_log = Log(
        project_id=log.project_id,
        message=log.message,
        stack_trace=log.stack_trace,
        url=log.url,
        user_agent=log.user_agent,
        occurred_at=log.occurred_at or datetime.utcnow()
    )
    
    # Add to database
    session.add(db_log)
    session.commit()
    session.refresh(db_log)
    
    return db_log

@router.get("/", response_model=List[LogRead])
def list_logs(
    project_id: Optional[UUID] = Query(None, description="Filter by project ID"),
    limit: int = Query(50, ge=1, le=100, description="Number of logs to return"),
    offset: int = Query(0, ge=0, description="Number of logs to skip"),
    q: Optional[str] = Query(None, description="Search query for message or stack trace"),
    session: Session = Depends(get_session)
):
    """
    List logs with optional filtering and pagination
    """
    statement = select(Log).order_by(Log.occurred_at.desc())
    
    # Apply filters
    if project_id:
        statement = statement.where(Log.project_id == project_id)
    
    if q:
        # Search in message or stack trace
        search_term = f"%{q}%"
        statement = statement.where(
            (Log.message.ilike(search_term)) | 
            (Log.stack_trace.ilike(search_term))
        )
    
    # Apply pagination
    statement = statement.offset(offset).limit(limit)
    
    logs = session.exec(statement).all()
    return logs

@router.get("/{log_id}", response_model=LogRead)
def get_log(log_id: UUID, session: Session = Depends(get_session)):
    """
    Get a specific log by ID
    """
    log = session.get(Log, log_id)
    
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    
    return log

@router.post("/{log_id}/explain", response_model=LogExplanation)
def explain_log(log_id: UUID, session: Session = Depends(get_session)):
    """
    Get AI explanation for a specific log
    """
    log = session.get(Log, log_id)
    
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    
    try:
        explanation, cached = get_ai_explanation(log_id, log.message, log.stack_trace)
        
        return LogExplanation(
            log_id=log_id,
            explanation=explanation,
            cached=cached
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate explanation: {str(e)}")

@router.delete("/{log_id}")
def delete_log(log_id: UUID, session: Session = Depends(get_session)):
    """
    Delete a log entry
    """
    log = session.get(Log, log_id)
    
    if not log:
        raise HTTPException(status_code=404, detail="Log not found")
    
    session.delete(log)
    session.commit()
    
    return {"message": "Log deleted successfully"}

@router.get("/project/{project_id}/stats")
def get_project_log_stats(project_id: UUID, session: Session = Depends(get_session)):
    """
    Get statistics for logs in a specific project
    """
    # Verify project exists
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Count total logs
    total_logs = session.exec(
        select(Log).where(Log.project_id == project_id)
    ).count()
    
    # Get recent logs count (last 24 hours)
    from datetime import datetime, timedelta
    twenty_four_hours_ago = datetime.utcnow() - timedelta(hours=24)
    
    recent_logs = len(session.exec(
        select(Log).where(
            (Log.project_id == project_id) & 
            (Log.occurred_at >= twenty_four_hours_ago)
        )
    ).all())
    
    return {
        "project_id": project_id,
        "total_logs": total_logs,
        "recent_logs_24h": recent_logs
    }