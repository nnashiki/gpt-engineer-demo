from sqlalchemy import Boolean, Column, Integer, String, DateTime
from .database import Base

class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String, index=True)
    deadline = Column(DateTime)
    is_completed = Column(Boolean, default=False)
