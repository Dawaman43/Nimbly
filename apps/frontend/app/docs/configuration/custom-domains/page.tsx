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

export default function CustomDomainsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Configuration</Badge>
          <Badge variant="outline">Domains</Badge>
        </div>
        <h1 className="text-4xl font-bold">Custom Domains</h1>
        <p className="text-xl text-muted-foreground">
          Configure custom domains for your Nimbly applications
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Domain Configuration Overview</CardTitle>
          <CardDescription>
            Nimbly supports custom domains with automatic SSL certificates and
            DNS management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Automatic SSL</h3>
              <p className="text-sm text-muted-foreground">
                Free SSL certificates via Let's Encrypt
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">DNS Management</h3>
              <p className="text-sm text-muted-foreground">
                Automatic DNS record configuration
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">CDN Integration</h3>
              <p className="text-sm text-muted-foreground">
                Global CDN for improved performance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="setup" className="space-y-4">
        <TabsList>
          <TabsTrigger value="setup">Domain Setup</TabsTrigger>
          <TabsTrigger value="ssl">SSL Certificates</TabsTrigger>
          <TabsTrigger value="dns">DNS Configuration</TabsTrigger>
          <TabsTrigger value="subdomains">Subdomains</TabsTrigger>
        </TabsList>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Adding a Custom Domain</CardTitle>
              <CardDescription>
                Configure a custom domain for your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "domain": "myapp.com",
    "ssl": true
  },

  "environments": {
    "production": {
      "domain": "myapp.com"
    },
    "staging": {
      "domain": "staging.myapp.com"
    }
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CLI Domain Commands</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Add a custom domain
nimbly domains add myapp.com

# List domains
nimbly domains list

# Remove a domain
nimbly domains remove myapp.com

# Check domain status
nimbly domains status myapp.com`}
              />
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              Domain verification can take up to 24 hours to complete. Make sure
              your domain's DNS is properly configured before adding it to
              Nimbly.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="ssl" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SSL Certificate Management</CardTitle>
              <CardDescription>
                Automatic SSL certificate provisioning and renewal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Automatic SSL</h4>
                <p className="text-sm text-muted-foreground">
                  Nimbly automatically provisions and renews SSL certificates
                  for your custom domains using Let's Encrypt.
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
                    • <strong>Wildcard Certificates:</strong> Covers all
                    subdomains (*.domain.com)
                  </li>
                  <li>
                    • <strong>Custom Certificates:</strong> Upload your own
                    certificates
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
      "certificate": "lets_encrypt", // or "custom"
      "redirect_http": true,
      "hsts": {
        "enabled": true,
        "max_age": 31536000,
        "include_subdomains": true
      }
    }
  }
}`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dns" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>DNS Record Configuration</CardTitle>
              <CardDescription>
                Required DNS records for domain verification and routing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">CNAME Record (Recommended)</h4>
                <CodeBlock
                  language="text"
                  code={`Type: CNAME
Name: www (or @ for root domain)
Value: your-app.nimbly.app`}
                />
              </div>

              <div>
                <h4 className="font-semibold">A Records (Root Domain)</h4>
                <CodeBlock
                  language="text"
                  code={`Type: A
Name: @
Value: 1.2.3.4 (Nimbly's IP address)

Type: AAAA
Name: @
Value: 2001:db8::1 (IPv6 address)`}
                />
              </div>

              <div>
                <h4 className="font-semibold">TXT Record (Verification)</h4>
                <CodeBlock
                  language="text"
                  code={`Type: TXT
Name: _nimbly-challenge
Value: abc123def456...`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>DNS Propagation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Add DNS Records</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure the required DNS records in your domain
                      registrar
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Wait for Propagation</h4>
                    <p className="text-sm text-muted-foreground">
                      DNS changes can take 24-48 hours to propagate globally
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Verify Domain</h4>
                    <p className="text-sm text-muted-foreground">
                      Nimbly will automatically verify and activate your domain
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subdomains" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subdomain Routing</CardTitle>
              <CardDescription>
                Route different services to subdomains of your custom domain
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "domain": "myapp.com"
  },

  "services": [
    {
      "name": "web",
      "domain": "www.myapp.com",
      "port": 3000
    },
    {
      "name": "api",
      "domain": "api.myapp.com",
      "port": 3001
    },
    {
      "name": "admin",
      "domain": "admin.myapp.com",
      "port": 3002
    }
  ]
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wildcard Subdomains</CardTitle>
              <CardDescription>
                Support dynamic subdomains for multi-tenant applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "domain": "myapp.com",
    "wildcard_domains": true
  },

  "services": [
    {
      "name": "tenant-app",
      "domain": "*.myapp.com",
      "routing": {
        "type": "subdomain",
        "param": "tenant"
      }
    }
  ]
}`}
              />
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Note:</strong> Wildcard SSL certificates are required for
              wildcard subdomains. Contact support to enable wildcard
              certificates for your account.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/configuration/environment-variables">
            ← Environment Variables
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/security/auth">Security →</Link>
        </Button>
      </div>
    </div>
  );
}
