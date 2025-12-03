from fastapi import FastAPI
from api import user, auth, practice, applications, rop, supervisors, favorite
from config import init_db
from sqlalchemy import inspect
from database import engine
import uvicorn

import os
from contextlib import asynccontextmanager

# проверяем, есть ли ключевая таблица, например 'user'
KEY_TABLE = "user"

@asynccontextmanager
async def lifespan(app: FastAPI):
    inspector = inspect(engine)
    tables = inspector.get_table_names()
    if KEY_TABLE not in tables:
        init_db()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(user.router, prefix="/api/user", tags=["Пользователи"])
app.include_router(practice.router, prefix="/api/practice", tags=["Практики"])
app.include_router(applications.router, prefix="/api/applications", tags=["applications"])
app.include_router(rop.router, prefix="/api/rop", tags=["rop"])
app.include_router(supervisors.router, prefix="/api/supervisors", tags=["supervisors"])
app.include_router(favorite.router, prefix="/api/favorite", tags=["Избранное"])
@app.get("/")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    inspector = inspect(engine)
    if KEY_TABLE not in inspector.get_table_names():
        init_db()

    uvicorn.run("main:app", reload=True, port=8000)
