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

export default function SslPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Security</Badge>
          <Badge variant="outline">SSL/TLS</Badge>
        </div>
        <h1 className="text-4xl font-bold">SSL/TLS Certificates</h1>
        <p className="text-xl text-muted-foreground">
          Secure your applications with SSL/TLS encryption and certificate
          management
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>SSL Certificate Management</CardTitle>
          <CardDescription>
            Nimbly provides automatic SSL certificate provisioning and
            management for all domains
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Auto SSL</h3>
              <p className="text-sm text-muted-foreground">
                Automatic certificate provisioning
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Let's Encrypt</h3>
              <p className="text-sm text-muted-foreground">
                Free certificates with auto-renewal
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Custom Certs</h3>
              <p className="text-sm text-muted-foreground">
                Upload your own certificates
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="automatic" className="space-y-4">
        <TabsList>
          <TabsTrigger value="automatic">Automatic SSL</TabsTrigger>
          <TabsTrigger value="custom">Custom Certificates</TabsTrigger>
          <TabsTrigger value="renewal">Certificate Renewal</TabsTrigger>
          <TabsTrigger value="security">SSL Security</TabsTrigger>
        </TabsList>

        <TabsContent value="automatic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Let's Encrypt Integration</CardTitle>
              <CardDescription>
                Automatic SSL certificates for all your domains
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">How It Works</h4>
                <p className="text-sm text-muted-foreground">
                  Nimbly automatically requests and renews SSL certificates from
                  Let's Encrypt for all configured domains. Certificates are
                  valid for 90 days and renewed automatically.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Certificate Types</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>DV Certificates:</strong> Domain Validation (free,
                    automatic)
                  </li>
                  <li>
                    • <strong>Wildcard Certificates:</strong> Covers
                    *.domain.com (additional setup required)
                  </li>
                  <li>
                    • <strong>Multi-domain Certificates:</strong> Multiple
                    domains in one certificate
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SSL Configuration</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "ssl": {
      "enabled": true,
      "provider": "lets_encrypt",
      "email": "admin@yourdomain.com",
      "auto_renewal": true,
      "renewal_days_before": 30
    }
  },

  "environments": {
    "production": {
      "ssl": {
        "hsts": {
          "enabled": true,
          "max_age": 31536000,
          "include_subdomains": true,
          "preload": false
        }
      }
    }
  }
}`}
              />
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Note:</strong> Let's Encrypt has rate limits for
              certificate requests. Avoid deleting and recreating domains
              frequently to prevent hitting these limits.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Custom SSL Certificates</CardTitle>
              <CardDescription>
                Upload your own SSL certificates for advanced security
                requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Upload custom certificate
nimbly ssl upload \\
  --domain yourdomain.com \\
  --certificate cert.pem \\
  --private-key key.pem \\
  --chain chain.pem

# Upload wildcard certificate
nimbly ssl upload \\
  --domain "*.yourdomain.com" \\
  --certificate wildcard-cert.pem \\
  --private-key wildcard-key.pem`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Certificate Formats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Required Files</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <strong>Certificate (.pem/.crt):</strong> Your domain
                    certificate
                  </li>
                  <li>
                    • <strong>Private Key (.key):</strong> The private key for
                    your certificate
                  </li>
                  <li>
                    • <strong>Certificate Chain (.pem):</strong> Intermediate
                    certificates (optional but recommended)
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">Supported Formats</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• PEM (Privacy Enhanced Mail)</li>
                  <li>• DER (Distinguished Encoding Rules)</li>
                  <li>• PKCS#7 (.p7b)</li>
                  <li>• PKCS#12 (.pfx/.p12)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renewal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Certificate Renewal</CardTitle>
              <CardDescription>
                Automatic and manual certificate renewal processes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Automatic Renewal</h4>
                <p className="text-sm text-muted-foreground">
                  Nimbly automatically monitors certificate expiration dates and
                  renews certificates before they expire. You'll receive
                  notifications about upcoming renewals.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Manual Renewal</h4>
                <CodeBlock
                  language="bash"
                  code={`# Check certificate status
nimbly ssl status yourdomain.com

# Manually renew certificate
nimbly ssl renew yourdomain.com

# Force renewal (bypasses rate limits)
nimbly ssl renew yourdomain.com --force`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Renewal Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm font-semibold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold">30 Days Notice</h4>
                    <p className="text-sm text-muted-foreground">
                      Email notification sent when certificate expires in 30
                      days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-sm font-semibold">
                    !
                  </div>
                  <div>
                    <h4 className="font-semibold">7 Days Notice</h4>
                    <p className="text-sm text-muted-foreground">
                      Urgent notification for certificates expiring within 7
                      days
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-sm font-semibold">
                    ✗
                  </div>
                  <div>
                    <h4 className="font-semibold">Expiration</h4>
                    <p className="text-sm text-muted-foreground">
                      Alert when certificate has expired
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SSL/TLS Security Settings</CardTitle>
              <CardDescription>
                Configure advanced SSL security options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "ssl": {
      "protocols": ["TLSv1.2", "TLSv1.3"],
      "ciphers": [
        "ECDHE-RSA-AES256-GCM-SHA384",
        "ECDHE-RSA-AES128-GCM-SHA256"
      ],
      "hsts": {
        "enabled": true,
        "max_age": 31536000,
        "include_subdomains": true,
        "preload": true
      },
      "redirect_http": true,
      "ocsp_stapling": true
    }
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Headers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">
                  HTTP Strict Transport Security (HSTS)
                </h4>
                <p className="text-sm text-muted-foreground">
                  Forces browsers to use HTTPS and prevents protocol downgrade
                  attacks.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">OCSP Stapling</h4>
                <p className="text-sm text-muted-foreground">
                  Improves SSL handshake performance by including certificate
                  revocation status.
                </p>
              </div>

              <div>
                <h4 className="font-semibold">Certificate Transparency</h4>
                <p className="text-sm text-muted-foreground">
                  All certificates are logged in public Certificate Transparency
                  logs for monitoring.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SSL Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Test SSL configuration
nimbly ssl test yourdomain.com

# Check certificate details
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# SSL Labs test (external service)
curl -s "https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com" | grep -o '<title>[^<]*'`}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/security/api-keys">← API Keys</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/cli/commands">CLI →</Link>
        </Button>
      </div>
    </div>
  );
}
