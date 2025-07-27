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

# Diagnostic information
diagnostic_info = {
    "pymongo_available": False,
    "passlib_available": False,
    "mongodb_uri_set": False,
    "mongodb_connection": False,
    "error_messages": []
}

# Try to import MongoDB dependencies
try:
    import pymongo
    diagnostic_info["pymongo_available"] = True
    diagnostic_info["pymongo_version"] = pymongo.__version__
except ImportError as e:
    diagnostic_info["error_messages"].append(f"pymongo import failed: {e}")

try:
    from passlib.context import CryptContext
    diagnostic_info["passlib_available"] = True
except ImportError as e:
    diagnostic_info["error_messages"].append(f"passlib import failed: {e}")

# Check MongoDB URI
mongodb_uri = os.getenv("MONGODB_URI", "NOT_SET")
diagnostic_info["mongodb_uri_set"] = mongodb_uri != "NOT_SET"
diagnostic_info["mongodb_uri_length"] = len(mongodb_uri) if mongodb_uri != "NOT_SET" else 0

# Try MongoDB connection with SSL fixes
if diagnostic_info["pymongo_available"] and diagnostic_info["mongodb_uri_set"]:
    try:
        from pymongo import MongoClient
        import ssl
        
        # Create MongoDB client with SSL configuration
        client = MongoClient(
            mongodb_uri,
            ssl=True,
            ssl_cert_reqs=ssl.CERT_NONE,  # Disable SSL certificate verification
            serverSelectionTimeoutMS=5000,  # 5 second timeout
            connectTimeoutMS=5000,
            socketTimeoutMS=5000
        )
        
        # Test the connection
        client.admin.command('ping')
        diagnostic_info["mongodb_connection"] = True
        db = client.get_default_database()
        users = db["users"]
        pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        MONGODB_AVAILABLE = True
    except Exception as e:
        diagnostic_info["error_messages"].append(f"MongoDB connection failed: {e}")
        MONGODB_AVAILABLE = False
        users = None
        pwd_context = None
else:
    MONGODB_AVAILABLE = False
    users = None
    pwd_context = None

# Fallback to in-memory storage
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
        "message": "Python FastAPI Server - MongoDB Diagnostic",
        "status": "success",
        "mongodb_available": MONGODB_AVAILABLE,
        "diagnostic_info": diagnostic_info
    }

@app.get("/test")
def test():
    return {"message": "Test endpoint working!"}

@app.post("/register")
def register(data: RegisterRequest):
    if data.password != data.confirmPassword:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    
    if MONGODB_AVAILABLE:
        # Use MongoDB
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
        return {"message": "Registration successful! (MongoDB)"}
    else:
        # Use in-memory storage
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
        return {"message": "Registration successful! (In-Memory)"}

@app.post("/login")
def login(data: LoginRequest):
    if MONGODB_AVAILABLE:
        # Use MongoDB
        user = users.find_one({"email": data.email})
        if not user:
            raise HTTPException(status_code=400, detail="Invalid email or password")
        
        if not pwd_context.verify(data.password, user["password"]):
            raise HTTPException(status_code=400, detail="Invalid email or password")
        
        return {"message": "Login successful! (MongoDB)", "username": user["username"]}
    else:
        # Use in-memory storage
        if data.email not in users_db:
            raise HTTPException(status_code=400, detail="Invalid email or password")
        
        user = users_db[data.email]
        if not verify_password(data.password, user["password"]):
            raise HTTPException(status_code=400, detail="Invalid email or password")
        
        return {"message": "Login successful! (In-Memory)", "username": user["username"]}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 