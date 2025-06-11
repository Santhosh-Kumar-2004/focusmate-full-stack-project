from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from uuid import UUID

# When registering or creating a new user
class UserCreate(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr = Field(...)
    password: str = Field(..., min_length=3)

# When logging in
class UserLogin(BaseModel):
    email: EmailStr
    password: str

# Response model (to show data back to frontend)
class UserResponse(BaseModel):
    id: UUID
    username: str
    email: EmailStr
    role: Optional[str]

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

    class Config:
        orm_mode = True
