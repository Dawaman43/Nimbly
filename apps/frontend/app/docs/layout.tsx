"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  BookOpen,
  Terminal,
  Settings,
  Cloud,
  Database,
  Shield,
  Zap,
  ChevronRight,
  ChevronDown,
  Home,
  Search,
  X,
  Menu,
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
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["Getting Started", "Core Concepts"]) // Default expanded sections
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionTitle)) {
        newSet.delete(sectionTitle);
      } else {
        newSet.add(sectionTitle);
      }
      return newSet;
    });
  };

  // Flatten all docs items for search
  const allDocsItems = docsNavigation.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      section: section.title,
    }))
  );

  const filteredItems = allDocsItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2"
            >
              <Search className="h-4 w-4" />
              Search
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="flex flex-col gap-6 mt-6">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                      <div className="h-8 w-8 rounded bg-orange-600 flex items-center justify-center text-white">
                        <Cloud className="h-5 w-5" />
                      </div>
                      Nimbly Docs
                    </div>

                    <ScrollArea className="flex-1">
                      <div className="space-y-6">
                        {docsNavigation.map((section) => {
                          const isExpanded = expandedSections.has(
                            section.title
                          );
                          return (
                            <div key={section.title}>
                              <button
                                onClick={() => toggleSection(section.title)}
                                className="flex items-center gap-2 mb-3 w-full text-left hover:text-foreground transition-colors"
                              >
                                <section.icon className="h-4 w-4 text-muted-foreground" />
                                <h4 className="font-semibold text-sm flex-1">
                                  {section.title}
                                </h4>
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                )}
                              </button>
                              {isExpanded && (
                                <div className="ml-6 space-y-1">
                                  {section.items.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      className={`block p-2 rounded-md text-sm transition-colors ${
                                        pathname === item.href
                                          ? "bg-muted text-foreground font-medium"
                                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                      }`}
                                    >
                                      {item.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </ScrollArea>

                    <div className="border-t pt-4 space-y-2">
                      <Link href="/dashboard">
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/auth">
                        <Button className="w-full bg-orange-600 hover:bg-orange-700">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="hidden lg:flex gap-4">
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
      </div>

      <div className="container mx-auto px-4 max-w-7xl lg:flex lg:gap-10 py-8">
        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <div className="sticky top-24">
            <ScrollArea className="h-[calc(100vh-8rem)]">
              <div className="space-y-6">
                {docsNavigation.map((section) => {
                  const isExpanded = expandedSections.has(section.title);
                  return (
                    <div key={section.title}>
                      <button
                        onClick={() => toggleSection(section.title)}
                        className="flex items-center gap-2 mb-3 w-full text-left hover:text-foreground transition-colors"
                      >
                        <section.icon className="h-4 w-4 text-muted-foreground" />
                        <h4 className="font-semibold text-sm flex-1">
                          {section.title}
                        </h4>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                      {isExpanded && (
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
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl">{children}</main>
      </div>

      {/* Search Modal */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Documentation
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search docs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
            <ScrollArea className="max-h-96">
              {searchQuery && (
                <div className="space-y-2">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSearchOpen(false)}
                        className="block p-3 rounded-md hover:bg-muted transition-colors"
                      >
                        <div className="font-medium text-sm">{item.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {item.section}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No results found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
              {!searchQuery && (
                <div className="p-4 text-center text-muted-foreground">
                  <div className="text-sm mb-2">Quick Search Tips:</div>
                  <div className="text-xs space-y-1">
                    <div>• Type to search through all documentation</div>
                    <div>• Search by section name or page title</div>
                    <div>• Press Enter to navigate to results</div>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
