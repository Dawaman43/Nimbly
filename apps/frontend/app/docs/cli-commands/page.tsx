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
  Terminal,
  User,
  Upload,
  Eye,
  FileText,
  Trash2,
  Settings,
  HelpCircle,
  ArrowRight,
  Copy,
  CheckCircle,
} from "lucide-react";

export default function CLICommandsPage() {
  const [copiedCommand, setCopiedCommand] = React.useState<string | null>(null);

  const copyToClipboard = (command: string) => {
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <span>CLI Commands</span>
        </div>
        <h1 className="text-4xl font-bold">CLI Commands</h1>
        <p className="text-xl text-muted-foreground">
          Complete reference for all Nimbly CLI commands and options.
        </p>
      </div>

      {/* Quick Start */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Install the CLI and authenticate to get started.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-green-400 select-none">$</span>
                <span>nimbly --version</span>
              </div>
              <div className="text-gray-300">
                nimbly-cli/1.0.0 linux-x64 node-v18.17.0
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard("nimbly --version")}
            >
              {copiedCommand === "nimbly --version" ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
              nimbly --version
            </code>
          </div>
        </CardContent>
      </Card>

      {/* Command Categories */}
      <Tabs defaultValue="management" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="management">Project Management</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="utilities">Utilities</TabsTrigger>
        </TabsList>

        {/* Project Management */}
        <TabsContent value="management" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Project Management</h2>
            <p className="text-muted-foreground">
              Commands for creating, configuring, and managing your projects.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Login */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">login</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Authentication
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Authenticate with your Nimbly account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
                  <div>nimbly login</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Options:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>--email</code> - Specify email address
                    <br />
                    <code>--password</code> - Specify password (not recommended)
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard("nimbly login")}
                  >
                    {copiedCommand === "nimbly login" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
                    nimbly login
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Init */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">init</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Project Setup
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Initialize a new Nimbly project in the current directory.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
                  <div>nimbly init [project-name]</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Arguments:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>project-name</code> - Name of the project (optional)
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Options:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>--template</code> - Specify project template
                    <br />
                    <code>--yes</code> - Skip interactive prompts
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard("nimbly init my-project")}
                  >
                    {copiedCommand === "nimbly init my-project" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
                    nimbly init my-project
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Deployment */}
        <TabsContent value="deployment" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Deployment</h2>
            <p className="text-muted-foreground">
              Commands for deploying and managing your applications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Deploy */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Upload className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">deploy</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Deployment
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Deploy your application to production.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
                  <div>nimbly deploy</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Options:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>--env</code> - Target environment (development,
                    staging, production)
                    <br />
                    <code>--force</code> - Force deployment without confirmation
                    <br />
                    <code>--no-cache</code> - Skip build cache
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      copyToClipboard("nimbly deploy --env production")
                    }
                  >
                    {copiedCommand === "nimbly deploy --env production" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
                    nimbly deploy --env production
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Destroy */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                    <Trash2 className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">destroy</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Cleanup
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Permanently delete a deployed application and its resources.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
                  <div>nimbly destroy [app-name]</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Arguments:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>app-name</code> - Name of the application to destroy
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Options:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>--force</code> - Skip confirmation prompt
                    <br />
                    <code>--keep-data</code> - Preserve database data
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard("nimbly destroy my-app")}
                  >
                    {copiedCommand === "nimbly destroy my-app" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
                    nimbly destroy my-app
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Monitoring */}
        <TabsContent value="monitoring" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Monitoring</h2>
            <p className="text-muted-foreground">
              Commands for monitoring and debugging your applications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                    <Eye className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">status</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Monitoring
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Check the status of your deployed applications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
                  <div>nimbly status [app-name]</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Arguments:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>app-name</code> - Name of the application (optional)
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Options:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>--json</code> - Output in JSON format
                    <br />
                    <code>--watch</code> - Continuously monitor status
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard("nimbly status")}
                  >
                    {copiedCommand === "nimbly status" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
                    nimbly status
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Logs */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">logs</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Debugging
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  View application logs in real-time.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
                  <div>nimbly logs [app-name]</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Arguments:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>app-name</code> - Name of the application (optional)
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Options:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>--follow</code> - Stream logs in real-time
                    <br />
                    <code>--since</code> - Show logs since timestamp
                    <br />
                    <code>--tail</code> - Number of lines to show
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard("nimbly logs --follow")}
                  >
                    {copiedCommand === "nimbly logs --follow" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
                    nimbly logs --follow
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Utilities */}
        <TabsContent value="utilities" className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Utilities</h2>
            <p className="text-muted-foreground">
              Additional utility commands for managing your Nimbly setup.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* List */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                    <Terminal className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">list</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Information
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  List all your deployed applications and resources.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
                  <div>nimbly list</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Options:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>--json</code> - Output in JSON format
                    <br />
                    <code>--filter</code> - Filter by status or type
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard("nimbly list")}
                  >
                    {copiedCommand === "nimbly list" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
                    nimbly list
                  </code>
                </div>
              </CardContent>
            </Card>

            {/* Help */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                    <HelpCircle className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">help</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      Documentation
                    </Badge>
                  </div>
                </div>
                <CardDescription>
                  Display help information for commands.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-[#1e1e1e] text-white p-3 rounded border font-mono text-sm">
                  <div>nimbly help [command]</div>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Arguments:</strong>
                  </div>
                  <div className="text-muted-foreground">
                    <code>command</code> - Specific command to get help for
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard("nimbly help")}
                  >
                    {copiedCommand === "nimbly help" ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
                    nimbly help
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Global Options */}
      <Card>
        <CardHeader>
          <CardTitle>Global Options</CardTitle>
          <CardDescription>
            Options that work with all commands.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <code className="text-sm bg-muted px-2 py-1 rounded">
                --help, -h
              </code>
              <p className="text-sm text-muted-foreground">
                Show help for the command
              </p>
            </div>
            <div className="space-y-2">
              <code className="text-sm bg-muted px-2 py-1 rounded">
                --version, -v
              </code>
              <p className="text-sm text-muted-foreground">Show CLI version</p>
            </div>
            <div className="space-y-2">
              <code className="text-sm bg-muted px-2 py-1 rounded">
                --verbose
              </code>
              <p className="text-sm text-muted-foreground">
                Enable verbose output
              </p>
            </div>
            <div className="space-y-2">
              <code className="text-sm bg-muted px-2 py-1 rounded">
                --quiet
              </code>
              <p className="text-sm text-muted-foreground">
                Suppress non-error output
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Examples */}
      <Card>
        <CardHeader>
          <CardTitle>Common Workflows</CardTitle>
          <CardDescription>
            Example command sequences for typical use cases.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">First Time Setup</h4>
            <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm space-y-2">
              <div className="flex gap-2">
                <span className="text-green-400 select-none">$</span>
                <span>nimbly login</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-400 select-none">$</span>
                <span>nimbly init my-app</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-400 select-none">$</span>
                <span>cd my-app</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-400 select-none">$</span>
                <span>nimbly deploy</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Monitoring & Debugging</h4>
            <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm space-y-2">
              <div className="flex gap-2">
                <span className="text-green-400 select-none">$</span>
                <span>nimbly status</span>
              </div>
              <div className="flex gap-2">
                <span className="text-green-400 select-none">$</span>
                <span>nimbly logs my-app --follow</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Need Help */}
      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>
            Additional resources for getting the most out of the CLI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/quick-start">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Quick Start Guide
              </Button>
            </Link>
            <Link href="/docs/troubleshooting">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Troubleshooting
              </Button>
            </Link>
            <Link href="/docs/configuration">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Configuration
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
