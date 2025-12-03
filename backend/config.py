from database import Base, engine
from settings import settings


def init_db():
    # импорт моделей внутри функции — чтобы они были зарегистрированы в Base.metadata
    # и при этом не создавался цикл импортов
    from models import (
        user,
        group,
        practice,
        student,
        document,
        favorite,
        group_practice,
        practice_supervisor,
    )

    settings.INSTANCE_DIR.mkdir(parents=True, exist_ok=True)
    Base.metadata.create_all(bind=engine)
