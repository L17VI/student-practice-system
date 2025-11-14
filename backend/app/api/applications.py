from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.application import Application

router = APIRouter()

@router.get("/", response_model=list[dict])
def list_applications(db: Session = Depends(get_db)):
    items = db.query(Application).all()
    return [
        {
            "id": a.id,
            "student_id": a.student_id,
            "practice_id": a.practice_id,
            "status": a.status,
            "motivation_letter": a.motivation_letter,
            "applied_at": a.applied_at,
            "updated_at": a.updated_at,
        }
        for a in items
    ]

