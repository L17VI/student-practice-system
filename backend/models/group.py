from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    GroupName = Column(String)
    ROPId = Column(Integer)

    students = relationship("Student", back_populates="group")
    practices = relationship("GroupPractice", back_populates="group")
