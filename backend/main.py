from fastapi import FastAPI
from api import auth, practices, applications, rop, supervisors
from config import init_db

init_db()


app = FastAPI()


app.include_router(auth.router, prefix="/auth", tags=["auth"])
#app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(practices.router, prefix="/practices", tags=["practices"])
app.include_router(applications.router, prefix="/applications", tags=["applications"])
app.include_router(rop.router, prefix="/rop", tags=["rop"])
app.include_router(supervisors.router, prefix="/supervisors", tags=["supervisors"])


@app.get("/")
async def root():
    return {"message": "Hello World"}
