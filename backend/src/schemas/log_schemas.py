from sqlmodel import SQLModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class LogCreate(SQLModel):
    """Schema for creating a new log entry"""
    project_id: UUID
    message: str
    stack_trace: str
    url: str
    user_agent: str
    occurred_at: Optional[datetime] = None

class LogRead(SQLModel):
    """Schema for reading log data"""
    id: UUID
    project_id: UUID
    message: str
    stack_trace: str
    url: str
    user_agent: str
    occurred_at: datetime
    created_at: datetime

class LogFilter(SQLModel):
    """Schema for filtering logs"""
    project_id: Optional[UUID] = None
    limit: Optional[int] = 50
    offset: Optional[int] = 0
    q: Optional[str] = None  # search query

class LogExplanation(SQLModel):
    """Schema for AI explanation response"""
    log_id: UUID
    explanation: str
    cached: bool = False