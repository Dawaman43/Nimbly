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
import {
  Database,
  Zap,
  Shield,
  Globe,
  Cpu,
  HardDrive,
  Network,
  Lock,
  Monitor,
  ArrowRight,
  CheckCircle,
  Star,
} from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <span>Services</span>
        </div>
        <h1 className="text-4xl font-bold">Services</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive cloud services to power your applications.
        </p>
      </div>

      {/* Service Categories */}
      <Tabs defaultValue="compute" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="compute">Compute</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="networking">Networking</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        {/* Compute Services */}
        <TabsContent value="compute" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Compute Services</h2>
            <p className="text-muted-foreground">
              Scalable compute resources for any workload.
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
                    <CardTitle className="text-lg">App Runner</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Containerized
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Fully managed container service for web applications and APIs.
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
                    <span>Load balancing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Built-in monitoring</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Supported:</strong> Docker, Node.js, Python, Go,
                    Java
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
                    <CardTitle className="text-lg">Functions</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Serverless
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Event-driven serverless functions with automatic scaling.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Pay per execution</span>
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
                    <strong>Runtimes:</strong> Node.js, Python, Go, Java, .NET
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Monitor className="h-5 w-5 text-purple-600" />
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
                    <span>Custom configurations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Persistent storage</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Root access</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>OS:</strong> Linux, Windows Server
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Database Services */}
        <TabsContent value="database" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Database Services</h2>
            <p className="text-muted-foreground">
              Managed databases with automatic backups and scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Database className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">PostgreSQL</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Relational
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Advanced open-source relational database.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>ACID compliance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>JSON support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Advanced indexing</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
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
                    <CardTitle className="text-lg">MySQL</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Relational
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Popular open-source relational database.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>High performance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Replication support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Wide ecosystem</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Versions:</strong> 5.7, 8.0, 8.1
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Database className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Redis</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Key-Value
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  High-performance in-memory data structure store.
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
                    <span>Data structures</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Pub/Sub messaging</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    <strong>Versions:</strong> 6.x, 7.x
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Storage Services */}
        <TabsContent value="storage" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Storage Services</h2>
            <p className="text-muted-foreground">
              Durable, scalable storage for any type of data.
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
                  High-performance block storage for databases and applications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>SSD performance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle class="h-4 w-4 text-green-500" />
                    <span>Snapshots & backups</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Encryption at rest</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Networking Services */}
        <TabsContent value="networking" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Networking Services</h2>
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
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Services */}
        <TabsContent value="security" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Security Services</h2>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Lock className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Identity & Access Management
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      IAM
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Centralized authentication and authorization management.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Multi-factor authentication</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Role-based access control</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Audit logging</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started with Services</CardTitle>
          <CardDescription>
            Learn how to integrate these services into your applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/quick-start">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-semibold">Quick Start Guide</div>
                  <div className="text-sm text-muted-foreground">
                    Deploy your first app
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
            <Link href="/docs/api-reference">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-semibold">API Reference</div>
                  <div className="text-sm text-muted-foreground">
                    Service integrations
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
            <Link href="/docs/best-practices">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-semibold">Best Practices</div>
                  <div className="text-sm text-muted-foreground">
                    Optimization tips
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
