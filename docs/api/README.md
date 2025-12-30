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

### Cost Estimation

Nimbly provides intelligent cost estimation and optimization recommendations to help you manage cloud infrastructure costs effectively.

#### POST /cost-estimation/estimate

Estimate the cost of deploying specific resources.

**Request Body:**

```json
{
  "resources": [
    {
      "type": "EC2",
      "cpu": 2,
      "ram": 4,
      "storage": 100,
      "region": "us-east-1",
      "hoursPerMonth": 730
    }
  ],
  "currency": "USD"
}
```

**Response:**

```json
{
  "totalCost": 145.67,
  "currency": "USD",
  "breakdown": [
    {
      "resourceType": "EC2",
      "cost": 145.67,
      "components": [
        {
          "name": "Compute (t3.medium)",
          "cost": 120.45,
          "unit": "hour",
          "quantity": 730
        },
        {
          "name": "Storage (gp3)",
          "cost": 25.22,
          "unit": "GB-month",
          "quantity": 100
        }
      ]
    }
  ],
  "optimizations": [
    {
      "type": "instance-type",
      "description": "Consider using t3.small for 40% cost savings",
      "potentialSavings": 58.27,
      "confidence": 0.85
    }
  ]
}
```

#### POST /cost-estimation/analysis

Analyze current resource usage and provide cost optimization recommendations.

**Request Body:**

```json
{
  "userId": "user-uuid",
  "timeRange": {
    "start": "2024-01-01T00:00:00.000Z",
    "end": "2024-01-31T23:59:59.999Z"
  },
  "includeOptimizations": true
}
```

**Response:**

```json
{
  "totalCost": 1245.67,
  "currency": "USD",
  "resources": [
    {
      "resourceId": "resource-uuid",
      "name": "web-server",
      "type": "EC2",
      "cost": 345.23,
      "utilization": 0.65,
      "efficiency": "under-utilized"
    }
  ],
  "optimizations": [
    {
      "resourceId": "resource-uuid",
      "type": "rightsizing",
      "description": "Downsize EC2 instance from t3.large to t3.medium",
      "potentialSavings": 120.45,
      "confidence": 0.92,
      "implementation": "manual"
    },
    {
      "resourceId": "resource-uuid",
      "type": "reserved-instance",
      "description": "Purchase reserved instance for 1-year term",
      "potentialSavings": 89.3,
      "confidence": 0.78,
      "implementation": "automated"
    }
  ],
  "trends": {
    "growthRate": 0.12,
    "forecast": 1456.78,
    "anomalies": []
  }
}
```

#### POST /cost-estimation/forecast

Forecast future costs based on current usage patterns and planned changes.

**Request Body:**

```json
{
  "userId": "user-uuid",
  "forecastPeriod": 3,
  "plannedChanges": [
    {
      "type": "scale-up",
      "resourceType": "EC2",
      "count": 2,
      "effectiveDate": "2024-02-01T00:00:00.000Z"
    }
  ],
  "confidence": 0.85
}
```

**Response:**

```json
{
  "forecast": [
    {
      "month": "2024-02",
      "cost": 1456.78,
      "confidence": 0.85,
      "range": {
        "low": 1320.45,
        "high": 1592.12
      }
    },
    {
      "month": "2024-03",
      "cost": 1689.34,
      "confidence": 0.82,
      "range": {
        "low": 1520.67,
        "high": 1857.89
      }
    },
    {
      "month": "2024-04",
      "cost": 1923.45,
      "confidence": 0.78,
      "range": {
        "low": 1720.12,
        "high": 2126.78
      }
    }
  ],
  "totalForecast": 5069.57,
  "assumptions": [
    "Current usage patterns continue",
    "No additional optimizations applied",
    "Planned scaling effective Feb 1st"
  ],
  "recommendations": [
    {
      "action": "implement-optimizations",
      "description": "Apply recommended optimizations to reduce forecast by 15%",
      "impact": -760.34
    }
  ]
}
```

#### GET /cost-estimation/providers

Get available cloud providers and their cost data freshness.

**Response:**

```json
[
  {
    "provider": "aws",
    "name": "Amazon Web Services",
    "lastUpdated": "2024-01-15T10:30:00.000Z",
    "regions": ["us-east-1", "us-west-2", "eu-west-1"],
    "supportedServices": ["EC2", "RDS", "S3", "Lambda"]
  },
  {
    "provider": "mock",
    "name": "Mock Provider",
    "lastUpdated": "2024-01-15T10:30:00.000Z",
    "regions": ["us-east-1"],
    "supportedServices": ["EC2", "RDS"]
  }
]
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
