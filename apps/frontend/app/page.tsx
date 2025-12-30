"use client";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Cloud,
  Activity,
  AlertCircle,
  CreditCard,
  PlayCircle,
  StopCircle,
  XCircle,
  ArrowUpRight,
  Plus,
  Server,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  // Toggle this to see the Dashboard view
  const isLoggedIn = false;
  const userName = "John Doe";

  const stats = {
    totalResources: 12,
    running: 8,
    stopped: 2,
    failed: 2,
    activeAlerts: 3,
    monthlyCost: 245.67,
  };

  // Mock data for recent activity
  const recentDeployments = [
    {
      id: "dep-1",
      name: "api-server-v2",
      status: "running",
      region: "us-east-1",
      time: "2 mins ago",
    },
    {
      id: "dep-2",
      name: "worker-node-04",
      status: "failed",
      region: "eu-west-1",
      time: "1 hour ago",
    },
    {
      id: "dep-3",
      name: "database-replica",
      status: "stopped",
      region: "us-east-1",
      time: "3 hours ago",
    },
    {
      id: "dep-4",
      name: "frontend-dashboard",
      status: "running",
      region: "us-west-2",
      time: "5 hours ago",
    },
  ];

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-muted/20">
        <div className="container max-w-screen-2xl mx-auto px-4 py-8">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {userName}. Here is what's happening today.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline">View Logs</Button>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> New Deployment
              </Button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Resources
                </CardTitle>
                <Server className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalResources}</div>
                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                  <span className="text-green-600 flex items-center mr-1">
                    <ArrowUpRight className="h-3 w-3 mr-0.5" /> +2
                  </span>
                  from last month
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Health Status
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm mt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-semibold">{stats.running}</span>
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-yellow-500" />
                    <span className="text-muted-foreground">
                      {stats.stopped}
                    </span>
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="text-red-600 font-medium">
                      {stats.failed}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  System operating normally
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm border-orange-200 dark:border-orange-900 bg-orange-50/30 dark:bg-orange-950/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-orange-800 dark:text-orange-400">
                  Active Alerts
                </CardTitle>
                <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                  {stats.activeAlerts}
                </div>
                <p className="text-xs text-orange-600/80 dark:text-orange-400/80 mt-1">
                  Requires attention
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Est. Cost</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stats.monthlyCost}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Projected: ${Math.floor(stats.monthlyCost * 1.1)}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Table */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4 shadow-sm">
              <CardHeader>
                <CardTitle>Recent Deployments</CardTitle>
                <CardDescription>
                  You have {stats.running} active deployments managed by Nimbly.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead className="text-right">Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentDeployments.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Cloud className="h-4 w-4 text-muted-foreground" />
                            {item.name}
                          </div>
                        </TableCell>
                        <TableCell>
                          {item.status === "running" && (
                            <Badge
                              variant="outline"
                              className="border-transparent bg-green-500/15 text-green-700 hover:bg-green-500/25 dark:bg-green-500/10 dark:text-green-400"
                            >
                              <PlayCircle className="w-3 h-3 mr-1" /> Running
                            </Badge>
                          )}
                          {item.status === "failed" && (
                            <Badge
                              variant="outline"
                              className="border-transparent bg-red-500/15 text-red-700 hover:bg-red-500/25 dark:bg-red-500/10 dark:text-red-400"
                            >
                              <XCircle className="w-3 h-3 mr-1" /> Failed
                            </Badge>
                          )}
                          {item.status === "stopped" && (
                            <Badge
                              variant="secondary"
                              className="text-muted-foreground"
                            >
                              <StopCircle className="w-3 h-3 mr-1" /> Stopped
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {item.region}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground text-sm">
                          {item.time}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Quick Actions / Side Panel */}
            <Card className="col-span-3 shadow-sm bg-muted/5 border-none">
              <CardHeader>
                <CardTitle className="text-base">
                  System Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-start gap-4 rounded-lg border bg-card p-3 shadow-sm">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-orange-500" />
                  <div className="grid gap-1">
                    <p className="text-sm font-medium">High Latency Detected</p>
                    <p className="text-xs text-muted-foreground">
                      Region us-east-1 is experiencing higher than normal
                      latency.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-lg border bg-card p-3 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-green-500" />
                  <div className="grid gap-1">
                    <p className="text-sm font-medium">Backup Completed</p>
                    <p className="text-xs text-muted-foreground">
                      Daily snapshot created successfully at 04:00 AM.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Non-Logged In State (Landing Page)
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Technical Dot Background */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="relative container mx-auto px-4 py-24 flex flex-col items-center">
        {/* Badge / Pill */}
        <div className="mb-6 inline-flex items-center rounded-full border bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800 px-3 py-1 text-sm font-medium text-orange-700 dark:text-orange-400 shadow-sm">
          <span className="mr-2 flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
          Beta Version
        </div>

        {/* Hero Content */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
            Infrastructure logic <br />
            <span className="text-muted-foreground">for modern teams.</span>
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Nimbly provides the primitive components to build, deploy, and scale
            your cloud infrastructure without the complexity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/auth/signup">Start Deploying</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base bg-background/50 backdrop-blur-sm"
            >
              <Link href="/auth/login">Read Documentation</Link>
            </Button>
          </div>
        </div>

        {/* Product Visual / Mockup */}
        <div className="relative w-full max-w-5xl mt-8">
          <div className="relative rounded-xl border bg-background/50 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-background/20">
            {/* Browser Toolbar Mockup */}
            <div className="flex items-center gap-1.5 border-b bg-muted/40 p-4">
              <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="h-3 w-3 rounded-full bg-green-500/20 border border-green-500/50" />
              <div className="ml-4 h-6 w-full max-w-[300px] rounded-md bg-muted/50" />
            </div>
            {/* Fake UI Content */}
            <div className="p-8 grid gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center justify-between">
                <div className="h-8 w-48 bg-muted rounded animate-pulse" />
                <div className="h-8 w-24 bg-primary/20 rounded animate-pulse" />
              </div>
              <div className="grid grid-cols-3 gap-6">
                <div className="h-32 rounded-lg bg-muted border border-border/50" />
                <div className="h-32 rounded-lg bg-muted border border-border/50" />
                <div className="h-32 rounded-lg bg-muted border border-border/50" />
              </div>
              <div className="h-64 rounded-lg bg-muted border border-border/50" />
            </div>
          </div>

          {/* Decorative glow behind mockup (No gradient, just shadow) */}
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-muted-foreground/5 blur-2xl" />
        </div>
      </div>
    </div>
  );
}
