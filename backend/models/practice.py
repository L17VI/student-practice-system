from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String
from database import Base


class Practice(Base):
    __tablename__ = "practices"

    id = Column(Integer, primary_key=True, index=True)
    Image = Column(String)
    StartTime = Column(String)
    EndTime = Column(String)
    Description = Column(String)

    documents = relationship("Document", back_populates="practice")
    supervisors = relationship("PracticeSupervisor", back_populates="practice")
    favorites = relationship("Favorite", back_populates="practice")
    group_practice = relationship("GroupPractice", back_populates="practice")
