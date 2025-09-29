from sqlmodel import SQLModel, create_engine, Session
from .config import get_settings
from .models.log_model import Log
from .models.project_model import Project

# Get settings
settings = get_settings()

# Connect to your database
engine = create_engine(settings.database_url, echo=True)

def init_db():
    """Initialize database tables"""
    SQLModel.metadata.create_all(engine)

def get_session() -> Session:
    """Get database session for dependency injection"""
    with Session(engine) as session:
        yield session
