"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Terminal,
  CheckCircle,
  ArrowRight,
  AlertCircle,
  Zap,
  Cloud,
  Database,
} from "lucide-react";

export default function QuickStartPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <span>Quick Start</span>
        </div>
        <h1 className="text-4xl font-bold">Quick Start</h1>
        <p className="text-xl text-muted-foreground">
          Deploy your first application to Nimbly in under 10 minutes.
        </p>
      </div>

      {/* Prerequisites */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Before you begin, make sure you have{" "}
          <Link
            href="/docs/installation"
            className="underline hover:text-foreground"
          >
            installed the Nimbly CLI
          </Link>{" "}
          and have a Nimbly account.
        </AlertDescription>
      </Alert>

      {/* Step by Step Guide */}
      <div className="space-y-8">
        {/* Step 1: Login */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <span className="text-sm font-bold text-orange-600">1</span>
              </div>
              <div>
                <CardTitle>Authenticate with Nimbly</CardTitle>
                <CardDescription>Log in to your Nimbly account</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-green-400 select-none">$</span>
                  <span>nimbly login</span>
                </div>
                <div className="text-gray-400">
                  ? Enter your email: user@example.com
                </div>
                <div className="text-gray-400">
                  ? Enter your password: [hidden]
                </div>
                <div className="text-green-400">
                  ✔ Successfully logged in as user@example.com
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Your credentials will be stored securely for future deployments.
            </p>
          </CardContent>
        </Card>

        {/* Step 2: Initialize Project */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <span className="text-sm font-bold text-orange-600">2</span>
              </div>
              <div>
                <CardTitle>Initialize Your Project</CardTitle>
                <CardDescription>
                  Create a new Nimbly project in your current directory
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-green-400 select-none">$</span>
                  <span>nimbly init my-awesome-app</span>
                </div>
                <div className="text-gray-400">
                  ? What is the name of your project? my-awesome-app
                </div>
                <div className="text-gray-400">
                  ? Select your framework: Next.js
                </div>
                <div className="text-gray-400">
                  ? Select features to enable: Database (Postgres), Redis Cache
                </div>
                <div className="text-green-400">✔ Project initialized!</div>
                <div className="text-gray-300">Created nimbly.config.json</div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">What was created:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • <code>nimbly.config.json</code> - Project configuration
                  </li>
                  <li>• Sample application code</li>
                  <li>• Environment-specific settings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Framework Options:</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Python/Flask</Badge>
                  <Badge variant="secondary">Go</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Deploy */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <span className="text-sm font-bold text-orange-600">3</span>
              </div>
              <div>
                <CardTitle>Deploy to Production</CardTitle>
                <CardDescription>
                  Push your application live with a single command
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
              <div className="space-y-2">
                <div className="flex gap-2">
                  <span className="text-green-400 select-none">$</span>
                  <span>cd my-awesome-app</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-400 select-none">$</span>
                  <span>nimbly deploy</span>
                </div>
                <div className="text-blue-400">
                  Analyzing project structure...
                </div>
                <div className="text-blue-400">Building application...</div>
                <div className="text-blue-400">
                  Provisioning resources (AWS)...
                </div>
                <div className="text-blue-400">Uploading assets...</div>
                <div className="text-green-400">✔ Deployment successful!</div>
                <div className="text-gray-300">Environment: development</div>
                <div className="text-gray-300">
                  URL: https://my-awesome-app.nimbly.app
                </div>
              </div>
            </div>
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Your application is now live! Nimbly automatically provisioned
                all necessary infrastructure including databases, load
                balancers, and CDN.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* What's Next */}
        <Card>
          <CardHeader>
            <CardTitle>🎉 Congratulations!</CardTitle>
            <CardDescription>
              Your application is now deployed and running. Here's what Nimbly
              set up for you:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Cloud className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="font-semibold">Compute</div>
                  <div className="text-sm text-muted-foreground">
                    Auto-scaling instances
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Database className="h-8 w-8 text-green-500" />
                <div>
                  <div className="font-semibold">Database</div>
                  <div className="text-sm text-muted-foreground">
                    PostgreSQL with backups
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Zap className="h-8 w-8 text-yellow-500" />
                <div>
                  <div className="font-semibold">CDN</div>
                  <div className="text-sm text-muted-foreground">
                    Global edge network
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-3">Next Steps:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link href="/docs/project-structure">
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Explore Project Structure
                  </Button>
                </Link>
                <Link href="/docs/environments">
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Set Up Multiple Environments
                  </Button>
                </Link>
                <Link href="/docs/cli/commands">
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Learn More CLI Commands
                  </Button>
                </Link>
                <Link href="/docs/custom-domains">
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Add Custom Domain
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            If you run into any issues during deployment, here are some
            resources:
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-3">
                <Terminal className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-1">CLI Help</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Get help with any command
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                nimbly --help
              </code>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-1">Status Check</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Monitor your deployment
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                nimbly status
              </code>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-3">
                <Cloud className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-1">Logs</h4>
              <p className="text-sm text-muted-foreground mb-2">
                View application logs
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                nimbly logs
              </code>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
