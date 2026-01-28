from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class GroupModel(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    groupName = Column(String)
    ROPId = Column(Integer)

    student = relationship("StudentModel", back_populates="group")
    practice = relationship("GroupPracticeModel", back_populates="group")
