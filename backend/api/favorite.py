from models.favorite import FavoriteModel
from schemas.favorite import FavoriteAddSchema
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter()

@router.get("/all/")
async def get_favorites(session: Session = Depends(get_db)):
    query = session.query(FavoriteModel)
    result = session.execute(query)
    return result.scalars().all()

@router.get("/")
async def get_favorite_by_student(student_id: int, session: Session = Depends(get_db)):
    query = session.query(FavoriteModel).filter(FavoriteModel.studentId == student_id)
    result = session.execute(query)
    return result.scalars().all()


@router.post("/")
async def add_favorite(data: FavoriteAddSchema, session: Session = Depends(get_db)):
    new_favorite = FavoriteModel(
        studentId=data.student_id,
        practiceId=data.practice_id
    )
    session.add(new_favorite)
    session.commit()
    return {'ok': True}