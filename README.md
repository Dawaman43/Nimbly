# Nimbly

> An opinionated infrastructure platform that defines how cloud deployments should work, not how vendors force them to work.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-blue.svg)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10+-red.svg)](https://nestjs.com/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.com/)

## 🔥 The Problem

Cloud infrastructure is broken:

- **YAML Hell**: Thousands of lines of vendor-specific configuration
- **Cost Blindness**: No visibility into what you're actually spending
- **Fragile Deployments**: One wrong click and your production is down
- **Vendor Lock-in**: Trapped in proprietary ecosystems
- **Slow Iteration**: Days to deploy what should take minutes

**Everyone hates this. Everyone wants better.**

## 🚀 The Solution

Nimbly is an **abstraction layer** that defines how infrastructure should work:

- **Provider-Agnostic**: Works with AWS, GCP, Azure, or any cloud
- **Cost-Aware**: Built-in cost estimation and optimization
- **Self-Healing**: Automatic rollback and recovery
- **Developer-First**: APIs that make sense to engineers
- **Observable**: Real-time monitoring and alerting

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Nimbly API    │    │  Cloud Providers │    │   Real Clouds   │
│                 │    │                  │    │                 │
│ • Deployments   │◄──►│ • AWS Provider   │◄──►│ • EC2, S3, RDS │
│ • Resources     │    │ • GCP Provider   │    │ • GCE, GCS      │
│ • Monitoring    │    │ • Azure Provider │    │ • VMs, Storage  │
│ • Cost Analysis │    │ • Mock Provider  │    │ • Mock Services │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Core Abstractions

- **`CloudProvider`**: Abstract interface for any cloud platform
- **`DeploymentStateMachine`**: Manages deployment lifecycles
- **`CostEstimator`**: Intelligent cost calculation and optimization
- **`ResourceManager`**: Unified resource lifecycle management

## 🎯 What Makes Nimbly Different

| Feature                  | Nimbly | Terraform | CloudFormation | Pulumi |
| ------------------------ | ------ | --------- | -------------- | ------ |
| **Provider-Agnostic**    | ✅     | ❌        | ❌             | ✅     |
| **Cost Estimation**      | ✅     | ❌        | ❌             | ❌     |
| **State Machine**        | ✅     | ❌        | ❌             | ❌     |
| **Self-Healing**         | ✅     | ❌        | ❌             | ❌     |
| **Real-time Monitoring** | ✅     | ❌        | ❌             | ❌     |
| **TypeScript Native**    | ✅     | ❌        | ❌             | ✅     |

## 📦 Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/nimbly.git
cd nimbly

# Install dependencies
npm install

# Start the database
docker-compose up -d postgres

# Start the development environment
npm run dev
```

### Configuration

Nimbly supports multiple cloud providers. Configure your provider using environment variables:

#### Mock Provider (Default)

```bash
# No configuration needed - works out of the box
CLOUD_PROVIDER=mock
```

#### AWS Provider

```bash
# Set environment variables
export CLOUD_PROVIDER=aws
export AWS_REGION=us-east-1
export AWS_ACCESS_KEY_ID=your-access-key
export AWS_SECRET_ACCESS_KEY=your-secret-key
export AWS_SESSION_TOKEN=your-session-token  # Optional
```

#### Docker Environment

```bash
# Using docker-compose.override.yml
version: '3.8'
services:
  backend:
    environment:
      - CLOUD_PROVIDER=aws
      - AWS_REGION=us-east-1
      - AWS_ACCESS_KEY_ID=your-access-key
      - AWS_SECRET_ACCESS_KEY=your-secret-key
```

### First Deployment

```bash
# Create a resource
curl -X POST http://localhost:4000/cloud-resources \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-app",
    "type": "EC2",
    "cpu": 2,
    "ram": 4,
    "storage": 20
  }'

# Deploy it
curl -X POST http://localhost:4000/deployments \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resourceId": "RESOURCE_ID",
    "action": "update",
    "version": "v1.0.0"
  }'
```

## 🛠️ Development

### Project Structure

```
nimbly/
├── apps/
│   ├── backend/          # NestJS API server
│   └── frontend/         # Next.js dashboard
├── libs/
│   ├── shared-types/     # TypeScript interfaces
│   └── utils/           # Shared utilities
└── docker-compose.yml   # Development environment
```

### Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:backend      # Start only backend
npm run dev:frontend     # Start only frontend

# Building
npm run build            # Build all packages
npm run build:backend    # Build backend only
npm run build:frontend   # Build frontend only

# Testing
npm test                 # Run all tests
npm run test:backend     # Run backend tests
npm run test:frontend    # Run frontend tests

# Database
npm run db:migrate       # Run database migrations
npm run db:seed          # Seed development data
```

## 🤝 Contributing

### How to Contribute

1. **Fork the repository**
2. **Choose an issue** from our [contributing guide](CONTRIBUTING.md)
3. **Implement your feature** following our patterns
4. **Add tests** and ensure they pass
5. **Submit a pull request**

### Areas Needing Contributors

#### 🔥 High Priority

- ✅ **AWS Provider Implementation**: Real AWS integration using SDK
- 🔄 **Cost Estimation Algorithm**: Machine learning-based cost prediction
- ✅ **Deployment Rollback**: Automatic failure recovery
- 🔄 **Real-time Monitoring**: WebSocket-based live updates

#### 🚀 Medium Priority

- **GCP/Azure Providers**: Multi-cloud support
- **Kubernetes Integration**: Container orchestration
- **CI/CD Pipeline**: GitOps deployment workflows
- **Security Scanning**: Infrastructure vulnerability detection

#### 🎨 Nice to Have

- **Frontend Dashboard**: React-based management UI
- **CLI Tool**: Command-line interface
- **Documentation**: API docs and tutorials
- **Terraform Import**: Migrate existing infrastructure

### Development Setup

```bash
# Install dependencies
npm install

# Set up pre-commit hooks
npm run prepare

# Run tests before committing
npm test

# Check code style
npm run lint
```

### Code Quality

- **TypeScript**: Strict type checking enabled
- **ESLint**: Airbnb config with TypeScript support
- **Prettier**: Consistent code formatting
- **Jest**: Unit and integration tests
- **Husky**: Pre-commit hooks

## 📚 Documentation

- [API Reference](docs/api/README.md)
- [Architecture Guide](docs/architecture/README.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Deployment Guide](docs/deployment/README.md)

## 🧪 Testing Strategy

Nimbly uses a **mock-first** approach:

1. **Mock Provider**: All features work with mock infrastructure
2. **Real Providers**: Add actual cloud integration as needed
3. **Hybrid Testing**: Mix mock and real providers in tests

This allows contributors to work on features **without cloud accounts**.

## 🎯 Roadmap

### Phase 1: Core Platform (Current)

- ✅ Provider abstraction layer
- ✅ Deployment state machine
- ✅ Basic resource management
- ✅ Mock provider implementation

### Phase 2: Production Ready (Q1 2026)

- ✅ AWS provider implementation
- 🔄 Cost estimation algorithms
- ✅ Self-healing deployments
- 🔄 Real-time monitoring

### Phase 3: Enterprise Features (Q2 2026)

- 🔄 Multi-cloud support
- 🔄 Kubernetes integration
- 🔄 Advanced security
- 🔄 Enterprise compliance

### Phase 4: Ecosystem (Q3 2026)

- 🔄 Terraform provider
- 🔄 CI/CD integrations
- 🔄 Marketplace
- 🔄 Managed service

## 🤔 Why Contribute to Nimbly?

### Real Engineering Problems

- **State Machines**: Build complex deployment workflows
- **Cost Optimization**: Machine learning for cloud costs
- **Multi-Cloud**: Abstract away vendor differences
- **Self-Healing**: Automatic failure recovery systems

### Modern Tech Stack

- **TypeScript**: Full type safety
- **NestJS**: Enterprise-grade backend framework
- **Next.js**: Modern React framework
- **PostgreSQL**: Robust database
- **Docker**: Containerized development

### Impact

- **Open Source**: Build tools used by thousands
- **Industry Standard**: Define how infrastructure should work
- **Career Growth**: Real-world distributed systems experience

## 📞 Community

- **Discord**: [Join our community](https://discord.gg/nimbly)
- **GitHub Discussions**: [Ask questions](https://github.com/your-org/nimbly/discussions)
- **Twitter**: [@nimbly_dev](https://twitter.com/nimbly_dev)
- **Newsletter**: [Stay updated](https://nimbly.dev/newsletter)

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Inspired by the pain of managing cloud infrastructure at scale. Built for developers who deserve better tools.

---

**Ready to build the future of infrastructure?** [Get started contributing](CONTRIBUTING.md) 🚀
