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
import {
  Code,
  BarChart3,
  Shield,
  GitBranch,
  Settings,
  Database,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Eye,
  Lock,
} from "lucide-react";

export default function EnvironmentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <span>Environments</span>
        </div>
        <h1 className="text-4xl font-bold">Environments</h1>
        <p className="text-xl text-muted-foreground">
          Manage development, staging, and production environments with
          confidence.
        </p>
      </div>

      {/* Overview */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Nimbly automatically creates and manages isolated environments for
          safe development and testing.
        </AlertDescription>
      </Alert>

      {/* Environment Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <Code className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Development</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  Local
                </Badge>
              </div>
            </div>
            <CardDescription>
              Local development environment with hot reload and debugging tools.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Hot reload</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Source maps</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Debug logging</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground">
                <strong>Resources:</strong> Minimal (local only)
                <br />
                <strong>Cost:</strong> Free
                <br />
                <strong>Access:</strong> Local development
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Staging</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  Testing
                </Badge>
              </div>
            </div>
            <CardDescription>
              Pre-production environment for testing and QA.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Production-like setup</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Test data</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Performance testing</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground">
                <strong>Resources:</strong> Scaled down
                <br />
                <strong>Cost:</strong> Low
                <br />
                <strong>Access:</strong> Team access
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Production</CardTitle>
                <Badge variant="secondary" className="text-xs">
                  Live
                </Badge>
              </div>
            </div>
            <CardDescription>
              Live environment serving real users with full monitoring.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Auto-scaling</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Full monitoring</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Backup & recovery</span>
              </div>
            </div>
            <div className="pt-2 border-t">
              <div className="text-sm text-muted-foreground">
                <strong>Resources:</strong> Auto-scaling
                <br />
                <strong>Cost:</strong> Variable
                <br />
                <strong>Access:</strong> Public
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Environment Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Configuration</CardTitle>
          <CardDescription>
            How to configure different settings for each environment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="variables" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="variables">Environment Variables</TabsTrigger>
              <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
              <TabsTrigger value="security">Security Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="variables" className="space-y-4">
              <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
                <div className="space-y-1">
                  <div className="text-gray-400"># .env.development</div>
                  <div>DATABASE_URL=postgresql://localhost:5432/dev_db</div>
                  <div>REDIS_URL=redis://localhost:6379</div>
                  <div>NODE_ENV=development</div>
                  <div>DEBUG=true</div>
                  <div></div>
                  <div className="text-gray-400"># .env.staging</div>
                  <div>DATABASE_URL=$STAGING_DATABASE_URL</div>
                  <div>REDIS_URL=$STAGING_REDIS_URL</div>
                  <div>NODE_ENV=production</div>
                  <div>DEBUG=false</div>
                  <div></div>
                  <div className="text-gray-400"># .env.production</div>
                  <div>DATABASE_URL=$PRODUCTION_DATABASE_URL</div>
                  <div>REDIS_URL=$PRODUCTION_REDIS_URL</div>
                  <div>NODE_ENV=production</div>
                  <div>DEBUG=false</div>
                </div>
              </div>
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Never commit secrets to version control. Use Nimbly's secret
                  management for sensitive values.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="resources" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Development</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CPU: 0.5 vCPU</li>
                    <li>• Memory: 512MB</li>
                    <li>• Storage: 10GB</li>
                    <li>• Database: Shared</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Staging</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CPU: 1 vCPU</li>
                    <li>• Memory: 1GB</li>
                    <li>• Storage: 20GB</li>
                    <li>• Database: Dedicated</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">Production</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CPU: 2-16 vCPU (auto)</li>
                    <li>• Memory: 2-32GB (auto)</li>
                    <li>• Storage: 100GB+</li>
                    <li>• Database: HA cluster</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Development
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CORS: Permissive</li>
                    <li>• Authentication: Optional</li>
                    <li>• Logging: Verbose</li>
                    <li>• Backups: Manual</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <BarChart3 className="h-4 w-4" />
                    Staging
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CORS: Restricted</li>
                    <li>• Authentication: Required</li>
                    <li>• Logging: Standard</li>
                    <li>• Backups: Daily</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Shield className="h-4 w-4" />
                    Production
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• CORS: Strict</li>
                    <li>• Authentication: MFA</li>
                    <li>• Logging: Encrypted</li>
                    <li>• Backups: Continuous</li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Environment Promotion */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Promotion</CardTitle>
          <CardDescription>
            Safely move code changes through your environments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-2">
                  <Code className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-sm font-semibold">Development</div>
                <div className="text-xs text-muted-foreground">
                  Local testing
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mb-2">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="text-sm font-semibold">Staging</div>
                <div className="text-xs text-muted-foreground">QA testing</div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
              <div className="text-center">
                <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <div className="text-sm font-semibold">Production</div>
                <div className="text-xs text-muted-foreground">Live users</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Automated Promotion</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Git branch protection rules</li>
                <li>• Automated testing gates</li>
                <li>• Manual approval workflows</li>
                <li>• Rollback on failure</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Manual Promotion</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• CLI deployment commands</li>
                <li>• Dashboard deployment</li>
                <li>• API-triggered deployments</li>
                <li>• Environment-specific configs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Git Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Git Integration</CardTitle>
          <CardDescription>How branches map to environments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-4 w-4 text-green-600" />
                <span className="font-semibold">main</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Deploys to production on merge
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-4 w-4 text-yellow-600" />
                <span className="font-semibold">staging</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Deploys to staging on push
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <GitBranch className="h-4 w-4 text-blue-600" />
                <span className="font-semibold">feature/*</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Creates preview deployments
              </p>
            </div>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Nimbly automatically detects your git workflow and sets up
              appropriate environment mappings.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Environment Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Monitoring</CardTitle>
          <CardDescription>
            Monitor performance and health across all environments.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Performance Metrics</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Response times</li>
                <li>• Error rates</li>
                <li>• Resource utilization</li>
                <li>• Throughput</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Health Checks</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Application health</li>
                <li>• Database connectivity</li>
                <li>• External service dependencies</li>
                <li>• SSL certificate validity</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CLI Commands */}
      <Card>
        <CardHeader>
          <CardTitle>Environment CLI Commands</CardTitle>
          <CardDescription>
            Manage environments from the command line.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
              <div>nimbly deploy --env production</div>
              <div className="text-gray-400 text-xs mt-1">
                Deploy to production
              </div>
            </div>
            <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
              <div>nimbly status --env staging</div>
              <div className="text-gray-400 text-xs mt-1">
                Check staging status
              </div>
            </div>
            <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
              <div>nimbly logs --env development --follow</div>
              <div className="text-gray-400 text-xs mt-1">Monitor dev logs</div>
            </div>
            <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
              <div>nimbly list --env all</div>
              <div className="text-gray-400 text-xs mt-1">
                List all environments
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Learn More</CardTitle>
          <CardDescription>
            Deepen your environment management knowledge.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/deployments">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Deployment Strategies
              </Button>
            </Link>
            <Link href="/docs/project-structure">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Project Organization
              </Button>
            </Link>
            <Link href="/docs/monitoring">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Environment Monitoring
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
