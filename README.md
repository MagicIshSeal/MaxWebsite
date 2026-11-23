# Personal Portfolio Website

A self-hosted personal portfolio website with a headless CMS for managing content without code changes. Built with Next.js, Strapi CMS, PostgreSQL, and Docker.

## 🚀 Features

- **Content Management System (CMS)** - Manage all content through Strapi's admin panel
- **No Code Changes Required** - Add/edit projects, experience, and about section via web interface
- **Project Detail Pages** - Click any project to view full details with image gallery
- **3D Model Viewer** - Upload and display interactive 3D models (.glb, .gltf)
- **Multiple Images** - Upload multiple photos per project with responsive gallery
- **Rich Text Support** - Format descriptions with headings, lists, links, and more
- **Self-Hosted** - Full control, deploy on your own Linux server
- **Docker-Based** - Easy deployment and management
- **Responsive Design** - Mobile-friendly interface with dark theme
- **SEO Optimized** - Built with Next.js for optimal performance

## 📋 Prerequisites

- Linux server with:
  - Docker & Docker Compose installed
  - At least 2GB RAM
  - 10GB storage
  - Open ports: 80, 443, 1337, 3000

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 (React), TailwindCSS, TypeScript
- **CMS**: Strapi 4.x (Headless CMS)
- **Database**: PostgreSQL 15
- **Proxy**: Nginx (for production)
- **Infrastructure**: Docker & Docker Compose

## 📦 Project Structure

```
MaxWebsite/
├── docker-compose.yml          # Docker orchestration
├── .env.example                # Environment variables template
├── frontend/                   # Next.js website
│   ├── Dockerfile
│   ├── src/
│   │   ├── app/               # Next.js App Router
│   │   ├── components/        # React components
│   │   └── lib/               # API integration
│   └── package.json
├── cms/                        # Strapi CMS
│   ├── Dockerfile
│   ├── config/                # Strapi configuration
│   ├── src/api/               # Content types
│   │   ├── project/           # Projects content type
│   │   ├── experience/        # Experience content type
│   │   └── about/             # About content type
│   └── package.json
└── nginx/                      # Reverse proxy
    ├── nginx.conf
    └── ssl/                    # SSL certificates
```

## 🚀 Quick Start

### 1. Initial Setup

```bash
# Clone or navigate to the project
cd MaxWebsite

# Copy environment variables
cp .env.example .env

# Edit .env with your settings
nano .env
```

### 2. Generate Secure Secrets

**IMPORTANT**: Change these values in `.env` for production:

```bash
# Generate random secrets (Linux/Mac)
openssl rand -base64 32  # Use for JWT_SECRET
openssl rand -base64 32  # Use for ADMIN_JWT_SECRET
openssl rand -base64 32  # Use for API_TOKEN_SALT
openssl rand -base64 32  # Use for TRANSFER_TOKEN_SALT

# For APP_KEYS, generate 4 secrets separated by commas
```

Update your `.env` file with these generated secrets.

### 3. Development Mode (Local Testing)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access URLs:**
- Website: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin
- PostgreSQL: internal only (not published)

### 4. Production Deployment

#### A. Update Environment Variables

Edit `.env`:
```env
NODE_ENV=production
NEXT_PUBLIC_STRAPI_URL=https://yourdomain.com
DOMAIN=yourdomain.com
```

#### B. Setup SSL Certificates

```bash
# Option 1: Let's Encrypt (Recommended)
sudo apt-get update
sudo apt-get install certbot

# Generate certificates
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy to project
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem nginx/ssl/

# Option 2: Self-Signed (Dev/Testing only)
cd nginx/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout privkey.pem -out fullchain.pem \
  -subj "/CN=yourdomain.com"
cd ../..
```

#### C. Deploy with Nginx

```bash
# Start with production profile
docker-compose --profile production up -d

# Or update docker-compose.yml and remove profiles from nginx service
```

**Access URLs:**
- Website: https://yourdomain.com
- Strapi Admin: https://yourdomain.com/admin

## 🎨 First Time Setup

### 1. Create Strapi Admin Account

1. Navigate to http://localhost:1337/admin (or your domain)
2. Create your admin account (first user is admin)
3. Login to the admin panel

### 2. Configure API Permissions

**IMPORTANT**: Make API publicly accessible:

1. Go to **Settings** → **Users & Permissions** → **Roles** → **Public**
2. Enable permissions for:
   - **About**: `find`
   - **Project**: `find` and `findOne`
   - **Experience**: `find` and `findOne`
3. Click **Save**

### 3. Add Content

#### Add About Information

1. Go to **Content Manager** → **About** (Single Type)
2. Fill in:
   - Name
   - Tagline
   - Bio (supports rich text)
   - Email, Phone, Location
   - Profile Image (upload)
   - Social Links (JSON format):
     ```json
     {
       "github": "https://github.com/yourusername",
       "linkedin": "https://linkedin.com/in/yourusername",
       "twitter": "https://twitter.com/yourusername"
     }
     ```
   - Skills (JSON array):
     ```json
     ["JavaScript", "Python", "Docker", "React", "Node.js"]
     ```
3. Click **Save** and **Publish**

#### Add Projects

1. Go to **Content Manager** → **Projects**
2. Click **Create new entry**
3. Fill in:
   - **Title** - Project name
   - **Description** - Short description (shown on homepage cards)
   - **Long Description** - Full project details (supports formatting, shown on detail page)
   - **Type**: personal/school/professional
   - **Technologies** (JSON array): `["React", "Node.js", "Docker"]`
   - **Start Date** / **End Date**
   - **Is Ongoing** - Check if project is still active
   - **Featured** - Check to highlight on homepage
   - **Images** - Upload multiple images (first image shown on card, all shown in gallery)
   - **Model3d** - Upload 3D model file (.glb or .gltf) for interactive viewer
   - **GitHub URL** - Link to source code
   - **Live URL** - Link to live demo/website
   - **Order** - Number for sorting (lower = shown first)
4. Click **Save** and **Publish**
5. **View Details**: Click the project card on your website to see the full detail page

##### 🎨 Uploading 3D Models

The project detail page supports interactive 3D model viewing!

**Supported Formats:**
- `.glb` (recommended) - Binary glTF format
- `.gltf` - Text-based glTF with separate assets

**How to Get 3D Models:**

From **Fusion 360**:
1. File → Export → Save as `.obj`
2. Convert to `.glb` using: https://products.aspose.app/3d/conversion/obj-to-glb
3. Upload the `.glb` file to Strapi

From **Blender**:
1. File → Export → glTF 2.0 (.glb)
2. Upload directly to Strapi

From **Tinkercad**:
1. Export as `.obj`
2. Convert to `.glb` using online converter
3. Upload to Strapi

**3D Viewer Controls:**
- **Click + Drag** to rotate
- **Scroll** to zoom
- **Two fingers (mobile)** to pan and rotate
- **Auto-rotate** when idle

**Note**: The 3D model section only appears if you upload a model - otherwise it's hidden.

6. Repeat for each project

#### Add Experience

1. Go to **Content Manager** → **Experiences**
2. Click **Create new entry**
3. Fill in:
   - Title (Job title or degree)
   - Company (Company or school name)
   - Location
   - Type: work/education/volunteer
   - Description (rich text - your responsibilities)
   - Start Date
   - End Date (leave empty if current)
   - Is Current (checkbox)
   - Skills (JSON array): `["JavaScript", "Leadership", "Project Management"]`
   - Logo (company/school logo image)
   - Order (for sorting)
4. Click **Save** and **Publish**
5. Repeat for each experience

### 4. View Your Website

Visit http://localhost:3000 (or your domain) to see your portfolio!

## 📝 Updating Content

**No code changes needed!** Just:

1. Login to Strapi admin panel
2. Edit your content
3. Click **Save** and **Publish**
4. Changes appear on website within 60 seconds (cache revalidation)

## 🔧 Common Commands

```bash
# View all running containers
docker ps

# View logs for specific service
docker-compose logs -f max_frontend
docker-compose logs -f max_strapi
docker-compose logs -f max_postgres

# Restart specific service
docker-compose restart strapi
docker-compose restart frontend

# Rebuild after code changes
docker-compose up -d --build

# Stop everything
docker-compose down

# Stop and remove volumes (WARNING: deletes database)
docker-compose down -v

# Access container shell
docker exec -it portfolio_cms sh
docker exec -it portfolio_frontend sh

# Backup database
docker exec portfolio_db pg_dump -U strapi strapi_db > backup.sql

# Restore database
docker exec -i portfolio_db psql -U strapi strapi_db < backup.sql
```

## 🔒 Security Best Practices

1. **Change all secrets in `.env`** - Never use default values in production
2. **Use strong passwords** - For database and Strapi admin
3. **Enable firewall** - Only expose necessary ports (80, 443)
4. **Setup SSL** - Use Let's Encrypt for free SSL certificates
5. **Regular backups** - Backup database and uploaded media
6. **Keep updated** - Update Docker images regularly

```bash
# Update all services
docker-compose pull
docker-compose up -d
```

## 🐛 Troubleshooting

### Strapi won't start

```bash
# Check logs
docker-compose logs strapi

# Common fix: Clear and rebuild
docker-compose down -v
docker-compose up -d --build
```

### Frontend can't connect to Strapi

1. Check `NEXT_PUBLIC_STRAPI_URL` in `.env`
2. Verify API permissions in Strapi (Public role)
3. Check network: `docker-compose exec frontend ping strapi`

### Database connection issues

```bash
# Check PostgreSQL is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Reset database (WARNING: deletes data)
docker-compose down -v
docker-compose up -d
```

### Port already in use

```bash
# Find what's using the port
sudo lsof -i :3000
sudo lsof -i :1337

# Kill the process or change port in docker-compose.yml
```

## 📊 Monitoring

```bash
# View resource usage
docker stats

# View disk usage
docker system df

# Clean up unused resources
docker system prune -a
```

## 🔄 Updates & Maintenance

### Updating Strapi

```bash
# Edit cms/package.json - update version numbers
# Rebuild
docker-compose up -d --build cms
```

### Updating Next.js

```bash
# Edit frontend/package.json - update version numbers
# Rebuild
docker-compose up -d --build frontend
```

### Auto-Renewal SSL (Let's Encrypt)

```bash
# Add to crontab
crontab -e

# Add this line:
0 0 1 * * certbot renew --quiet && cd /path/to/MaxWebsite && docker-compose restart nginx
```

## 📱 Customization

### Change Colors

Edit `frontend/tailwind.config.js` - modify the `primary` color palette.

### Add New Content Types

1. In Strapi admin: **Content-Type Builder** → **Create new collection type**
2. Add fields as needed
3. Update API permissions (Settings → Roles → Public)
4. Create API calls in `frontend/src/lib/api.ts`
5. Add components to display the content

### Modify Layout

Edit files in `frontend/src/components/` and `frontend/src/app/`.

## 🌐 Domain Configuration

Point your domain to your server:

1. Add A record: `yourdomain.com` → `your.server.ip`
2. Add A record: `www.yourdomain.com` → `your.server.ip`
3. Wait for DNS propagation (up to 48 hours)
4. Setup SSL certificates (see Production Deployment section)

## 💾 Backup Strategy

### Automated Backup Script

Create `backup.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/path/to/backups"

# Backup database
docker exec portfolio_db pg_dump -U strapi strapi_db > "$BACKUP_DIR/db_$DATE.sql"

# Backup uploaded files
docker cp portfolio_cms:/app/public/uploads "$BACKUP_DIR/uploads_$DATE"

# Keep only last 7 days
find "$BACKUP_DIR" -name "db_*.sql" -mtime +7 -delete
find "$BACKUP_DIR" -name "uploads_*" -mtime +7 -delete
```

Add to crontab: `0 2 * * * /path/to/backup.sh`

## 📄 License

MIT License - Feel free to use for your personal portfolio!

## 🤝 Support

If you encounter issues:

1. Check the logs: `docker-compose logs`
2. Review this README
3. Check Strapi documentation: https://docs.strapi.io
4. Check Next.js documentation: https://nextjs.org/docs

## ⚡ Performance Tips

1. **Enable caching** - Already configured (60s revalidation)
2. **Optimize images** - Upload reasonable sizes to Strapi
3. **Use CDN** - Consider Cloudflare for static assets
4. **Monitor resources** - Use `docker stats` to watch usage

## 🎯 Next Steps

After setup:

1. ✅ Create admin account
2. ✅ Configure API permissions  
3. ✅ Add your content (About, Projects, Experience)
4. ✅ Test website locally
5. ✅ Setup domain and SSL
6. ✅ Deploy to production
7. ✅ Setup automated backups
8. ✅ Share your portfolio!

---

**Built with ❤️ using Next.js, Strapi, and Docker**


## Hosting on GitHub Pages (static export)

The live site is a static export deployed by `.github/workflows/deploy.yml` on every push to `main`
(Settings → Pages → Source: GitHub Actions). It reads the content snapshot in `frontend/content/` and
`frontend/public/content/media/`, so Strapi is only needed locally.

Updating content:

```bash
docker compose up -d                 # start Strapi + Postgres, edit at http://localhost:1337/admin
cd frontend && npm run export-content  # snapshot content + media (Public role needs find/findOne)
git add -A && git commit -m "Update content" && git push
```

Local preview against live Strapi: `USE_STRAPI=1 npm run dev` in `frontend/`.
