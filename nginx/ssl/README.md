# Nginx SSL Certificate Directory

Place your SSL certificates in this directory:

- `fullchain.pem` - Your SSL certificate chain
- `privkey.pem` - Your SSL private key

## Getting SSL Certificates

### Option 1: Let's Encrypt (Free)

```bash
# Install certbot on your Linux server
sudo apt-get update
sudo apt-get install certbot

# Generate certificates
sudo certbot certonly --standalone -d yourdomain.com -d www.yourdomain.com

# Copy certificates to this directory
sudo cp /etc/letsencrypt/live/yourdomain.com/fullchain.pem ./fullchain.pem
sudo cp /etc/letsencrypt/live/yourdomain.com/privkey.pem ./privkey.pem
```

### Option 2: Self-Signed (Development Only)

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout privkey.pem \
  -out fullchain.pem \
  -subj "/CN=localhost"
```

## Auto-Renewal (Let's Encrypt)

```bash
# Add to crontab
0 0 * * * certbot renew --quiet && docker-compose restart nginx
```
