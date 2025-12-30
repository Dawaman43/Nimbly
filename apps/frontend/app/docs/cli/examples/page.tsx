import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import Link from "next/link";

export default function CliExamplesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">CLI</Badge>
          <Badge variant="outline">Examples</Badge>
        </div>
        <h1 className="text-4xl font-bold">CLI Examples</h1>
        <p className="text-xl text-muted-foreground">
          Practical examples and use cases for the Nimbly CLI
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Example Scenarios</CardTitle>
          <CardDescription>
            Real-world examples showing how to use the Nimbly CLI effectively
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Getting Started</h3>
              <p className="text-sm text-muted-foreground">
                Basic setup and deployment
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Development</h3>
              <p className="text-sm text-muted-foreground">
                Development workflows
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Production</h3>
              <p className="text-sm text-muted-foreground">
                Production operations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="getting-started" className="space-y-4">
        <TabsList>
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="development">Development</TabsTrigger>
          <TabsTrigger value="production">Production</TabsTrigger>
          <TabsTrigger value="ci-cd">CI/CD</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Initialization</CardTitle>
              <CardDescription>
                Set up a new Nimbly project from scratch
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">1. Initialize Project</h4>
                <CodeBlock
                  language="bash"
                  code={`# Create a new directory
mkdir my-nimbly-app
cd my-nimbly-app

# Initialize Nimbly project
nimbly init

# This creates:
# - nimbly.json (project configuration)
# - Basic directory structure
# - Example service configurations`}
                />
              </div>

              <div>
                <h4 className="font-semibold">2. Add Your First Service</h4>
                <CodeBlock
                  language="bash"
                  code={`# Add a Node.js API service
echo '{
  "name": "api",
  "source": "./api",
  "runtime": "node",
  "version": "18",
  "port": 3000
}' > services/api.json

# Or use the CLI helper
nimbly services add api --runtime node --port 3000`}
                />
              </div>

              <div>
                <h4 className="font-semibold">3. Add Database</h4>
                <CodeBlock
                  language="bash"
                  code={`# Add PostgreSQL database
nimbly resources add postgres \\
  --name main-db \\
  --version 15 \\
  --size standard

# The CLI will automatically:
# - Create the database instance
# - Set up connection credentials
# - Add environment variables to your services`}
                />
              </div>

              <div>
                <h4 className="font-semibold">4. First Deployment</h4>
                <CodeBlock
                  language="bash"
                  code={`# Deploy to development environment
nimbly deploy --environment development --wait

# Check deployment status
nimbly status

# View application logs
nimbly logs --follow`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="development" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Development Workflow</CardTitle>
              <CardDescription>
                Efficient development and testing workflows
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Local Development Setup</h4>
                <CodeBlock
                  language="bash"
                  code={`# Start local development environment
nimbly dev

# This automatically:
# - Starts local database instances
# - Sets up environment variables
# - Runs your services with hot reload
# - Provides local URLs for testing`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Rapid Iteration</h4>
                <CodeBlock
                  language="bash"
                  code={`# Quick deploy to development
nimbly deploy -e dev

# Watch logs while developing
nimbly logs -f --service api | grep -v "health check"

# Run database migrations
nimbly db migrate

# Reset development database
nimbly db reset --environment development`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Debugging Issues</h4>
                <CodeBlock
                  language="bash"
                  code={`# Check service health
nimbly health

# Inspect running containers
nimbly ps

# Execute commands in containers
nimbly exec --service api -- bash

# View detailed metrics
nimbly metrics --service api --interval 1m`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Testing Deployments</h4>
                <CodeBlock
                  language="bash"
                  code={`# Deploy to staging for testing
nimbly deploy -e staging --wait

# Run integration tests against staging
npm run test:integration -- --base-url $(nimbly url -e staging)

# Promote to production if tests pass
nimbly deploy -e production`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="production" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Production Operations</CardTitle>
              <CardDescription>
                Managing production applications and infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Zero-Downtime Deployments</h4>
                <CodeBlock
                  language="bash"
                  code={`# Deploy with health checks
nimbly deploy -e production \\
  --health-check-path /health \\
  --health-check-timeout 30 \\
  --wait

# Monitor deployment progress
nimbly deployments list

# Rollback if issues occur
nimbly rollback --deployment-id $(nimbly deployments latest -e production)`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Scaling Operations</h4>
                <CodeBlock
                  language="bash"
                  code={`# Manual scaling
nimbly scale --service api --replicas 5

# Auto-scaling setup
nimbly scale --service api \\
  --min-replicas 2 \\
  --max-replicas 10 \\
  --cpu-threshold 70 \\
  --memory-threshold 80

# Check current scaling status
nimbly scale status --service api`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Backup and Recovery</h4>
                <CodeBlock
                  language="bash"
                  code={`# Create database backup
nimbly backup create --resource main-db --type full

# List available backups
nimbly backup list --resource main-db

# Restore from backup
nimbly backup restore --resource main-db --backup-id bk_12345

# Schedule automated backups
nimbly backup schedule --resource main-db --cron "0 2 * * *" --retention 30`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Monitoring and Alerting</h4>
                <CodeBlock
                  language="bash"
                  code={`# Set up alerts
nimbly alerts create \\
  --name "High CPU Usage" \\
  --condition "cpu > 90" \\
  --service api \\
  --channels email,slack

# View current alerts
nimbly alerts list

# Check system metrics
nimbly metrics --period 1h --format table

# Generate performance report
nimbly report generate --type performance --period 24h`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ci-cd" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CI/CD Integration</CardTitle>
              <CardDescription>
                Automate deployments with continuous integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">GitHub Actions</h4>
                <CodeBlock
                  language="yaml"
                  code={`# .github/workflows/deploy.yml
name: Deploy to Nimbly
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: nimbly/cli-action@v1
        with:
          api-key: \${{ secrets.NIMBLY_API_KEY }}
      - run: nimbly deploy --environment production --wait`}
                />
              </div>

              <div>
                <h4 className="font-semibold">GitLab CI</h4>
                <CodeBlock
                  language="yaml"
                  code={`# .gitlab-ci.yml
stages:
  - test
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm test
    - npm run build

deploy:
  stage: deploy
  image: node:18
  script:
    - npm install -g @nimbly/cli
    - nimbly login --api-key $NIMBLY_API_KEY
    - nimbly deploy --environment production --wait
  only:
    - main`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Jenkins Pipeline</h4>
                <CodeBlock
                  language="groovy"
                  code={`// Jenkinsfile
pipeline {
    agent any

    stages {
        stage('Test') {
            steps {
                sh 'npm ci'
                sh 'npm test'
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh 'npm install -g @nimbly/cli'
                sh 'nimbly login --api-key $NIMBLY_API_KEY'
                sh 'nimbly deploy --environment production --wait'
            }
        }
    }

    post {
        success {
            sh 'nimbly notify --message "Deployment successful"'
        }
        failure {
            sh 'nimbly notify --message "Deployment failed"'
        }
    }
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Advanced CI/CD</h4>
                <CodeBlock
                  language="bash"
                  code={`# Blue-green deployment
nimbly deploy --environment production \\
  --strategy blue-green \\
  --health-check-path /health \\
  --traffic-split 10

# Canary deployment
nimbly deploy --environment production \\
  --strategy canary \\
  --canary-percent 5 \\
  --auto-promote \\
  --promote-after 30m

# Rollback automation
if ! nimbly health --service api; then
  nimbly rollback --environment production
  nimbly notify --channel slack --message "Auto-rollback triggered"
fi`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/cli/options">← Options</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/api/rest">API →</Link>
        </Button>
      </div>
    </div>
  );
}
