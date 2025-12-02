from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class FavoriteModel(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    studentId = Column(Integer, ForeignKey("students.id"))
    practiceId = Column(Integer, ForeignKey("practices.id"))

    student = relationship("StudentModel", back_populates="favorite")
    practice = relationship("PracticeModel", back_populates="favorite")
