# FastAPI entrypoint
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import query, config
from app.core.settings import settings

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(query.router)
app.include_router(config.router)


@app.get("/")
def root():
    return {"message": "Neoview API is running"}

@app.get("/fuseki/status")
def check_fuseki():
    try:
        r = requests.get(f"{settings.sparql_endpoint}/sparql")
        return {"status": r.status_code}
    except Exception as e:
        return {"error": str(e)}

@app.get("/mongo/status")
def check_mongo():
    try:
        db.command("ping")
        return {"status": "connected"}
    except Exception as e:
        return {"error": str(e)}

@app.get("/health-check")
def health_check():
    return {"status": "running", "app": settings.app_name}
