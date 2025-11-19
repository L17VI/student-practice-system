from database import Base, engine

from models import (
    user,
    group,
    practice,
    student,
    document,
    favorite,
    group_practice,
    practice_supervisor
)

def init_db():
    Base.metadata.create_all(bind=engine)
