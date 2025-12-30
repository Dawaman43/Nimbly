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

export default function ApiPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">API</Badge>
        </div>
        <h1 className="text-4xl font-bold">Nimbly API</h1>
        <p className="text-xl text-muted-foreground">
          Programmatic access to Nimbly platform features and resources
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Overview</CardTitle>
          <CardDescription>
            The Nimbly API provides comprehensive access to all platform
            features, enabling automation, integration, and custom tooling.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">REST API</h3>
              <p className="text-sm text-muted-foreground">
                HTTP-based API for all operations
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Webhooks</h3>
              <p className="text-sm text-muted-foreground">
                Real-time event notifications
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Rate Limits</h3>
              <p className="text-sm text-muted-foreground">
                Fair usage policies and limits
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">SDKs</h3>
              <p className="text-sm text-muted-foreground">
                Official client libraries
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="basics" className="space-y-4">
        <TabsList>
          <TabsTrigger value="basics">API Basics</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="sdks">SDKs</TabsTrigger>
          <TabsTrigger value="errors">Error Handling</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Base URL</CardTitle>
              <CardDescription>
                All API requests should be made to the following base URL
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock language="text" code={`https://api.nimbly.app/v1`} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Request Format</CardTitle>
              <CardDescription>
                All requests use JSON for request bodies and responses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Headers</h4>
                <CodeBlock
                  language="text"
                  code={`Content-Type: application/json
Authorization: Bearer your-api-key
X-Nimbly-Project: your-project-id`}
                />
              </div>

              <div>
                <h4 className="font-semibold">HTTP Methods</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <code>GET</code> - Retrieve resources
                  </li>
                  <li>
                    • <code>POST</code> - Create resources
                  </li>
                  <li>
                    • <code>PUT</code> - Update resources
                  </li>
                  <li>
                    • <code>PATCH</code> - Partial updates
                  </li>
                  <li>
                    • <code>DELETE</code> - Remove resources
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Response Format</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Key Authentication</CardTitle>
              <CardDescription>
                Authenticate API requests using API keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Bearer Token</h4>
                <CodeBlock
                  language="bash"
                  code={`curl -X GET "https://api.nimbly.app/v1/projects" \\
  -H "Authorization: Bearer nk_prod_1234567890abcdef" \\
  -H "Content-Type: application/json"`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Query Parameter</h4>
                <CodeBlock
                  language="bash"
                  code={`curl -X GET "https://api.nimbly.app/v1/projects?api_key=nk_prod_1234567890abcdef"`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Creating API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Via CLI
nimbly api-keys create --name "my-api-key" --environment production

# Via API
curl -X POST "https://api.nimbly.app/v1/api-keys" \\
  -H "Authorization: Bearer your-admin-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "my-api-key",
    "environment": "production",
    "permissions": ["read", "write"]
  }'`}
              />
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Security Note:</strong> Keep your API keys secure and
              never commit them to version control. Use environment variables or
              secret management systems to store API keys.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="sdks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Official SDKs</CardTitle>
              <CardDescription>
                Official client libraries for popular programming languages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">JavaScript/TypeScript</h4>
                <CodeBlock
                  language="bash"
                  code={`npm install @nimbly/sdk

import { Nimbly } from '@nimbly/sdk';

const client = new Nimbly({
  apiKey: process.env.NIMBLY_API_KEY
});

const projects = await client.projects.list();`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Python</h4>
                <CodeBlock
                  language="bash"
                  code={`pip install nimbly-sdk

from nimbly import Nimbly

client = Nimbly(api_key=os.environ['NIMBLY_API_KEY'])
projects = client.projects.list()`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Go</h4>
                <CodeBlock
                  language="bash"
                  code={`go get github.com/nimbly/go-sdk

import "github.com/nimbly/go-sdk/nimbly"

client := nimbly.NewClient(nimbly.WithAPIKey(os.Getenv("NIMBLY_API_KEY")))
projects, err := client.Projects.List(context.Background())`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Community SDKs</h4>
                <p className="text-sm text-muted-foreground">
                  Community-maintained SDKs are available for additional
                  languages including Ruby, PHP, Java, and .NET. Check the{" "}
                  <a
                    href="https://github.com/nimbly"
                    className="text-primary hover:underline"
                  >
                    Nimbly GitHub organization
                  </a>{" "}
                  for the latest list.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="errors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Error Response Format</CardTitle>
              <CardDescription>
                Standardized error responses across all API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data",
    "details": {
      "field": "email",
      "reason": "must be a valid email address"
    }
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Error Codes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">4xx Client Errors</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • <code>400 Bad Request</code> - Invalid request data
                    </li>
                    <li>
                      • <code>401 Unauthorized</code> - Missing or invalid
                      authentication
                    </li>
                    <li>
                      • <code>403 Forbidden</code> - Insufficient permissions
                    </li>
                    <li>
                      • <code>404 Not Found</code> - Resource not found
                    </li>
                    <li>
                      • <code>429 Too Many Requests</code> - Rate limit exceeded
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">5xx Server Errors</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • <code>500 Internal Server Error</code> - Unexpected
                      server error
                    </li>
                    <li>
                      • <code>502 Bad Gateway</code> - Upstream service error
                    </li>
                    <li>
                      • <code>503 Service Unavailable</code> - Service
                      temporarily unavailable
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error Handling Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Retry Logic</h4>
                <CodeBlock
                  language="javascript"
                  code={`async function apiCallWithRetry(url, options, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response.json();

      // Don't retry client errors
      if (response.status >= 400 && response.status < 500) {
        throw new Error(\`Client error: \${response.status}\`);
      }

      // Retry server errors with exponential backoff
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        continue;
      }

      throw new Error(\`Server error: \${response.status}\`);
    } catch (error) {
      if (i === maxRetries - 1) throw error;
    }
  }
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Rate Limit Handling</h4>
                <CodeBlock
                  language="javascript"
                  code={`// Check rate limit headers
const response = await fetch('/api/endpoint');
const remaining = response.headers.get('X-RateLimit-Remaining');
const reset = response.headers.get('X-RateLimit-Reset');

if (remaining === '0') {
  const resetTime = new Date(parseInt(reset) * 1000);
  console.log(\`Rate limit exceeded. Resets at \${resetTime}\`);
}`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/cli/examples">← CLI Examples</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/api/rest">REST API →</Link>
        </Button>
      </div>
    </div>
  );
}
