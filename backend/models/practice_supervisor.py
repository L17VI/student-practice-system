from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class PracticeSupervisorModel(Base):
    __tablename__ = "practice_supervisors"

    id = Column(Integer, primary_key=True, index=True)
    UserId = Column(Integer, ForeignKey("users.id"))
    PracticeId = Column(Integer, ForeignKey("practices.id"))

    user = relationship("UserModel", back_populates="supervisor")
    practice = relationship("PracticeModel", back_populates="supervisor")
