from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.auth_service import get_current_user
from app.schemas.user import UserRole, UserResponse

def require_role(required_role: UserRole):
    def role_checker(current_user: UserResponse = Depends(get_current_user)):
        if current_user.role != required_role and current_user.role != UserRole.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Требуется роль {required_role}"
            )
        return current_user
    return role_checker

# Готовые зависимости для каждой роли
require_student = require_role(UserRole.STUDENT)
require_rop = require_role(UserRole.ROP)
require_practice_supervisor = require_role(UserRole.PRACTICE_SUPERVISOR)
require_admin = require_role(UserRole.ADMIN)

# Для пользователей с несколькими ролями
def require_rop_or_supervisor(current_user: UserResponse = Depends(get_current_user)):
    if current_user.role not in [UserRole.ROP, UserRole.PRACTICE_SUPERVISOR, UserRole.ADMIN]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Требуется роль РОП или руководителя практики"
        )
    return current_user