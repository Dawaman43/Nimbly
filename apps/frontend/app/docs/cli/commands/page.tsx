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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function CliCommandsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">CLI</Badge>
          <Badge variant="outline">Commands</Badge>
        </div>
        <h1 className="text-4xl font-bold">CLI Commands Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete reference of all Nimbly CLI commands and their usage
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Command Categories</CardTitle>
          <CardDescription>
            Commands are organized by functionality for easy navigation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Application</h3>
              <p className="text-sm text-muted-foreground">
                App lifecycle management
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Infrastructure</h3>
              <p className="text-sm text-muted-foreground">
                Resources and configuration
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Logs, metrics, and debugging
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="app" className="space-y-4">
        <TabsList>
          <TabsTrigger value="app">Application</TabsTrigger>
          <TabsTrigger value="infra">Infrastructure</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="auth">Authentication</TabsTrigger>
        </TabsList>

        <TabsContent value="app" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Command</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>init</code>
                    </TableCell>
                    <TableCell>Initialize a new Nimbly project</TableCell>
                    <TableCell>
                      <code>nimbly init my-app</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>deploy</code>
                    </TableCell>
                    <TableCell>Deploy application to environment</TableCell>
                    <TableCell>
                      <code>nimbly deploy --env prod</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>status</code>
                    </TableCell>
                    <TableCell>Show application status</TableCell>
                    <TableCell>
                      <code>nimbly status</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>scale</code>
                    </TableCell>
                    <TableCell>Scale application instances</TableCell>
                    <TableCell>
                      <code>nimbly scale --replicas 3</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>rollback</code>
                    </TableCell>
                    <TableCell>Rollback to previous deployment</TableCell>
                    <TableCell>
                      <code>nimbly rollback</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>destroy</code>
                    </TableCell>
                    <TableCell>Destroy application and resources</TableCell>
                    <TableCell>
                      <code>nimbly destroy --confirm</code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detailed Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Deploy Command</h4>
                <CodeBlock
                  language="bash"
                  code={`nimbly deploy [options]

Options:
  --environment, -e    Target environment (development, staging, production)
  --branch, -b         Git branch to deploy (default: current)
  --wait               Wait for deployment to complete
  --no-build          Skip build step
  --force             Force deployment even if no changes

Examples:
  nimbly deploy --environment production --wait
  nimbly deploy --branch feature/new-feature
  nimbly deploy --no-build`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Scale Command</h4>
                <CodeBlock
                  language="bash"
                  code={`nimbly scale [options]

Options:
  --replicas, -r       Number of replicas
  --min                Minimum replicas (autoscaling)
  --max                Maximum replicas (autoscaling)
  --cpu-threshold      CPU threshold for autoscaling (percentage)

Examples:
  nimbly scale --replicas 5
  nimbly scale --min 2 --max 10 --cpu-threshold 70`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infra" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Infrastructure Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Command</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>resources add</code>
                    </TableCell>
                    <TableCell>
                      Add a resource (database, cache, etc.)
                    </TableCell>
                    <TableCell>
                      <code>nimbly resources add postgres</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>resources list</code>
                    </TableCell>
                    <TableCell>List all resources</TableCell>
                    <TableCell>
                      <code>nimbly resources list</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>resources remove</code>
                    </TableCell>
                    <TableCell>Remove a resource</TableCell>
                    <TableCell>
                      <code>nimbly resources remove db-1</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>domains add</code>
                    </TableCell>
                    <TableCell>Add custom domain</TableCell>
                    <TableCell>
                      <code>nimbly domains add example.com</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>domains list</code>
                    </TableCell>
                    <TableCell>List domains</TableCell>
                    <TableCell>
                      <code>nimbly domains list</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>config validate</code>
                    </TableCell>
                    <TableCell>Validate configuration</TableCell>
                    <TableCell>
                      <code>nimbly config validate</code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resource Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Adding Resources</h4>
                <CodeBlock
                  language="bash"
                  code={`# Add PostgreSQL database
nimbly resources add postgres \\
  --name production-db \\
  --version 15 \\
  --size large

# Add Redis cache
nimbly resources add redis \\
  --name app-cache \\
  --version 7 \\
  --persistence rdb

# Add custom domain
nimbly domains add myapp.com \\
  --ssl auto \\
  --redirect-www`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Resource Types</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <code>postgres</code> - PostgreSQL database
                  </li>
                  <li>
                    • <code>mysql</code> - MySQL database
                  </li>
                  <li>
                    • <code>redis</code> - Redis cache/data structure store
                  </li>
                  <li>
                    • <code>mongodb</code> - MongoDB document database
                  </li>
                  <li>
                    • <code>elasticsearch</code> - Search and analytics engine
                  </li>
                  <li>
                    • <code>rabbitmq</code> - Message broker
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Command</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>logs</code>
                    </TableCell>
                    <TableCell>View application logs</TableCell>
                    <TableCell>
                      <code>nimbly logs --follow</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>metrics</code>
                    </TableCell>
                    <TableCell>View application metrics</TableCell>
                    <TableCell>
                      <code>nimbly metrics</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>exec</code>
                    </TableCell>
                    <TableCell>Execute command in container</TableCell>
                    <TableCell>
                      <code>nimbly exec -- bash</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>ps</code>
                    </TableCell>
                    <TableCell>List running processes</TableCell>
                    <TableCell>
                      <code>nimbly ps</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>doctor</code>
                    </TableCell>
                    <TableCell>Run diagnostics</TableCell>
                    <TableCell>
                      <code>nimbly doctor</code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Log Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Viewing Logs</h4>
                <CodeBlock
                  language="bash"
                  code={`# Follow logs in real-time
nimbly logs --follow

# Show logs for specific service
nimbly logs --service api --follow

# Show logs from last hour
nimbly logs --since 1h

# Filter logs by level
nimbly logs --level error

# Search logs
nimbly logs --grep "error.*database"`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Log Export</h4>
                <CodeBlock
                  language="bash"
                  code={`# Export logs to file
nimbly logs --export logs.json --since 24h

# Stream logs to external service
nimbly logs --follow | tee >(logshipper)`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Command</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>login</code>
                    </TableCell>
                    <TableCell>Authenticate with Nimbly</TableCell>
                    <TableCell>
                      <code>nimbly login</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>logout</code>
                    </TableCell>
                    <TableCell>Sign out of Nimbly</TableCell>
                    <TableCell>
                      <code>nimbly logout</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>auth status</code>
                    </TableCell>
                    <TableCell>Check authentication status</TableCell>
                    <TableCell>
                      <code>nimbly auth status</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>api-keys create</code>
                    </TableCell>
                    <TableCell>Create API key</TableCell>
                    <TableCell>
                      <code>nimbly api-keys create</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>api-keys list</code>
                    </TableCell>
                    <TableCell>List API keys</TableCell>
                    <TableCell>
                      <code>nimbly api-keys list</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>api-keys revoke</code>
                    </TableCell>
                    <TableCell>Revoke API key</TableCell>
                    <TableCell>
                      <code>nimbly api-keys revoke key-id</code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Key Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Creating API Keys</h4>
                <CodeBlock
                  language="bash"
                  code={`# Create production API key
nimbly api-keys create \\
  --name "production-deploy" \\
  --environment production \\
  --permissions "deploy:read,deploy:create,logs:read"

# Create read-only monitoring key
nimbly api-keys create \\
  --name "monitoring" \\
  --permissions "logs:read,metrics:read,status:read" \\
  --rate-limit "1000/hour"`}
                />
              </div>

              <div>
                <h4 className="font-semibold">API Key Permissions</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <code>apps:read/write</code> - Application management
                  </li>
                  <li>
                    • <code>deploy:create</code> - Deployment operations
                  </li>
                  <li>
                    • <code>logs:read</code> - Access to application logs
                  </li>
                  <li>
                    • <code>metrics:read</code> - Performance metrics
                  </li>
                  <li>
                    • <code>resources:read/write</code> - Infrastructure
                    resources
                  </li>
                  <li>
                    • <code>domains:read/write</code> - Domain management
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/cli">← CLI</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/cli/options">Options →</Link>
        </Button>
      </div>
    </div>
  );
}
