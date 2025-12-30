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

export default function SecurityPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Security</Badge>
        </div>
        <h1 className="text-4xl font-bold">Security</h1>
        <p className="text-xl text-muted-foreground">
          Secure your Nimbly applications with authentication, encryption, and
          access controls
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Security Overview</CardTitle>
          <CardDescription>
            Nimbly provides comprehensive security features to protect your
            applications and data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Authentication</h3>
              <p className="text-sm text-muted-foreground">
                User authentication and authorization
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">API Security</h3>
              <p className="text-sm text-muted-foreground">
                Secure API access with keys and tokens
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Encryption</h3>
              <p className="text-sm text-muted-foreground">
                Data encryption at rest and in transit
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Access Control</h3>
              <p className="text-sm text-muted-foreground">
                Granular permissions and policies
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Security Best Practices</TabsTrigger>
          <TabsTrigger value="encryption">Encryption</TabsTrigger>
          <TabsTrigger value="monitoring">Security Monitoring</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">1. Use Strong Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Implement multi-factor authentication and strong password
                  policies for all user accounts.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">2. Encrypt Sensitive Data</h4>
                <p className="text-sm text-muted-foreground">
                  Always encrypt sensitive data both at rest and in transit
                  using industry-standard encryption.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">3. Implement Access Controls</h4>
                <p className="text-sm text-muted-foreground">
                  Use the principle of least privilege and implement proper
                  role-based access controls.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">4. Regular Security Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Keep all dependencies and infrastructure components up to date
                  with security patches.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">5. Monitor and Audit</h4>
                <p className="text-sm text-muted-foreground">
                  Implement comprehensive logging and monitoring to detect and
                  respond to security incidents.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="encryption" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Encryption</CardTitle>
              <CardDescription>
                Nimbly automatically encrypts your data using industry-standard
                encryption protocols
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">At Rest Encryption</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• AES-256 encryption for all stored data</li>
                  <li>• Database-level encryption for sensitive fields</li>
                  <li>• Encrypted backups and snapshots</li>
                  <li>• Key rotation and management</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">In Transit Encryption</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• TLS 1.3 for all network communications</li>
                  <li>• Perfect forward secrecy</li>
                  <li>• Certificate pinning support</li>
                  <li>• Secure WebSocket connections</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Encryption Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "encryption": {
      "key_management": "customer_managed",
      "key_rotation": {
        "enabled": true,
        "interval_days": 90
      },
      "backup_encryption": true
    }
  }
}`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Monitoring</CardTitle>
              <CardDescription>
                Continuous monitoring and alerting for security events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Automated Monitoring</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Real-time threat detection</li>
                  <li>• DDoS protection and mitigation</li>
                  <li>• Intrusion detection systems</li>
                  <li>• Log analysis and correlation</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">Security Alerts</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Failed authentication attempts</li>
                  <li>• Suspicious API usage patterns</li>
                  <li>• Configuration changes</li>
                  <li>• Certificate expiration warnings</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Dashboard</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Access comprehensive security metrics and alerts through the
                Nimbly dashboard, including security scores, threat
                intelligence, and compliance status.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Standards</CardTitle>
              <CardDescription>
                Nimbly maintains compliance with industry security standards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">SOC 2 Type II</h4>
                  <p className="text-sm text-muted-foreground">
                    Security, availability, and confidentiality controls
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">GDPR</h4>
                  <p className="text-sm text-muted-foreground">
                    General Data Protection Regulation compliance
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">HIPAA</h4>
                  <p className="text-sm text-muted-foreground">
                    Healthcare data protection (available for eligible
                    customers)
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">PCI DSS</h4>
                  <p className="text-sm text-muted-foreground">
                    Payment card industry data security standard
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Compliance Note:</strong> Certain compliance frameworks
              require additional configuration and may incur additional costs.
              Contact our sales team for details.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/configuration/custom-domains">
            ← Custom Domains
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/security/auth">Authentication →</Link>
        </Button>
      </div>
    </div>
  );
}
