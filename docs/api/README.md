# Nimbly API Reference

This document provides comprehensive API documentation for the Nimbly platform.

## Base URL

```
http://localhost:4000
```

## Authentication

All API endpoints require authentication using JWT tokens.

```bash
# Include in request headers
Authorization: Bearer YOUR_JWT_TOKEN
```

## Endpoints

### Authentication

#### POST /auth/signup

Register a new user account.

**Request Body:**

```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user-uuid",
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

#### POST /auth/login

Authenticate and receive access token.

**Request Body:**

```json
{
  "username": "johndoe",
  "password": "securepassword"
}
```

**Response:** Same as signup

### Cloud Resources

#### GET /cloud-resources

Get all cloud resources for the authenticated user.

**Response:**

```json
[
  {
    "id": "resource-uuid",
    "name": "my-app-server",
    "type": "EC2",
    "status": "running",
    "cpu": 2,
    "ram": 4,
    "storage": 20,
    "createdAt": "2025-12-31T00:00:00.000Z"
  }
]
```

#### POST /cloud-resources

Create a new cloud resource.

**Request Body:**

```json
{
  "name": "my-new-app",
  "type": "EC2",
  "cpu": 4,
  "ram": 8,
  "storage": 50
}
```

**Response:** Created resource object

#### GET /cloud-resources/:id

Get a specific cloud resource.

**Response:** Resource object

#### GET /cloud-resources/:id/metrics

Get real-time metrics for a resource.

**Response:**

```json
{
  "cpu": 45.2,
  "ram": 67.8,
  "storage": 120.5,
  "networkIn": 1024.5,
  "networkOut": 2048.3,
  "timestamp": "2025-12-31T12:00:00.000Z"
}
```

#### GET /cloud-resources/:id/status

Get the current status of a resource.

**Response:**

```json
{
  "status": "running"
}
```

#### POST /cloud-resources/:id/scale

Scale a resource to new specifications.

**Request Body:**

```json
{
  "cpu": 8,
  "ram": 16,
  "storage": 100
}
```

**Response:** Deployment result

### Deployments

#### GET /deployments

Get all deployments for the authenticated user.

**Response:**

```json
[
  {
    "id": "deployment-uuid",
    "name": "my-app-v1.0.0",
    "resourceId": "resource-uuid",
    "action": "update",
    "status": "successful",
    "version": "v1.0.0",
    "startedAt": "2025-12-31T10:00:00.000Z",
    "completedAt": "2025-12-31T10:02:00.000Z"
  }
]
```

#### POST /deployments

Create a new deployment.

**Request Body:**

```json
{
  "resourceId": "resource-uuid",
  "action": "update",
  "version": "v1.1.0",
  "name": "feature-deployment"
}
```

**Response:** Created deployment object

#### GET /deployments/:id

Get a specific deployment with full details.

**Response:** Deployment object with relations

#### POST /deployments/:id/start

Start a pending deployment.

**Response:** Updated deployment object

#### POST /deployments/:id/retry

Retry a failed deployment.

**Response:** Updated deployment object

#### POST /deployments/:id/rollback

Rollback a successful deployment.

**Response:** Updated deployment object

### Monitoring

#### GET /monitoring/stats

Get system-wide monitoring statistics.

**Response:**

```json
{
  "totalResources": 15,
  "runningResources": 12,
  "totalDeployments": 45,
  "successfulDeployments": 42,
  "failedDeployments": 3,
  "averageDeploymentTime": 120.5
}
```

#### GET /monitoring/logs

Get system logs with optional filtering.

**Query Parameters:**

- `level`: error, warn, info, debug
- `limit`: number of logs to return
- `startDate`: ISO date string
- `endDate`: ISO date string

**Response:**

```json
[
  {
    "timestamp": "2025-12-31T12:00:00.000Z",
    "level": "info",
    "message": "Deployment started",
    "metadata": {
      "deploymentId": "dep-uuid",
      "userId": "user-uuid"
    }
  }
]
```

### Billing

#### GET /billing

Get billing information and cost analysis.

**Response:**

```json
{
  "currentMonth": {
    "totalCost": 245.67,
    "currency": "USD",
    "resources": [
      {
        "resourceId": "resource-uuid",
        "name": "my-app",
        "cost": 45.23,
        "type": "EC2"
      }
    ]
  },
  "forecast": {
    "nextMonth": 289.45,
    "confidence": 0.85
  }
}
```

## Error Responses

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### Common HTTP Status Codes

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `422`: Unprocessable Entity
- `500`: Internal Server Error

## Rate Limiting

API endpoints are rate limited to prevent abuse:

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
```

## WebSocket Events

Real-time updates are available via WebSocket:

```javascript
const ws = new WebSocket("ws://localhost:4000");

// Listen for deployment updates
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  if (data.type === "deployment.update") {
    console.log("Deployment updated:", data.payload);
  }
};
```

### Event Types

- `deployment.created`
- `deployment.started`
- `deployment.completed`
- `deployment.failed`
- `resource.created`
- `resource.updated`
- `resource.metrics`

## SDKs and Libraries

### JavaScript/TypeScript

```bash
npm install @nimbly/sdk
```

```typescript
import { NimblyClient } from "@nimbly/sdk";

const client = new NimblyClient({
  apiKey: "your-api-key",
  baseUrl: "http://localhost:4000",
});

// Create a resource
const resource = await client.resources.create({
  name: "my-app",
  type: "EC2",
  cpu: 2,
  ram: 4,
});

// Deploy it
const deployment = await client.deployments.create({
  resourceId: resource.id,
  action: "update",
  version: "v1.0.0",
});
```

## Versioning

API versioning follows semantic versioning:

- **Breaking changes**: New major version (v2, v3, etc.)
- **New features**: Minor version bump
- **Bug fixes**: Patch version bump

Current version: **v1.0.0**

## Support

- **Documentation**: https://docs.nimbly.dev
- **GitHub Issues**: https://github.com/your-org/nimbly/issues
- **Discord**: https://discord.gg/nimbly
- **Email**: support@nimbly.dev
