"use client";

import React, { useState, useEffect } from "react";
import {
    Activity, Cpu, Zap, Clock,
    ArrowDown, ArrowUp, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

export default function MonitoringView() {
    const [stats, setStats] = useState<any>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [statsData, logsData] = await Promise.all([
                    api.get('/monitoring/stats'),
                    api.get('/monitoring/logs'),
                ]);
                setStats(statsData);
                setLogs(logsData || []);
            } catch (error) {
                console.error("Failed to load monitoring data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // A CSS-only Bar Chart Component for the demo
    const CssBarChart = ({ color = "bg-blue-500", data }: { color?: string, data: number[] }) => (
        <div className="flex items-end justify-between h-32 gap-1 mt-4">
            {data.map((h, i) => (
                <div key={i} className="w-full bg-muted/30 rounded-t-sm relative group hover:bg-muted/50 transition-colors cursor-crosshair">
                    <div
                        className={`absolute bottom-0 w-full ${color} rounded-t-sm transition-all duration-500 opacity-80 group-hover:opacity-100`}
                        style={{ height: `${h}%` }}
                    />
                </div>
            ))}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">System Monitoring</h2>
                    <p className="text-muted-foreground">Real-time metrics and log aggregation.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Select defaultValue="1h">
                        <SelectTrigger className="w-[120px]">
                            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                            <SelectValue placeholder="Range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1h">Last Hour</SelectItem>
                            <SelectItem value="24h">Last 24 Hours</SelectItem>
                            <SelectItem value="7d">Last 7 Days</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon"><Download className="h-4 w-4" /></Button>
                </div>
            </div>

            {/* KPI Cards */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i}>
                            <CardHeader className="space-y-0 pb-2">
                                <div className="h-4 bg-muted animate-pulse rounded w-24 mb-2" />
                                <div className="h-8 bg-muted animate-pulse rounded w-16" />
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            ) : stats ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { 
                            title: "Avg CPU Load", 
                            value: stats.metrics && stats.metrics.length > 0 
                                ? `${Math.round(stats.metrics[stats.metrics.length - 1]?.cpu || 0)}%` 
                                : "0%", 
                            icon: Cpu, 
                            trend: stats.metrics && stats.metrics.length > 1 
                                ? `${Math.round((stats.metrics[stats.metrics.length - 1]?.cpu || 0) - (stats.metrics[stats.metrics.length - 2]?.cpu || 0))}%` 
                                : "0%", 
                            trendUp: stats.metrics && stats.metrics.length > 1 
                                ? (stats.metrics[stats.metrics.length - 1]?.cpu || 0) > (stats.metrics[stats.metrics.length - 2]?.cpu || 0)
                                : false 
                        },
                        { 
                            title: "Memory Usage", 
                            value: stats.metrics && stats.metrics.length > 0 
                                ? `${Math.round(stats.metrics[stats.metrics.length - 1]?.memory || 0)}%` 
                                : "0%", 
                            icon: Activity, 
                            trend: stats.metrics && stats.metrics.length > 1 
                                ? `${Math.round((stats.metrics[stats.metrics.length - 1]?.memory || 0) - (stats.metrics[stats.metrics.length - 2]?.memory || 0))}%` 
                                : "0%", 
                            trendUp: stats.metrics && stats.metrics.length > 1 
                                ? (stats.metrics[stats.metrics.length - 1]?.memory || 0) > (stats.metrics[stats.metrics.length - 2]?.memory || 0)
                                : false 
                        },
                        { 
                            title: "Uptime", 
                            value: `${stats.uptime?.toFixed(2) || 0}%`, 
                            icon: Zap, 
                            trend: "Stable", 
                            trendUp: false 
                        },
                        { 
                            title: "Active Alerts", 
                            value: `${stats.activeAlerts || 0}`, 
                            icon: Activity, 
                            trend: stats.activeAlerts > 0 ? "Active" : "None", 
                            trendUp: stats.activeAlerts > 0 
                        },
                    ].map((stat, i) => (
                        <Card key={i}>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                                <stat.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center">
                                    {stat.trendUp ? <ArrowUp className="h-3 w-3 text-red-500 mr-1" /> : <ArrowDown className="h-3 w-3 text-green-500 mr-1" />}
                                    <span className={stat.trendUp ? "text-red-500" : "text-green-500"}>{stat.trend}</span>
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : null}

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>CPU Usage (Core)</CardTitle>
                        <CardDescription>Average usage across all worker nodes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="h-32 bg-muted animate-pulse rounded" />
                        ) : stats?.metrics ? (
                            <>
                                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                    <span>0%</span>
                                    <span>Max: {Math.max(...(stats.metrics.map((m: any) => m.cpu) || [0]))}%</span>
                                </div>
                                <CssBarChart 
                                    color="bg-orange-500" 
                                    data={stats.metrics.slice(-20).map((m: any) => m.cpu)} 
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                    <span>{stats.metrics[0] ? new Date(stats.metrics[0].timestamp).toLocaleTimeString() : ''}</span>
                                    <span>{stats.metrics[stats.metrics.length - 1] ? new Date(stats.metrics[stats.metrics.length - 1].timestamp).toLocaleTimeString() : ''}</span>
                                </div>
                            </>
                        ) : null}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Network Traffic (In/Out)</CardTitle>
                        <CardDescription>Total bandwidth throughput in MB/s.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="h-32 bg-muted animate-pulse rounded" />
                        ) : stats?.metrics ? (
                            <>
                                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                                    <span>0%</span>
                                    <span>Max: {Math.max(...(stats.metrics.map((m: any) => m.memory) || [0]))}%</span>
                                </div>
                                <CssBarChart 
                                    color="bg-blue-500" 
                                    data={stats.metrics.slice(-20).map((m: any) => m.memory)} 
                                />
                                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                    <span>{stats.metrics[0] ? new Date(stats.metrics[0].timestamp).toLocaleTimeString() : ''}</span>
                                    <span>{stats.metrics[stats.metrics.length - 1] ? new Date(stats.metrics[stats.metrics.length - 1].timestamp).toLocaleTimeString() : ''}</span>
                                </div>
                            </>
                        ) : null}
                    </CardContent>
                </Card>
            </div>

            {/* Logs Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent System Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Level</TableHead>
                                <TableHead>Message</TableHead>
                                <TableHead>Source</TableHead>
                                <TableHead className="text-right">Timestamp</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8">
                                        <div className="animate-pulse text-muted-foreground">Loading logs...</div>
                                    </TableCell>
                                </TableRow>
                            ) : logs.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        No logs available
                                    </TableCell>
                                </TableRow>
                            ) : (
                                logs.map((log: any, i: number) => {
                                    const levelColor = log.level === 'error' 
                                        ? 'text-red-500' 
                                        : log.level === 'warn' 
                                        ? 'text-yellow-500' 
                                        : 'text-blue-500';
                                    return (
                                        <TableRow key={log.id || i} className="font-mono text-sm">
                                            <TableCell className={levelColor}>
                                                <Badge variant="outline" className={levelColor}>
                                                    {log.level?.toUpperCase() || 'INFO'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{log.message || log.msg || 'N/A'}</TableCell>
                                            <TableCell className="text-muted-foreground">{log.source || log.src || 'N/A'}</TableCell>
                                            <TableCell className="text-right text-muted-foreground">
                                                {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'N/A'}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
