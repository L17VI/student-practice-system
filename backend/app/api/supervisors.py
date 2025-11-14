from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db

router = APIRouter()

@router.get("/")
async def get_supervisors(db: Session = Depends(get_db)):
    return {"message": "Supervisors endpoint"}

@router.get("/{supervisor_id}")
async def get_supervisor(supervisor_id: int, db: Session = Depends(get_db)):
    return {"message": f"Supervisor {supervisor_id}"}