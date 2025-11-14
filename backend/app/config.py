import os
from pathlib import Path

try:
    from pydantic_settings import BaseSettings
except ImportError:
    # Fallback: minimal stub if pydantic-settings не установлен
    class BaseSettings:
        def __init__(self, **kwargs):
            for k, v in kwargs.items():
                setattr(self, k, v)

BASE_DIR = Path(__file__).resolve().parent.parent
ENV_FILE = BASE_DIR / '.env'

# Подгружаем .env вручную если он существует (чтобы fallback тоже работал)
if ENV_FILE.exists():
    for line in ENV_FILE.read_text(encoding='utf-8').splitlines():
        line = line.strip()
        if not line or line.startswith('#') or '=' not in line:
            continue
        key, val = line.split('=', 1)
        os.environ.setdefault(key.strip(), val.strip())


class Settings(BaseSettings):
    DATABASE_URL: str = os.getenv('DATABASE_URL', 'sqlite:///./instance/internship.db')
    SECRET_KEY: str = os.getenv('SECRET_KEY', 'dev-secret-key')
    DEBUG: bool = os.getenv('DEBUG', 'True').lower() in ('1', 'true', 'yes')


settings = Settings()