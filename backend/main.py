from fastapi import FastAPI, HTTPException, Depends, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
import httpx
import rdflib
from pydantic import BaseModel

from database import SessionLocal, engine, Base
from models import SavedQueryDB, SavedQueryBase, SavedQueryCreate, SavedQuery

Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS configuration
origins = [
    "http://localhost:4200",
    "http://localhost:9876",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Global RDF Graph for local data
local_graph = rdflib.Graph()

class QueryRequest(BaseModel):
    query: str
    endpoint: Optional[str] = "https://query.wikidata.org/sparql"
    use_local: Optional[bool] = False

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        content = await file.read()
        # Parse the file content (assuming Turtle format for .ttl)
        local_graph.parse(data=content.decode("utf-8"), format="turtle")
        return {"message": f"Successfully loaded {len(local_graph)} triples from {file.filename}"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error parsing file: {str(e)}")

@app.post("/query")
async def run_query(request: QueryRequest):
    if request.use_local:
        try:
            # Query the local rdflib graph
            results = local_graph.query(request.query)
            
            # Format results to match SPARQL JSON format
            bindings = []
            vars_list = [str(v) for v in results.vars] if results.vars else []
            
            for row in results:
                binding = {}
                for i, var in enumerate(vars_list):
                    val = row[i]
                    if val is not None:
                        binding[var] = {"type": "literal", "value": str(val)} # Simplified
                bindings.append(binding)
                
            return {
                "head": {"vars": vars_list},
                "results": {"bindings": bindings}
            }
        except Exception as e:
             raise HTTPException(status_code=400, detail=f"Local query error: {str(e)}")
    
    # External SPARQL Endpoint
    endpoint = request.endpoint or "https://query.wikidata.org/sparql"
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(
                endpoint,
                params={"query": request.query, "format": "json"},
                headers={"User-Agent": "GraphView/1.0"},
                timeout=60.0
            )
            response.raise_for_status()
            return response.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=str(e))
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

@app.post("/queries/", response_model=SavedQuery)
def create_saved_query(query: SavedQueryCreate, db: Session = Depends(get_db)):
    db_query = SavedQueryDB(**query.dict())
    db.add(db_query)
    db.commit()
    db.refresh(db_query)
    return db_query

@app.get("/queries/", response_model=List[SavedQuery])
def read_saved_queries(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    queries = db.query(SavedQueryDB).offset(skip).limit(limit).all()
    return queries
