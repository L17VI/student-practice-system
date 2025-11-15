from sqlalchemy.orm import Session

from models.user import User
from schemas.user import UserCreate


class UserService:
    @staticmethod
    def get_user_by_email(db: Session, email: str):
        return db.query(User).filter(User.email == email).first()

    @staticmethod
    def create_user(db: Session, user: UserCreate):
        db_user = User(
            email=user.email,
            name=user.name,
            role=user.role,
            direction=user.direction,
            phone=user.phone,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
