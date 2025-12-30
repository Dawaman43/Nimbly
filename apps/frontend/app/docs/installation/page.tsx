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
  Download,
  CheckCircle,
  AlertCircle,
  Apple,
  Monitor,
  Server,
} from "lucide-react";

export default function InstallationPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <span>Installation</span>
        </div>
        <h1 className="text-4xl font-bold">Installation</h1>
        <p className="text-xl text-muted-foreground">
          Get started with Nimbly by installing the CLI on your system.
        </p>
      </div>

      {/* Installation Methods */}
      <Tabs defaultValue="npm" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="npm">npm</TabsTrigger>
          <TabsTrigger value="yarn">Yarn</TabsTrigger>
          <TabsTrigger value="homebrew">Homebrew</TabsTrigger>
          <TabsTrigger value="binary">Binary</TabsTrigger>
        </TabsList>

        <TabsContent value="npm" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Install via npm
              </CardTitle>
              <CardDescription>
                Recommended for most users. Requires Node.js 16+.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
                <div className="flex gap-2">
                  <span className="text-green-400 select-none">$</span>
                  <span>npm install -g @nimbly/cli</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Global installation recommended</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yarn" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Install via Yarn
              </CardTitle>
              <CardDescription>
                Alternative package manager installation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
                <div className="flex gap-2">
                  <span className="text-green-400 select-none">$</span>
                  <span>yarn global add @nimbly/cli</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homebrew" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Apple className="h-5 w-5" />
                Install via Homebrew
              </CardTitle>
              <CardDescription>
                macOS package manager installation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
                <div className="flex gap-2">
                  <span className="text-green-400 select-none">$</span>
                  <span>brew install nimbly</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>Coming soon to Homebrew</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="binary" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Direct Binary Download
              </CardTitle>
              <CardDescription>
                Download pre-compiled binaries for your platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Monitor className="h-4 w-4" />
                  Linux (x64)
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Apple className="h-4 w-4" />
                  macOS (Intel)
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Apple className="h-4 w-4" />
                  macOS (Apple Silicon)
                </Button>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span>Binaries available soon</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Verify Installation</CardTitle>
          <CardDescription>
            Confirm that Nimbly CLI was installed correctly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-green-400 select-none">$</span>
                <span>nimbly --version</span>
              </div>
              <div className="text-gray-300">1.0.0</div>
              <div className="flex gap-2">
                <span className="text-green-400 select-none">$</span>
                <span>nimbly --help</span>
              </div>
              <div className="text-gray-300">
                Usage: nimbly [options] [command]
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>System Requirements</CardTitle>
          <CardDescription>
            Minimum requirements to run Nimbly CLI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Operating System</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• macOS 10.15+</li>
                  <li>• Linux (Ubuntu 18.04+, CentOS 7+)</li>
                  <li>• Windows 10+ (via WSL)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Hardware</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• 2GB RAM minimum</li>
                  <li>• 1GB free disk space</li>
                  <li>• Internet connection</li>
                </ul>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Software</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Node.js 16+ (for npm installs)</li>
                  <li>• Git 2.0+</li>
                  <li>• Docker (optional, for local dev)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Network</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• HTTPS access to api.nimbly.app</li>
                  <li>• SSH access for git operations</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
          <CardDescription>
            Now that you have Nimbly installed, let's get you started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/quick-start">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-semibold">Quick Start Guide</div>
                  <div className="text-sm text-muted-foreground">
                    Deploy your first app in 10 minutes
                  </div>
                </div>
              </Button>
            </Link>
            <Link href="/docs/cli/commands">
              <Button
                variant="outline"
                className="w-full justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="font-semibold">CLI Commands</div>
                  <div className="text-sm text-muted-foreground">
                    Learn all available commands
                  </div>
                </div>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
