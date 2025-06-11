from pydantic import BaseModel, Field
from typing import Optional
from uuid import UUID
from datetime import datetime

# When creating a task
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None

# When updating a task
class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    is_completed: Optional[bool] = None

# Response model
class TaskResponse(BaseModel):
    task_id: UUID
    title: str
    description: Optional[str]

    class Config:
        orm_mode = True
