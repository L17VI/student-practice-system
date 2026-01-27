from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from database import get_db
from models.application import ApplicationModel
from models.user import UserModel
from models.practice import PracticeModel
from schemas.application import ApplicationAddSchema, ApplicationSchema, ApplicationUpdateStatusSchema
from api.auth import get_current_user
from typing import List

router = APIRouter()

@router.post("/", response_model=ApplicationSchema)
async def create_application(
    data: ApplicationAddSchema,
    session: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    # Check if already exists
    existing = session.query(ApplicationModel).filter(
        ApplicationModel.user_id == current_user.id,
        ApplicationModel.practice_id == data.practice_id
    ).first()
    
    if existing:
        return existing

    new_app = ApplicationModel(
        user_id=current_user.id,
        practice_id=data.practice_id,
        status="draft"
    )
    session.add(new_app)
    session.commit()
    session.refresh(new_app)
    return new_app

@router.get("/my", response_model=List[ApplicationSchema])
async def get_my_applications(
    session: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    query = session.query(ApplicationModel).options(
        joinedload(ApplicationModel.practice).joinedload(PracticeModel.company),
        joinedload(ApplicationModel.user)
    ).filter(ApplicationModel.user_id == current_user.id)
    result = session.execute(query)
    return result.scalars().all()

@router.get("/{app_id}", response_model=ApplicationSchema)
async def get_application(
    app_id: int,
    session: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    query = session.query(ApplicationModel).options(
        joinedload(ApplicationModel.practice).joinedload(PracticeModel.company),
        joinedload(ApplicationModel.user)
    ).filter(ApplicationModel.id == app_id)
    
    app = session.execute(query).scalars().first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
        
    if current_user.role == 'student' and app.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    return app

@router.get("/", response_model=List[ApplicationSchema])
async def get_all_applications(
    session: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    if current_user.role not in ['admin', 'rop']:
        raise HTTPException(status_code=403, detail="Not authorized")
        
    query = session.query(ApplicationModel).options(
        joinedload(ApplicationModel.practice).joinedload(PracticeModel.company),
        joinedload(ApplicationModel.user)
    ).filter(ApplicationModel.status != 'draft') # Filter out drafts

    result = session.execute(query)
    return result.scalars().all()

@router.put("/{app_id}/status", response_model=ApplicationSchema)
async def update_application_status(
    app_id: int,
    data: ApplicationUpdateStatusSchema,
    session: Session = Depends(get_db),
    current_user: UserModel = Depends(get_current_user)
):
    app = session.query(ApplicationModel).filter(ApplicationModel.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
        
    # Permission check
    if current_user.role == 'student':
        if app.user_id != current_user.id:
            raise HTTPException(status_code=403, detail="Not authorized")
        # Student can only change to 'review' (submit) or 'withdrawn'
        if data.status not in ['review', 'withdrawn']:
             raise HTTPException(status_code=400, detail="Invalid status transition for student")
             
    elif current_user.role in ['admin', 'rop']:
        # ROP can change to 'accepted', 'rejected', 'changes_requested'
        pass
    else:
        raise HTTPException(status_code=403, detail="Not authorized")

    app.status = data.status
    session.commit()
    session.refresh(app)
    return app
