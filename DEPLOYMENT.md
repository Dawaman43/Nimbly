# Nimbly Deployment Guide

This guide covers deploying Nimbly to production environments.

## Prerequisites

- Docker and Docker Compose installed
- PostgreSQL 15+ database (or managed database service)
- Node.js 20+ (for local development)
- Domain name and SSL certificate (for production)

## Quick Start

### Development

```bash
# Start database
docker-compose up -d db

# Install dependencies
npm install

# Start backend
cd apps/backend && npm run start:dev

# Start frontend (in another terminal)
cd apps/frontend && npm run dev
```

### Production with Docker Compose

1. **Set environment variables:**

```bash
cp apps/backend/.env.example apps/backend/.env
# Edit .env with your production values
```

2. **Start services:**

```bash
docker-compose -f docker-compose.prod.yml up -d
```

3. **Run migrations:**

```bash
docker-compose -f docker-compose.prod.yml exec backend npm run migration:run
```

4. **Verify health:**

```bash
curl http://localhost:4000/api/health
```

## Environment Variables

### Backend (.env)

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your-secure-password
DB_NAME=nimbly

# Server
PORT=4000
NODE_ENV=production
CORS_ORIGINS=https://yourdomain.com

# Security
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
BCRYPT_ROUNDS=12

# Cloud Providers (Optional)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Database Migrations

### Generate Migration

```bash
cd apps/backend
npm run migration:generate -- src/migrations/MigrationName
```

### Run Migrations

```bash
npm run migration:run
```

### Revert Migration

```bash
npm run migration:revert
```

## Docker Deployment

### Build Images

```bash
# Backend
docker build -f apps/backend/Dockerfile -t nimbly-backend:latest .

# Frontend
docker build -f apps/frontend/Dockerfile -t nimbly-frontend:latest .
```

### Run Containers

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Kubernetes Deployment

### Prerequisites

- Kubernetes cluster (1.24+)
- kubectl configured
- Helm 3.x (optional)

### Deploy with Helm

```bash
helm install nimbly ./helm-chart
```

### Manual Deployment

See `k8s/` directory for Kubernetes manifests.

## Cloud Provider Deployments

### AWS (ECS/Fargate)

1. Build and push images to ECR
2. Create ECS task definition
3. Deploy using CloudFormation or Terraform

### Google Cloud Platform (Cloud Run)

```bash
gcloud builds submit --tag gcr.io/PROJECT_ID/nimbly-backend
gcloud run deploy nimbly-backend --image gcr.io/PROJECT_ID/nimbly-backend
```

### Azure (Container Instances)

```bash
az acr build --registry REGISTRY_NAME --image nimbly-backend .
az container create --resource-group RESOURCE_GROUP --name nimbly-backend --image REGISTRY_NAME.azurecr.io/nimbly-backend
```

## Monitoring

### Health Checks

- **Liveness:** `GET /api/health/live`
- **Readiness:** `GET /api/health/ready`
- **Full Health:** `GET /api/health`

### Metrics

- Prometheus metrics available at `/api/metrics` (if enabled)
- Application logs via stdout/stderr

### Recommended Monitoring

- **Application:** Datadog, New Relic, or Sentry
- **Infrastructure:** CloudWatch, Stackdriver, or Azure Monitor
- **Database:** pg_stat_statements, slow query logs

## Security Checklist

- [ ] Change all default passwords
- [ ] Use strong JWT secret (32+ characters)
- [ ] Enable SSL/TLS for all connections
- [ ] Configure CORS properly
- [ ] Set up rate limiting
- [ ] Enable database SSL connections
- [ ] Use secrets management (AWS Secrets Manager, etc.)
- [ ] Regular security updates
- [ ] Enable audit logging
- [ ] Configure firewall rules

## Scaling

### Horizontal Scaling

- Backend: Multiple instances behind load balancer
- Frontend: CDN + multiple instances
- Database: Read replicas for read-heavy workloads

### Vertical Scaling

- Increase container resources
- Optimize database queries
- Add caching layer (Redis)

## Backup & Recovery

### Database Backups

```bash
# Manual backup
pg_dump -h DB_HOST -U DB_USER -d DB_NAME > backup.sql

# Automated backups (recommended)
# Use managed database service with automated backups
```

### Restore

```bash
psql -h DB_HOST -U DB_USER -d DB_NAME < backup.sql
```

## Troubleshooting

### Backend won't start

1. Check database connection
2. Verify environment variables
3. Check logs: `docker logs nimbly-backend`

### Database connection errors

1. Verify DB_HOST, DB_PORT, DB_USER, DB_PASSWORD
2. Check firewall rules
3. Ensure database is accessible

### Frontend API errors

1. Verify NEXT_PUBLIC_API_URL
2. Check CORS configuration
3. Verify backend is running

## Support

For issues and questions:
- GitHub Issues: https://github.com/your-org/nimbly/issues
- Documentation: https://docs.nimbly.dev
- Discord: https://discord.gg/nimbly
