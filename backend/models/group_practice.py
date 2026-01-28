from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class GroupPracticeModel(Base):
    __tablename__ = "group_practices"

    id = Column(Integer, primary_key=True, index=True)
    groupId = Column(Integer, ForeignKey("groups.id"))
    practiceId = Column(Integer, ForeignKey("practices.id"))

    group = relationship("GroupModel", back_populates="practice")
    practice = relationship("PracticeModel", back_populates="group_practice")
