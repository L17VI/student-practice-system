from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database import Base


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    practice_id = Column(Integer, ForeignKey("practices.id"), nullable=False)
    status = Column(String, default="pending")  # pending, approved, rejected, completed
    motivation_letter = Column(Text)
    applied_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Связи
    student = relationship("User", foreign_keys=[student_id])
    practice = relationship("Practice", back_populates="applications")