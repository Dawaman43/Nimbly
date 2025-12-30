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
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function ConfigurationPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Configuration</Badge>
        </div>
        <h1 className="text-4xl font-bold">Configuration</h1>
        <p className="text-xl text-muted-foreground">
          Configure your Nimbly projects and applications
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Configuration Overview</CardTitle>
          <CardDescription>
            Nimbly uses a hierarchical configuration system that allows you to
            define settings at the project, environment, and service levels.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Project Config</h3>
              <p className="text-sm text-muted-foreground">
                Global project settings and defaults
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Environment Config</h3>
              <p className="text-sm text-muted-foreground">
                Environment-specific overrides
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Service Config</h3>
              <p className="text-sm text-muted-foreground">
                Individual service configurations
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="project" className="space-y-4">
        <TabsList>
          <TabsTrigger value="project">Project Config</TabsTrigger>
          <TabsTrigger value="environment">Environment Config</TabsTrigger>
          <TabsTrigger value="services">Service Config</TabsTrigger>
          <TabsTrigger value="validation">Validation</TabsTrigger>
        </TabsList>

        <TabsContent value="project" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>nimbly.json</CardTitle>
              <CardDescription>
                The main configuration file for your Nimbly project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "name": "my-nimbly-app",
  "version": "1.0.0",
  "description": "My awesome application",
  "author": "Your Name",

  "config": {
    "region": "us-east-1",
    "domain": "myapp.com",
    "ssl": true,

    "environments": {
      "development": {
        "domain": "dev.myapp.com",
        "replicas": 1
      },
      "staging": {
        "domain": "staging.myapp.com",
        "replicas": 2
      },
      "production": {
        "domain": "myapp.com",
        "replicas": 3
      }
    }
  },

  "resources": [
    {
      "name": "main-db",
      "type": "postgresql",
      "version": "15"
    }
  ],

  "services": [
    {
      "name": "api",
      "source": "./api",
      "port": 3000
    },
    {
      "name": "web",
      "source": "./web",
      "port": 3001
    }
  ]
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Basic Settings</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• name: Project name</li>
                    <li>• version: Project version</li>
                    <li>• description: Project description</li>
                    <li>• author: Project author</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold">Deployment Settings</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• region: AWS region</li>
                    <li>• domain: Custom domain</li>
                    <li>• ssl: SSL certificate</li>
                    <li>• replicas: Service replicas</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environment-Specific Configuration</CardTitle>
              <CardDescription>
                Override project settings for different environments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "environments": {
    "development": {
      "config": {
        "debug": true,
        "log_level": "debug",
        "database_url": "postgresql://localhost:5432/dev_db"
      },
      "resources": [
        {
          "name": "dev-db",
          "type": "postgresql",
          "config": {
            "max_connections": 10
          }
        }
      ]
    },

    "production": {
      "config": {
        "debug": false,
        "log_level": "warn",
        "database_url": "\${DATABASE_URL}"
      },
      "resources": [
        {
          "name": "prod-db",
          "type": "postgresql",
          "config": {
            "max_connections": 100,
            "backup_schedule": "0 2 * * *"
          }
        }
      ]
    }
  }
}`}
              />
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              Environment configurations are merged with the base project
              configuration. Environment-specific settings take precedence over
              global settings.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Configuration</CardTitle>
              <CardDescription>
                Configure individual services in your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "services": [
    {
      "name": "api",
      "source": "./backend",
      "runtime": "node",
      "version": "18",
      "port": 3000,
      "environment": {
        "NODE_ENV": "production",
        "PORT": "3000"
      },
      "health_check": {
        "path": "/health",
        "interval": 30,
        "timeout": 10
      },
      "scaling": {
        "min_replicas": 1,
        "max_replicas": 10,
        "cpu_threshold": 70
      }
    },

    {
      "name": "web",
      "source": "./frontend",
      "runtime": "node",
      "version": "18",
      "port": 3001,
      "build_command": "npm run build",
      "static": true
    }
  ]
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Web Services</h4>
                  <p className="text-sm text-muted-foreground">
                    HTTP-based applications that serve web requests
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Worker Services</h4>
                  <p className="text-sm text-muted-foreground">
                    Background job processors and scheduled tasks
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Static Sites</h4>
                  <p className="text-sm text-muted-foreground">
                    Pre-built static websites and SPAs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="validation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Validation</CardTitle>
              <CardDescription>
                Validate your configuration files before deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Validate configuration
nimbly config validate

# Validate specific environment
nimbly config validate --environment production

# Check for common issues
nimbly config validate --strict`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Validation Errors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-red-600">
                  Missing Required Fields
                </h4>
                <p className="text-sm text-muted-foreground">
                  Ensure all required configuration fields are present
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-600">
                  Invalid Resource Types
                </h4>
                <p className="text-sm text-muted-foreground">
                  Check that all resource types are supported
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-600">Port Conflicts</h4>
                <p className="text-sm text-muted-foreground">
                  Ensure no two services use the same port
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-red-600">
                  Environment Variable Issues
                </h4>
                <p className="text-sm text-muted-foreground">
                  Verify all referenced environment variables exist
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/databases/migrations">← Database Migrations</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/configuration/environment-variables">
            Environment Variables →
          </Link>
        </Button>
      </div>
    </div>
  );
}
