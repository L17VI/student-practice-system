from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import create_tables
from app.api import auth, practices, applications, users, supervisors, rop

router = FastAPI()

app = FastAPI(
    title="DVFU Internship Platform API",
    description="API для системы управления практиками студентов ДВФУ",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS для React фронтенда
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Создаем таблицы при запуске
@app.on_event("startup")
def on_startup():
    create_tables()

# Подключаем роутеры
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(practices.router, prefix="/api/practices", tags=["practices"])
app.include_router(applications.router, prefix="/api/applications", tags=["applications"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(supervisors.router, prefix="/api/supervisors", tags=["supervisors"])
app.include_router(rop.router, prefix="/api/rop", tags=["rop"])

@app.get("/")
async def root():
    return {"message": "DVFU Internship Platform API"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "database": "SQLite"}