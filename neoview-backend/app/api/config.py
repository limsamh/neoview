# Connection setup / testing
from fastapi import APIRouter
from app.core.settings import settings

router = APIRouter(prefix="/api/config", tags=["config"])

@router.get("/test")
def test_connection():
    return {"endpoint": settings.sparql_endpoint, "status": "OK"}
