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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  GitBranch,
  Clock,
  CheckCircle,
  XCircle,
  RotateCcw,
  Eye,
  Settings,
  Zap,
  Globe,
  AlertTriangle,
  ArrowRight,
  Play,
  Pause,
  Square,
} from "lucide-react";

export default function DeploymentsPage() {
  const [deploymentProgress, setDeploymentProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDeploymentProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <span>Deployments</span>
        </div>
        <h1 className="text-4xl font-bold">Deployments</h1>
        <p className="text-xl text-muted-foreground">
          Deploy, manage, and monitor your applications with confidence.
        </p>
      </div>

      {/* Deployment Status Demo */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Active Deployment
          </CardTitle>
          <CardDescription>
            my-awesome-app deployment in progress
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(deploymentProgress)}%</span>
            </div>
            <Progress value={deploymentProgress} className="w-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Status:</span>
              <Badge variant="secondary" className="ml-2">
                {deploymentProgress < 30
                  ? "Building"
                  : deploymentProgress < 70
                    ? "Deploying"
                    : deploymentProgress < 100
                      ? "Configuring"
                      : "Complete"}
              </Badge>
            </div>
            <div>
              <span className="text-muted-foreground">Environment:</span>
              <span className="ml-2">production</span>
            </div>
            <div>
              <span className="text-muted-foreground">Started:</span>
              <span className="ml-2">2 minutes ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deployment Methods */}
      <Tabs defaultValue="cli" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="git">Git Integration</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>

        {/* CLI Deployment */}
        <TabsContent value="cli" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">CLI Deployment</h2>
            <p className="text-muted-foreground">
              Deploy from your terminal with a single command.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Basic Deployment</CardTitle>
                <CardDescription>
                  Deploy your application to production.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <span className="text-green-400 select-none">$</span>
                      <span>nimbly deploy</span>
                    </div>
                    <div className="text-blue-400">
                      Analyzing project structure...
                    </div>
                    <div className="text-blue-400">Building application...</div>
                    <div className="text-blue-400">
                      Provisioning resources...
                    </div>
                    <div className="text-green-400">
                      ✔ Deployment successful!
                    </div>
                    <div className="text-gray-300">
                      URL: https://my-app.nimbly.app
                    </div>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>What happens:</strong>
                  </div>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Code analysis and dependency resolution</li>
                    <li>• Container build and optimization</li>
                    <li>• Resource provisioning (compute, database, etc.)</li>
                    <li>• Load balancer and CDN configuration</li>
                    <li>• SSL certificate setup</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advanced Options</CardTitle>
                <CardDescription>
                  Customize your deployment with flags.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      --env
                    </code>
                    <span className="text-sm text-muted-foreground ml-2">
                      Target environment
                    </span>
                    <div className="text-xs text-muted-foreground mt-1">
                      Options: development, staging, production
                    </div>
                  </div>
                  <div>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      --force
                    </code>
                    <span className="text-sm text-muted-foreground ml-2">
                      Skip confirmation
                    </span>
                  </div>
                  <div>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      --no-cache
                    </code>
                    <span className="text-sm text-muted-foreground ml-2">
                      Skip build cache
                    </span>
                  </div>
                  <div>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      --tag
                    </code>
                    <span className="text-sm text-muted-foreground ml-2">
                      Custom deployment tag
                    </span>
                  </div>
                </div>
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Use <code>--force</code> carefully as it bypasses safety
                    checks.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Git Integration */}
        <TabsContent value="git" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Git Integration</h2>
            <p className="text-muted-foreground">
              Automatic deployments triggered by git pushes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">GitHub Integration</CardTitle>
                <CardDescription>
                  Connect your repository for automatic deployments.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <GitBranch className="h-5 w-5 text-orange-500" />
                    <div>
                      <div className="font-semibold">Push to main</div>
                      <div className="text-sm text-muted-foreground">
                        Triggers production deployment
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GitBranch className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-semibold">Push to develop</div>
                      <div className="text-sm text-muted-foreground">
                        Triggers staging deployment
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GitBranch className="h-5 w-5 text-green-500" />
                    <div>
                      <div className="font-semibold">Pull requests</div>
                      <div className="text-sm text-muted-foreground">
                        Creates preview deployments
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2">Setup Steps:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    <li>1. Connect GitHub repository in dashboard</li>
                    <li>2. Configure branch-to-environment mapping</li>
                    <li>3. Push code to trigger deployment</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Preview Deployments</CardTitle>
                <CardDescription>
                  Test changes before merging to main.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
                  <div>Preview URL: https://pr-42-my-app.nimbly.app</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Features:</strong>
                  </div>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Automatic URL generation</li>
                    <li>• Full environment isolation</li>
                    <li>• Database and cache included</li>
                    <li>• Auto-cleanup after merge</li>
                  </ul>
                </div>
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Preview deployments use the same infrastructure as
                    production.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* API Deployment */}
        <TabsContent value="api" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">API Deployment</h2>
            <p className="text-muted-foreground">
              Programmatically trigger deployments from your CI/CD pipeline.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>REST API</CardTitle>
              <CardDescription>
                Deploy applications programmatically using HTTP requests.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
                <div className="space-y-2">
                  <div className="text-blue-400">POST /api/v1/deployments</div>
                  <div className="text-gray-300">
                    Authorization: Bearer your-api-token
                  </div>
                  <div className="text-gray-300">
                    Content-Type: application/json
                  </div>
                  <div className="text-gray-300 mt-2">{"{"}</div>
                  <div className="text-gray-300 ml-4">
                    "projectId": "my-app",
                  </div>
                  <div className="text-gray-300 ml-4">
                    "environment": "production",
                  </div>
                  <div className="text-gray-300 ml-4">
                    "source": {"{"}"type": "git", "url":
                    "https://github.com/user/repo"{"}"}
                  </div>
                  <div className="text-gray-300">{"}"}</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Required Headers:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>
                      • <code>Authorization</code> - Bearer token
                    </li>
                    <li>
                      • <code>Content-Type</code> - application/json
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Response:</h4>
                  <div className="text-sm text-muted-foreground">
                    Returns deployment ID and status URL
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Dashboard Deployment */}
        <TabsContent value="dashboard" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Dashboard Deployment</h2>
            <p className="text-muted-foreground">
              Deploy and manage applications through the web interface.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">One-Click Deploy</CardTitle>
                <CardDescription>
                  Deploy with a single button click from your dashboard.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg">
                  <div className="text-center">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <div className="font-semibold mb-2">Ready to Deploy</div>
                    <Button>
                      <Play className="h-4 w-4 mr-2" />
                      Deploy Now
                    </Button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Features:</strong>
                  </div>
                  <ul className="text-muted-foreground space-y-1 ml-4">
                    <li>• Real-time deployment logs</li>
                    <li>• Progress indicators</li>
                    <li>• Rollback options</li>
                    <li>• Environment selection</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Deployment History</CardTitle>
                <CardDescription>
                  View and manage past deployments.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold">v1.2.3</div>
                        <div className="text-sm text-muted-foreground">
                          2 hours ago
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">production</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <div className="font-semibold">v1.2.2</div>
                        <div className="text-sm text-muted-foreground">
                          1 day ago
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">staging</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <XCircle className="h-5 w-5 text-red-500" />
                      <div>
                        <div className="font-semibold">v1.2.1</div>
                        <div className="text-sm text-muted-foreground">
                          2 days ago
                        </div>
                      </div>
                    </div>
                    <Badge variant="destructive">failed</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Rollback
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Deployment Lifecycle */}
      <Card>
        <CardHeader>
          <CardTitle>Deployment Lifecycle</CardTitle>
          <CardDescription>
            Understanding the deployment process from start to finish.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-3">
                <Upload className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-1">1. Build</h4>
              <p className="text-sm text-muted-foreground">
                Code analysis, dependency resolution, and container build
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-3">
                <Settings className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold mb-1">2. Provision</h4>
              <p className="text-sm text-muted-foreground">
                Infrastructure setup and resource allocation
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-3">
                <Globe className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-1">3. Deploy</h4>
              <p className="text-sm text-muted-foreground">
                Application deployment and traffic routing
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-orange-600" />
              </div>
              <h4 className="font-semibold mb-1">4. Verify</h4>
              <p className="text-sm text-muted-foreground">
                Health checks and smoke tests
              </p>
            </div>
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="font-semibold mb-1">5. Scale</h4>
              <p className="text-sm text-muted-foreground">
                Auto-scaling and performance optimization
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rollbacks and Recovery */}
      <Card>
        <CardHeader>
          <CardTitle>Rollbacks & Recovery</CardTitle>
          <CardDescription>
            Quickly recover from deployment issues.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Automatic Rollback</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• Health checks fail → automatic rollback</p>
                <p>• Error rate spikes → traffic shift to previous version</p>
                <p>• Database migrations fail → rollback with data restore</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Manual Rollback</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  • CLI: <code>nimbly rollback [version]</code>
                </p>
                <p>• Dashboard: One-click rollback button</p>
                <p>• API: POST to rollback endpoint</p>
              </div>
            </div>
          </div>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Rollbacks preserve data and maintain zero-downtime. Previous
              versions are kept for 30 days.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Best Practices */}
      <Card>
        <CardHeader>
          <CardTitle>Best Practices</CardTitle>
          <CardDescription>Tips for successful deployments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Pre-Deployment</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Run tests locally before deploying</li>
                <li>• Use feature flags for gradual rollouts</li>
                <li>• Backup databases before major changes</li>
                <li>• Review deployment scripts and configs</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Post-Deployment</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Monitor error rates and performance</li>
                <li>• Check logs for unexpected errors</li>
                <li>• Validate database migrations</li>
                <li>• Test critical user flows</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle>Common Issues</CardTitle>
          <CardDescription>
            Solutions to frequent deployment problems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold">Build Failures</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Check build logs and ensure all dependencies are properly
                declared.
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                nimbly logs --build
              </code>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold">Slow Deployments</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Enable build caching and optimize container images.
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                nimbly deploy --no-cache=false
              </code>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold">Environment Issues</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Verify environment variables and configuration.
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                nimbly status --env
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Learn More</CardTitle>
          <CardDescription>Deepen your deployment knowledge.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/cli-commands">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                CLI Reference
              </Button>
            </Link>
            <Link href="/docs/monitoring">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Monitoring Guide
              </Button>
            </Link>
            <Link href="/docs/troubleshooting">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Troubleshooting
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
