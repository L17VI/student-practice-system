from pydantic import BaseModel
from schemas.practice import PracticeSchema

class FavoriteAddSchema(BaseModel):
    practice_id: int

class FavoriteSchema(BaseModel):
    id: int
    user_id: int
    practice_id: int
    practice: PracticeSchema

    model_config = {"from_attributes": True}
