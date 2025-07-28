from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from dotenv import load_dotenv
from pymongo import MongoClient
from passlib.context import CryptContext
import os
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001", 
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "https://tohar-register-dbb2b2a6hea5gqe0.israelcentral-01.azurewebsites.net",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# MongoDB connection
mongodb_uri = os.getenv("MONGODB_URI")
if not mongodb_uri:
    logger.error("MONGODB_URI environment variable not set")
    raise ValueError("MONGODB_URI environment variable is required")

try:
    client = MongoClient(
        mongodb_uri,
        serverSelectionTimeoutMS=15000,
        connectTimeoutMS=15000,
        socketTimeoutMS=15000,
        maxPoolSize=1,
        minPoolSize=0,
        retryWrites=False,
        w='majority',
        readPreference='primary'
    )
    
    # Test connection
    client.admin.command('ping')
    logger.info("Successfully connected to MongoDB")
    
    # Connect to database and collection
    db = client["registration_db"]
    users = db["users"]
    
    # Password hashing context
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
    
except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    raise

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
        "message": "Registration API Server",
        "status": "success"
    }

@app.post("/register")
def register(data: RegisterRequest):
    logger.info(f"Registration attempt for email: {data.email}")
    
    if data.password != data.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    # Check if email already exists
    if users.find_one({"email": data.email}):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Check if username already exists
    if users.find_one({"username": data.username}):
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Hash password and create user
    hashed_password = pwd_context.hash(data.password)
    user = {
        "email": data.email,
        "username": data.username,
        "password": hashed_password
    }
    
    users.insert_one(user)
    logger.info(f"User registered successfully: {data.email}")
    return {"message": "Registration successful!"}

@app.post("/login")
def login(data: LoginRequest):
    # Find user by email
    user = users.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    # Verify password
    if not pwd_context.verify(data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    
    logger.info(f"User logged in successfully: {data.email}")
    return {"message": "Login successful!", "username": user["username"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 