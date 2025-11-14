#!/usr/bin/env python
import sys
import os
from pathlib import Path
from dotenv import load_dotenv

# Переходим в директорию backend чтобы относительные пути (instance/) работали
BASE_DIR = Path(__file__).resolve().parent
os.chdir(BASE_DIR)

# Загружаем .env если есть
load_dotenv()

# Добавляем backend в sys.path для импорта пакета app
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from app.database import init_db, SessionLocal  # noqa: E402
from app.models.user import User  # noqa: E402


def cmd_init_db():
    init_db()
    print("[init_db] Таблицы созданы (или уже существовали).")


def cmd_create_admin():
    email = os.getenv("ADMIN_EMAIL", "admin@example.com")
    name = os.getenv("ADMIN_NAME", "Admin")
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.email == email).first()
        if existing:
            print(f"[create_admin] Админ уже существует: {existing.email}")
            return
        admin = User(email=email, name=name, role="admin", direction=None, phone=None)
        db.add(admin)
        db.commit()
        db.refresh(admin)
        print(f"[create_admin] Создан админ id={admin.id} email={admin.email}")
    finally:
        db.close()


def cmd_runserver():
    # Локальный запуск uvicorn с указанием каталога приложения
    try:
        import uvicorn
    except ImportError:
        print("uvicorn не установлен. Установите зависимости: pip install -r requirements.txt")
        sys.exit(1)
    uvicorn.run(
        "app.main:app",
        host=os.getenv("HOST", "127.0.0.1"),
        port=int(os.getenv("PORT", 8000)),
        reload=True,
        app_dir=str(BASE_DIR)
    )


def print_help():
    print("Использование: python manage.py <команда>")
    print("Доступные команды:")
    print("  init_db        - создать таблицы БД")
    print("  create_admin   - создать администратора (если нет)")
    print("  runserver      - запустить dev сервер uvicorn")


def main():
    if len(sys.argv) < 2:
        print_help()
        sys.exit(1)
    cmd = sys.argv[1]
    if cmd == "init_db":
        cmd_init_db()
    elif cmd == "create_admin":
        cmd_create_admin()
    elif cmd == "runserver":
        cmd_runserver()
    else:
        print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()

