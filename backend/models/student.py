from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class StudentModel(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    myPracticeId = Column(Integer, ForeignKey("practices.id"))
    groupId = Column(Integer, ForeignKey("groups.id"))
    userId = Column(Integer, ForeignKey("users.id"))

    user = relationship("UserModel", back_populates="student")
    group = relationship("GroupModel", back_populates="student")
