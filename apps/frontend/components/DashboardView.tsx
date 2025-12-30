"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  ArrowUpRight,
  Plus,
  Server,
  CheckCircle2,
  LayoutDashboard,
  Settings,
  Search,
  Bell,
  Code2,
  Terminal,
  Sun,
  Moon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Import new views
import ResourcesView from "@/components/dashboard/resources-view";
import MonitoringView from "@/components/dashboard/monitoring-view";
import BillingView from "@/components/dashboard/billing-view";
import SettingsView from "@/components/dashboard/settings-view";

export default function DashboardView() {
  const [currentView, setCurrentView] = useState("dashboard");
  const { setTheme } = useTheme();

  const userName = "John Doe";
  const stats = {
    totalResources: 12,
    running: 8,
    stopped: 2,
    failed: 2,
    activeAlerts: 3,
    monthlyCost: 245.67,
  };

  const recentDeployments = [
    {
      id: "dep-1",
      name: "api-server-v2",
      status: "running",
      region: "us-east-1",
      time: "2m ago",
      cpu: "45%",
    },
    {
      id: "dep-2",
      name: "worker-node-04",
      status: "failed",
      region: "eu-west-1",
      time: "1h ago",
      cpu: "0%",
    },
    {
      id: "dep-3",
      name: "db-replica-01",
      status: "stopped",
      region: "us-east-1",
      time: "3h ago",
      cpu: "0%",
    },
    {
      id: "dep-4",
      name: "frontend-main",
      status: "running",
      region: "us-west-2",
      time: "5h ago",
      cpu: "12%",
    },
    {
      id: "dep-5",
      name: "cache-redis-x",
      status: "running",
      region: "us-east-1",
      time: "1d ago",
      cpu: "28%",
    },
  ];

  /* 
     Helper to render Content based on currentView 
  */
  const renderContent = () => {
    switch (currentView) {
      case "resources":
        return <ResourcesView />;
      case "monitoring":
        return <MonitoringView />;
      case "billing":
        return <BillingView />;
      case "settings":
        return <SettingsView />;
      case "dashboard":
      default:
        return (
          <div className="space-y-8">
            {/* Header Action Area */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Overview</h1>
                <p className="text-muted-foreground">
                  System health and resource monitoring.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Terminal className="h-4 w-4 mr-2" /> CLI
                </Button>
                <Button
                  size="sm"
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" /> Deploy Resource
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
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
                    new this week
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    System Health
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">98.9%</div>
                  <div className="w-full bg-muted h-1 mt-2 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full w-[98.9%]" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 dark:border-orange-900 bg-orange-50/50 dark:bg-orange-950/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-400">
                    Active Alerts
                  </CardTitle>
                  <AlertCircle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                    {stats.activeAlerts}
                  </div>
                  <p className="text-xs text-orange-600/80 dark:text-orange-400/80 mt-1">
                    2 critical, 1 warning
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Current Month
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${stats.monthlyCost}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Forecast: ${Math.floor(stats.monthlyCost * 1.15)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-7">
              {/* Main Table */}
              <Card className="md:col-span-5 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Deployments</CardTitle>
                    <CardDescription>
                      Manage your active infrastructure nodes.
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    View All
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Instance Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Load</TableHead>
                        <TableHead className="hidden sm:table-cell">
                          Region
                        </TableHead>
                        <TableHead className="text-right">Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentDeployments.map((item) => (
                        <TableRow
                          key={item.id}
                          className="cursor-pointer hover:bg-muted/50"
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded bg-muted">
                                <Code2 className="h-4 w-4 text-foreground/70" />
                              </div>
                              <div className="flex flex-col">
                                <span>{item.name}</span>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                  {item.id}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {item.status === "running" && (
                              <Badge
                                variant="outline"
                                className="border-transparent bg-green-500/15 text-green-700 dark:text-green-400 font-normal"
                              >
                                Running
                              </Badge>
                            )}
                            {item.status === "failed" && (
                              <Badge
                                variant="outline"
                                className="border-transparent bg-red-500/15 text-red-700 dark:text-red-400 font-normal"
                              >
                                Failed
                              </Badge>
                            )}
                            {item.status === "stopped" && (
                              <Badge
                                variant="secondary"
                                className="font-normal text-muted-foreground"
                              >
                                Stopped
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full ${parseInt(item.cpu) > 40 ? "bg-orange-500" : "bg-blue-500"}`}
                                  style={{ width: item.cpu }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {item.cpu}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell text-muted-foreground text-sm">
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

              {/* Side Panel: CSS-Only Chart & Notifications */}
              <div className="md:col-span-2 space-y-6">
                {/* Visual Fake Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Usage History (24h)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between h-32 gap-2 mt-2">
                      {[35, 60, 45, 70, 50, 65, 85].map((h, i) => (
                        <div
                          key={i}
                          className="w-full bg-orange-100 dark:bg-orange-950/30 rounded-t-sm relative group"
                        >
                          <div
                            className="absolute bottom-0 w-full bg-orange-500 rounded-t-sm transition-all duration-500 group-hover:bg-orange-600"
                            style={{ height: `${h}%` }}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                      <span>00:00</span>
                      <span>12:00</span>
                      <span>23:59</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-transparent border-0 shadow-none">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-base">Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 grid gap-4">
                    <div className="flex gap-3 text-sm">
                      <div className="mt-0.5">
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                      </div>
                      <div>
                        <p className="font-medium">High Latency</p>
                        <p className="text-muted-foreground text-xs mt-0.5">
                          Region us-east-1 is experiencing degraded performance.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <div className="mt-0.5">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      </div>
                      <div>
                        <p className="font-medium">Backup Ready</p>
                        <p className="text-muted-foreground text-xs mt-0.5">
                          Snapshot sn-492 completed.
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
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "resources", label: "Resources", icon: Server },
    { id: "monitoring", label: "Monitoring", icon: Activity },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-background fixed inset-y-0 z-10 transition-all">
        <div className="h-16 flex items-center px-6 border-b">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="h-6 w-6 rounded bg-orange-600 flex items-center justify-center text-white">
              <Cloud className="h-4 w-4" />
            </div>
            Nimbly
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={currentView === item.id ? "secondary" : "ghost"}
              className={`w-full justify-start font-medium ${currentView !== item.id && "text-muted-foreground"}`}
              onClick={() => setCurrentView(item.id)}
            >
              <item.icon className="mr-2 h-4 w-4" /> {item.label}
            </Button>
          ))}
        </nav>
        <div className="p-4 border-t">
          <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-100 dark:border-orange-900">
            <p className="text-xs font-medium text-orange-800 dark:text-orange-400 mb-2">
              Usage Limit
            </p>
            <div className="h-1.5 w-full bg-orange-200 dark:bg-orange-900 rounded-full mb-2 overflow-hidden">
              <div className="h-full bg-orange-500 w-[75%] rounded-full" />
            </div>
            <p className="text-[10px] text-muted-foreground">
              75% of included tier used
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 mb-16 md:mb-0">
        {/* Top Header */}
        <header className="h-16 border-b bg-background/50 backdrop-blur sticky top-0 z-10 px-6 flex items-center justify-between">
          <div className="md:hidden flex items-center gap-2 font-bold">
            <Cloud className="h-5 w-5 text-orange-600" /> Nimbly
          </div>

          <div className="hidden md:flex items-center text-muted-foreground text-sm">
            <span className="text-foreground font-medium">Team Titan</span>
            <span className="mx-2">/</span>
            <span>Production Environment</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="w-64 pl-9 h-9 bg-background"
              />
            </div>

            {/* Theme Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-orange-500 rounded-full border-2 border-background" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8 border">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="p-6 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50 flex justify-between px-6 h-16 safe-area-bottom">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${currentView === item.id
                ? "text-orange-600 dark:text-orange-500"
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
