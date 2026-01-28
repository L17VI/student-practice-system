from pydantic import BaseModel
from typing import Optional
from .company import CompanySchema

class PracticeAddSchema(BaseModel):
    title: str
    company: str
    city: str
    format: str
    season: str
    total_seats: int
    filled_seats: int
    description: Optional[str] = None
    image: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class PracticeSchema(BaseModel):
    id: int
    title: str
    company: CompanySchema
    city: str
    format: str
    season: str
    total_seats: int
    filled_seats: int
    description: Optional[str] = None
    image: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

    model_config = {"from_attributes": True}
