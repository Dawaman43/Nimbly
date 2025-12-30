"use client";

import React from "react";
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

export default function MonitoringView() {

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Avg CPU Load", value: "42%", icon: Cpu, trend: "+5%", trendUp: true },
                    { title: "Memory Usage", value: "6.2 GB", icon: Activity, trend: "-12%", trendUp: false },
                    { title: "Avg Latency", value: "124ms", icon: Zap, trend: "+2ms", trendUp: true },
                    { title: "Error Rate", value: "0.01%", icon: Activity, trend: "Stable", trendUp: false },
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
                                <span className="ml-1 text-muted-foreground">vs last hour</span>
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Charts Area */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>CPU Usage (Core)</CardTitle>
                        <CardDescription>Average usage across all worker nodes.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                            <span>0%</span>
                            <span>Max: 85%</span>
                        </div>
                        <CssBarChart color="bg-orange-500" data={[20, 30, 25, 40, 35, 50, 45, 60, 55, 40, 30, 25, 35, 45, 50, 65, 70, 60, 50, 40]} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>10:00 AM</span>
                            <span>11:00 AM</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Network Traffic (In/Out)</CardTitle>
                        <CardDescription>Total bandwidth throughput in MB/s.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between text-xs text-muted-foreground mb-2">
                            <span>0 MB/s</span>
                            <span>Max: 500 MB/s</span>
                        </div>
                        <CssBarChart color="bg-blue-500" data={[10, 15, 12, 18, 20, 25, 22, 30, 45, 35, 25, 20, 15, 20, 25, 30, 35, 25, 20, 15]} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>10:00 AM</span>
                            <span>11:00 AM</span>
                        </div>
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
                            {[
                                { level: "Error", msg: "Connection timeout to db-primary-01", src: "api-worker-2", time: "10:42:01", color: "text-red-500" },
                                { level: "Info", msg: "Health check passed", src: "load-balancer", time: "10:41:55", color: "text-blue-500" },
                                { level: "Warn", msg: "Memory usage > 80%", src: "analytics-node", time: "10:40:12", color: "text-yellow-500" },
                                { level: "Info", msg: "Incoming request GET /api/v1/users", src: "gateway", time: "10:39:45", color: "text-blue-500" },
                            ].map((log, i) => (
                                <TableRow key={i} className="font-mono text-sm">
                                    <TableCell className={log.color}>{log.level}</TableCell>
                                    <TableCell>{log.msg}</TableCell>
                                    <TableCell className="text-muted-foreground">{log.src}</TableCell>
                                    <TableCell className="text-right text-muted-foreground">{log.time}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
