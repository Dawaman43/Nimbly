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

export default function ApiKeysPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Security</Badge>
          <Badge variant="outline">API Keys</Badge>
        </div>
        <h1 className="text-4xl font-bold">API Keys</h1>
        <p className="text-xl text-muted-foreground">
          Manage API keys for secure service-to-service communication
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>API Key Management</CardTitle>
          <CardDescription>
            Create, manage, and secure API keys for programmatic access to your
            applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Key Generation</h3>
              <p className="text-sm text-muted-foreground">
                Secure random key generation
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Access Control</h3>
              <p className="text-sm text-muted-foreground">
                Granular permissions and scopes
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Usage Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                Track and limit API usage
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="creating" className="space-y-4">
        <TabsList>
          <TabsTrigger value="creating">Creating Keys</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="creating" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate API Keys</CardTitle>
              <CardDescription>
                Create new API keys through the Nimbly dashboard or CLI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Create a new API key
nimbly api-keys create --name "production-api" --environment production

# Create with specific permissions
nimbly api-keys create \\
  --name "webhook-service" \\
  --permissions "webhooks:read,webhooks:write" \\
  --rate-limit "1000/hour"

# Output:
# API Key: nk_prod_1234567890abcdef
# Secret: sk_prod_abcdef1234567890`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Key Types</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Use Case</TableHead>
                    <TableHead>Prefix</TableHead>
                    <TableHead>Security</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Production</TableCell>
                    <TableCell>Live application access</TableCell>
                    <TableCell>
                      <code>nk_prod_</code>
                    </TableCell>
                    <TableCell>Full access, rate limited</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Development</TableCell>
                    <TableCell>Development and testing</TableCell>
                    <TableCell>
                      <code>nk_dev_</code>
                    </TableCell>
                    <TableCell>Restricted access</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Service</TableCell>
                    <TableCell>Service-to-service communication</TableCell>
                    <TableCell>
                      <code>nk_svc_</code>
                    </TableCell>
                    <TableCell>Scoped permissions</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Temporary</TableCell>
                    <TableCell>Short-term access</TableCell>
                    <TableCell>
                      <code>nk_tmp_</code>
                    </TableCell>
                    <TableCell>Auto-expiring</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Permission Scopes</CardTitle>
              <CardDescription>
                Define what actions an API key can perform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "permissions": [
    "apps:read",
    "apps:write",
    "apps:delete",
    "deployments:read",
    "deployments:create",
    "logs:read",
    "metrics:read",
    "webhooks:create",
    "webhooks:read",
    "webhooks:delete"
  ]
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Permission Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Read-Only Access</h4>
                <CodeBlock
                  language="bash"
                  code={`nimbly api-keys create \\
  --name "monitoring" \\
  --permissions "apps:read,deployments:read,logs:read,metrics:read"`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Deployment Access</h4>
                <CodeBlock
                  language="bash"
                  code={`nimbly api-keys create \\
  --name "ci-cd" \\
  --permissions "deployments:create,deployments:read,apps:read"`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Webhook Management</h4>
                <CodeBlock
                  language="bash"
                  code={`nimbly api-keys create \\
  --name "webhook-service" \\
  --permissions "webhooks:create,webhooks:read,webhooks:delete"`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rate Limiting</CardTitle>
              <CardDescription>
                Control API usage with configurable rate limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Set rate limits
nimbly api-keys update nk_prod_123... \\
  --rate-limit "1000/hour" \\
  --burst-limit 100

# Different limit types
--rate-limit "100/second"   # Requests per second
--rate-limit "5000/minute"  # Requests per minute
--rate-limit "100000/hour"  # Requests per hour
--rate-limit "unlimited"    # No rate limiting`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Usage Monitoring</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Check Usage Statistics</h4>
                <CodeBlock
                  language="bash"
                  code={`# View API key usage
nimbly api-keys usage nk_prod_123...

# Output:
# API Key: nk_prod_1234567890abcdef
# Requests (24h): 2,847 / 10,000
# Rate Limit: 1000/hour
# Last Used: 2024-01-15 14:30:22 UTC`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Usage Alerts</h4>
                <p className="text-sm text-muted-foreground">
                  Set up alerts for when API keys approach their rate limits or
                  show unusual usage patterns.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Key Security</CardTitle>
              <CardDescription>
                Best practices for securing your API keys
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Key Storage</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Store keys in environment variables, not code</li>
                  <li>• Use secret management services</li>
                  <li>• Rotate keys regularly</li>
                  <li>• Never commit keys to version control</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Access Control</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use least privilege principle</li>
                  <li>• Restrict keys to specific environments</li>
                  <li>• Set appropriate rate limits</li>
                  <li>• Monitor key usage patterns</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Key Rotation</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Rotate an API key
nimbly api-keys rotate nk_prod_123...

# This creates a new key and marks the old one for expiration
# Update your applications with the new key before the old one expires

# Force immediate expiration of old keys
nimbly api-keys cleanup --expired`}
              />
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Security Warning:</strong> API keys provide direct access
              to your applications. Treat them with the same security as
              passwords and rotate them regularly.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/security/auth">← Authentication</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/security/ssl">SSL →</Link>
        </Button>
      </div>
    </div>
  );
}
