# PowerShell Local Setup Script for Windows
# Check for required software
$required = @{
    "Node.js" = "node -v"
    "Git" = "git --version"
    "PostgreSQL" = "psql --version"
}

foreach ($software in $required.Keys) {
    try {
        Invoke-Expression $required[$software] | Out-Null
        Write-Host "$software is installed ✅"
    }
    catch {
        Write-Host "$software is not installed ❌"
        switch ($software) {
            "Node.js" { 
                Write-Host "Installing Node.js..."
                winget install OpenJS.NodeJS.LTS
            }
            "Git" {
                Write-Host "Installing Git..."
                winget install Git.Git
            }
            "PostgreSQL" {
                Write-Host "Installing PostgreSQL..."
                winget install PostgreSQL.PostgreSQL
            }
        }
    }
}

# Setup environment
Copy-Item .env.example .env
Write-Host "Environment file created ✅"

# Install dependencies
npm install
Write-Host "Dependencies installed ✅"

# Setup database
$dbName = "workshop_db"
$query = "CREATE DATABASE $dbName;"
psql -U postgres -c $query
Write-Host "Database created ✅"

# Run migrations
npm run migrate
Write-Host "Database migrations complete ✅"

# Start application
npm run dev
Write-Host "Application started at http://localhost:3000 🚀"