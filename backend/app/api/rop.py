from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_rop():
    return {"message": "ROP endpoint"}