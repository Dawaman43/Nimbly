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
  HardDrive,
  Network,
  Zap,
  Cpu,
  Globe,
  Shield,
  Settings,
  Plus,
  Trash2,
  Eye,
  Edit,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <span>Resources</span>
        </div>
        <h1 className="text-4xl font-bold">Cloud Resources</h1>
        <p className="text-xl text-muted-foreground">
          Manage and monitor your cloud infrastructure resources.
        </p>
      </div>

      {/* Overview */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Nimbly automatically provisions and manages most resources for you.
          Use the dashboard or CLI to monitor and scale resources as needed.
        </AlertDescription>
      </Alert>

      {/* Resource Types */}
      <Tabs defaultValue="compute" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="compute">Compute</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="networking">Networking</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Compute Resources */}
        <TabsContent value="compute" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Compute Resources</h2>
            <p className="text-muted-foreground">
              Virtual machines, containers, and serverless functions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Cpu className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">App Instances</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Auto-scaling
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Containerized application instances with automatic scaling.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Auto-scaling based on CPU/memory</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Load balancing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Health monitoring</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Scaling:</strong> 1-50 instances
                    <br />
                    <strong>CPU:</strong> 0.25-4 vCPUs
                    <br />
                    <strong>Memory:</strong> 512MB-16GB
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Serverless Functions
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Pay-per-use
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Event-driven functions that scale to zero.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Sub-second cold starts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Global deployment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Built-in triggers</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Runtime:</strong> 100ms-15min
                    <br />
                    <strong>Memory:</strong> 128MB-3GB
                    <br />
                    <strong>Triggers:</strong> HTTP, Events, Cron
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Virtual Machines</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      IaaS
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Full control over virtualized infrastructure.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Root access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Custom configurations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Persistent storage</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>OS:</strong> Linux, Windows
                    <br />
                    <strong>CPU:</strong> 1-96 vCPUs
                    <br />
                    <strong>Memory:</strong> 1GB-384GB
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Database Resources */}
        <TabsContent value="database" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Database Resources</h2>
            <p className="text-muted-foreground">
              Managed database instances with automatic backups and scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">PostgreSQL</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Primary
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Advanced relational database with JSON support.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Automatic backups</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Read replicas</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Point-in-time recovery</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Storage:</strong> 20GB-16TB
                    <br />
                    <strong>Connections:</strong> Up to 500
                    <br />
                    <strong>Versions:</strong> 13, 14, 15, 16
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Database className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Redis Cache</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Cache
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  High-performance in-memory data store.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Sub-millisecond latency</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Data persistence</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Pub/Sub messaging</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Memory:</strong> 256MB-100GB
                    <br />
                    <strong>Throughput:</strong> Up to 16GB/s
                    <br />
                    <strong>Versions:</strong> 6.x, 7.x
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Storage Resources */}
        <TabsContent value="storage" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Storage Resources</h2>
            <p className="text-muted-foreground">
              Durable, scalable storage for files, backups, and assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <HardDrive className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Object Storage</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      S3 Compatible
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Scalable object storage with global CDN integration.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>99.999999999% durability</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Global CDN</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Versioning support</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Storage:</strong> Unlimited
                    <br />
                    <strong>Transfer:</strong> Free egress
                    <br />
                    <strong>Features:</strong> Encryption, Lifecycle
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <HardDrive className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Block Storage</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Persistent
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  High-performance block storage for databases and VMs.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>SSD performance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Snapshots & backups</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Encryption at rest</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Size:</strong> 10GB-16TB
                    <br />
                    <strong>IOPS:</strong> Up to 64,000
                    <br />
                    <strong>Throughput:</strong> Up to 1,000 MB/s
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Networking Resources */}
        <TabsContent value="networking" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Networking Resources</h2>
            <p className="text-muted-foreground">
              Global networking infrastructure for secure connectivity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Load Balancer</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Global
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Distribute traffic across multiple instances globally.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Global distribution</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>SSL termination</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Health checks</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Requests/sec:</strong> Up to 100,000
                    <br />
                    <strong>Regions:</strong> 200+ edge locations
                    <br />
                    <strong>Protocols:</strong> HTTP/2, WebSocket
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Network className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">CDN</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Edge Network
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Global content delivery network for fast asset delivery.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>200+ edge locations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Real-time analytics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Custom rules</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Cache Hit Rate:</strong> 95%+
                    <br />
                    <strong>Purge:</strong> Instant invalidation
                    <br />
                    <strong>Security:</strong> DDoS protection
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Resources */}
        <TabsContent value="security" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Security Resources</h2>
            <p className="text-muted-foreground">
              Enterprise-grade security for your applications and data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Web Application Firewall
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      WAF
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Protect against common web vulnerabilities and attacks.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>OWASP Top 10 protection</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>DDoS mitigation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Real-time monitoring</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Rules:</strong> 200+ managed rules
                    <br />
                    <strong>Requests/sec:</strong> Up to 10,000
                    <br />
                    <strong>False Positives:</strong> &lt;0.1%
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      SSL/TLS Certificates
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Encryption
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Automatic SSL certificate management and renewal.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Auto-renewal</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Wildcard support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Custom domains</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Type:</strong> Let's Encrypt
                    <br />
                    <strong>Grade:</strong> A+ SSL Labs
                    <br />
                    <strong>Domains:</strong> Unlimited
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Resource Management */}
      <Card>
        <CardHeader>
          <CardTitle>Resource Management</CardTitle>
          <CardDescription>
            Tools and best practices for managing your cloud resources.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Eye className="h-8 w-8 text-blue-500" />
              <div>
                <div className="font-semibold">Monitor</div>
                <div className="text-sm text-muted-foreground">
                  Track usage and performance
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Settings className="h-8 w-8 text-green-500" />
              <div>
                <div className="font-semibold">Scale</div>
                <div className="text-sm text-muted-foreground">
                  Adjust resources as needed
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Shield className="h-8 w-8 text-purple-500" />
              <div>
                <div className="font-semibold">Secure</div>
                <div className="text-sm text-muted-foreground">
                  Configure security settings
                </div>
              </div>
            </div>
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Cost Optimization:</strong> Resources are automatically
              scaled down during low-traffic periods. Monitor your usage in the
              dashboard to optimize costs.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* CLI Commands */}
      <Card>
        <CardHeader>
          <CardTitle>CLI Resource Commands</CardTitle>
          <CardDescription>
            Manage resources from the command line.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
              <div>nimbly status</div>
              <div className="text-gray-400 text-xs mt-1">
                Check resource status
              </div>
            </div>
            <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
              <div>nimbly logs --follow</div>
              <div className="text-gray-400 text-xs mt-1">
                Monitor resource logs
              </div>
            </div>
            <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
              <div>nimbly list</div>
              <div className="text-gray-400 text-xs mt-1">
                List all resources
              </div>
            </div>
            <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
              <div>nimbly destroy [resource]</div>
              <div className="text-gray-400 text-xs mt-1">Remove resources</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Learn More</CardTitle>
          <CardDescription>
            Deepen your understanding of resource management.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/services">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Service Overview
              </Button>
            </Link>
            <Link href="/docs/monitoring">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Monitoring Guide
              </Button>
            </Link>
            <Link href="/docs/best-practices">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Best Practices
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
