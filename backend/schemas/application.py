from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from schemas.practice import PracticeSchema
from schemas.user import UserSchema

class ApplicationAddSchema(BaseModel):
    practice_id: int

class ApplicationUpdateStatusSchema(BaseModel):
    status: str

class ApplicationSchema(BaseModel):
    id: int
    user_id: int
    practice_id: int
    status: str
    created_at: datetime
    updated_at: datetime
    
    practice: Optional[PracticeSchema] = None
    user: Optional[UserSchema] = None

    model_config = {"from_attributes": True}
