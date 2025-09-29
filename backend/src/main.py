# Import the FastAPI framework for creating API endpoints
from fastapi import FastAPI

# Import CORS middleware so the frontend can call the backend API from the browser
from fastapi.middleware.cors import CORSMiddleware

# Import our database initialization function (connects to PostgreSQL and creates tables if missing)
from .database import init_db

# Import API route definitions (these will handle requests related to projects and logs)
from .routes import projects, logs
from .config import get_settings


# -----------------------
# Create the FastAPI app
# -----------------------
# This initializes the backend application
app = FastAPI()


# -----------------------
# Configure CORS
# -----------------------
# CORS (Cross-Origin Resource Sharing) allows the frontend (React app) to make requests to the backend
# Without this, the browser would block API requests due to security restrictions
settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url, "http://localhost:3000"],  # Allow frontend origins
    allow_credentials=True,  # Allow cookies/auth headers
    allow_methods=["*"],     # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],     # Allow all headers
)


# -----------------------
# Startup Event
# -----------------------
# This runs automatically when the backend starts
@app.on_event("startup")
def on_startup():
    # Initialize the database (connects to PostgreSQL and creates any missing tables)
    init_db()


# -----------------------
# Health Check Endpoint
# -----------------------
# This is a test route to confirm the backend is running
# If you visit http://localhost:8000/ it will return a JSON response
@app.get("/")
def health_check():
    return {"status": "TraceIQ backend is live"}


# -----------------------
# Include Route Files
# -----------------------
# This links other route files (keeps the API organized by topic)
# Each route file defines endpoints (e.g., /projects, /logs) in a clean, modular way
app.include_router(projects.router)  # Adds all endpoints related to projects
app.include_router(logs.router)      # Adds all endpoints related to logs
