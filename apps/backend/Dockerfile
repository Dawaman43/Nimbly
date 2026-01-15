# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY libs/shared-types/package*.json ./libs/shared-types/

# Install dependencies
RUN npm ci --workspace=apps/backend

# Copy source code
COPY . .

# Build the application
RUN npm run build --workspace=apps/backend

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/
COPY libs/shared-types/package*.json ./libs/shared-types/

# Install production dependencies only
RUN npm ci --workspace=apps/backend --omit=dev

# Copy built application
COPY --from=builder /app/apps/backend/dist ./dist
COPY --from=builder /app/libs ./libs

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

USER nestjs

EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "dist/main"]
