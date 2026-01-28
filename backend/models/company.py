from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class CompanyModel(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    city = Column(String)
    description = Column(String, nullable=True)
    logo = Column(String, nullable=True)

    practices = relationship("PracticeModel", back_populates="company")
