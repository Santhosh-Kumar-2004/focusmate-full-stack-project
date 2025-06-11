from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from core.db_helper import get_db
from schemas.task import TaskCreate, TaskResponse
from models.task import Task
from models.user import User
from core.jwt_bearer import get_current_user
from sqlalchemy.exc import SQLAlchemyError
import uuid
from typing import List
from schemas.task import TaskResponse

router = APIRouter(prefix="/tasks", tags=["Tasks"])

@router.post("/", status_code=status.HTTP_201_CREATED)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        new_task = Task(
            task_id=str(uuid.uuid4()),
            title=task.title,
            description=task.description,
            user_id=current_user.id
        )
        db.add(new_task)
        db.commit()
        db.refresh(new_task)
        return new_task
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create task, 2{e}"
        )

@router.get("/", response_model=List[TaskResponse])
def get_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        tasks = db.query(Task).filter(Task.user_id == current_user.id).all()
        return tasks
    except SQLAlchemyError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch tasks"
        )
    
from fastapi import Path

@router.delete("/{task_id}", status_code=status.HTTP_200_OK)
def delete_task(
    task_id: str = Path(..., title="Task ID"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        task = db.query(Task).filter(Task.task_id == task_id, Task.user_id == current_user.id).first()
        if not task:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Task not found or not authorized"
            )
        
        db.delete(task)
        db.commit()
        return {"message": "Task deleted successfully"}
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete task"
        )