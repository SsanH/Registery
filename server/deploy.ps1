# Azure Deployment Script
Write-Host "Starting Azure deployment..."

# Create deployment package
Write-Host "Creating deployment package..."
Compress-Archive -Path app.py,requirements.txt,startup.txt,.gitignore -DestinationPath deploy.zip -Force

# Deploy to Azure
Write-Host "Deploying to Azure..."
az webapp deployment source config-zip --resource-group tohar-registration-rg --name tohar-registration-api --src deploy.zip

Write-Host "Deployment completed!" 