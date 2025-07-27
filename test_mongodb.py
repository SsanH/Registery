import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def test_mongodb_connection():
    """Test MongoDB Atlas connection"""
    mongodb_uri = os.getenv("MONGODB_URI")
    
    if not mongodb_uri:
        print("❌ MONGODB_URI not found in environment variables")
        return False
    
    print(f"🔗 Testing connection to MongoDB Atlas...")
    print(f"📏 URI length: {len(mongodb_uri)}")
    
    try:
        # Create client with minimal settings
        client = MongoClient(
            mongodb_uri,
            serverSelectionTimeoutMS=10000,
            connectTimeoutMS=10000,
            socketTimeoutMS=10000
        )
        
        # Test connection
        client.admin.command('ping')
        print("✅ MongoDB connection successful!")
        
        # Test database access
        db = client.get_default_database()
        print(f"📊 Database: {db.name}")
        
        # Test collection access
        users = db["users"]
        print(f"📋 Collection: {users.name}")
        
        # Test write operation
        test_doc = {"test": "connection", "timestamp": "2025-07-27"}
        result = users.insert_one(test_doc)
        print(f"✍️ Write test successful: {result.inserted_id}")
        
        # Clean up test document
        users.delete_one({"_id": result.inserted_id})
        print("🧹 Test document cleaned up")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        return False

if __name__ == "__main__":
    test_mongodb_connection() 