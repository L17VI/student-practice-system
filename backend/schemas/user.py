from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum

class UserRole(str, Enum):
    STUDENT = "student"
    ROP = "rop"
    PS = "ps" #practice-supervisor руководитель практики
    ADMIN = "admin"

class UserAddSchema(BaseModel):
    email: str = Field(example='ivanov.ii@dvfu.ru')
    fullname: str = Field(example='Иванов Иван Иванович')
    role: UserRole = Field(example='student, rop, ps, admin')
    image: Optional[str] = Field(default=None, example='https://example.com/image.jpg')
    password: str = Field(example='securepassword123')

    model_config = {"from_attributes": True}


class UserSchema(UserAddSchema):
    id: int

