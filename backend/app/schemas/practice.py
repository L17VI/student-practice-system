from pydantic import BaseModel
from datetime import date
from typing import Optional

class PracticeBase(BaseModel):
    title: str
    description: str
    company_id: int
    direction: str
    available_places: int
    start_date: date
    end_date: date
    requirements: Optional[str] = None
    practice_supervisor_id: Optional[int] = None

class PracticeCreate(PracticeBase):
    pass

class PracticeResponse(PracticeBase):
    id: int
    company_name: Optional[str] = None

    class Config:
        from_attributes = True