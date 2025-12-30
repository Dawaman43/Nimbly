"use client";

import React, { useEffect, useState } from "react";
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
    Activity,
    AlertCircle,
    CreditCard,
    ArrowUpRight,
    Plus,
    Server,
    CheckCircle2,
    Code2,
    Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalResources: 0,
        running: 0,
        stopped: 0,
        failed: 0,
        activeAlerts: 0,
        monthlyCost: 0,
    });
    const [deployments, setDeployments] = useState<any[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const [
                    resourcesData,
                    alertsData,
                    billingData,
                    deploymentsData
                ] = await Promise.all([
                    api.get('/cloud-resources'),
                    api.get('/alerts'),
                    api.get('/billing'),
                    api.get('/deployments')
                ]);

                // Process Stats
                const running = deploymentsData.filter((d: any) => d.status === 'running').length;
                const failed = deploymentsData.filter((d: any) => d.status === 'failed').length;
                const stopped = deploymentsData.filter((d: any) => d.status === 'stopped').length;

                setStats({
                    totalResources: resourcesData.length,
                    running,
                    failed,
                    stopped,
                    activeAlerts: alertsData.length,
                    monthlyCost: billingData.totalAmount || 0,
                });

                setDeployments(deploymentsData);
                setAlerts(alertsData);

            } catch (err) {
                console.error("Failed to load dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    if (loading) {
        return <div className="p-10 text-center animate-pulse">Loading dashboard...</div>;
    }

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
                            Actions required
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
                        <div className="text-2xl font-bold">${stats.monthlyCost.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            Forecast: ${(stats.monthlyCost * 1.15).toFixed(2)}
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
                                {deployments.map((item) => (
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
                                            {item.updatedAt ? new Date(item.updatedAt).toLocaleTimeString() : 'N/A'}
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
                            {alerts.length === 0 ? <p className="text-sm text-muted-foreground">No active alerts</p> : alerts.map((alert) => (
                                <div key={alert.id} className="flex gap-3 text-sm">
                                    <div className="mt-0.5">
                                        {alert.type === 'warning' || alert.type === 'critical' ? (
                                            <AlertCircle className="h-4 w-4 text-orange-500" />
                                        ) : (
                                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-medium">{alert.title}</p>
                                        <p className="text-muted-foreground text-xs mt-0.5">
                                            {alert.message}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
