from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TodoBase(BaseModel):
    title: str
    content: str
    deadline: datetime

class TodoCreate(TodoBase):
    pass

class Todo(TodoBase):
    id: int
    is_completed: bool

    class Config:
        orm_mode = True
