# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Setup Environment

```bash
cd MaxWebsite
cp .env.example .env
```

### 2. Start Services

```bash
docker-compose up -d
```

Wait 2-3 minutes for services to initialize.

### 3. Create Admin Account

1. Open browser: http://localhost:1337/admin
2. Create admin account
3. Login

### 4. Configure API Access

1. Go to: **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Enable:
   - About: `find`
   - Project: `find`, `findOne`
   - Experience: `find`, `findOne`
3. Click **Save**

### 5. Add Your Content

#### About Section
**Content Manager** → **About**
- Add name, tagline, bio
- Upload profile image
- Add social links (JSON):
  ```json
  {
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username"
  }
  ```
- **Save & Publish**

#### Add a Project
**Content Manager** → **Projects** → **Create new entry**
- Title: "My Awesome Project"
- Description: Short description
- Type: personal/school/professional
- Technologies: `["React", "Node.js"]`
- Add GitHub/Live URLs
- Upload images
- **Save & Publish**

#### Add Experience
**Content Manager** → **Experiences** → **Create new entry**
- Title: "Software Engineer"
- Company: "Tech Corp"
- Type: work/education/volunteer
- Description: What you did
- Dates: Start and End (or check "Is Current")
- **Save & Publish**

### 6. View Website

Open: http://localhost:3000

Done! 🎉

## 📝 To Update Content Later

1. Go to http://localhost:1337/admin
2. Edit your content
3. Click **Save & Publish**
4. Refresh website (changes appear in 60 seconds)

## 🌐 Deploy to Production

See main README.md for full production deployment guide.

### Quick Production Steps:

1. Update `.env`:
   ```env
   NEXT_PUBLIC_STRAPI_URL=https://yourdomain.com
   ```

2. Setup SSL certificates (Let's Encrypt recommended)

3. Start with production profile:
   ```bash
   docker-compose --profile production up -d
   ```

4. Access at: https://yourdomain.com

## 🆘 Need Help?

- Can't access admin? Wait 2-3 minutes for Strapi to initialize
- 404 errors? Check API permissions (Step 4)
- Port conflicts? Change ports in `docker-compose.yml`
- Full documentation: See main `README.md`

## Common Commands

```bash
# View logs
docker-compose logs -f

# Restart
docker-compose restart

# Stop
docker-compose down

# Rebuild
docker-compose up -d --build
```
