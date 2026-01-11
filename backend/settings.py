from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    # Database
    BASE_DIR: Path = Path(__file__).parent
    INSTANCE_DIR: Path = BASE_DIR / "instance"
    # Changed DB name to force recreation with new schema (v6)
    DB_PATH: Path = INSTANCE_DIR / "data_v6.db"
    DATABASE_URL: str = f"sqlite:///{DB_PATH}"

    # JWT
    SECRET_KEY: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30


settings = Settings()

# Гарантируем существование каталога для базы данных на момент импорта настроек
settings.INSTANCE_DIR.mkdir(parents=True, exist_ok=True)
