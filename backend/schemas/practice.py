from pydantic import BaseModel
from typing import Optional # для добавления необязательных полей в будущем

class PracticeAddSchema(BaseModel):
    title: str
    description: str
    image: str
    start_date: str
    end_date: str

class PracticeSchema(PracticeAddSchema):
    id: int

    model_config = {"from_attributes": True}