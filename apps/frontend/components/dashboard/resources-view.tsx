"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Server,
  Database,
  HardDrive,
  Globe,
  PlayCircle,
  StopCircle,
  RefreshCw,
  Trash2,
  Activity,
  Cpu,
  MemoryStick,
  HardDriveIcon,
  Wifi,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  BookOpen,
  Star,
  DollarSign,
  Zap,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/lib/api";

export default function ResourcesView() {
  const [filter, setFilter] = useState("");
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [resourceMetrics, setResourceMetrics] = useState<any>(null);
  const [metricsLoading, setMetricsLoading] = useState(false);
  const [templates, setTemplates] = useState<any[]>([]);
  const [templateCategories, setTemplateCategories] = useState<any[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [newResource, setNewResource] = useState({
    name: "",
    type: "",
    provider: "mock",
    region: "us-east-1",
    cpu: 1,
    ram: 2,
    storage: 20,
  });

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await api.get("/cloud-resources", false); // Don't use cache initially
        // Improve data compatibility: map backend fields to frontend UI fields if necessary
        const mapped = data.map((r: any) => ({
          id: r.id,
          name: r.name,
          type:
            r.type === "EC2"
              ? "Compute"
              : r.type === "S3"
                ? "Storage"
                : r.type === "RDS"
                  ? "Database"
                  : "Network",
          spec:
            r.type === "EC2"
              ? `vCPU ${Math.ceil(r.cpu / 10)} / ${r.ram}GB`
              : "Standard",
          region: "us-east-1", // default if missing
          provider: r.provider || "mock",
          status: r.status,
          ip: r.ip || "-", // Not currently in entity, would need migration, using placeholder
        }));
        setResources(mapped);
      } catch (error) {
        console.error("Failed to fetch resources", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
    fetchTemplates();
  }, []);

  // Auto-refresh metrics every 30 seconds when a resource is selected
  useEffect(() => {
    if (!selectedResource) return;

    const interval = setInterval(() => {
      fetchResourceMetrics(selectedResource.id);
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [selectedResource]);

  const getIcon = (type: string) => {
    switch (type) {
      case "Compute":
        return <Server className="h-4 w-4" />;
      case "Database":
        return <Database className="h-4 w-4" />;
      case "Storage":
        return <HardDrive className="h-4 w-4" />;
      case "Network":
        return <Globe className="h-4 w-4" />;
      default:
        return <Server className="h-4 w-4" />;
    }
  };

  const filteredResources = resources.filter(
    (r) =>
      r.name.toLowerCase().includes(filter.toLowerCase()) ||
      (r.ip && r.ip.includes(filter))
  );

  // Simple chart component for resource metrics
  const MetricChart = ({
    data,
    label,
    color = "bg-blue-500",
    max = 100,
  }: {
    data: number[];
    label: string;
    color?: string;
    max?: number;
  }) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-muted-foreground">
          {data[data.length - 1] || 0}%
        </span>
      </div>
      <div className="flex items-end justify-between h-16 gap-1">
        {data.slice(-10).map((value, i) => (
          <div
            key={i}
            className="flex-1 bg-muted/30 rounded-t-sm relative group"
          >
            <div
              className={`absolute bottom-0 w-full ${color} rounded-t-sm transition-all duration-300`}
              style={{ height: `${(value / max) * 100}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const fetchResourceMetrics = async (resourceId: string) => {
    try {
      setMetricsLoading(true);
      const metrics = await api.get(
        `/cloud-resources/${resourceId}/metrics`,
        false
      );
      setResourceMetrics(metrics);
    } catch (error) {
      console.error("Failed to fetch resource metrics", error);
    } finally {
      setMetricsLoading(false);
    }
  };

  const fetchTemplates = async () => {
    try {
      setTemplatesLoading(true);
      const [templatesData, categoriesData] = await Promise.all([
        api.get("/templates", true),
        api.get("/templates/categories", true),
      ]);
      setTemplates(templatesData);
      setTemplateCategories(categoriesData);
    } catch (error) {
      console.error("Failed to fetch templates", error);
    } finally {
      setTemplatesLoading(false);
    }
  };

  const handleResourceSelect = (resource: any) => {
    setSelectedResource(resource);
    fetchResourceMetrics(resource.id);
  };

  const handleCreateResource = async () => {
    try {
      await api.post("/cloud-resources", newResource);
      setCreateModalOpen(false);
      setNewResource({
        name: "",
        type: "",
        provider: "mock",
        region: "us-east-1",
        cpu: 1,
        ram: 2,
        storage: 20,
      });
      // Refresh the resources list
      const data = await api.get("/cloud-resources", false);
      const mapped = data.map((r: any) => ({
        id: r.id,
        name: r.name,
        type:
          r.type === "EC2"
            ? "Compute"
            : r.type === "S3"
              ? "Storage"
              : r.type === "RDS"
                ? "Database"
                : "Network",
        spec:
          r.type === "EC2"
            ? `vCPU ${Math.ceil(r.cpu / 10)} / ${r.ram}GB`
            : "Standard",
        region: "us-east-1",
        status: r.status,
        ip: r.ip || "-",
      }));
      setResources(mapped);
    } catch (error) {
      console.error("Failed to create resource", error);
    }
  };

  const handleResourceAction = async (resourceId: string, action: string) => {
    try {
      await api.post(`/cloud-resources/${resourceId}/${action}`, {});
      // Refresh the resources list without cache
      const data = await api.get("/cloud-resources", false);
      const mapped = data.map((r: any) => ({
        id: r.id,
        name: r.name,
        type:
          r.type === "EC2"
            ? "Compute"
            : r.type === "S3"
              ? "Storage"
              : r.type === "RDS"
                ? "Database"
                : "Network",
        spec:
          r.type === "EC2"
            ? `vCPU ${Math.ceil(r.cpu / 10)} / ${r.ram}GB`
            : "Standard",
        region: "us-east-1",
        status: r.status,
        ip: r.ip || "-",
      }));
      setResources(mapped);
    } catch (error) {
      console.error(`Failed to ${action} resource`, error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Resources</h2>
          <p className="text-muted-foreground">
            Manage your cloud infrastructure inventory.
          </p>
        </div>
        <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700 text-white">
              <Plus className="h-4 w-4 mr-2" /> Create Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Resource</DialogTitle>
              <DialogDescription>
                Deploy a new cloud resource to your infrastructure.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newResource.name}
                  onChange={(e) =>
                    setNewResource({ ...newResource, name: e.target.value })
                  }
                  className="col-span-3"
                  placeholder="my-resource"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="provider" className="text-right">
                  Provider
                </Label>
                <Select
                  value={newResource.provider}
                  onValueChange={(value: string) =>
                    setNewResource({ ...newResource, provider: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select cloud provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mock">Mock Cloud (Demo)</SelectItem>
                    <SelectItem value="aws">Amazon Web Services</SelectItem>
                    <SelectItem value="azure">Microsoft Azure</SelectItem>
                    <SelectItem value="gcp">Google Cloud Platform</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={newResource.type}
                  onValueChange={(value: string) =>
                    setNewResource({ ...newResource, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EC2">Compute (EC2)</SelectItem>
                    <SelectItem value="RDS">Database (RDS)</SelectItem>
                    <SelectItem value="S3">Storage (S3)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="region" className="text-right">
                  Region
                </Label>
                <Select
                  value={newResource.region}
                  onValueChange={(value: string) =>
                    setNewResource({ ...newResource, region: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us-east-1">
                      US East (N. Virginia)
                    </SelectItem>
                    <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                    <SelectItem value="eu-west-1">EU West (Ireland)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cpu" className="text-right">
                  CPU (vCPUs)
                </Label>
                <Input
                  id="cpu"
                  type="number"
                  value={newResource.cpu}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      cpu: parseFloat(e.target.value) || 1,
                    })
                  }
                  className="col-span-3"
                  placeholder="1"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="ram" className="text-right">
                  RAM (GB)
                </Label>
                <Input
                  id="ram"
                  type="number"
                  value={newResource.ram}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      ram: parseFloat(e.target.value) || 2,
                    })
                  }
                  className="col-span-3"
                  placeholder="2"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="storage" className="text-right">
                  Storage (GB)
                </Label>
                <Input
                  id="storage"
                  type="number"
                  value={newResource.storage}
                  onChange={(e) =>
                    setNewResource({
                      ...newResource,
                      storage: parseFloat(e.target.value) || 20,
                    })
                  }
                  className="col-span-3"
                  placeholder="20"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleCreateResource}
                disabled={!newResource.name || !newResource.type}
              >
                Create Resource
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
          <Button
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => window.location.reload()}
          >
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
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">
              Loading resources...
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredResources.map((res) => (
                <Card
                  key={res.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-muted rounded-lg mt-1 sm:mt-0">
                        {getIcon(res.type)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-base">
                            {res.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-xs font-normal text-muted-foreground"
                          >
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
                          <DropdownMenuItem
                            onClick={() =>
                              handleResourceAction(res.id, "start")
                            }
                          >
                            <PlayCircle className="mr-2 h-4 w-4" /> Start
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleResourceAction(res.id, "stop")}
                          >
                            <StopCircle className="mr-2 h-4 w-4" /> Stop
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleResourceAction(res.id, "restart")
                            }
                          >
                            <RefreshCw className="mr-2 h-4 w-4" /> Restart
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              handleResourceAction(res.id, "terminate")
                            }
                            className="text-red-600"
                          >
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

        <TabsContent value="monitoring" className="mt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resource Selection */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Resource Monitoring
                    </CardTitle>
                    <CardDescription>
                      Select a resource to view detailed metrics
                    </CardDescription>
                  </div>
                  {selectedResource && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fetchResourceMetrics(selectedResource.id)}
                      disabled={metricsLoading}
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${metricsLoading ? "animate-spin" : ""}`}
                      />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {resources.map((resource) => (
                    <div
                      key={resource.id}
                      onClick={() => handleResourceSelect(resource)}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedResource?.id === resource.id
                          ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20"
                          : "border-border hover:border-orange-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-muted rounded">
                          {getIcon(resource.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {resource.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {resource.type}
                          </p>
                        </div>
                        <Badge
                          variant={
                            resource.status === "running"
                              ? "default"
                              : "secondary"
                          }
                          className="text-xs"
                        >
                          {resource.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Metrics Dashboard */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  {selectedResource
                    ? `${selectedResource.name} Metrics`
                    : "Select a Resource"}
                </CardTitle>
                <CardDescription>
                  Real-time performance and usage statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedResource ? (
                  metricsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-2">
                          <div className="h-4 bg-muted animate-pulse rounded w-24" />
                          <div className="h-16 bg-muted animate-pulse rounded" />
                        </div>
                      ))}
                    </div>
                  ) : resourceMetrics ? (
                    <div className="space-y-6">
                      {/* CPU Usage */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-orange-500" />
                          <span className="font-medium">CPU Usage</span>
                          <Badge variant="outline" className="ml-auto">
                            {resourceMetrics.cpu}%
                          </Badge>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${resourceMetrics.cpu}%` }}
                          />
                        </div>
                      </div>

                      {/* Memory Usage */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MemoryStick className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">Memory Usage</span>
                          <Badge variant="outline" className="ml-auto">
                            {resourceMetrics.ram}%
                          </Badge>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${resourceMetrics.ram}%` }}
                          />
                        </div>
                      </div>

                      {/* Storage Usage */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <HardDriveIcon className="h-4 w-4 text-green-500" />
                          <span className="font-medium">Storage Usage</span>
                          <Badge variant="outline" className="ml-auto">
                            {resourceMetrics.storage}GB
                          </Badge>
                        </div>
                        <div className="w-full bg-muted/30 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full transition-all duration-500"
                            style={{
                              width: `${Math.min((resourceMetrics.storage / 100) * 100, 100)}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Network Traffic */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Wifi className="h-4 w-4 text-purple-500" />
                            <span className="font-medium text-sm">
                              Network In
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-purple-600">
                            {resourceMetrics.networkIn}MB/s
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Wifi className="h-4 w-4 text-indigo-500" />
                            <span className="font-medium text-sm">
                              Network Out
                            </span>
                          </div>
                          <div className="text-2xl font-bold text-indigo-600">
                            {resourceMetrics.networkOut}MB/s
                          </div>
                        </div>
                      </div>

                      {/* Alerts */}
                      <div className="pt-4 border-t">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="font-medium">Active Alerts</span>
                        </div>
                        <div className="space-y-2">
                          {resourceMetrics.cpu > 80 && (
                            <div className="flex items-center gap-2 p-2 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                              <AlertTriangle className="h-4 w-4 text-red-500" />
                              <span className="text-sm text-red-700 dark:text-red-300">
                                High CPU usage detected
                              </span>
                            </div>
                          )}
                          {resourceMetrics.ram > 85 && (
                            <div className="flex items-center gap-2 p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                              <span className="text-sm text-yellow-700 dark:text-yellow-300">
                                High memory usage detected
                              </span>
                            </div>
                          )}
                          {resourceMetrics.cpu <= 80 &&
                            resourceMetrics.ram <= 85 && (
                              <div className="text-sm text-muted-foreground text-center py-4">
                                No active alerts
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      Failed to load metrics
                    </div>
                  )
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Select a resource from the list to view its metrics
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <div className="space-y-6">
            {/* Template Categories */}
            <div className="flex flex-wrap gap-4">
              {templateCategories.map((category: any) => (
                <Card
                  key={category.id}
                  className="flex-1 min-w-[200px] cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedTemplate(null)} // Reset selection when clicking category
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                        {category.icon === "Server" && (
                          <Server className="h-5 w-5 text-orange-600" />
                        )}
                        {category.icon === "Database" && (
                          <Database className="h-5 w-5 text-orange-600" />
                        )}
                        {category.icon === "HardDrive" && (
                          <HardDrive className="h-5 w-5 text-orange-600" />
                        )}
                        {category.icon === "Globe" && (
                          <Globe className="h-5 w-5 text-orange-600" />
                        )}
                        {category.icon === "Zap" && (
                          <Zap className="h-5 w-5 text-orange-600" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {category.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {category.templates.length} templates
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Template Grid */}
            {templatesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <div className="h-6 bg-muted animate-pulse rounded w-3/4 mb-2" />
                      <div className="h-4 bg-muted animate-pulse rounded w-full" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                        <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template: any) => (
                  <Card
                    key={template.id}
                    className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
                      selectedTemplate?.id === template.id
                        ? "ring-2 ring-orange-500"
                        : ""
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            {template.category === "compute" && (
                              <Server className="h-5 w-5" />
                            )}
                            {template.category === "database" && (
                              <Database className="h-5 w-5" />
                            )}
                            {template.category === "storage" && (
                              <HardDrive className="h-5 w-5" />
                            )}
                            {template.category === "network" && (
                              <Globe className="h-5 w-5" />
                            )}
                            {template.category === "serverless" && (
                              <Zap className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {template.name}
                            </CardTitle>
                            <div className="flex items-center gap-1 mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < template.popularity
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {template.category}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {template.description}
                      </p>

                      {/* Template Specs */}
                      <div className="space-y-2 mb-4">
                        {template.config.type && (
                          <div className="flex items-center gap-2 text-sm">
                            <Layers className="h-4 w-4 text-muted-foreground" />
                            <span>Type: {template.config.type}</span>
                          </div>
                        )}
                        {template.config.cpu && (
                          <div className="flex items-center gap-2 text-sm">
                            <Cpu className="h-4 w-4 text-muted-foreground" />
                            <span>CPU: {template.config.cpu} vCPUs</span>
                          </div>
                        )}
                        {template.config.ram && (
                          <div className="flex items-center gap-2 text-sm">
                            <MemoryStick className="h-4 w-4 text-muted-foreground" />
                            <span>RAM: {template.config.ram} GB</span>
                          </div>
                        )}
                        {template.config.storage && (
                          <div className="flex items-center gap-2 text-sm">
                            <HardDriveIcon className="h-4 w-4 text-muted-foreground" />
                            <span>Storage: {template.config.storage} GB</span>
                          </div>
                        )}
                      </div>

                      {/* Cost Estimate */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium">
                            ${template.estimatedCost.monthly.toFixed(2)}/month
                          </span>
                        </div>
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Deploy template logic would go here
                            console.log("Deploying template:", template.id);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Deploy
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Template Details Modal */}
            {selectedTemplate && (
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {selectedTemplate.category === "compute" && (
                          <Server className="h-5 w-5" />
                        )}
                        {selectedTemplate.category === "database" && (
                          <Database className="h-5 w-5" />
                        )}
                        {selectedTemplate.category === "storage" && (
                          <HardDrive className="h-5 w-5" />
                        )}
                        {selectedTemplate.category === "network" && (
                          <Globe className="h-5 w-5" />
                        )}
                        {selectedTemplate.category === "serverless" && (
                          <Zap className="h-5 w-5" />
                        )}
                        {selectedTemplate.name}
                      </CardTitle>
                      <CardDescription>
                        {selectedTemplate.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {selectedTemplate.category}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < selectedTemplate.popularity
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Configuration Details */}
                    <div>
                      <h4 className="font-medium mb-3">Configuration</h4>
                      <div className="space-y-2">
                        {Object.entries(selectedTemplate.config).map(
                          ([key, value]: [string, any]) => (
                            <div
                              key={key}
                              className="flex justify-between py-1"
                            >
                              <span className="text-sm text-muted-foreground capitalize">
                                {key.replace(/([A-Z])/g, " $1").trim()}:
                              </span>
                              <span className="text-sm font-medium">
                                {String(value)}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Cost Breakdown */}
                    <div>
                      <h4 className="font-medium mb-3">Cost Estimate</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Hourly Rate</span>
                          <span className="font-medium">
                            ${selectedTemplate.estimatedCost.hourly.toFixed(4)}
                            /hr
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Monthly Estimate</span>
                          <span className="font-medium text-lg">
                            ${selectedTemplate.estimatedCost.monthly.toFixed(2)}
                            /month
                          </span>
                        </div>
                        <div className="pt-2 border-t">
                          <p className="text-xs text-muted-foreground">
                            * Estimates are based on standard pricing and may
                            vary based on region and usage patterns.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedTemplate.tags.map((tag: string) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Deploy Button */}
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={() => {
                        // Deploy template logic
                        console.log("Deploying template:", selectedTemplate.id);
                      }}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Deploy This Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
