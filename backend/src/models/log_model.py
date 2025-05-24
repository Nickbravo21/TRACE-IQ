from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from datetime import datetime

class Log(SQLModel, table=True):
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    project_id: UUID
    message: str
    stack_trace: str
    url: str
    user_agent: str
    occurred_at: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)

