from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserRole


class AuthService:
    def __init__(self, db: Session):
        self.db = db

    def authenticate_user(self, email: str):
        user = self.db.query(User).filter(User.email == email).first()
        return user

    def create_user(self, email: str):
        # Определяем роль по email (упрощенно)
        if "admin" in email:
            role = UserRole.ADMIN
        elif "rop" in email:
            role = UserRole.ROP
        elif "supervisor" in email:
            role = UserRole.PS
        else:
            role = UserRole.STUDENT

        user = User(
            email=email,
            name=email.split('@')[0],  # Имя из email
            role=role.value,  # сохраняем строковое значение
            direction="ИТ" if role == UserRole.STUDENT else None
        )

        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def create_access_token(self, user: User):
        # Упрощенная реализация - в продакшене использовать JWT
        return f"token_{user.id}_{user.email}"

    @staticmethod
    def get_current_user(token: str = Depends(lambda: "demo_token"), db: Session = Depends(get_db)):
        # Упрощенная реализация - всегда возвращает демо-пользователя
        # В продакшене нужно декодировать JWT токен
        user = db.query(User).filter(User.email == "student@dvfu.ru").first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Пользователь не найден"
            )
        return UserResponse.model_validate(user)