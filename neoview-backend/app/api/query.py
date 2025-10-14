# Query execution endpoints
from fastapi import APIRouter, HTTPException
from app.models.query_model import QueryRequest, QueryResponse
from app.services.sparql_service import run_sparql_query

router = APIRouter(prefix="/api/query", tags=["query"])

@router.post("/execute", response_model=QueryResponse)
def execute_query(req: QueryRequest):
    try:
        data = run_sparql_query(req.query, req.endpoint)
        return QueryResponse(**data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
