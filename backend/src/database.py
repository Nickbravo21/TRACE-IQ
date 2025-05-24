from sqlmodel import SQLModel, create_engine
from .config import DATABASE_URL
from .models.log_model import Log
from .models.project_model import Project

# Connect to your database
engine = create_engine(DATABASE_URL, echo=True)

def init_db():

    SQLModel.metadata.create_all(engine)
