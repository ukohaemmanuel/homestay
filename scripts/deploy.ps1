# PowerShell Deployment Script for Windows
param(
    [string]$environment = "production",
    [string]$provider = "aws"
)

# Validate Node.js installation
$nodeVersion = node -v
if (!$nodeVersion) {
    Write-Host "Node.js is not installed. Installing..."
    winget install OpenJS.NodeJS.LTS
}

# Install dependencies
npm install

# Build application
npm run build

# Deploy based on provider
switch ($provider) {
    "aws" {
        # AWS Deployment
        aws s3 sync dist/ s3://$env:S3_BUCKET
        aws cloudfront create-invalidation --distribution-id $env:CF_DIST_ID --paths "/*"
    }
    "digitalocean" {
        # DigitalOcean Deployment
        doctl apps create --spec app.yaml
    }
    "netlify" {
        # Netlify Deployment
        netlify deploy --prod
    }
}