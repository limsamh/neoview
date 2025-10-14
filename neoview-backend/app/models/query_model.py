# Pydantic schemas
from pydantic import BaseModel
from datetime import datetime

class QueryRequest(BaseModel):
    endpoint: str | None = None
    query: str

class QueryResponse(BaseModel):
    nodes: list[dict]
    edges: list[dict]

class SavedQuery(BaseModel):
    id: str | None = None
    name: str
    query: str
    created_at: datetime = datetime.utcnow()
