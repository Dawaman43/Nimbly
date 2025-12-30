"use client";

import React, { useState, useEffect } from "react";
import {
    Search, Filter, Plus, MoreHorizontal,
    Server, Database, HardDrive, Globe,
    PlayCircle, StopCircle, RefreshCw, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Card, CardContent,
} from "@/components/ui/card";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/lib/api";

export default function ResourcesView() {
    const [filter, setFilter] = useState("");
    const [resources, setResources] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResources = async () => {
            try {
                const data = await api.get('/cloud-resources', true); // Use cache
                // Improve data compatibility: map backend fields to frontend UI fields if necessary
                const mapped = data.map((r: any) => ({
                    id: r.id,
                    name: r.name,
                    type: r.type === 'EC2' ? 'Compute' : r.type === 'S3' ? 'Storage' : r.type === 'RDS' ? 'Database' : 'Network',
                    spec: r.type === 'EC2' ? `vCPU ${Math.ceil(r.cpu / 10)} / ${r.ram}GB` : 'Standard',
                    region: 'us-east-1', // default if missing
                    status: r.status,
                    ip: r.ip || '-' // Not currently in entity, would need migration, using placeholder
                }));
                setResources(mapped);
            } catch (error) {
                console.error("Failed to fetch resources", error);
            } finally {
                setLoading(false);
            }
        };
        fetchResources();
    }, []);

    const getIcon = (type: string) => {
        switch (type) {
            case "Compute": return <Server className="h-4 w-4" />;
            case "Database": return <Database className="h-4 w-4" />;
            case "Storage": return <HardDrive className="h-4 w-4" />;
            case "Network": return <Globe className="h-4 w-4" />;
            default: return <Server className="h-4 w-4" />;
        }
    };

    const filteredResources = resources.filter(r =>
        r.name.toLowerCase().includes(filter.toLowerCase()) ||
        (r.ip && r.ip.includes(filter))
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Resources</h2>
                    <p className="text-muted-foreground">Manage your cloud infrastructure inventory.</p>
                </div>
                <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                    <Plus className="h-4 w-4 mr-2" /> Create Resource
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or IP..."
                        className="pl-9"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button variant="outline" className="w-full sm:w-auto">
                        <Filter className="h-4 w-4 mr-2" /> Filter
                    </Button>
                    <Button variant="outline" className="w-full sm:w-auto" onClick={() => window.location.reload()}>
                        <RefreshCw className="h-4 w-4 mr-2" /> Refresh
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    <TabsTrigger value="all">All Resources</TabsTrigger>
                    <TabsTrigger value="compute">Compute</TabsTrigger>
                    <TabsTrigger value="database">Database</TabsTrigger>
                    <TabsTrigger value="storage">Storage</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                    {loading ? <div className="p-8 text-center text-muted-foreground">Loading resources...</div> : (
                        <div className="grid gap-4">
                            {filteredResources.map((res) => (
                                <Card key={res.id} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-muted rounded-lg mt-1 sm:mt-0">
                                                {getIcon(res.type)}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className="font-semibold text-base">{res.name}</h3>
                                                    <Badge variant="outline" className="text-xs font-normal text-muted-foreground">
                                                        {res.type}
                                                    </Badge>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                                                    <span>{res.spec}</span>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span>{res.region}</span>
                                                    <span className="hidden sm:inline">•</span>
                                                    <span className="font-mono text-xs">{res.ip}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                            <div className="flex items-center gap-2">
                                                {res.status === "running" || res.status === "active" ? (
                                                    <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-2 animate-pulse" />
                                                        Running
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-500 mr-2" />
                                                        Stopped
                                                    </span>
                                                )}
                                            </div>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <PlayCircle className="mr-2 h-4 w-4" /> Start
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <StopCircle className="mr-2 h-4 w-4" /> Stop
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <RefreshCw className="mr-2 h-4 w-4" /> Restart
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Terminate
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>
                {/* Additional Tab contents would be filtered versions of the above */}
            </Tabs>
        </div>
    );
}
