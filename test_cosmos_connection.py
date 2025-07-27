import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

def test_cosmos_connection():
    """Test Azure Cosmos DB connection with different formats"""
    
    # Get the connection string from environment
    mongodb_uri = os.getenv("MONGODB_URI")
    
    if not mongodb_uri:
        print("❌ MONGODB_URI not found in environment variables")
        return False
    
    print(f"🔗 Testing Cosmos DB connection...")
    print(f"📏 URI length: {len(mongodb_uri)}")
    print(f"🔗 URI preview: {mongodb_uri[:50]}...")
    
    # Test different connection approaches
    approaches = [
        {
            "name": "Original URI",
            "uri": mongodb_uri,
            "description": "Using the connection string as-is"
        },
        {
            "name": "With database name",
            "uri": mongodb_uri + "/registration_db?retryWrites=false",
            "description": "Adding database name to URI"
        },
        {
            "name": "With database name and collection",
            "uri": mongodb_uri + "/registration_db/users?retryWrites=false",
            "description": "Adding database and collection to URI"
        }
    ]
    
    for i, approach in enumerate(approaches, 1):
        print(f"\n🧪 Test {i}: {approach['name']}")
        print(f"📝 {approach['description']}")
        
        try:
            # Create MongoDB client
            client = MongoClient(
                approach["uri"],
                serverSelectionTimeoutMS=10000,
                connectTimeoutMS=10000,
                socketTimeoutMS=10000
            )
            
            # Test connection
            client.admin.command('ping')
            print("✅ Connection successful!")
            
            # Try to get database
            try:
                db = client.get_default_database()
                if db:
                    print(f"📊 Default database: {db.name}")
                else:
                    print("📊 No default database found")
            except Exception as db_error:
                print(f"⚠️ Database error: {db_error}")
            
            # Try to access specific database
            try:
                db = client["registration_db"]
                print(f"📊 Specific database: {db.name}")
                
                # Test collection
                users = db["users"]
                print(f"📋 Collection: {users.name}")
                
                # Test write operation
                test_doc = {"test": "cosmos_connection", "timestamp": "2025-07-27"}
                result = users.insert_one(test_doc)
                print(f"✍️ Write test successful: {result.inserted_id}")
                
                # Clean up test document
                users.delete_one({"_id": result.inserted_id})
                print("🧹 Test document cleaned up")
                
            except Exception as specific_error:
                print(f"⚠️ Specific database error: {specific_error}")
            
            client.close()
            print("🎉 This approach works!")
            return True
            
        except Exception as e:
            print(f"❌ Connection failed: {e}")
    
    print("\n❌ All connection approaches failed")
    return False

if __name__ == "__main__":
    test_cosmos_connection() 