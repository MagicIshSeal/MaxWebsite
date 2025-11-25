# GitHub Releases Setup Guide

## Overview
Your website is now configured to automatically display the GitHub release version in the footer. The version will show as `BUILD: v1.2.3` in the SystemStatus footer.

## How It Works

1. **Version Source**: The version comes from GitHub release tags (e.g., `v1.0.0`, `v1.2.3`)
2. **Build Process**: The version is passed to Docker during build via the `APP_VERSION` environment variable
3. **Display**: The SystemStatus footer component displays the version automatically

## Creating Your First GitHub Release

### Method 1: Using GitHub Web Interface (Easiest)

1. **Go to Your Repository**
   - Navigate to: https://github.com/MagicIshSeal/MaxWebsite

2. **Create a New Release**
   - Click on "Releases" (right sidebar)
   - Click "Create a new release" button

3. **Fill in Release Details**
   - **Tag version**: `v1.0.0` (must start with 'v')
   - **Target**: `main` (or your branch)
   - **Release title**: `Version 1.0.0 - Initial Release`
   - **Description**: Add notes about what's in this version:
     ```
     ## Features
     - Flight Deck theme with technical aesthetic
     - Strapi CMS integration
     - Project showcase with 3D viewer
     - Experience timeline
     - Tool inventory system
     
     ## Technical
     - Docker containerized deployment
     - Next.js 14 with TypeScript
     - PostgreSQL database
     ```

4. **Publish**
   - Click "Publish release"
   - Your release tag `v1.0.0` is now created!

### Method 2: Using Git Command Line

```bash
# Navigate to your repository
cd "C:\Users\mvane\Documents\Git Clone\MaxWebsite"

# Create a tag
git tag -a v1.0.0 -m "Initial release with Flight Deck theme"

# Push the tag to GitHub
git push origin v1.0.0

# Then go to GitHub web interface to create the release from the tag
```

## Building with a Specific Version

### Option 1: Set Environment Variable (Windows)

```powershell
# Set the version for current session
$env:APP_VERSION = "v1.0.0"

# Build with that version
docker compose up -d --build
```

### Option 2: Inline with Docker Command

```powershell
# Build with specific version
$env:APP_VERSION = "v1.0.0"; docker compose up -d --build
```

### Option 3: Get Version from Git Tag Automatically

```powershell
# Get the latest git tag and use it
$latestTag = git describe --tags --abbrev=0
$env:APP_VERSION = $latestTag
docker compose up -d --build
```

## Recommended Version Workflow

### For Development Builds
```powershell
# Use current commit hash for dev builds
$commitHash = git rev-parse --short HEAD
$env:APP_VERSION = "dev-$commitHash"
docker compose up -d --build
```

### For Production/Release Builds
```powershell
# Use the latest release tag
$latestTag = git describe --tags --abbrev=0 2>$null
if ($latestTag) {
    $env:APP_VERSION = $latestTag
} else {
    $env:APP_VERSION = "v1.0.0"
}
docker compose up -d --build
```

## Semantic Versioning Guide

Follow semantic versioning: `vMAJOR.MINOR.PATCH`

- **MAJOR** (v**2**.0.0): Breaking changes, major redesigns
  - Example: Complete theme overhaul, database schema changes
  
- **MINOR** (v1.**2**.0): New features, non-breaking additions
  - Example: New project type, additional content fields
  
- **PATCH** (v1.0.**3**): Bug fixes, small improvements
  - Example: Fix broken link, adjust styling

### Examples:
- `v1.0.0` - Initial release with Flight Deck theme
- `v1.1.0` - Added blog functionality
- `v1.1.1` - Fixed mobile navigation bug
- `v2.0.0` - Complete redesign with new CMS

## Automated Deployment Script

Create a file `deploy.ps1` for easy deployment:

```powershell
# deploy.ps1
# PowerShell script for deploying with version

param(
    [string]$Version = ""
)

# If no version specified, try to get from git tags
if ([string]::IsNullOrEmpty($Version)) {
    $Version = git describe --tags --abbrev=0 2>$null
    if ([string]::IsNullOrEmpty($Version)) {
        $Version = "v1.0.0"
        Write-Host "⚠️  No git tags found. Using default version: $Version"
    } else {
        Write-Host "✓ Using latest git tag: $Version"
    }
} else {
    Write-Host "✓ Using specified version: $Version"
}

# Set environment variable
$env:APP_VERSION = $Version

Write-Host "`n🚀 Building and deploying version $Version..."
docker compose up -d --build

Write-Host "`n✓ Deployment complete!"
Write-Host "  Frontend: http://localhost:3000"
Write-Host "  Strapi:   http://localhost:1337"
Write-Host "  Version:  $Version"
```

**Usage:**
```powershell
# Deploy with latest git tag
.\deploy.ps1

# Deploy with specific version
.\deploy.ps1 -Version "v1.2.3"
```

## Checking Your Current Version

Visit your website footer at http://localhost:3000 and look for:
```
BUILD: v1.0.0
```

Or check in Docker:
```powershell
docker compose logs frontend | Select-String "APP_VERSION"
```

## Creating Releases for Different Milestones

### Example Release Timeline

**v1.0.0** - Initial Launch
- Flight Deck theme
- Basic portfolio features
- Docker deployment

**v1.1.0** - Content Enhancement
- Added PDF report uploads
- Enhanced 3D model viewer
- Improved mobile responsiveness

**v1.2.0** - Feature Additions
- Contact form integration
- Blog section
- Analytics dashboard

**v2.0.0** - Major Update
- Complete design refresh
- New CMS features
- Performance optimizations

## Troubleshooting

### Version Not Showing
```powershell
# Check if environment variable is set
echo $env:APP_VERSION

# Rebuild with explicit version
$env:APP_VERSION = "v1.0.0"; docker compose up -d --build frontend
```

### Version Shows as "v1.0.0" (default)
- This means `APP_VERSION` wasn't set during build
- Set the environment variable before building (see above)

### Git Tag Not Found
```powershell
# List all tags
git tag

# If no tags exist, create one
git tag v1.0.0
git push origin v1.0.0
```

## Best Practices

1. **Tag Before Building**
   - Create git tag → Push to GitHub → Build with that version

2. **Match Release and Tag**
   - GitHub release version should match git tag

3. **Meaningful Release Notes**
   - Document what changed in each version
   - Include breaking changes prominently

4. **Test Before Tagging**
   - Test thoroughly before creating release tags
   - Use dev versions for testing: `dev-abc123`

5. **Keep a Changelog**
   - Maintain CHANGELOG.md with version history
   - Link releases to specific commits

## Quick Reference

```powershell
# Create and push a new release
git tag -a v1.0.0 -m "Release message"
git push origin v1.0.0

# Build with latest tag
$env:APP_VERSION = $(git describe --tags --abbrev=0); docker compose up -d --build

# Build with specific version
$env:APP_VERSION = "v1.2.3"; docker compose up -d --build

# Check current version in running container
docker exec portfolio_frontend env | Select-String "APP_VERSION"
```

## Next Steps

1. ✅ Create your first release on GitHub (v1.0.0)
2. ✅ Set `APP_VERSION` environment variable
3. ✅ Rebuild Docker containers with version
4. ✅ Verify version displays in footer
5. ✅ Create `deploy.ps1` script for easy deployment

Your website will now automatically display your GitHub release version!
