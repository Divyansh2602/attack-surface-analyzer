# CivicShield AI Frontend - Deployment Guide

Complete guide for deploying the frontend to production.

## Deployment Options

Choose one of the following based on your infrastructure:

1. **Vercel** (Easiest, Recommended)
2. **Docker**
3. **Traditional VPS/Server**
4. **AWS/Google Cloud/Azure**

---

## Option 1: Vercel (Recommended)

### Prerequisites
- GitHub account with repository
- Vercel account (free tier available)

### Steps

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add CivicShield AI frontend"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add: `NEXT_PUBLIC_API_URL` = `https://api.yourdomain.com`
   - Add for each environment (Production, Preview, Development)

4. **Deploy**
   - Click "Deploy"
   - Vercel automatically builds and deploys
   - URL provided (e.g., `civicshield-frontend.vercel.app`)

5. **Custom Domain** (Optional)
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Vercel Environment Variables

```
Production:
  NEXT_PUBLIC_API_URL=https://api.yourdomain.com

Preview:
  NEXT_PUBLIC_API_URL=https://api-staging.yourdomain.com

Development:
  NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Auto-Deploy
- Vercel automatically deploys on every push to `main`
- Preview deployments created for pull requests
- Rollback available via Vercel dashboard

---

## Option 2: Docker

### Prerequisites
- Docker and Docker Compose installed
- Docker Hub account (optional, for private registry)

### Build Docker Image

```bash
# Build image
docker build -t civicshield-frontend:latest .

# Tag for Docker Hub (optional)
docker tag civicshield-frontend:latest yourusername/civicshield-frontend:latest

# Push to Docker Hub (optional)
docker push yourusername/civicshield-frontend:latest
```

### Run with Docker

```bash
# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.yourdomain.com \
  civicshield-frontend:latest

# With custom name
docker run -d \
  --name civicshield \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.yourdomain.com \
  civicshield-frontend:latest
```

### Docker Compose

Complete setup with backend:

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Docker Environment File

Create `.env.docker`:
```
NEXT_PUBLIC_API_URL=http://backend:8000
NODE_ENV=production
```

Then run:
```bash
docker run --env-file .env.docker -p 3000:3000 civicshield-frontend:latest
```

### Dockerfile Explained

```dockerfile
# Build stage: Compiles Next.js
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci                    # Clean install
COPY . .
RUN npm run build             # Build Next.js

# Production stage: Minimal runtime
FROM node:18-alpine
WORKDIR /app
RUN apk add --no-cache dumb-init  # Signal handler
COPY package*.json ./
RUN npm ci --only=production  # Production dependencies only
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["npm", "start"]
```

---

## Option 3: Traditional VPS/Server

### Prerequisites
- VPS with Node.js 18+ installed
- Ubuntu/Debian recommended
- SSH access to server
- Domain name with DNS access

### Setup Steps

1. **Connect to Server**
   ```bash
   ssh root@your-server-ip
   ```

2. **Install Dependencies**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade -y

   # Install Node.js (if not already installed)
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt install -y nodejs

   # Install Nginx (reverse proxy)
   sudo apt install -y nginx

   # Install PM2 (process manager)
   sudo npm install -g pm2
   ```

3. **Clone Repository**
   ```bash
   cd /home/ubuntu
   git clone https://github.com/yourusername/attack-surface-analyzer.git
   cd attack-surface-analyzer
   ```

4. **Install Project Dependencies**
   ```bash
   npm install
   npm run build
   ```

5. **Configure Environment**
   ```bash
   echo "NEXT_PUBLIC_API_URL=https://api.yourdomain.com" > .env.production.local
   ```

6. **Start with PM2**
   ```bash
   pm2 start "npm start" --name "civicshield-frontend"
   pm2 save
   pm2 startup
   ```

7. **Configure Nginx**

   Create `/etc/nginx/sites-available/civicshield`:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/civicshield /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

8. **SSL with Let's Encrypt**
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

9. **Update Firewall**
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

### Maintenance Commands

```bash
# Check status
pm2 status

# View logs
pm2 logs civicshield-frontend

# Restart
pm2 restart civicshield-frontend

# Update code
cd /home/ubuntu/attack-surface-analyzer
git pull
npm install
npm run build
pm2 restart civicshield-frontend
```

---

## Option 4: Cloud Platforms

### AWS EC2

```bash
# Launch EC2 instance (Ubuntu 22.04)
# Connect via SSH
ssh -i your-key.pem ubuntu@your-instance-ip

# Follow "Traditional VPS" steps above
# Also set up AWS RDS for database if needed
```

### Google Cloud Run

```bash
# Ensure Dockerfile is present
# Deploy with gcloud
gcloud run deploy civicshield-frontend \
  --source . \
  --platform managed \
  --region us-central1 \
  --set-env-vars NEXT_PUBLIC_API_URL=https://api.yourdomain.com

# Get URL
gcloud run services describe civicshield-frontend --region us-central1
```

### Azure App Service

```bash
# Create resource group
az group create --name civicshield-rg --location eastus

# Create App Service plan
az appservice plan create --name civicshield-plan \
  --resource-group civicshield-rg --sku B1 --is-linux

# Deploy from Docker
az webapp create --resource-group civicshield-rg \
  --plan civicshield-plan --name civicshield-frontend \
  --deployment-container-image-name yourusername/civicshield-frontend:latest
```

---

## Environment Configuration

### Production Settings

```env
# .env.production.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NODE_ENV=production
```

### Staging Settings

```env
# .env.staging.local
NEXT_PUBLIC_API_URL=https://api-staging.yourdomain.com
NODE_ENV=production
```

---

## Performance Optimization

### Enable Compression

**Nginx**:
```nginx
gzip on;
gzip_types text/plain text/css text/javascript application/json;
gzip_min_length 1000;
```

### Cache Static Assets

**Nginx**:
```nginx
location /_next/static/ {
    expires 365d;
    add_header Cache-Control "public, immutable";
}

location /public/ {
    expires 7d;
    add_header Cache-Control "public";
}
```

### Database Connection Pooling

If using PostgreSQL, enable connection pooling with PgBouncer.

---

## Monitoring & Logging

### Vercel Monitoring
- Built-in analytics in Vercel dashboard
- Real-time logs available
- Error tracking with Sentry integration

### PM2 Monitoring
```bash
# Install PM2 Plus (monitoring)
pm2 plus

# View dashboard at app.pm2.io
```

### Nginx Logs
```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs
tail -f /var/log/nginx/error.log
```

---

## Deployment Checklist

Before deploying to production:

- [ ] Environment variables configured correctly
- [ ] Backend API URL is correct
- [ ] Database migrations run (if applicable)
- [ ] SSL certificate installed
- [ ] Backup plan in place
- [ ] Monitoring configured
- [ ] Error tracking set up (Sentry, etc.)
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Firewall rules in place
- [ ] Load balancer configured (if needed)
- [ ] CDN configured (if using)
- [ ] Health checks set up
- [ ] Logging configured
- [ ] Tested login/register flow
- [ ] Tested scan functionality
- [ ] Tested all pages load correctly
- [ ] Tested API integration
- [ ] Performance tested
- [ ] Security audit completed

---

## Rollback Procedure

### Vercel
- Vercel dashboard → Deployments
- Click previous deployment
- Click "Promote to Production"

### Docker/PM2
```bash
# Revert to previous version
git revert HEAD
npm install
npm run build
pm2 restart civicshield-frontend
```

### Traditional Server
```bash
# Via git
git reset --hard HEAD~1
npm install
npm run build
systemctl restart nginx
```

---

## Troubleshooting

### 502 Bad Gateway
- Backend is down or not responding
- Check backend status
- Restart Next.js application

### CORS Error in Production
- Backend CORS configuration missing
- Add production domain to CORS allowed origins

### Slow Performance
- Check CPU/memory usage
- Enable caching
- Use CDN for static assets
- Optimize database queries

### SSL Certificate Error
- Certificate expired: renew with certbot
- Wrong domain: check certificate matches domain

---

## Security Considerations

1. **HTTPS Only**: Always use SSL/TLS
2. **CORS**: Properly configure CORS headers
3. **Environment Variables**: Never commit secrets
4. **Firewalls**: Restrict access to necessary ports only
5. **Updates**: Keep dependencies updated
6. **Monitoring**: Set up alerting for errors
7. **Backups**: Regular backups of database
8. **Logs**: Monitor and archive logs

---

## Scaling

### Horizontal Scaling
- Multiple instances behind load balancer
- Sticky sessions if needed
- Shared database for state

### Vertical Scaling
- Upgrade server resources
- Optimize code
- Use caching layers (Redis)

---

## Support

For deployment issues:
1. Check relevant documentation
2. Review logs for error messages
3. Check deployment platform documentation
4. Contact platform support

---

**Last Updated**: 2026-03-09

**Recommended**: Vercel for easiest deployment
