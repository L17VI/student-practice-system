from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class PracticeSupervisor(Base):
    __tablename__ = "practice_supervisors"

    id = Column(Integer, primary_key=True, index=True)
    UserId = Column(Integer, ForeignKey("users.id"))
    PracticeId = Column(Integer, ForeignKey("practices.id"))

    user = relationship("User", back_populates="supervisor")
    practice = relationship("Practice", back_populates="supervisors")
