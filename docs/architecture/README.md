# Nimbly Architecture Guide

This document describes the high-level architecture and design decisions of the Nimbly platform.

## Overview

Nimbly is built as a **modular, cloud-agnostic infrastructure management platform** that provides a unified interface for managing cloud resources across multiple providers.

## Core Principles

### 1. Provider Agnosticism

- Abstract cloud provider differences behind consistent interfaces
- Support multiple cloud providers (AWS, GCP, Azure) through plugins
- Enable easy switching between providers

### 2. State-Driven Architecture

- All operations are modeled as state machines
- Deterministic behavior with clear state transitions
- Audit trails for all state changes

### 3. Cost Awareness

- Built-in cost estimation and monitoring
- Cost optimization recommendations
- Real-time cost tracking

### 4. Developer Experience First

- TypeScript throughout the stack
- Consistent API design patterns
- Comprehensive documentation

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Applications                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Web Dashboard │  │     CLI Tool    │  │   SDK/API   │  │
│  │    (Next.js)    │  │                 │  │             │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────┼───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 Nimbly API Gateway                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │ Authentication  │  │   Rate Limiting │  │  Logging    │  │
│  │   & Authorization│  │                 │  │             │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────┼───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 Core Services Layer                         │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │  Deployments    │  │ Cloud Resources │  │ Monitoring  │  │
│  │ State Machine   │  │   Management    │  │  & Alerting │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   Cost Analysis │  │   User Mgmt     │  │   Teams     │  │
│  │   & Estimation  │  │                 │  │ Management  │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────┼───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│              Cloud Provider Layer                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   AWS Provider  │  │  GCP Provider  │  │Azure Provider│  │
│  │                 │  │                 │  │             │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
│  ┌─────────────────┐                                        │
│  │  Mock Provider  │                                        │
│  │  (Development)  │                                        │
│  └─────────────────┘                                        │
└─────────────────────┼───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                 Cloud Infrastructure                        │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐  │
│  │   AWS Services  │  │  GCP Services  │  │Azure Services│  │
│  │  EC2, S3, RDS   │  │ GCE, GCS, etc  │  │ VMs, Storage │  │
│  └─────────────────┘  └─────────────────┘  └─────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Key Components

### 1. CloudProvider Interface

The `CloudProvider` interface is the cornerstone of Nimbly's architecture:

```typescript
abstract class CloudProvider {
  abstract getName(): string;
  abstract deploy(request: DeploymentRequest): Promise<DeploymentResult>;
  abstract getResourceStatus(resourceId: string): Promise<string>;
  abstract getMetrics(resourceId: string): Promise<ResourceMetrics>;
  abstract estimateCost(
    resourceType: string,
    config: any
  ): Promise<CostEstimate>;
  abstract listResources(): Promise<Resource[]>;
  abstract scaleResource(
    resourceId: string,
    config: any
  ): Promise<DeploymentResult>;
}
```

**Benefits:**

- **Extensibility**: Easy to add new cloud providers
- **Testability**: Mock provider for development
- **Consistency**: Same interface across all providers

### 2. Deployment State Machine

Deployments follow a strict state machine pattern:

```
pending ──────▶ in-progress ──────▶ successful
    ▲                │                    │
    │                ▼                    │
    └───────── failed ◄───────────── rolling-back
                          ▲
                          │
                          ▼
                     rolled-back
```

**Benefits:**

- **Predictability**: Deterministic deployment behavior
- **Error Handling**: Clear failure recovery paths
- **Observability**: Full audit trail of state changes

### 3. Modular Architecture

Nimbly uses NestJS modules for clean separation of concerns:

```
src/modules/
├── auth/              # Authentication & authorization
├── cloud-resources/   # Resource CRUD operations
├── deployments/       # Deployment orchestration
├── monitoring/        # Metrics & alerting
├── billing/           # Cost analysis
├── teams/             # Team management
└── user/              # User management
```

## Data Flow

### Resource Creation Flow

1. **Client Request**: User requests resource creation via API
2. **Validation**: Request validated against business rules
3. **Provider Selection**: Appropriate cloud provider selected
4. **Deployment**: Resource deployed via provider
5. **Persistence**: Resource metadata stored in database
6. **Response**: Success/failure returned to client

### Deployment Flow

1. **Deployment Request**: User initiates deployment
2. **State Transition**: Deployment moves to `in-progress`
3. **Provider Execution**: Cloud provider executes deployment
4. **State Update**: Success/failure state transition
5. **Notification**: Real-time updates sent to client
6. **Audit**: Deployment logged for analysis

## Design Decisions

### TypeScript Everywhere

**Decision**: Use TypeScript throughout the entire stack.

**Rationale**:

- Type safety prevents runtime errors
- Better IDE support and developer experience
- Self-documenting code through types
- Easier refactoring and maintenance

### Abstract Provider Pattern

**Decision**: Use abstract interfaces for cloud providers.

**Rationale**:

- Enables multi-cloud support
- Allows testing with mock providers
- Provides consistent API across providers
- Enables provider-specific optimizations

### State Machine for Complex Operations

**Decision**: Model deployments as state machines.

**Rationale**:

- Complex operations have clear, predictable behavior
- Easy to add new states and transitions
- Built-in error handling and recovery
- Excellent for auditing and debugging

### Monorepo Structure

**Decision**: Use a monorepo with multiple packages.

**Rationale**:

- Shared types and utilities
- Atomic changes across packages
- Simplified dependency management
- Better code sharing between frontend/backend

## Technology Choices

### Backend

- **NestJS**: Enterprise-grade Node.js framework
- **TypeORM**: Type-safe database operations
- **PostgreSQL**: Robust relational database
- **JWT**: Stateless authentication
- **WebSocket**: Real-time communication

### Frontend

- **Next.js**: Full-stack React framework
- **TypeScript**: Type-safe React components
- **Tailwind CSS**: Utility-first styling
- **React Query**: Server state management

### Infrastructure

- **Docker**: Containerized development
- **Docker Compose**: Multi-service orchestration
- **Nginx**: Reverse proxy (production)

## Security Considerations

### Authentication & Authorization

- JWT tokens with expiration
- Role-based access control (RBAC)
- API key authentication for service accounts

### Data Protection

- Input validation and sanitization
- SQL injection prevention via ORM
- Sensitive data encryption at rest

### Network Security

- HTTPS everywhere in production
- Rate limiting on API endpoints
- CORS configuration for web clients

## Performance Considerations

### Caching Strategy

- Redis for session storage
- In-memory caching for frequently accessed data
- CDN for static assets

### Database Optimization

- Connection pooling
- Query optimization with indexes
- Read replicas for analytics

### API Design

- RESTful endpoints with consistent patterns
- Pagination for large result sets
- Compression for response payloads

## Monitoring & Observability

### Application Metrics

- Request/response times
- Error rates by endpoint
- Database query performance
- Memory and CPU usage

### Business Metrics

- Deployment success rates
- Resource utilization
- Cost trends
- User engagement

### Logging

- Structured logging with correlation IDs
- Log aggregation and analysis
- Alerting on critical events

## Deployment Strategy

### Development

- Docker Compose for local development
- Hot reloading for fast iteration
- Mock providers for testing

### Staging

- Infrastructure as Code (Terraform)
- Automated testing pipelines
- Blue/green deployments

### Production

- Kubernetes orchestration
- Multi-region deployment
- Auto-scaling based on load

## Future Considerations

### Scalability

- Microservices architecture for high traffic
- Event-driven architecture for decoupling
- Global CDN for low latency

### Advanced Features

- Machine learning for cost optimization
- AI-powered deployment recommendations
- Integration with CI/CD pipelines

### Ecosystem Growth

- Third-party provider marketplace
- Plugin system for custom integrations
- Multi-tenant architecture for SaaS

## Conclusion

Nimbly's architecture is designed to be **scalable, maintainable, and extensible**. The core abstractions (CloudProvider, State Machine) provide a solid foundation for building a comprehensive infrastructure management platform while remaining flexible enough to adapt to future requirements.

The modular design allows contributors to work on individual components without affecting the entire system, making it ideal for open-source development.
