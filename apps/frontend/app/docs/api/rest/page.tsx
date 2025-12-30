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

export default function RestApiPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">API</Badge>
          <Badge variant="outline">REST</Badge>
        </div>
        <h1 className="text-4xl font-bold">REST API Reference</h1>
        <p className="text-xl text-muted-foreground">
          Complete reference for all REST API endpoints and operations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Endpoints Overview</CardTitle>
          <CardDescription>
            The REST API provides access to all Nimbly platform resources and
            operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Projects</h3>
              <p className="text-sm text-muted-foreground">
                Manage projects and settings
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Applications</h3>
              <p className="text-sm text-muted-foreground">
                Deploy and manage apps
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Resources</h3>
              <p className="text-sm text-muted-foreground">
                Databases, caches, etc.
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Logs, metrics, and alerts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="apps">Applications</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Projects API</CardTitle>
              <CardDescription>
                Manage Nimbly projects and their configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>GET</code>
                    </TableCell>
                    <TableCell>
                      <code>/projects</code>
                    </TableCell>
                    <TableCell>List all projects</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>POST</code>
                    </TableCell>
                    <TableCell>
                      <code>/projects</code>
                    </TableCell>
                    <TableCell>Create a new project</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>GET</code>
                    </TableCell>
                    <TableCell>
                      <code>/projects/{"{id}"}</code>
                    </TableCell>
                    <TableCell>Get project details</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>PUT</code>
                    </TableCell>
                    <TableCell>
                      <code>/projects/{"{id}"}</code>
                    </TableCell>
                    <TableCell>Update project</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>DELETE</code>
                    </TableCell>
                    <TableCell>
                      <code>/projects/{"{id}"}</code>
                    </TableCell>
                    <TableCell>Delete project</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example: Create Project</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`curl -X POST "https://api.nimbly.app/v1/projects" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "my-awesome-app",
    "description": "A fantastic web application",
    "region": "us-east-1"
  }'`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example: List Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`curl -X GET "https://api.nimbly.app/v1/projects" \\
  -H "Authorization: Bearer your-api-key"`}
              />
              <CodeBlock
                language="json"
                code={`{
  "success": true,
  "data": [
    {
      "id": "proj_12345",
      "name": "my-awesome-app",
      "description": "A fantastic web application",
      "region": "us-east-1",
      "created_at": "2024-01-15T10:30:00Z",
      "status": "active"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 1
  }
}`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apps" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Applications API</CardTitle>
              <CardDescription>
                Deploy, manage, and monitor your applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>GET</code>
                    </TableCell>
                    <TableCell>
                      <code>/apps</code>
                    </TableCell>
                    <TableCell>List applications</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>POST</code>
                    </TableCell>
                    <TableCell>
                      <code>/apps</code>
                    </TableCell>
                    <TableCell>Create application</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>GET</code>
                    </TableCell>
                    <TableCell>
                      <code>/apps/{"{id}"}</code>
                    </TableCell>
                    <TableCell>Get application details</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>POST</code>
                    </TableCell>
                    <TableCell>
                      <code>/apps/{"{id}"}/deploy</code>
                    </TableCell>
                    <TableCell>Deploy application</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>POST</code>
                    </TableCell>
                    <TableCell>
                      <code>/apps/{"{id}"}/scale</code>
                    </TableCell>
                    <TableCell>Scale application</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>DELETE</code>
                    </TableCell>
                    <TableCell>
                      <code>/apps/{"{id}"}</code>
                    </TableCell>
                    <TableCell>Delete application</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example: Deploy Application</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`curl -X POST "https://api.nimbly.app/v1/apps/app_12345/deploy" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "environment": "production",
    "branch": "main",
    "wait": true
  }'`}
              />
              <CodeBlock
                language="json"
                code={`{
  "success": true,
  "data": {
    "deployment_id": "deploy_67890",
    "status": "in_progress",
    "created_at": "2024-01-15T11:00:00Z",
    "estimated_completion": "2024-01-15T11:05:00Z"
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example: Scale Application</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`curl -X POST "https://api.nimbly.app/v1/apps/app_12345/scale" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "replicas": 5,
    "auto_scaling": {
      "enabled": true,
      "min_replicas": 2,
      "max_replicas": 10,
      "cpu_threshold": 70
    }
  }'`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resources API</CardTitle>
              <CardDescription>
                Manage databases, caches, and other infrastructure resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>GET</code>
                    </TableCell>
                    <TableCell>
                      <code>/resources</code>
                    </TableCell>
                    <TableCell>List resources</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>POST</code>
                    </TableCell>
                    <TableCell>
                      <code>/resources</code>
                    </TableCell>
                    <TableCell>Create resource</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>GET</code>
                    </TableCell>
                    <TableCell>
                      <code>/resources/{"{id}"}</code>
                    </TableCell>
                    <TableCell>Get resource details</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>PUT</code>
                    </TableCell>
                    <TableCell>
                      <code>/resources/{"{id}"}</code>
                    </TableCell>
                    <TableCell>Update resource</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>DELETE</code>
                    </TableCell>
                    <TableCell>
                      <code>/resources/{"{id}"}</code>
                    </TableCell>
                    <TableCell>Delete resource</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>POST</code>
                    </TableCell>
                    <TableCell>
                      <code>/resources/{"{id}"}/backup</code>
                    </TableCell>
                    <TableCell>Create backup</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example: Create Database</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`curl -X POST "https://api.nimbly.app/v1/resources" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "production-db",
    "type": "postgresql",
    "version": "15",
    "config": {
      "instance_class": "db.t3.medium",
      "storage": 100,
      "backup_retention": 7
    }
  }'`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example: Create Redis Cache</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`curl -X POST "https://api.nimbly.app/v1/resources" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "app-cache",
    "type": "redis",
    "version": "7.0",
    "config": {
      "instance_class": "cache.t3.micro",
      "maxmemory_policy": "allkeys-lru"
    }
  }'`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring API</CardTitle>
              <CardDescription>
                Access logs, metrics, and monitoring data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Method</TableHead>
                    <TableHead>Endpoint</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>GET</code>
                    </TableCell>
                    <TableCell>
                      <code>/logs</code>
                    </TableCell>
                    <TableCell>Get application logs</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>GET</code>
                    </TableCell>
                    <TableCell>
                      <code>/metrics</code>
                    </TableCell>
                    <TableCell>Get metrics data</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>GET</code>
                    </TableCell>
                    <TableCell>
                      <code>/alerts</code>
                    </TableCell>
                    <TableCell>List alerts</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>POST</code>
                    </TableCell>
                    <TableCell>
                      <code>/alerts</code>
                    </TableCell>
                    <TableCell>Create alert</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>GET</code>
                    </TableCell>
                    <TableCell>
                      <code>/health</code>
                    </TableCell>
                    <TableCell>Health check</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example: Get Application Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`curl -X GET "https://api.nimbly.app/v1/logs?app_id=app_12345&since=1h&limit=100" \\
  -H "Authorization: Bearer your-api-key"`}
              />
              <CodeBlock
                language="json"
                code={`{
  "success": true,
  "data": [
    {
      "timestamp": "2024-01-15T10:30:15Z",
      "level": "info",
      "message": "User login successful",
      "service": "api",
      "request_id": "req_abc123"
    },
    {
      "timestamp": "2024-01-15T10:30:20Z",
      "level": "error",
      "message": "Database connection failed",
      "service": "api",
      "request_id": "req_def456"
    }
  ],
  "meta": {
    "has_more": true,
    "next_cursor": "cursor_789"
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example: Get Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`curl -X GET "https://api.nimbly.app/v1/metrics?app_id=app_12345&period=1h" \\
  -H "Authorization: Bearer your-api-key"`}
              />
              <CodeBlock
                language="json"
                code={`{
  "success": true,
  "data": {
    "cpu_usage": {
      "current": 45.2,
      "average": 38.7,
      "peak": 78.9
    },
    "memory_usage": {
      "current": 512,
      "average": 489,
      "peak": 678
    },
    "requests_per_second": {
      "current": 125,
      "average": 98,
      "peak": 234
    },
    "response_time": {
      "p50": 45,
      "p95": 120,
      "p99": 250
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
          <Link href="/docs/api">← API</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/api/webhooks">Webhooks →</Link>
        </Button>
      </div>
    </div>
  );
}
