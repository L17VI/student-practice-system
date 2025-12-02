from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String
from database import Base


class PracticeModel(Base):
    __tablename__ = "practices"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    image = Column(String)
    start_date = Column(String)
    end_date = Column(String)


    document = relationship("DocumentModel", back_populates="practice")
    supervisor = relationship("PracticeSupervisorModel", back_populates="practice")
    favorite = relationship("FavoriteModel", back_populates="practice")
    group_practice = relationship("GroupPracticeModel", back_populates="practice")
