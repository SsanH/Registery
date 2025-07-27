import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def test_cosmos_connection():
    """Test Azure Cosmos DB connection"""
    # This will be your Cosmos DB connection string
    cosmos_uri = "mongodb://san:YOUR_KEY@san.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retryWrites=false&maxIdleTimeMS=120000&appName=@san@"
    
    print(f"🔗 Testing connection to Azure Cosmos DB...")
    print(f"📏 URI length: {len(cosmos_uri)}")
    print(f"🔗 URI: {cosmos_uri[:50]}...")
    
    try:
        # Create client with Cosmos DB settings
        client = MongoClient(
            cosmos_uri,
            serverSelectionTimeoutMS=10000,
            connectTimeoutMS=10000,
            socketTimeoutMS=10000
        )
        
        # Test connection
        client.admin.command('ping')
        print("✅ Cosmos DB connection successful!")
        
        # Test database access
        db = client.get_default_database()
        print(f"📊 Database: {db.name}")
        
        # Test collection access
        users = db["users"]
        print(f"📋 Collection: {users.name}")
        
        # Test write operation
        test_doc = {"test": "cosmos_connection", "timestamp": "2025-07-27"}
        result = users.insert_one(test_doc)
        print(f"✍️ Write test successful: {result.inserted_id}")
        
        # Clean up test document
        users.delete_one({"_id": result.inserted_id})
        print("🧹 Test document cleaned up")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"❌ Cosmos DB connection failed: {e}")
        return False

if __name__ == "__main__":
    test_cosmos_connection() 