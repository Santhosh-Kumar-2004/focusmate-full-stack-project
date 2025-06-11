from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.db_helper import engine, Base
from routers import auth, task
from routers.task import router as task_router


app = FastAPI(
    title="FocusMate API",
    description="A smart scheduling API that helps users organize tasks with time blocks.",
    version="1.0.0",
    docs_url="/"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
# app.include_router(task.router)
app.include_router(task_router)

# @app.on_event("startup")
# def startup():
#     Base.metadata.create_all(bind=engine)

@app.get("/")
def sample_route():
    return {"message": "FocusMate API is running!"}
