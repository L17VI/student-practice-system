from pydantic import BaseModel

class FavoriteAddSchema(BaseModel):
    student_id: int
    practice_id: int

class FavoriteSchema(FavoriteAddSchema):
    id: int

    model_config = {"from_attributes": True}