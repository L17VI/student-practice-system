from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class GroupPractice(Base):
    __tablename__ = "group_practice"

    id = Column(Integer, primary_key=True, index=True)
    GroupId = Column(Integer, ForeignKey("groups.id"))
    PracticeId = Column(Integer, ForeignKey("practices.id"))

    group = relationship("Group", back_populates="practices")
    practice = relationship("Practice", back_populates="group_practice")
