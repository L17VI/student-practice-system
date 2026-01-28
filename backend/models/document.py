from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class DocumentModel(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    fileDocument = Column(String)
    practiceId = Column(Integer, ForeignKey("practices.id"))

    practice = relationship("PracticeModel", back_populates="document")
