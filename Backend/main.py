# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from routers import Authentication, Tasks

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins = ["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(Authentication.router)
# app.include_router(Tasks.router)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from routers import Authentication, Tasks
from database import DBConnectionPool  # this is your new async pool class

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize and open the async pool at startup
    app.pool = DBConnectionPool()
    await app.pool.open()
    yield
    # Close the pool gracefully during shutdown
    await app.pool.close()

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Make the pool accessible inside routes via `request.app.pool`
app.include_router(Authentication.router)
app.include_router(Tasks.router)
