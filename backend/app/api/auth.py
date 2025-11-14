from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.user import LoginRequest, Token, UserResponse
from app.services.auth_service import AuthService

router = APIRouter()


@router.post("/login", response_model=Token)
async def login(login_data: LoginRequest, db: Session = Depends(get_db)):
    """Упрощенная аутентификация по email"""
    service = AuthService(db)
    user = service.authenticate_user(login_data.email)

    if not user:
        # Создаем нового пользователя
        user = service.create_user(login_data.email)

    token = service.create_access_token(user)
    return {"access_token": token, "token_type": "bearer", "user": user}


@router.get("/me", response_model=UserResponse)
async def get_current_user(current_user: UserResponse = Depends(AuthService.get_current_user)):
    return current_user