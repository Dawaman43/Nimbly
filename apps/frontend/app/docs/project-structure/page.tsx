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
  Database,
  Settings,
  Shield,
  Zap,
  BarChart3,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Code,
  FileText,
  Terminal,
} from "lucide-react";

export default function ProjectStructurePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <span>Project Structure</span>
        </div>
        <h1 className="text-4xl font-bold">Project Structure</h1>
        <p className="text-xl text-muted-foreground">
          Understand how Nimbly organizes your applications and resources.
        </p>
      </div>

      {/* Overview */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Nimbly automatically manages your project structure, but understanding
          it helps you work more effectively.
        </AlertDescription>
      </Alert>

      {/* Project Anatomy */}
      <Card>
        <CardHeader>
          <CardTitle>Project Anatomy</CardTitle>
          <CardDescription>
            How Nimbly organizes your deployed application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-[#1e1e1e] text-white p-6 rounded-lg border font-mono text-sm">
            <div className="space-y-1">
              <div className="text-blue-400">my-app/</div>
              <div className="ml-4">
                ├── <span className="text-green-400">app/</span> # Your
                application code
              </div>
              <div className="ml-4">
                ├── <span className="text-yellow-400">nimbly.config.json</span>{" "}
                # Project configuration
              </div>
              <div className="ml-4">
                ├── <span className="text-cyan-400">package.json</span> #
                Dependencies
              </div>
              <div className="ml-4">
                └── <span className="text-purple-400">.nimbly/</span> # Nimbly
                internal files
              </div>
              <div className="ml-8">
                ├── <span className="text-gray-400">deployments/</span> #
                Deployment history
              </div>
              <div className="ml-8">
                ├── <span className="text-gray-400">logs/</span> # Application
                logs
              </div>
              <div className="ml-8">
                └── <span className="text-gray-400">backups/</span> # Database
                backups
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration File */}
      <Card>
        <CardHeader>
          <CardTitle>nimbly.config.json</CardTitle>
          <CardDescription>
            The heart of your Nimbly project configuration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm overflow-x-auto">
            <div className="space-y-1">
              <div>{"{"}</div>
              <div className="ml-4">"name": "my-awesome-app",</div>
              <div className="ml-4">"version": "1.0.0",</div>
              <div className="ml-4">"framework": "nextjs",</div>
              <div className="ml-4">"buildCommand": "npm run build",</div>
              <div className="ml-4">"startCommand": "npm start",</div>
              <div className="ml-4">"environment": {"{"}</div>
              <div className="ml-8">"NODE_ENV": "production",</div>
              <div className="ml-8">"DATABASE_URL": "$DATABASE_URL"</div>
              <div className="ml-4">{"},"}</div>
              <div className="ml-4">"resources": {"{"}</div>
              <div className="ml-8">"database": "postgresql",</div>
              <div className="ml-8">"cache": "redis",</div>
              <div className="ml-8">"storage": "s3"</div>
              <div className="ml-4">{"},"}</div>
              <div className="ml-4">"scaling": {"{"}</div>
              <div className="ml-8">"minInstances": 1,</div>
              <div className="ml-8">"maxInstances": 10</div>
              <div className="ml-4">{"}"}</div>
              <div>{"}"}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Core Settings</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • <code>name</code> - Project identifier
                </li>
                <li>
                  • <code>version</code> - Application version
                </li>
                <li>
                  • <code>framework</code> - Framework type
                </li>
                <li>
                  • <code>buildCommand</code> - Build script
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • <code>database</code> - Database type
                </li>
                <li>
                  • <code>cache</code> - Cache service
                </li>
                <li>
                  • <code>storage</code> - File storage
                </li>
                <li>
                  • <code>scaling</code> - Auto-scaling rules
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resource Organization */}
      <Tabs defaultValue="database" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="cache">Cache</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="networking">Networking</TabsTrigger>
        </TabsList>

        <TabsContent value="database" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Database Resources
              </CardTitle>
              <CardDescription>
                How Nimbly manages your database infrastructure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Automatic Provisioning</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Instance creation and configuration</li>
                    <li>• Connection string management</li>
                    <li>• Backup scheduling</li>
                    <li>• High availability setup</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Migration Support</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Schema migration tracking</li>
                    <li>• Rollback capabilities</li>
                    <li>• Environment synchronization</li>
                    <li>• Migration testing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cache" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Cache Resources
              </CardTitle>
              <CardDescription>
                Redis and in-memory caching infrastructure.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Performance Optimization</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Session storage</li>
                    <li>• API response caching</li>
                    <li>• Database query caching</li>
                    <li>• Rate limiting</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Data Structures</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Strings, hashes, lists</li>
                    <li>• Sets and sorted sets</li>
                    <li>• Pub/Sub messaging</li>
                    <li>• Atomic operations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="storage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Storage Resources
              </CardTitle>
              <CardDescription>
                File storage and content delivery.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Object Storage</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Static asset hosting</li>
                    <li>• User file uploads</li>
                    <li>• Backup storage</li>
                    <li>• CDN integration</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Versioning support</li>
                    <li>• Access control</li>
                    <li>• Lifecycle policies</li>
                    <li>• Cross-region replication</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="networking" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Networking Resources
              </CardTitle>
              <CardDescription>
                Load balancers, DNS, and security groups.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">Traffic Management</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Global load balancing</li>
                    <li>• SSL/TLS termination</li>
                    <li>• Health checks</li>
                    <li>• Traffic routing</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">Security</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Web application firewall</li>
                    <li>• DDoS protection</li>
                    <li>• Access control lists</li>
                    <li>• Certificate management</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Environment Management */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Management</CardTitle>
          <CardDescription>
            How Nimbly handles multiple deployment environments.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-3">
                <Code className="h-5 w-5 text-green-600" />
              </div>
              <h4 className="font-semibold mb-1">Development</h4>
              <p className="text-sm text-muted-foreground">
                Local development with hot reload
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="h-5 w-5 text-yellow-600" />
              </div>
              <h4 className="font-semibold mb-1">Staging</h4>
              <p className="text-sm text-muted-foreground">
                Pre-production testing environment
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-3">
                <Shield className="h-5 w-5 text-red-600" />
              </div>
              <h4 className="font-semibold mb-1">Production</h4>
              <p className="text-sm text-muted-foreground">
                Live environment with full monitoring
              </p>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Each environment gets its own set of resources and configuration,
              ensuring isolation and safety.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* CLI Integration */}
      <Card>
        <CardHeader>
          <CardTitle>CLI Integration</CardTitle>
          <CardDescription>
            How the CLI interacts with your project structure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Project Commands</h4>
              <div className="space-y-2">
                <div className="bg-[#1e1e1e] text-white p-2 rounded border font-mono text-sm">
                  <div>nimbly init</div>
                  <div className="text-gray-400 text-xs">
                    Create project structure
                  </div>
                </div>
                <div className="bg-[#1e1e1e] text-white p-2 rounded border font-mono text-sm">
                  <div>nimbly deploy --env production</div>
                  <div className="text-gray-400 text-xs">
                    Deploy to specific environment
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resource Commands</h4>
              <div className="space-y-2">
                <div className="bg-[#1e1e1e] text-white p-2 rounded border font-mono text-sm">
                  <div>nimbly status</div>
                  <div className="text-gray-400 text-xs">
                    Check resource status
                  </div>
                </div>
                <div className="bg-[#1e1e1e] text-white p-2 rounded border font-mono text-sm">
                  <div>nimbly logs --follow</div>
                  <div className="text-gray-400 text-xs">
                    Monitor application logs
                  </div>
                </div>
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
            Deepen your understanding of Nimbly's architecture.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/environments">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Environment Management
              </Button>
            </Link>
            <Link href="/docs/databases">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Database Guide
              </Button>
            </Link>
            <Link href="/docs/deployments">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Deployment Process
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
