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

export default function RateLimitsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">API</Badge>
          <Badge variant="outline">Rate Limits</Badge>
        </div>
        <h1 className="text-4xl font-bold">Rate Limits</h1>
        <p className="text-xl text-muted-foreground">
          Understanding and managing API rate limits for optimal usage
        </p>
      </div>

      <Alert>
        <AlertDescription>
          Rate limits help ensure fair usage and system stability. All API
          requests are subject to rate limiting.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Rate Limit Overview</CardTitle>
          <CardDescription>
            How rate limiting works in the Nimbly API
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Request-based</h3>
              <p className="text-sm text-muted-foreground">
                Limits per time window
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Sliding Window</h3>
              <p className="text-sm text-muted-foreground">
                Rolling time windows
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">429 Response</h3>
              <p className="text-sm text-muted-foreground">
                HTTP 429 when exceeded
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="limits" className="space-y-4">
        <TabsList>
          <TabsTrigger value="limits">Rate Limits</TabsTrigger>
          <TabsTrigger value="headers">Headers</TabsTrigger>
          <TabsTrigger value="handling">Handling</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="limits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Rate Limits</CardTitle>
              <CardDescription>
                Current rate limits for different API endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Endpoint Type</TableHead>
                    <TableHead>Limit</TableHead>
                    <TableHead>Window</TableHead>
                    <TableHead>Scope</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Authentication</TableCell>
                    <TableCell>10 requests</TableCell>
                    <TableCell>1 minute</TableCell>
                    <TableCell>IP address</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Project Management</TableCell>
                    <TableCell>100 requests</TableCell>
                    <TableCell>1 minute</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Application Management</TableCell>
                    <TableCell>200 requests</TableCell>
                    <TableCell>1 minute</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Deployment Operations</TableCell>
                    <TableCell>50 requests</TableCell>
                    <TableCell>1 minute</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Resource Management</TableCell>
                    <TableCell>150 requests</TableCell>
                    <TableCell>1 minute</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Monitoring & Logs</TableCell>
                    <TableCell>300 requests</TableCell>
                    <TableCell>1 minute</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Billing & Usage</TableCell>
                    <TableCell>50 requests</TableCell>
                    <TableCell>1 minute</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Webhooks</TableCell>
                    <TableCell>100 requests</TableCell>
                    <TableCell>1 minute</TableCell>
                    <TableCell>User</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Plan-based Limits</CardTitle>
              <CardDescription>
                Higher limits available with paid plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Free Plan</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• 1,000 requests/hour</li>
                    <li>• 10 concurrent builds</li>
                    <li>• 1GB bandwidth/month</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Pro Plan</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• 10,000 requests/hour</li>
                    <li>• 50 concurrent builds</li>
                    <li>• 10GB bandwidth/month</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Enterprise Plan</h4>
                  <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                    <li>• Unlimited requests</li>
                    <li>• Unlimited builds</li>
                    <li>• Unlimited bandwidth</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="headers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rate Limit Headers</CardTitle>
              <CardDescription>
                HTTP headers included in API responses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Header</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Example</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>X-RateLimit-Limit</code>
                    </TableCell>
                    <TableCell>
                      Maximum requests allowed in current window
                    </TableCell>
                    <TableCell>
                      <code>100</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>X-RateLimit-Remaining</code>
                    </TableCell>
                    <TableCell>Remaining requests in current window</TableCell>
                    <TableCell>
                      <code>87</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>X-RateLimit-Reset</code>
                    </TableCell>
                    <TableCell>
                      Time when rate limit resets (Unix timestamp)
                    </TableCell>
                    <TableCell>
                      <code>1640995200</code>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>X-RateLimit-Retry-After</code>
                    </TableCell>
                    <TableCell>
                      Seconds to wait before retrying (when limit exceeded)
                    </TableCell>
                    <TableCell>
                      <code>60</code>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Example Response Headers</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="http"
                code={`HTTP/1.1 200 OK
Content-Type: application/json
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1640995200
X-RateLimit-Retry-After: 60

{
  "data": "..."
}`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="handling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Handling Rate Limits</CardTitle>
              <CardDescription>
                How to handle rate limit responses in your application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">429 Too Many Requests</h4>
                <p className="text-sm text-muted-foreground">
                  When you exceed rate limits, the API returns HTTP 429 with
                  rate limit headers.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Rate Limit Response</h4>
                <CodeBlock
                  language="json"
                  code={`{
  "error": {
    "type": "rate_limit_exceeded",
    "message": "Rate limit exceeded. Try again in 60 seconds.",
    "retry_after": 60
  }
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Client Implementation</h4>
                <CodeBlock
                  language="javascript"
                  code={`async function apiRequest(endpoint, options = {}) {
  const response = await fetch(\`https://api.nimbly.app/v1/\${endpoint}\`, {
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (response.status === 429) {
    const retryAfter = response.headers.get('X-RateLimit-Retry-After');
    const resetTime = new Date(parseInt(retryAfter) * 1000);

    console.log(\`Rate limited. Retry after: \${resetTime}\`);

    // Wait and retry
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    return apiRequest(endpoint, options);
  }

  if (!response.ok) {
    throw new Error(\`API Error: \${response.status}\`);
  }

  return response.json();
}`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Exponential Backoff</CardTitle>
              <CardDescription>
                Implement exponential backoff for resilient API calls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="javascript"
                code={`class RateLimitHandler {
  constructor() {
    this.baseDelay = 1000; // 1 second
    this.maxDelay = 30000; // 30 seconds
    this.maxRetries = 5;
  }

  async request(endpoint, options = {}, retryCount = 0) {
    try {
      const response = await fetch(\`https://api.nimbly.app/v1/\${endpoint}\`, {
        headers: {
          'Authorization': \`Bearer \${API_KEY}\`,
          ...options.headers
        },
        ...options
      });

      if (response.status === 429) {
        if (retryCount >= this.maxRetries) {
          throw new Error('Max retries exceeded');
        }

        const retryAfter = response.headers.get('X-RateLimit-Retry-After');
        const delay = Math.min(
          this.baseDelay * Math.pow(2, retryCount),
          this.maxDelay,
          parseInt(retryAfter) * 1000 || this.maxDelay
        );

        console.log(\`Rate limited. Retrying in \${delay}ms...\`);
        await new Promise(resolve => setTimeout(resolve, delay));

        return this.request(endpoint, options, retryCount + 1);
      }

      return response.json();
    } catch (error) {
      if (retryCount < this.maxRetries) {
        const delay = Math.min(
          this.baseDelay * Math.pow(2, retryCount),
          this.maxDelay
        );

        console.log(\`Request failed. Retrying in \${delay}ms...\`);
        await new Promise(resolve => setTimeout(resolve, delay));

        return this.request(endpoint, options, retryCount + 1);
      }

      throw error;
    }
  }
}`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="best-practices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rate Limiting Best Practices</CardTitle>
              <CardDescription>
                Optimize your API usage and avoid rate limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold">1. Monitor Rate Limit Headers</h4>
                <p className="text-sm text-muted-foreground">
                  Always check the <code>X-RateLimit-Remaining</code> header to
                  track your usage.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">2. Implement Caching</h4>
                <p className="text-sm text-muted-foreground">
                  Cache API responses to reduce the number of requests and
                  improve performance.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">3. Use Batch Operations</h4>
                <p className="text-sm text-muted-foreground">
                  When available, use batch endpoints to perform multiple
                  operations in a single request.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">4. Handle Bursts Gracefully</h4>
                <p className="text-sm text-muted-foreground">
                  Implement queuing for burst requests and process them at a
                  sustainable rate.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">5. Set Up Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Monitor your API usage and set up alerts when approaching rate
                  limits.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">
                  6. Respect Retry-After Headers
                </h4>
                <p className="text-sm text-muted-foreground">
                  When rate limited, always respect the <code>Retry-After</code>{" "}
                  header value.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rate Limit Monitoring</CardTitle>
              <CardDescription>
                Tools and techniques for monitoring API usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="javascript"
                code={`class APIMonitor {
  constructor() {
    this.usage = {
      requests: 0,
      remaining: null,
      resetTime: null
    };
  }

  updateFromHeaders(headers) {
    this.usage.remaining = parseInt(headers.get('X-RateLimit-Remaining'));
    this.usage.resetTime = new Date(parseInt(headers.get('X-RateLimit-Reset')) * 1000);
    this.usage.requests = parseInt(headers.get('X-RateLimit-Limit')) - this.usage.remaining;
  }

  getUsagePercentage() {
    if (!this.usage.remaining) return 0;
    const total = this.usage.requests + this.usage.remaining;
    return ((total - this.usage.remaining) / total) * 100;
  }

  shouldThrottle() {
    return this.getUsagePercentage() > 80; // Throttle when >80% used
  }

  getTimeToReset() {
    if (!this.usage.resetTime) return 0;
    return Math.max(0, this.usage.resetTime - new Date());
  }
}

// Usage
const monitor = new APIMonitor();

async function monitoredRequest(endpoint) {
  if (monitor.shouldThrottle()) {
    const waitTime = monitor.getTimeToReset();
    console.log(\`Throttling requests. Waiting \${waitTime}ms until reset.\`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }

  const response = await fetch(\`https://api.nimbly.app/v1/\${endpoint}\`, {
    headers: { 'Authorization': \`Bearer \${API_KEY}\` }
  });

  monitor.updateFromHeaders(response.headers);

  return response.json();
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upgrading Your Plan</CardTitle>
              <CardDescription>
                Need higher rate limits? Consider upgrading your plan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Check current usage
nimbly billing usage

# View available plans
nimbly billing plans

# Upgrade to Pro plan
nimbly billing upgrade --plan pro

# Check rate limits after upgrade
curl -H "Authorization: Bearer your-api-key" \\
     https://api.nimbly.app/v1/rate-limits`}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/api/webhooks">← Webhooks</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs">Back to Docs</Link>
        </Button>
      </div>
    </div>
  );
}
