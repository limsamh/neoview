# Environment variables & configuration
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "NeoView"
    sparql_endpoint: str
    sparql_user: str | None = None
    sparql_password: str | None = None
    mongodb_uri: str
    mongodb_db: str = "neoview"

    #MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
    #SPARQL_ENDPOINT = os.getenv('SPARQL_ENDPOINT', 'http://localhost:7200')

    class Config:
        env_file = ".env"

settings = Settings()
