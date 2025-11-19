from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    StudentId = Column(Integer, ForeignKey("students.id"))
    PracticeId = Column(Integer, ForeignKey("practices.id"))

    student = relationship("Student", back_populates="favorites")
    practice = relationship("Practice", back_populates="favorites")
