import os
from pathlib import Path
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = f"sqlite:///{Path('instance/internship.db').resolve()}"

    class Config:
        env_file = ".env"

settings = Settings()