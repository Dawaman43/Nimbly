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
import {
  Terminal,
  Cloud,
  Database,
  Shield,
  Zap,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Clock,
  Globe,
} from "lucide-react";

export default function DocsPage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm">
          <span className="mr-2 flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          v2.0 Documentation
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Nimbly Docs
          </span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Everything you need to know about deploying infrastructure with
          Nimbly. From your first deployment to advanced configurations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/docs/quick-start">
            <Button
              size="lg"
              className="h-12 px-8 text-base bg-orange-600 hover:bg-orange-700"
            >
              <Terminal className="mr-2 h-5 w-5" />
              Get Started
            </Button>
          </Link>
          <Link href="/docs/installation">
            <Button variant="outline" size="lg" className="h-12 px-8 text-base">
              <Cloud className="mr-2 h-5 w-5" />
              Install CLI
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold">99.9%</div>
            <div className="text-sm text-muted-foreground">Uptime</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold">&lt;2min</div>
            <div className="text-sm text-muted-foreground">Deploy Time</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
              <Globe className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold">35+</div>
            <div className="text-sm text-muted-foreground">Regions</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold">10K+</div>
            <div className="text-sm text-muted-foreground">Developers</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-16">
        {/* Getting Started */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Getting Started</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              New to Nimbly? Start here to get up and running in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/docs/installation">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                    <Terminal className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Installation</CardTitle>
                  <CardDescription>
                    Install the Nimbly CLI and set up your development
                    environment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>5 min read</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/quick-start">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Quick Start</CardTitle>
                  <CardDescription>
                    Deploy your first application in under 10 minutes.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>10 min read</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/cli-commands">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                    <Terminal className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>CLI Commands</CardTitle>
                  <CardDescription>
                    Complete reference for all Nimbly CLI commands and options.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>15 min read</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Core Concepts */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Core Concepts</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn the fundamental concepts that make Nimbly powerful and easy
              to use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/docs/services">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
                    <Cloud className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-center">Services</CardTitle>
                  <CardDescription className="text-center">
                    Your application components
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/docs/resources">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center mx-auto mb-4">
                    <Database className="h-6 w-6 text-cyan-600" />
                  </div>
                  <CardTitle className="text-center">Resources</CardTitle>
                  <CardDescription className="text-center">
                    Databases, caches, and storage
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/docs/deployments">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-pink-600" />
                  </div>
                  <CardTitle className="text-center">Deployments</CardTitle>
                  <CardDescription className="text-center">
                    Automated deployment pipelines
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/docs/environments">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-6 w-6 text-indigo-600" />
                  </div>
                  <CardTitle className="text-center">Environments</CardTitle>
                  <CardDescription className="text-center">
                    Development, staging, production
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </section>

        {/* API Reference */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">API Reference</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Programmatic access to Nimbly's infrastructure platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/docs/api/rest">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mb-4">
                    <Terminal className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>REST API</CardTitle>
                  <CardDescription>
                    Complete REST API reference for managing projects, apps, and
                    resources.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>20 min read</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/api/webhooks">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Webhooks</CardTitle>
                  <CardDescription>
                    Real-time event notifications for deployments, apps, and
                    resources.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>15 min read</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/api/rate-limits">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Rate Limits</CardTitle>
                  <CardDescription>
                    Understanding and managing API rate limits for optimal
                    usage.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>10 min read</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Popular Guides */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Popular Guides</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step-by-step tutorials for common tasks and integrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Deploying Next.js Apps</CardTitle>
                    <CardDescription>
                      Complete guide to deploying Next.js applications with
                      Nimbly
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">Popular</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Automatic build optimization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Static asset handling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>API route deployment</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>Database Integration</CardTitle>
                    <CardDescription>
                      Connect your applications to PostgreSQL and Redis
                      databases
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">Essential</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Automatic connection strings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Migration support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Backup and recovery</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CLI Preview */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Powerful CLI</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deploy from your terminal with our intuitive command-line
              interface.
            </p>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="bg-[#1e1e1e] text-white p-6 rounded-lg border shadow-sm font-mono text-sm overflow-x-auto">
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <span className="text-green-400 select-none">$</span>
                    <span>nimbly init my-awesome-app</span>
                  </div>
                  <div className="text-gray-400">
                    ? Select your framework: Next.js
                  </div>
                  <div className="text-gray-400">
                    ? Select features to enable: Database (Postgres), Redis
                    Cache
                  </div>
                  <div className="text-green-400">✔ Project initialized!</div>
                  <div className="flex gap-2">
                    <span className="text-green-400 select-none">$</span>
                    <span>cd my-awesome-app && nimbly deploy</span>
                  </div>
                  <div className="text-blue-400">
                    Analyzing project structure...
                  </div>
                  <div className="text-blue-400">Building application...</div>
                  <div className="text-green-400">✔ Deployment successful!</div>
                  <div className="text-gray-400">
                    URL: https://my-awesome-app.nimbly.app
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t text-center text-muted-foreground text-sm">
        <p>
          Built by Nimbly Infrastructure. The source code is available on
          GitHub.
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span>All systems operational</span>
        </div>
      </div>
    </div>
  );
}
