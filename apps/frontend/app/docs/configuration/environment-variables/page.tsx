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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function EnvironmentVariablesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Configuration</Badge>
          <Badge variant="outline">Environment</Badge>
        </div>
        <h1 className="text-4xl font-bold">Environment Variables</h1>
        <p className="text-xl text-muted-foreground">
          Manage environment variables for your applications and services
        </p>
      </div>

      <Alert>
        <AlertDescription>
          Environment variables allow you to configure your applications without
          hardcoding values. They can be set at the project, environment, or
          service level.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Environment Variable Hierarchy</CardTitle>
          <CardDescription>
            Variables are merged from multiple sources with different priorities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold">System Variables</h4>
                <p className="text-sm text-muted-foreground">
                  Automatically provided by Nimbly (lowest priority)
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold">Project Variables</h4>
                <p className="text-sm text-muted-foreground">
                  Defined in nimbly.json
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold">Environment Variables</h4>
                <p className="text-sm text-muted-foreground">
                  Environment-specific overrides
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold">
                4
              </div>
              <div>
                <h4 className="font-semibold">Runtime Variables</h4>
                <p className="text-sm text-muted-foreground">
                  Set at deployment time (highest priority)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="defining" className="space-y-4">
        <TabsList>
          <TabsTrigger value="defining">Defining Variables</TabsTrigger>
          <TabsTrigger value="system">System Variables</TabsTrigger>
          <TabsTrigger value="secrets">Secrets</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="defining" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Project-Level Variables</CardTitle>
              <CardDescription>
                Define environment variables in your nimbly.json file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "environment": {
      "API_KEY": "your-api-key",
      "DEBUG": "false",
      "LOG_LEVEL": "info"
    }
  },

  "environments": {
    "development": {
      "environment": {
        "DEBUG": "true",
        "LOG_LEVEL": "debug",
        "DATABASE_URL": "postgresql://localhost:5432/dev_db"
      }
    },

    "production": {
      "environment": {
        "DEBUG": "false",
        "LOG_LEVEL": "warn",
        "DATABASE_URL": "\${DATABASE_URL}"
      }
    }
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Service-Level Variables</CardTitle>
              <CardDescription>
                Override variables for specific services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "services": [
    {
      "name": "api",
      "environment": {
        "PORT": "3000",
        "NODE_ENV": "production",
        "JWT_SECRET": "\${JWT_SECRET}"
      }
    },
    {
      "name": "worker",
      "environment": {
        "QUEUE_NAME": "jobs",
        "MAX_JOBS": "10"
      }
    }
  ]
}`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System-Provided Variables</CardTitle>
              <CardDescription>
                Variables automatically injected by Nimbly at runtime
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Variable</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>NIMBLY_ENV</code>
                    </TableCell>
                    <TableCell>Current environment name</TableCell>
                    <TableCell>
                      <code>production</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>NIMBLY_PROJECT</code>
                    </TableCell>
                    <TableCell>Project name</TableCell>
                    <TableCell>
                      <code>my-app</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>NIMBLY_SERVICE</code>
                    </TableCell>
                    <TableCell>Current service name</TableCell>
                    <TableCell>
                      <code>api</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>NIMBLY_VERSION</code>
                    </TableCell>
                    <TableCell>Deployment version</TableCell>
                    <TableCell>
                      <code>v1.2.3</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>NIMBLY_URL</code>
                    </TableCell>
                    <TableCell>Service URL</TableCell>
                    <TableCell>
                      <code>https://api.myapp.com</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>NIMBLY_REGION</code>
                    </TableCell>
                    <TableCell>Deployment region</TableCell>
                    <TableCell>
                      <code>us-east-1</code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="secrets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Managing Secrets</CardTitle>
              <CardDescription>
                Handle sensitive environment variables securely
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Using Secrets</h4>
                <CodeBlock
                  language="json"
                  code={`{
  "config": {
    "secrets": {
      "database_password": "db-secret-key",
      "api_key": "api-secret-key"
    }
  },

  "environments": {
    "production": {
      "secrets": {
        "stripe_secret": "stripe-prod-secret"
      }
    }
  }
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold">CLI Commands for Secrets</h4>
                <CodeBlock
                  language="bash"
                  code={`# Set a secret
nimbly secrets set database_password "my-secret-password"

# List secrets
nimbly secrets list

# Remove a secret
nimbly secrets remove database_password`}
                />
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Security Note:</strong> Secrets are encrypted at rest and
              only decrypted at runtime for your applications. Never commit
              secrets to version control.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Environment Variables</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Variable</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>DATABASE_URL</code>
                    </TableCell>
                    <TableCell>Database connection string</TableCell>
                    <TableCell>
                      <code>postgresql://user:pass@host:5432/db</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>REDIS_URL</code>
                    </TableCell>
                    <TableCell>Redis connection URL</TableCell>
                    <TableCell>
                      <code>redis://host:6379</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>PORT</code>
                    </TableCell>
                    <TableCell>Service port</TableCell>
                    <TableCell>
                      <code>3000</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>NODE_ENV</code>
                    </TableCell>
                    <TableCell>Node.js environment</TableCell>
                    <TableCell>
                      <code>production</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>LOG_LEVEL</code>
                    </TableCell>
                    <TableCell>Logging verbosity</TableCell>
                    <TableCell>
                      <code>info</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>JWT_SECRET</code>
                    </TableCell>
                    <TableCell>JWT signing secret</TableCell>
                    <TableCell>
                      <code>your-secret-key</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>API_KEY</code>
                    </TableCell>
                    <TableCell>External API key</TableCell>
                    <TableCell>
                      <code>sk-1234567890</code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variable Interpolation</CardTitle>
              <CardDescription>
                Reference other variables and secrets in your configuration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "environment": {
      "BASE_URL": "https://api.myapp.com",
      "API_URL": "\${BASE_URL}/v1",
      "DATABASE_URL": "\${DATABASE_URL}",
      "REDIS_URL": "redis://\${REDIS_HOST}:6379"
    }
  }
}`}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/configuration">← Configuration</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/configuration/custom-domains">
            Custom Domains →
          </Link>
        </Button>
      </div>
    </div>
  );
}
