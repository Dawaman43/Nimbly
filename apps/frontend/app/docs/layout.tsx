"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Terminal,
  Settings,
  Cloud,
  Database,
  Shield,
  Zap,
  ChevronRight,
  Home,
} from "lucide-react";

const docsNavigation = [
  {
    title: "Getting Started",
    icon: Home,
    items: [
      { title: "Introduction", href: "/docs", active: true },
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
      { title: "Project Structure", href: "/docs/project-structure" },
    ],
  },
  {
    title: "Core Concepts",
    icon: Cloud,
    items: [
      { title: "Services", href: "/docs/services" },
      { title: "Resources", href: "/docs/resources" },
      { title: "Deployments", href: "/docs/deployments" },
      { title: "Environments", href: "/docs/environments" },
    ],
  },
  {
    title: "Configuration",
    icon: Settings,
    items: [
      { title: "nimbly.config.json", href: "/docs/configuration" },
      { title: "Environment Variables", href: "/docs/environment-variables" },
      { title: "Custom Domains", href: "/docs/custom-domains" },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    items: [
      { title: "Overview", href: "/docs/databases" },
      { title: "PostgreSQL", href: "/docs/databases/postgresql" },
      { title: "MySQL", href: "/docs/databases/mysql" },
      { title: "MariaDB", href: "/docs/databases/mariadb" },
      { title: "SQLite", href: "/docs/databases/sqlite" },
      { title: "Redis", href: "/docs/databases/redis" },
      { title: "MongoDB", href: "/docs/databases/mongodb" },
      { title: "Cassandra", href: "/docs/databases/cassandra" },
      { title: "Elasticsearch", href: "/docs/databases/elasticsearch" },
      { title: "DynamoDB", href: "/docs/databases/dynamodb" },
      { title: "CouchDB", href: "/docs/databases/couchdb" },
      { title: "Neo4j", href: "/docs/databases/neo4j" },
      { title: "TimescaleDB", href: "/docs/databases/timescaledb" },
      { title: "Database Migrations", href: "/docs/databases/migrations" },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    items: [
      { title: "Authentication", href: "/docs/security/auth" },
      { title: "API Keys", href: "/docs/security/api-keys" },
      { title: "SSL Certificates", href: "/docs/security/ssl" },
    ],
  },
  {
    title: "CLI Reference",
    icon: Terminal,
    items: [
      { title: "Commands", href: "/docs/cli/commands" },
      { title: "Options", href: "/docs/cli/options" },
      { title: "Examples", href: "/docs/cli/examples" },
    ],
  },
  {
    title: "API Reference",
    icon: Zap,
    items: [
      { title: "REST API", href: "/docs/api/rest" },
      { title: "Webhooks", href: "/docs/api/webhooks" },
      { title: "Rate Limits", href: "/docs/api/rate-limits" },
    ],
  },
];

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-background/50 backdrop-blur z-20 sticky top-0">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-orange-600 flex items-center justify-center text-white">
                <Cloud className="h-5 w-5" />
              </div>
              Nimbly
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/auth">
              <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl flex gap-10 py-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <div className="sticky top-24">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-6">
                {docsNavigation.map((section) => (
                  <div key={section.title}>
                    <div className="flex items-center gap-2 mb-3">
                      <section.icon className="h-4 w-4 text-muted-foreground" />
                      <h4 className="font-semibold text-sm">{section.title}</h4>
                    </div>
                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            className={`flex items-center gap-2 px-2 py-1.5 text-sm rounded-md transition-colors ${
                              pathname === item.href
                                ? "bg-orange-100 text-orange-900 dark:bg-orange-900/20 dark:text-orange-100"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                            }`}
                          >
                            <ChevronRight className="h-3 w-3" />
                            {item.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl">{children}</main>
      </div>
    </div>
  );
}
