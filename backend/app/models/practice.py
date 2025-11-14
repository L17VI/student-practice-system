from sqlalchemy import Column, Integer, String, Text, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Practice(Base):
    __tablename__ = "practices"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text)
    company_id = Column(Integer, ForeignKey("companies.id"))
    direction = Column(String)
    available_places = Column(Integer, default=1)
    start_date = Column(Date)
    end_date = Column(Date)
    requirements = Column(Text)
    practice_supervisor_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    # Связи
    company = relationship("Company", back_populates="practices")
    practice_supervisor = relationship("User", foreign_keys=[practice_supervisor_id])
    applications = relationship("Application", back_populates="practice")