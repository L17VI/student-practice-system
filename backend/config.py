from database import Base, engine


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

    Base.metadata.create_all(bind=engine)
