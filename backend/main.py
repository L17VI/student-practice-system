from fastapi import FastAPI
from api import user, auth, practice, applications, rop, supervisors, favorite
from settings import settings
from config import init_db
from sqlalchemy import inspect
from database import engine, SessionLocal
from models.practice import PracticeModel
from models.user import UserModel
from models.company import CompanyModel
from services.auth_service import get_password_hash
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
    
    db = SessionLocal()
    try:
        # Seed practices
        if "practices" in tables or True:
             if db.query(PracticeModel).count() == 0:
                # Seed Companies
                companies = {
                    'ООО Програм': CompanyModel(name='ООО Програм', city='Владивосток'),
                    'ООО ИскусствИнтел': CompanyModel(name='ООО ИскусствИнтел', city='Владивосток'),
                    'ООО Прогресс': CompanyModel(name='ООО Прогресс', city='Владивосток')
                }
                for c in companies.values():
                    db.add(c)
                db.flush()

                practices_data = [
                    PracticeModel(title='Backend-разработчик', format='Удалённо', season='Весна', company_id=companies['ООО Програм'].id, city='Владивосток', total_seats=10, filled_seats=7),
                    PracticeModel(title='Backend-разработчик', format='Очно', season='Лето', company_id=companies['ООО Програм'].id, city='Владивосток', total_seats=5, filled_seats=4),
                    PracticeModel(title='ML-разработчик', format='Гибрид', season='Весна', company_id=companies['ООО ИскусствИнтел'].id, city='Владивосток', total_seats=2, filled_seats=2),
                    PracticeModel(title='DevOps-инженер', format='Удалённо', season='Весна', company_id=companies['ООО ИскусствИнтел'].id, city='Владивосток', total_seats=5, filled_seats=5),
                    PracticeModel(title='Бизнес-аналитик', format='Гибрид', season='Лето', company_id=companies['ООО Прогресс'].id, city='Владивосток', total_seats=3, filled_seats=3),
                    PracticeModel(title='UX/UI-дизайнер', format='Очно', season='Лето', company_id=companies['ООО Прогресс'].id, city='Владивосток', total_seats=20, filled_seats=11),
                ]
                db.add_all(practices_data)
                db.commit()
                print("Practices seeded")
        
        # Seed Admin
        if db.query(UserModel).filter(UserModel.email == "admin@example.com").first() is None:
            admin_user = UserModel(
                email="admin@example.com",
                password=get_password_hash("admin"),
                fullname="Admin User",
                role="admin"
            )
            db.add(admin_user)
            db.commit()
            print("Admin user seeded")

        # Seed ROP (Teacher/Manager)
        if db.query(UserModel).filter(UserModel.email == "rop@example.com").first() is None:
            rop_user = UserModel(
                email="rop@example.com",
                password=get_password_hash("rop"),
                fullname="Руководитель Практики",
                role="rop"
            )
            db.add(rop_user)
            db.commit()
            print("ROP user seeded")

        # Seed Students
        students_data = [
            {"name": "Петров Петр Петрович", "email": "petrov@example.com"},
            {"name": "Сидоров Илья Андреевич", "email": "sidorov@example.com"},
            {"name": "Кузнецова Анна Владимировна", "email": "kuznetsova@example.com"},
            {"name": "Орлов Денис Игоревич", "email": "orlov@example.com"},
            {"name": "Смирнова Елена Дмитриевна", "email": "smirnova@example.com"},
            {"name": "Козлов Максим Николаевич", "email": "kozlov@example.com"},
            {"name": "Новикова Ольга Александровна", "email": "novikova@example.com"},
        ]

        for student in students_data:
            if db.query(UserModel).filter(UserModel.email == student["email"]).first() is None:
                new_student = UserModel(
                    email=student["email"],
                    password=get_password_hash("123"),
                    fullname=student["name"],
                    role="student"
                )
                db.add(new_student)
        db.commit()
        print("Students seeded")

    except Exception as e:
        print(f"Error seeding data: {e}")
    finally:
        db.close()

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
