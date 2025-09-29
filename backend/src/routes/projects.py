from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from typing import List
from uuid import UUID

from ..database import get_session
from ..models.project_model import Project
from ..schemas.project_schemas import ProjectCreate, ProjectRead, ProjectUpdate

# Create router with /projects prefix
router = APIRouter(prefix="/projects", tags=["projects"])

@router.post("/", response_model=ProjectRead)
def create_project(project: ProjectCreate, session: Session = Depends(get_session)):
    """
    Create a new project
    """
    # Convert the schema to a database model
    db_project = Project(
        user_id=project.user_id,
        name=project.name
    )
    
    # Add to database
    session.add(db_project)
    session.commit()
    session.refresh(db_project)
    
    return db_project

@router.get("/", response_model=List[ProjectRead])
def list_projects(user_id: str = None, session: Session = Depends(get_session)):
    """
    List all projects, optionally filtered by user_id
    """
    statement = select(Project)
    
    if user_id:
        statement = statement.where(Project.user_id == user_id)
    
    projects = session.exec(statement).all()
    return projects

@router.get("/{project_id}", response_model=ProjectRead)
def get_project(project_id: UUID, session: Session = Depends(get_session)):
    """
    Get a specific project by ID
    """
    project = session.get(Project, project_id)
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    return project

@router.put("/{project_id}", response_model=ProjectRead)
def update_project(
    project_id: UUID, 
    project_update: ProjectUpdate, 
    session: Session = Depends(get_session)
):
    """
    Update a project
    """
    project = session.get(Project, project_id)
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Update only provided fields
    project_data = project_update.dict(exclude_unset=True)
    for field, value in project_data.items():
        setattr(project, field, value)
    
    session.add(project)
    session.commit()
    session.refresh(project)
    
    return project

@router.delete("/{project_id}")
def delete_project(project_id: UUID, session: Session = Depends(get_session)):
    """
    Delete a project
    """
    project = session.get(Project, project_id)
    
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    session.delete(project)
    session.commit()
    
    return {"message": "Project deleted successfully"}