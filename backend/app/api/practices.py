from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from app.database import get_db
from app.models.practice import Practice
from app.models.company import Company
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_practices():
    return {"message": "Practices endpoint"}
router = APIRouter()

@router.get("/", response_model=list[dict])
def list_practices(db: Session = Depends(get_db)):
    items = db.query(Practice).all()
    return [
        {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "company_id": p.company_id,
            "direction": p.direction,
            "available_places": p.available_places,
            "start_date": p.start_date,
            "end_date": p.end_date,
            "requirements": p.requirements,
            "practice_supervisor_id": p.practice_supervisor_id,
        }
        for p in items
    ]

@router.post("/", response_model=dict)
def create_practice(data: dict, db: Session = Depends(get_db)):
    # minimal validation
    title = data.get("title")
    if not title:
        raise HTTPException(status_code=400, detail="title is required")
    practice = Practice(
        title=title,
        description=data.get("description"),
        company_id=data.get("company_id"),
        direction=data.get("direction"),
        available_places=data.get("available_places", 1),
        start_date=data.get("start_date"),
        end_date=data.get("end_date"),
        requirements=data.get("requirements"),
        practice_supervisor_id=data.get("practice_supervisor_id"),
    )
    db.add(practice)
    db.commit()
    db.refresh(practice)
    return {"id": practice.id, "title": practice.title}

