from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class UserModel(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    fullname = Column(String)
    email = Column(String, unique=True)
    image = Column(String)
    role = Column(String)
    password = Column(String)

    student = relationship("StudentModel", back_populates="user")
    supervisor = relationship("PracticeSupervisorModel", back_populates="user")
