from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class FavoriteModel(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    practice_id = Column(Integer, ForeignKey("practices.id"))

    user = relationship("UserModel", back_populates="favorites")
    practice = relationship("PracticeModel", back_populates="favorite")
