from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    mongodb_uri = os.getenv("MONGODB_URI", "NOT_SET")
    return {
        "message": "Test server running!",
        "mongodb_uri_set": mongodb_uri != "NOT_SET",
        "mongodb_uri_length": len(mongodb_uri) if mongodb_uri != "NOT_SET" else 0
    }

@app.get("/test")
def test():
    return {"message": "Test endpoint working!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 