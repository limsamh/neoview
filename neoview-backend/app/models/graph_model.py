# Graph response schemas
from pydantic import BaseModel
from typing import List, Dict

class Node(BaseModel):
    id: str
    label: str

class Edge(BaseModel):
    source: str
    target: str
    label: str

class GraphResponse(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

