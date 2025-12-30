# Contributing to Nimbly

Thank you for your interest in contributing to Nimbly! 🎉

This document provides guidelines and information for contributors. Whether you're fixing bugs, adding features, or improving documentation, your contributions are welcome and appreciated.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Project Structure](#project-structure)
- [Contributing Areas](#contributing-areas)
- [Implementation Guidelines](#implementation-guidelines)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Recognition](#recognition)

## 🤝 Code of Conduct

This project follows a code of conduct to ensure a welcoming environment for all contributors. By participating, you agree to:

- Be respectful and inclusive
- Focus on constructive feedback
- Accept responsibility for mistakes
- Show empathy towards other contributors
- Help create a positive community

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+**: [Download here](https://nodejs.org/)
- **Docker & Docker Compose**: For running the database
- **Git**: For version control
- **VS Code** (recommended): With TypeScript and Prettier extensions

### Setup

```bash
# Fork and clone the repository
git clone https://github.com/your-username/nimbly.git
cd nimbly

# Install dependencies
npm install

# Set up the database
docker-compose up -d postgres

# Run database migrations
npm run db:migrate

# Start development environment
npm run dev

# Visit http://localhost:3000 for frontend
# API available at http://localhost:4000
```

### Verify Setup

```bash
# Check that everything is working
curl http://localhost:4000/health
# Should return: {"status":"ok"}

# Check frontend
curl http://localhost:3000
# Should return HTML
```

## 🔄 Development Workflow

### 1. Choose an Issue

Visit our [GitHub Issues](https://github.com/your-org/nimbly/issues) and look for:

- **Good first issues**: Labeled `good first issue`
- **Help wanted**: Labeled `help wanted`
- **Bugs**: Labeled `bug`
- **Features**: Labeled `enhancement`

### 2. Create a Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-number-description
```

### 3. Make Changes

Follow our [implementation guidelines](#implementation-guidelines) below.

### 4. Test Your Changes

```bash
# Run all tests
npm test

# Run backend tests only
npm run test:backend

# Run frontend tests only
npm run test:frontend

# Run linting
npm run lint

# Build the project
npm run build
```

### 5. Commit Changes

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add new deployment retry logic

- Add retry mechanism for failed deployments
- Update state machine to handle retry transitions
- Add tests for retry functionality

Closes #123"
```

### 6. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

## 🏗️ Project Structure

```
nimbly/
├── apps/
│   ├── backend/                 # NestJS API server
│   │   ├── src/
│   │   │   ├── modules/         # Feature modules
│   │   │   │   ├── auth/        # Authentication
│   │   │   │   ├── cloud-resources/  # Resource management
│   │   │   │   ├── deployments/ # Deployment orchestration
│   │   │   │   └── ...
│   │   │   ├── providers/       # Cloud provider implementations
│   │   │   └── main.ts          # Application entry point
│   │   └── test/                # Backend tests
│   └── frontend/                # Next.js dashboard
│       ├── app/                 # Next.js app router
│       ├── components/          # React components
│       └── lib/                 # Frontend utilities
├── libs/
│   ├── shared-types/            # TypeScript interfaces
│   └── utils/                   # Shared utilities
├── docker-compose.yml           # Development environment
├── package.json                 # Root package.json
└── README.md
```

## 🎯 Contributing Areas

### 🔥 High Priority (Start Here)

#### 1. AWS Provider Implementation

**Files to modify:**

- `apps/backend/src/providers/aws-cloud-provider.ts` (create new)
- `apps/backend/src/modules/cloud-resources/cloud-resources.service.ts`

**What to do:**

- Implement the `CloudProvider` interface for AWS
- Use AWS SDK to create real EC2, S3, RDS resources
- Handle AWS-specific error cases
- Add AWS credentials management

**Skills needed:** AWS SDK, TypeScript, Error handling

#### 2. Cost Estimation Algorithm

**Files to modify:**

- `libs/shared-types/src/cost-estimation.ts` (create new)
- `apps/backend/src/modules/cost-estimation/` (create new module)

**What to do:**

- Build machine learning model for cost prediction
- Analyze usage patterns and predict costs
- Implement cost optimization suggestions
- Add real-time cost monitoring

**Skills needed:** Algorithms, Data analysis, Machine learning basics

#### 3. Deployment Rollback System

**Files to modify:**

- `apps/backend/src/modules/deployments/deployment-state-machine.service.ts`
- `apps/backend/src/modules/deployments/deployments.controller.ts`

**What to do:**

- Implement automatic rollback on deployment failure
- Add manual rollback endpoints
- Create rollback state management
- Add rollback testing scenarios

**Skills needed:** State machines, Error handling, API design

### 🚀 Medium Priority

#### 4. Real-time Monitoring

**Files to modify:**

- `apps/backend/src/modules/monitoring/` (enhance existing)
- `apps/frontend/components/dashboard/monitoring-view.tsx`

**What to do:**

- Add WebSocket connections for live updates
- Implement real-time metrics streaming
- Create monitoring dashboards
- Add alerting system

**Skills needed:** WebSockets, React, Real-time systems

#### 5. Frontend Dashboard

**Files to modify:**

- `apps/frontend/app/dashboard/` (enhance existing)
- `apps/frontend/components/dashboard/`

**What to do:**

- Build deployment management UI
- Add resource monitoring views
- Create cost analysis charts
- Implement user management interface

**Skills needed:** React, Next.js, UI/UX design

### 🎨 Nice to Have

#### 6. CLI Tool

**Files to create:**

- `apps/cli/` (new directory)
- `package.json` for CLI package

**What to do:**

- Create command-line interface
- Add deployment commands
- Implement resource management
- Add configuration management

**Skills needed:** Node.js CLI, Command parsing

## 📝 Implementation Guidelines

### Code Style

- **TypeScript**: Strict mode enabled
- **Naming**: Use descriptive, camelCase names
- **Comments**: Add JSDoc for public APIs
- **Imports**: Group by external libraries, then internal modules

### Architecture Patterns

#### 1. Dependency Injection

```typescript
@Injectable()
export class MyService {
  constructor(
    private readonly repository: Repository<Entity>,
    private readonly otherService: OtherService
  ) {}
}
```

#### 2. Repository Pattern

```typescript
@Injectable()
export class MyRepository {
  constructor(
    @InjectRepository(Entity)
    private readonly entityRepository: Repository<Entity>
  ) {}

  async findByUserId(userId: string): Promise<Entity[]> {
    return this.entityRepository.find({ where: { userId } });
  }
}
```

#### 3. Service Layer

```typescript
@Injectable()
export class MyService {
  async businessLogic(): Promise<Result> {
    // Validation
    // Business logic
    // Return result
  }
}
```

#### 4. Controller Layer

```typescript
@Controller("my-resource")
export class MyController {
  constructor(private readonly myService: MyService) {}

  @Get()
  async findAll(@Request() req): Promise<Entity[]> {
    const userId = req.user.userId;
    return this.myService.findAll(userId);
  }
}
```

### Error Handling

```typescript
@Injectable()
export class MyService {
  async riskyOperation(): Promise<Result> {
    try {
      // Operation that might fail
      return await this.performOperation();
    } catch (error) {
      this.logger.error("Operation failed", error);
      throw new BadRequestException("Operation failed");
    }
  }
}
```

### Testing

```typescript
describe("MyService", () => {
  let service: MyService;
  let mockRepository: MockType<Repository<Entity>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MyService,
        {
          provide: getRepositoryToken(Entity),
          useFactory: jest.fn(() => ({
            find: jest.fn(),
            save: jest.fn(),
          })),
        },
      ],
    }).compile();

    service = module.get<MyService>(MyService);
    mockRepository = module.get(getRepositoryToken(Entity));
  });

  it("should return entities", async () => {
    mockRepository.find.mockReturnValue([]);
    const result = await service.findAll();
    expect(result).toEqual([]);
  });
});
```

## 🧪 Testing

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# Specific test file
npm test -- my-service.spec.ts
```

### Test Structure

```
src/
├── my-feature/
│   ├── my-feature.service.ts
│   ├── my-feature.controller.ts
│   └── my-feature.service.spec.ts    # Unit tests
├── modules/
│   └── my-feature/
│       └── my-feature.e2e-spec.ts     # E2E tests
```

### Test Categories

- **Unit Tests**: Test individual functions/classes
- **Integration Tests**: Test module interactions
- **E2E Tests**: Test complete user journeys
- **Mock Tests**: Test with mock providers

## 📤 Submitting Changes

### Pull Request Process

1. **Update your branch** with the latest main

   ```bash
   git checkout main
   git pull origin main
   git checkout your-branch
   git rebase main
   ```

2. **Ensure tests pass**

   ```bash
   npm test
   npm run lint
   npm run build
   ```

3. **Create Pull Request**
   - Use descriptive title
   - Fill out PR template
   - Reference related issues
   - Add screenshots for UI changes

4. **Code Review**
   - Address reviewer feedback
   - Make requested changes
   - Keep conversations focused

5. **Merge**
   - Squash commits if requested
   - Delete branch after merge

### Commit Messages

Follow conventional commits:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

Examples:

```
feat(auth): add JWT token refresh
fix(deployments): handle null resource IDs
docs(readme): update installation instructions
```

## 🏆 Recognition

Contributors are recognized in several ways:

- **GitHub Contributors**: Listed in repository contributors
- **Changelog**: Mentioned in release notes
- **Discord**: Special contributor role
- **Newsletter**: Featured in community updates
- **Swag**: Stickers, t-shirts for major contributors

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and ideas
- **Discord**: Real-time chat with maintainers
- **Documentation**: Check existing docs first

## 🎯 Next Steps

1. **Read the README** to understand the project vision
2. **Set up your development environment**
3. **Choose an issue** from the contributing areas
4. **Start coding** and have fun! 🚀

Remember: **Every contribution counts**. Even fixing a typo or improving documentation helps make Nimbly better for everyone.

Happy contributing! 🎉
