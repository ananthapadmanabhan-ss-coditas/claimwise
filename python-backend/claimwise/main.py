from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.claimwise.features.claims.route.claim import router as claim_router

app = FastAPI()

app.include_router(claim_router)

@app.get("/health")
def health_check():
    return "Server is running"


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
