from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    FileDocument = Column(String)
    PracticeId = Column(Integer, ForeignKey("practices.id"))

    practice = relationship("Practice", back_populates="documents")
