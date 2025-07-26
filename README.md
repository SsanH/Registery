# Registration System Monorepo

A full-stack registration system with web and mobile interfaces, featuring user authentication, email notifications, and AI-powered welcome messages.

## 🏗️ Project Structure

```
tohar/
├── web/           # React.js web application
├── mobile/        # React Native mobile app (Expo)
├── server/        # Python FastAPI backend (MongoDB)
├── node-server/   # Node.js server (OpenAI + Email)
├── .env           # Environment variables
└── README.md      # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- Python (v3.8+)
- MongoDB (local or cloud)
- Expo CLI (`npm install -g @expo/cli`)

### 1. Environment Setup

Create a `.env` file in the root directory:

```env
# MongoDB URI
MONGODB_URI=mongodb://localhost:27017/registration_db

# OpenAI API Key
OPENAI_API_KEY=your_openai_api_key_here

# Email Configuration (Ethereal Email for testing)
EMAIL_USER=liza99@ethereal.email
EMAIL_PASS=bs5rmw6RXcGH8Y281H
```

### 2. Install Dependencies

#### Web App
```bash
cd web
npm install
```

#### Mobile App
```bash
cd mobile
npm install
```

#### Python Server
```bash
cd server
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

#### Node.js Server
```bash
cd node-server
npm install
```

## 🏃‍♂️ Running the Application

### Step 1: Start MongoDB
Make sure MongoDB is running locally or use a cloud instance.

### Step 2: Start Python Backend
```bash
cd server
venv\Scripts\activate  # Windows
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```
Server will run on: http://localhost:8000

### Step 3: Start Node.js Server
```bash
cd node-server
node index.js
```
Server will run on: http://localhost:3001

### Step 4: Start Web App
```bash
cd web
npm start
```
Web app will run on: http://localhost:3000

### Step 5: Start Mobile App
```bash
cd mobile
npx expo start
```
Scan QR code with Expo Go app on your phone.

## 🔧 API Endpoints

### Python FastAPI Server (Port 8000)
- `POST /register` - User registration
- `POST /login` - User authentication
- `GET /` - Health check

### Node.js Server (Port 3001)
- `GET /random-text` - Get random message from ChatGPT
- `POST /send-welcome-email` - Send welcome email

## 📱 Features

### Web App
- User registration with email, username, password
- User login with email and password
- Social login buttons (UI only)
- Form validation
- Responsive design matching Figma mockup
- Toast notifications after successful registration

### Mobile App
- Same functionality as web app
- Native mobile UI
- Password visibility toggle
- Navigation between login and register screens

### Backend Features
- Password hashing with bcrypt
- MongoDB user storage
- Email validation
- Duplicate email/username prevention
- CORS enabled for cross-origin requests

### AI & Email Features
- Welcome emails with personalized ChatGPT messages
- Random motivational messages from ChatGPT
- Ethereal Email integration for testing

## 🛠️ Development

### Adding New Dependencies

#### Web App
```bash
cd web
npm install package-name
```

#### Mobile App
```bash
cd mobile
npm install package-name
```

#### Python Server
```bash
cd server
venv\Scripts\activate
pip install package-name
pip freeze > requirements.txt
```

#### Node.js Server
```bash
cd node-server
npm install package-name
```

### Database Schema

Users collection in MongoDB:
```json
{
  "_id": "ObjectId",
  "email": "user@example.com",
  "username": "username",
  "password": "hashed_password"
}
```

## 🚀 Deployment

### Azure Deployment (Python Server)
1. Install Azure CLI
2. Login to Azure: `az login`
3. Create resource group: `az group create --name myResourceGroup --location eastus`
4. Create app service plan: `az appservice plan create --name myAppServicePlan --resource-group myResourceGroup --sku B1`
5. Create web app: `az webapp create --name myWebApp --resource-group myResourceGroup --plan myAppServicePlan`
6. Deploy: `az webapp deployment source config-local-git --name myWebApp --resource-group myResourceGroup`

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env file

2. **Python Package Errors**
   - Activate virtual environment: `venv\Scripts\activate`
   - Install missing packages: `pip install package-name`

3. **Node.js Module Errors**
   - Navigate to correct directory: `cd node-server`
   - Install dependencies: `npm install`

4. **Email Sending Issues**
   - Check email credentials in .env
   - Use Ethereal Email for testing

5. **Mobile App Issues**
   - Clear Expo cache: `npx expo start --clear`
   - Check Expo Go app is installed on phone

### Port Conflicts
- Web app: 3000
- Python server: 8000
- Node.js server: 3001
- MongoDB: 27017

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | `mongodb://localhost:27017/db` |
| OPENAI_API_KEY | OpenAI API key | `sk-...` |
| EMAIL_USER | Email username | `user@ethereal.email` |
| EMAIL_PASS | Email password | `password` |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test all components
5. Submit a pull request

## 📄 License

This project is for educational purposes. 