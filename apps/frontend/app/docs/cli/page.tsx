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

export default function CliPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">CLI</Badge>
        </div>
        <h1 className="text-4xl font-bold">Command Line Interface</h1>
        <p className="text-xl text-muted-foreground">
          Powerful CLI tools for managing your Nimbly applications and
          infrastructure
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Nimbly CLI Overview</CardTitle>
          <CardDescription>
            The Nimbly CLI provides a comprehensive set of commands for managing
            your applications, deployments, and infrastructure from the command
            line.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">App Management</h3>
              <p className="text-sm text-muted-foreground">
                Create, deploy, and manage applications
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Infrastructure</h3>
              <p className="text-sm text-muted-foreground">
                Manage databases, domains, and resources
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Monitoring</h3>
              <p className="text-sm text-muted-foreground">
                View logs, metrics, and system status
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Automation</h3>
              <p className="text-sm text-muted-foreground">
                CI/CD integration and scripting
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="installation" className="space-y-4">
        <TabsList>
          <TabsTrigger value="installation">Installation</TabsTrigger>
          <TabsTrigger value="authentication">Authentication</TabsTrigger>
          <TabsTrigger value="workflows">Common Workflows</TabsTrigger>
          <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
        </TabsList>

        <TabsContent value="installation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Install Nimbly CLI</CardTitle>
              <CardDescription>
                Choose your preferred installation method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">npm (Recommended)</h4>
                <CodeBlock
                  language="bash"
                  code={`npm install -g @nimbly/cli`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Homebrew (macOS)</h4>
                <CodeBlock language="bash" code={`brew install nimbly`} />
              </div>

              <div>
                <h4 className="font-semibold">Binary Download</h4>
                <CodeBlock
                  language="bash"
                  code={`# Download from GitHub releases
curl -L https://github.com/nimbly/cli/releases/latest/download/nimbly-linux -o /usr/local/bin/nimbly
chmod +x /usr/local/bin/nimbly`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verify Installation</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Check version
nimbly --version

# View help
nimbly --help

# Update CLI
nimbly update`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="authentication" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CLI Authentication</CardTitle>
              <CardDescription>
                Authenticate with your Nimbly account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Login interactively
nimbly login

# Login with API key
nimbly login --api-key your-api-key

# Check authentication status
nimbly auth status

# Logout
nimbly logout`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Generate API key
nimbly api-keys create --name "cli-access"

# List API keys
nimbly api-keys list

# Use API key for authentication
export NIMBLY_API_KEY=your-api-key
nimbly login --api-key $NIMBLY_API_KEY`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflows" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Development Workflow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold">Initialize Project</h4>
                  <CodeBlock
                    language="bash"
                    code={`nimbly init my-app
cd my-app`}
                  />
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold">Configure Resources</h4>
                  <CodeBlock
                    language="bash"
                    code={`nimbly resources add postgres --name main-db
nimbly resources add redis --name cache`}
                  />
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold">Deploy Application</h4>
                  <CodeBlock
                    language="bash"
                    code={`nimbly deploy --environment staging`}
                  />
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold">Monitor & Debug</h4>
                  <CodeBlock
                    language="bash"
                    code={`nimbly logs --follow
nimbly status`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>CI/CD Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="yaml"
                code={`# .github/workflows/deploy.yml
name: Deploy to Nimbly
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: nimbly/cli-action@v1
        with:
          api-key: \${{ secrets.NIMBLY_API_KEY }}
      - run: nimbly deploy --environment production`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshooting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Issues</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Authentication Issues</h4>
                <CodeBlock
                  language="bash"
                  code={`# Check auth status
nimbly auth status

# Re-login
nimbly logout && nimbly login

# Check API key
echo $NIMBLY_API_KEY`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Deployment Failures</h4>
                <CodeBlock
                  language="bash"
                  code={`# Check deployment status
nimbly deployments list

# View deployment logs
nimbly logs --deployment <deployment-id>

# Validate configuration
nimbly config validate`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Network Issues</h4>
                <CodeBlock
                  language="bash"
                  code={`# Test connectivity
curl -I https://api.nimbly.app

# Check DNS resolution
nslookup api.nimbly.app

# Update CLI
nimbly update`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Help</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# View help for any command
nimbly --help
nimbly deploy --help

# Report issues
nimbly doctor  # Run diagnostics

# Contact support
nimbly support --message "Describe your issue"`}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/security/ssl">← SSL</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/cli/commands">Commands →</Link>
        </Button>
      </div>
    </div>
  );
}
