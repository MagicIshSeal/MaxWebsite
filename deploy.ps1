# deploy.ps1
# PowerShell deployment script with automatic version detection

param(
    [string]$Version = ""
)

Write-Host "`n╔══════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   MaxWebsite Deployment Script          ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════╝`n" -ForegroundColor Cyan

# If no version specified, try to get from git tags
if ([string]::IsNullOrEmpty($Version)) {
    try {
        $Version = git describe --tags --abbrev=0 2>$null
        if ([string]::IsNullOrEmpty($Version)) {
            $Version = "v1.0.0"
            Write-Host "⚠️  No git tags found. Using default version: " -NoNewline -ForegroundColor Yellow
            Write-Host $Version -ForegroundColor Cyan
            Write-Host "💡 Tip: Create a git tag with: git tag v1.0.0 && git push origin v1.0.0`n" -ForegroundColor Gray
        } else {
            Write-Host "✓ Using latest git tag: " -NoNewline -ForegroundColor Green
            Write-Host $Version -ForegroundColor Cyan
        }
    } catch {
        $Version = "v1.0.0"
        Write-Host "⚠️  Git not available. Using default version: " -NoNewline -ForegroundColor Yellow
        Write-Host $Version -ForegroundColor Cyan
    }
} else {
    Write-Host "✓ Using specified version: " -NoNewline -ForegroundColor Green
    Write-Host $Version -ForegroundColor Cyan
}

# Set environment variable
$env:APP_VERSION = $Version

Write-Host "`n🚀 Building and deploying MaxWebsite..." -ForegroundColor Yellow
Write-Host "   Version: $Version" -ForegroundColor Gray
Write-Host "   This may take a few minutes...`n" -ForegroundColor Gray

# Check if docker is running
try {
    docker ps > $null 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Docker is not running. Please start Docker Desktop.`n" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Docker is not installed or not running.`n" -ForegroundColor Red
    exit 1
}

# Run docker compose
docker compose up -d --build

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n╔══════════════════════════════════════════╗" -ForegroundColor Green
    Write-Host "║   ✓ Deployment Successful!              ║" -ForegroundColor Green
    Write-Host "╚══════════════════════════════════════════╝`n" -ForegroundColor Green
    
    Write-Host "📍 Access Points:" -ForegroundColor Cyan
    Write-Host "   Frontend:  " -NoNewline -ForegroundColor Gray
    Write-Host "http://localhost:3000" -ForegroundColor White
    Write-Host "   Strapi:    " -NoNewline -ForegroundColor Gray
    Write-Host "http://localhost:1337/admin" -ForegroundColor White
    Write-Host "   Version:   " -NoNewline -ForegroundColor Gray
    Write-Host $Version -ForegroundColor White
    
    Write-Host "`n💡 Tips:" -ForegroundColor Yellow
    Write-Host "   • Check logs: docker compose logs -f frontend" -ForegroundColor Gray
    Write-Host "   • Stop services: docker compose down" -ForegroundColor Gray
    Write-Host "   • View status: docker compose ps`n" -ForegroundColor Gray
} else {
    Write-Host "`n❌ Deployment failed. Check the error messages above.`n" -ForegroundColor Red
    exit 1
}
