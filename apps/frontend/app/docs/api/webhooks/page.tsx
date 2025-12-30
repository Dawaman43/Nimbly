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

export default function WebhooksPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">API</Badge>
          <Badge variant="outline">Webhooks</Badge>
        </div>
        <h1 className="text-4xl font-bold">Webhooks</h1>
        <p className="text-xl text-muted-foreground">
          Real-time event notifications for your applications and integrations
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Webhook Overview</CardTitle>
          <CardDescription>
            Webhooks allow you to receive real-time notifications when events
            occur in your Nimbly projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Real-time</h3>
              <p className="text-sm text-muted-foreground">
                Instant event notifications
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Reliable</h3>
              <p className="text-sm text-muted-foreground">
                Automatic retries and delivery tracking
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Secure</h3>
              <p className="text-sm text-muted-foreground">
                Signature verification and HTTPS
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="setup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="setup">Setup</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Creating Webhooks</CardTitle>
              <CardDescription>
                Register webhook endpoints to receive event notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Via CLI
nimbly webhooks create \\
  --url "https://api.myapp.com/webhooks/nimbly" \\
  --events "deployment.succeeded,deployment.failed" \\
  --secret "my-webhook-secret"

# Via API
curl -X POST "https://api.nimbly.app/v1/webhooks" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://api.myapp.com/webhooks/nimbly",
    "events": ["deployment.succeeded", "deployment.failed"],
    "secret": "my-webhook-secret",
    "active": true
  }'`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Required</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <code>url</code>
                    </TableCell>
                    <TableCell>string</TableCell>
                    <TableCell>HTTPS endpoint to receive webhooks</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>events</code>
                    </TableCell>
                    <TableCell>array</TableCell>
                    <TableCell>Event types to subscribe to</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>secret</code>
                    </TableCell>
                    <TableCell>string</TableCell>
                    <TableCell>Secret for signature verification</TableCell>
                    <TableCell>Yes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>active</code>
                    </TableCell>
                    <TableCell>boolean</TableCell>
                    <TableCell>Whether webhook is active</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <code>headers</code>
                    </TableCell>
                    <TableCell>object</TableCell>
                    <TableCell>Custom headers to include</TableCell>
                    <TableCell>No</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Managing Webhooks</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# List webhooks
nimbly webhooks list

# Update webhook
nimbly webhooks update webhook_123 \\
  --events "deployment.succeeded,app.crashed"

# Test webhook
nimbly webhooks test webhook_123

# Delete webhook
nimbly webhooks delete webhook_123`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Events</CardTitle>
              <CardDescription>
                All webhook events you can subscribe to
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold">Deployment Events</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <code>deployment.started</code>
                        </TableCell>
                        <TableCell>Deployment has begun</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <code>deployment.succeeded</code>
                        </TableCell>
                        <TableCell>Deployment completed successfully</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <code>deployment.failed</code>
                        </TableCell>
                        <TableCell>Deployment failed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <code>deployment.cancelled</code>
                        </TableCell>
                        <TableCell>Deployment was cancelled</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h4 className="font-semibold">Application Events</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <code>app.created</code>
                        </TableCell>
                        <TableCell>Application was created</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <code>app.updated</code>
                        </TableCell>
                        <TableCell>Application configuration changed</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <code>app.deleted</code>
                        </TableCell>
                        <TableCell>Application was deleted</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <code>app.scaled</code>
                        </TableCell>
                        <TableCell>Application was scaled</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <code>app.crashed</code>
                        </TableCell>
                        <TableCell>Application crashed</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div>
                  <h4 className="font-semibold">Resource Events</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Event</TableHead>
                        <TableHead>Description</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <code>resource.created</code>
                        </TableCell>
                        <TableCell>Resource was created</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <code>resource.updated</code>
                        </TableCell>
                        <TableCell>Resource was updated</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <code>resource.deleted</code>
                        </TableCell>
                        <TableCell>Resource was deleted</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <code>resource.backup_completed</code>
                        </TableCell>
                        <TableCell>Resource backup completed</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Payload Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "id": "evt_1234567890",
  "type": "deployment.succeeded",
  "created_at": "2024-01-15T10:30:00Z",
  "data": {
    "deployment": {
      "id": "deploy_12345",
      "app_id": "app_67890",
      "environment": "production",
      "status": "succeeded",
      "started_at": "2024-01-15T10:25:00Z",
      "completed_at": "2024-01-15T10:30:00Z"
    }
  },
  "webhook": {
    "id": "wh_abcdef123456",
    "url": "https://api.myapp.com/webhooks/nimbly"
  }
}`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Webhook Security</CardTitle>
              <CardDescription>
                Ensure your webhook endpoints are secure and authentic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Signature Verification</h4>
                <p className="text-sm text-muted-foreground">
                  All webhooks include a cryptographic signature in the{" "}
                  <code>X-Nimbly-Signature</code> header. Verify this signature
                  to ensure the webhook is authentic.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Signature Verification Code</h4>
                <CodeBlock
                  language="javascript"
                  code={`const crypto = require('crypto');

function verifySignature(payload, signature, secret) {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload, 'utf8')
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

// Usage in webhook handler
app.post('/webhooks/nimbly', (req, res) => {
  const signature = req.headers['x-nimbly-signature'];
  const secret = process.env.WEBHOOK_SECRET;

  if (!verifySignature(JSON.stringify(req.body), signature, secret)) {
    return res.status(401).send('Invalid signature');
  }

  // Process webhook...
  res.sendStatus(200);
});`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">1. Use HTTPS Only</h4>
                <p className="text-sm text-muted-foreground">
                  Webhook endpoints must use HTTPS. HTTP endpoints will be
                  rejected.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">2. Verify Signatures</h4>
                <p className="text-sm text-muted-foreground">
                  Always verify the cryptographic signature to ensure webhook
                  authenticity.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">3. Use Webhook Secrets</h4>
                <p className="text-sm text-muted-foreground">
                  Use unique, randomly generated secrets for each webhook
                  endpoint.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">4. Handle Failures Gracefully</h4>
                <p className="text-sm text-muted-foreground">
                  Return appropriate HTTP status codes and handle duplicate
                  events.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">5. Rate Limiting</h4>
                <p className="text-sm text-muted-foreground">
                  Implement rate limiting on your webhook endpoints to prevent
                  abuse.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Testing Webhooks</CardTitle>
              <CardDescription>
                Test your webhook endpoints before going to production
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Test Webhook Delivery</h4>
                <CodeBlock
                  language="bash"
                  code={`# Send test event
nimbly webhooks test webhook_123 --event deployment.succeeded

# Test with custom payload
nimbly webhooks test webhook_123 \\
  --event app.crashed \\
  --data '{"error": "Connection timeout"}'`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Local Development</h4>
                <CodeBlock
                  language="bash"
                  code={`# Use ngrok for local testing
npm install -g ngrok
ngrok http 3000

# Create webhook with ngrok URL
nimbly webhooks create \\
  --url "https://abc123.ngrok.io/webhooks/nimbly" \\
  --events "*" \\
  --secret "test-secret"`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Webhook Logs</h4>
                <CodeBlock
                  language="bash"
                  code={`# View webhook delivery attempts
nimbly webhooks logs webhook_123

# Check delivery status
nimbly webhooks deliveries webhook_123 --limit 10`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Handling Webhook Failures</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Automatic Retries</h4>
                <p className="text-sm text-muted-foreground">
                  Nimbly automatically retries failed webhook deliveries with
                  exponential backoff. Failed webhooks are retried up to 5 times
                  over 24 hours.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Failure Response Codes</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <code>2xx</code> - Success, webhook processed
                  </li>
                  <li>
                    • <code>3xx</code> - Redirect, Nimbly will follow
                  </li>
                  <li>
                    • <code>4xx</code> - Client error, no retry
                  </li>
                  <li>
                    • <code>5xx</code> - Server error, will retry
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">Idempotency</h4>
                <p className="text-sm text-muted-foreground">
                  Webhook events include unique IDs. Use these to handle
                  duplicate deliveries gracefully.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/api/rest">← REST API</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/api/rate-limits">Rate Limits →</Link>
        </Button>
      </div>
    </div>
  );
}
