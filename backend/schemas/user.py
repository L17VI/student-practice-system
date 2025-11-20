from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    STUDENT = "student"
    ROP = "rop"
    PS = "ps" #practice-supervisor руководитель практики
    ADMIN = "admin"

class UserBase(BaseModel):
    email: EmailStr
    fullname: str
    role: UserRole
    direction: Optional[str] = None
    phone: Optional[str] = None


class UserCreate(UserBase):
    pass

class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    # Pydantic v2 configuration to allow building from ORM objects
    model_config = {"from_attributes": True}

class LoginRequest(BaseModel):
    email: EmailStr

class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserResponse