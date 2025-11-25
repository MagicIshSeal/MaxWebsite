# Quick Setup Instructions

## 1. Set Your Name in Strapi

1. Visit: http://localhost:1337/admin
2. Log in to Strapi
3. Go to: **Content Manager** → **About**
4. Enter your name in the **name** field (e.g., "Max Vane", "John Smith")
5. Click **Save** and **Publish**
6. Your name will automatically appear in the navigation bar as "MAX_VANE" or "JOHN_SMITH"

## 2. Create Your First GitHub Release

### Quick Method:
1. Go to: https://github.com/MagicIshSeal/MaxWebsite
2. Click **Releases** (right sidebar)
3. Click **Create a new release**
4. Fill in:
   - Tag: `v1.0.0`
   - Title: `Version 1.0.0 - Initial Release`
   - Description: Brief notes about this version
5. Click **Publish release**

### Using Command Line:
```powershell
git tag -a v1.0.0 -m "Initial release with Flight Deck theme"
git push origin v1.0.0
```

## 3. Deploy with Version

### Option A: Use the Deploy Script (Easiest)
```powershell
# Automatically uses latest git tag
.\deploy.ps1

# Or specify a version
.\deploy.ps1 -Version "v1.0.0"
```

### Option B: Manual Docker Build
```powershell
# Set version and build
$env:APP_VERSION = "v1.0.0"
docker compose up -d --build
```

### Option C: Auto-detect from Git
```powershell
$env:APP_VERSION = $(git describe --tags --abbrev=0)
docker compose up -d --build
```

## 4. Verify Everything Works

1. **Check Version Display**
   - Visit: http://localhost:3000
   - Scroll to footer
   - Should see: `BUILD: v1.0.0`

2. **Check Your Name**
   - Look at top navigation bar
   - Should see your name from Strapi (e.g., "MAX_VANE")

3. **Check All Services**
   ```powershell
   docker compose ps
   ```
   All containers should show "Up"

## Troubleshooting

### Name Not Showing
- Make sure you published the About content in Strapi (not just saved)
- Rebuild: `docker compose restart frontend`

### Version Shows v1.0.0 (default)
- You didn't set `APP_VERSION` before building
- Rebuild with version: `$env:APP_VERSION = "v1.2.3"; docker compose up -d --build`

### No Git Tags Found
```powershell
# Check existing tags
git tag

# Create first tag
git tag v1.0.0
git push origin v1.0.0
```

## Daily Usage

### Starting Services
```powershell
docker compose up -d
```

### Stopping Services
```powershell
docker compose down
```

### Viewing Logs
```powershell
# All services
docker compose logs -f

# Just frontend
docker compose logs -f frontend

# Just Strapi
docker compose logs -f strapi
```

### Rebuilding After Code Changes
```powershell
.\deploy.ps1
```

## File Structure Reference

```
MaxWebsite/
├── deploy.ps1                        # Deployment script (use this!)
├── GITHUB_RELEASES_SETUP.md         # Detailed version setup guide
├── FLIGHT_DECK_THEME.md            # Theme documentation
├── docker-compose.yml               # Docker configuration
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SystemBar.tsx       # Shows your name from Strapi
│   │   │   └── SystemStatus.tsx    # Shows GitHub release version
│   │   └── app/
│   │       └── layout.tsx           # Fetches name from Strapi
│   └── Dockerfile                   # Contains version build logic
└── cms/                             # Strapi CMS
```

## Next Steps

1. ✅ Add your name in Strapi About section
2. ✅ Create v1.0.0 release on GitHub
3. ✅ Run `.\deploy.ps1` to rebuild with version
4. ✅ Verify name and version display correctly
5. 🎉 Start adding your projects!

---

**Need help?** Check the detailed guides:
- Version setup: `GITHUB_RELEASES_SETUP.md`
- Theme info: `FLIGHT_DECK_THEME.md`
