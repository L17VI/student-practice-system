from fastapi import FastAPI
from api import user, auth, practices, applications, rop, supervisors
from config import init_db

import os
from contextlib import asynccontextmanager

base_dir = os.path.dirname(__file__)
instance_dir = os.path.join(base_dir, "instance")
db_file = os.path.join(instance_dir, "data.db")


@asynccontextmanager
async def lifespan(app: FastAPI):
    if not os.path.exists(db_file):
        init_db()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(user.router, prefix="/user", tags=["user"])
app.include_router(practices.router, prefix="/practices", tags=["practices"])
app.include_router(applications.router, prefix="/applications", tags=["applications"])
app.include_router(rop.router, prefix="/rop", tags=["rop"])
app.include_router(supervisors.router, prefix="/supervisors", tags=["supervisors"])


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == "__main__":
    import uvicorn

    if not os.path.exists(db_file):
        init_db()

    uvicorn.run(app, host="127.0.0.1", port=8000, log_level="info")
