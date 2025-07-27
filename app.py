from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
import os
import hashlib

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory storage (can be upgraded to MongoDB later)
users_db = {}

def hash_password(password: str) -> str:
    """Simple password hashing"""
    return hashlib.sha256(password.encode()).hexdigest()

def verify_password(password: str, hashed: str) -> bool:
    """Verify password against hash"""
    return hash_password(password) == hashed

class RegisterRequest(BaseModel):
    email: EmailStr
    username: str
    password: str
    confirmPassword: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@app.get("/")
def root():
    return {
        "message": "Python FastAPI Server with In-Memory Storage!", 
        "status": "success",
        "storage": "in-memory (upgrade to MongoDB later)"
    }

@app.get("/test")
def test():
    return {"message": "Test endpoint working!"}

@app.post("/register")
def register(data: RegisterRequest):
    if data.password != data.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    if data.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    if any(user["username"] == data.username for user in users_db.values()):
        raise HTTPException(status_code=400, detail="Username already taken")
    
    hashed_password = hash_password(data.password)
    users_db[data.email] = {
        "email": data.email,
        "username": data.username,
        "password": hashed_password
    }
    return {"message": "Registration successful!"}

@app.post("/login")
def login(data: LoginRequest):
    if data.email not in users_db:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    user = users_db[data.email]
    if not verify_password(data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    return {"message": "Login successful!", "username": user["username"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 