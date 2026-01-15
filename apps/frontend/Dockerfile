# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/frontend/package*.json ./apps/frontend/
COPY libs/shared-types/package*.json ./libs/shared-types/

# Install dependencies
RUN npm ci --workspace=apps/frontend

# Copy source code
COPY . .

# Build the application
RUN npm run build --workspace=apps/frontend

# Production stage
FROM node:20-alpine AS production

WORKDIR /app

# Copy package files
COPY apps/frontend/package*.json ./

# Install production dependencies only
RUN npm ci --workspace=apps/frontend --omit=dev

# Copy built application
COPY --from=builder /app/apps/frontend/.next ./.next
COPY --from=builder /app/apps/frontend/public ./public
COPY --from=builder /app/apps/frontend/next.config.ts ./
COPY --from=builder /app/apps/frontend/package.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

USER nextjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node_modules/.bin/next", "start"]
