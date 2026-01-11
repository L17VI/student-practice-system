from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String
from database import Base


class PracticeModel(Base):
    __tablename__ = "practices"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    company = Column(String)
    city = Column(String)
    format = Column(String)
    season = Column(String)
    total_seats = Column(Integer, default=10)
    filled_seats = Column(Integer, default=0)

    # Optional fields
    description = Column(String, nullable=True)
    image = Column(String, nullable=True)
    start_date = Column(String, nullable=True)
    end_date = Column(String, nullable=True)


    document = relationship("DocumentModel", back_populates="practice")
    supervisor = relationship("PracticeSupervisorModel", back_populates="practice")
    favorite = relationship("FavoriteModel", back_populates="practice")
    group_practice = relationship("GroupPracticeModel", back_populates="practice")
