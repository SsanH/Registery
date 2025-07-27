from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
from pymongo import MongoClient
from passlib.context import CryptContext
import os

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/registration_db")
client = MongoClient(MONGODB_URI)
db = client.get_default_database() if client is not None else None
users = db["users"] if db is not None else None

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

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
    return {"message": "Python FastAPI Server with MongoDB Atlas!", "status": "success"}

@app.get("/test")
def test():
    return {"message": "Test endpoint working!"}

@app.post("/register")
def register(data: RegisterRequest):
    if data.password != data.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    if users.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    if users.find_one({"username": data.username}):
        raise HTTPException(status_code=400, detail="Username already taken")
    
    hashed_password = pwd_context.hash(data.password)
    user = {
        "email": data.email,
        "username": data.username,
        "password": hashed_password
    }
    users.insert_one(user)
    return {"message": "Registration successful!"}

@app.post("/login")
def login(data: LoginRequest):
    user = users.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    if not pwd_context.verify(data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    return {"message": "Login successful!", "username": user["username"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 