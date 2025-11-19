from sqlalchemy import Column, Integer, String, Text
from pydantic import BaseModel
from typing import Optional
from database import Base

class SavedQueryDB(Base):
    __tablename__ = "saved_queries"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    query = Column(Text)
    description = Column(String, nullable=True)

class SavedQueryBase(BaseModel):
    name: str
    query: str
    description: Optional[str] = None

class SavedQueryCreate(SavedQueryBase):
    pass

class SavedQuery(SavedQueryBase):
    id: int

    class Config:
        orm_mode = True
