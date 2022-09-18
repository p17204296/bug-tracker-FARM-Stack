import uvicorn
from fastapi import FastAPI
from motor.motor_asyncio import AsyncIOMotorClient  # Async Python driver for MongoDB

from apps.bug_tracker.routers import router as bug_tracker_router
from config import settings

app = FastAPI()


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
    app.mongodb = app.mongodb_client[settings.DB_NAME]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(bug_tracker_router, tags=["bugs"], prefix="/bugs")

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )
