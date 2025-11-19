from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    MyPracticeId = Column(Integer, ForeignKey("practices.id"))
    GroupId = Column(Integer, ForeignKey("groups.id"))
    UserId = Column(Integer, ForeignKey("users.id"))

    user = relationship("User", back_populates="student")
    group = relationship("Group", back_populates="students")
    favorites = relationship("Favorite", back_populates="student")
