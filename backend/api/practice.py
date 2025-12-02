from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import select
from database import get_db
from models.practice import PracticeModel
from schemas.practice import PracticeAddSchema


router = APIRouter()


@router.get("/")
async def get_practices(session: Session = Depends(get_db)):
    query = select(PracticeModel)
    result = session.execute(query)
    return result.scalars().all()

@router.get("/{practice_id}")
async def get_practice_by_id(practice_id: int, session: Session = Depends(get_db)):
    query = select(PracticeModel).where(PracticeModel.id == practice_id)
    result = session.execute(query)
    return result.scalars().first()

@router.post("/")
async def add_practice(data: PracticeAddSchema, session: Session = Depends(get_db)):
    new_practice = PracticeModel(
        title=data.title,
        description=data.description,
        image=data.image,
        start_date=data.start_date,
        end_date=data.end_date
    )
    session.add(new_practice)
    session.commit()
    return {'ok': True}