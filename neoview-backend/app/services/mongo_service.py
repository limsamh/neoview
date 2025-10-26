# Async MongoDB operations

from pymongo import AsyncMongoClient
from app.core.settings import settings

class MongoService:

    client = AsyncMongoClient(settings.mongodb_uri)
    db = client[settings.mongodb_db]

    async def save_query(name: str, query: str):
        doc = {"name": name, "query": query}
        result = await db.queries.insert_one(doc)
        return str(result.inserted_id)

    async def list_queries():
        return [q async for q in db.queries.find({}, {"_id": 0})]

    async def delete_query(name: str):
        await db.queries.delete_one({"name": name})
