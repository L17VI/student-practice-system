from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    FullName = Column(String)
    Email = Column(String, unique=True)
    Image = Column(String)
    Role = Column(String)
    Login = Column(String, unique=True)

    student = relationship("Student", back_populates="user")
    supervisor = relationship("PracticeSupervisor", back_populates="user")
