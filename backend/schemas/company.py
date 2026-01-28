from pydantic import BaseModel
from typing import Optional

class CompanySchema(BaseModel):
    id: int
    name: str
    city: Optional[str] = None
    description: Optional[str] = None
    logo: Optional[str] = None

    model_config = {"from_attributes": True}
