from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import select, update, delete
from database import get_db
from models.practice import PracticeModel
from models.user import UserModel
from models.company import CompanyModel
from schemas.practice import PracticeAddSchema
from api.auth import get_current_user


router = APIRouter()


@router.get("/")
async def get_practices(session: Session = Depends(get_db)):
    query = select(PracticeModel).options(joinedload(PracticeModel.company))
    result = session.execute(query)
    return result.scalars().all()

@router.get("/{practice_id}")
async def get_practice_by_id(practice_id: int, session: Session = Depends(get_db)):
    query = select(PracticeModel).options(joinedload(PracticeModel.company)).where(PracticeModel.id == practice_id)
    result = session.execute(query)
    return result.scalars().first()

@router.post("/")
async def add_practice(
    data: PracticeAddSchema, 
    session: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail="Not authorized")

    # Check or create company
    company = session.query(CompanyModel).filter(CompanyModel.name == data.company).first()
    if not company:
        company = CompanyModel(name=data.company, city=data.city)
        session.add(company)
        session.flush()

    new_practice = PracticeModel(
        title=data.title,
        company_id=company.id,
        city=data.city,
        format=data.format,
        season=data.season,
        total_seats=data.total_seats,
        filled_seats=data.filled_seats,
        description=data.description,
        image=data.image,
        start_date=data.start_date,
        end_date=data.end_date
    )
    session.add(new_practice)
    session.commit()
    return {'ok': True}

@router.put("/{practice_id}")
async def update_practice(
    practice_id: int, 
    data: PracticeAddSchema, 
    session: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Check or create company
    company = session.query(CompanyModel).filter(CompanyModel.name == data.company).first()
    if not company:
        company = CompanyModel(name=data.company, city=data.city)
        session.add(company)
        session.flush()

    stmt = update(PracticeModel).where(PracticeModel.id == practice_id).values(
        title=data.title,
        company_id=company.id,
        city=data.city,
        format=data.format,
        season=data.season,
        total_seats=data.total_seats,
        filled_seats=data.filled_seats,
        description=data.description,
        image=data.image,
        start_date=data.start_date,
        end_date=data.end_date
    )
    result = session.execute(stmt)
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Practice not found")
    session.commit()
    return {'ok': True}

@router.delete("/{practice_id}")
async def delete_practice(
    practice_id: int, 
    session: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    if current_user.role != 'admin':
        raise HTTPException(status_code=403, detail="Not authorized")
        
    stmt = delete(PracticeModel).where(PracticeModel.id == practice_id)
    result = session.execute(stmt)
    if result.rowcount == 0:
        raise HTTPException(status_code=404, detail="Practice not found")
    session.commit()
    return {'ok': True}
