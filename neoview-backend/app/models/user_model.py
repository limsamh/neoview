# (Optional for auth)
from pydantic import BaseModel

class User(BaseModel):
    username: str
    email: str
