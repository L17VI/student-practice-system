from models.favorite import FavoriteModel
from schemas.favorite import FavoriteAddSchema, FavoriteSchema
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models.user import UserModel
from api.auth import get_current_user
from typing import List

router = APIRouter()

@router.get("/", response_model=List[FavoriteSchema])
async def get_my_favorites(
    session: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    query = session.query(FavoriteModel).options(joinedload(FavoriteModel.practice)).filter(FavoriteModel.user_id == current_user.id)
    result = session.execute(query)
    return result.scalars().all()


@router.post("/")
async def add_favorite(
    data: FavoriteAddSchema, 
    session: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    # Check if already exists
    existing = session.query(FavoriteModel).filter(
        FavoriteModel.user_id == current_user.id,
        FavoriteModel.practice_id == data.practice_id
    ).first()
    
    if existing:
        return {'ok': True, 'message': 'Already in favorites'}

    new_favorite = FavoriteModel(
        user_id=current_user.id,
        practice_id=data.practice_id
    )
    session.add(new_favorite)
    session.commit()
    return {'ok': True}

@router.delete("/{practice_id}")
async def remove_favorite(
    practice_id: int,
    session: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    favorite = session.query(FavoriteModel).filter(
        FavoriteModel.user_id == current_user.id,
        FavoriteModel.practice_id == practice_id
    ).first()
    
    if favorite:
        session.delete(favorite)
        session.commit()
    
    return {'ok': True}
