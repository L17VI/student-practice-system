from models.user import UserModel
from schemas.user import UserAddSchema
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db

router = APIRouter()

@router.get("/")
async def get_users(session: Session = Depends(get_db)):
  query = session.query(UserModel)
  result = session.execute(query)
  return result.scalars().all()

@router.post("/")
async def add_user(data: UserAddSchema, session: Session = Depends(get_db)):
    existing_user = session.query(UserModel).filter(UserModel.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=409, detail='Пользователь с таким email уже существует')

    allowed_roles = ['student', 'ps', 'admin', 'rop']
    if data.role.value not in allowed_roles:
        raise HTTPException(status_code=400, detail='Недопустимая роль пользователя')

    new_user = UserModel(
        fullname=data.fullname,
        email=data.email,
        image=data.image,
        password=data.password,
        role=data.role.value,
    )
    session.add(new_user)
    session.commit()
    return {'ok': True}