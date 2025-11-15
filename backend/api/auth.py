from fastapi import APIRouter, Depends, HTTPException
from schemas.user import LoginRequest, Token, UserResponse


router = APIRouter()


