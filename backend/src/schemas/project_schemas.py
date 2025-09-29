from sqlmodel import SQLModel
from uuid import UUID
from datetime import datetime
from typing import Optional

class ProjectCreate(SQLModel):
    """Schema for creating a new project"""
    user_id: str
    name: str

class ProjectRead(SQLModel):
    """Schema for reading project data"""
    id: UUID
    user_id: str
    name: str
    created_at: datetime

class ProjectUpdate(SQLModel):
    """Schema for updating project data"""
    name: Optional[str] = None