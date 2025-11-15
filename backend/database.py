from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base
import os
from config import settings

Base = declarative_base()

# Создаем папку instance если её нет
os.makedirs("instance", exist_ok=True)

# Выбираем параметры подключения в зависимости от типа БД
DATABASE_URL = settings.DATABASE_URL
# Если это SQLite — нужно передать check_same_thread
if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False}
    )
else:
    # Для других драйверов (postgresql и т.д.) не передаём connect_args
    engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    """Создает все таблицы при запуске"""
    Base.metadata.create_all(bind=engine)

# Совместимость: alias
def init_db():
    create_tables()