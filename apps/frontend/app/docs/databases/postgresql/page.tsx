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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CodeBlock } from "@/components/ui/code-block";
import {
  Database,
  Settings,
  Shield,
  Zap,
  BarChart3,
  Code,
  Terminal,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  FileText,
  Download,
} from "lucide-react";

export default function PostgreSQLPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <Link href="/docs/databases" className="hover:text-foreground">
            Databases
          </Link>
          <span>/</span>
          <span>PostgreSQL</span>
        </div>
        <h1 className="text-4xl font-bold">PostgreSQL</h1>
        <p className="text-xl text-muted-foreground">
          Advanced relational database with automatic provisioning and
          management.
        </p>
      </div>

      {/* Overview */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          Nimbly provides fully managed PostgreSQL instances with automatic
          backups, scaling, and high availability.
        </AlertDescription>
      </Alert>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="text-center">
            <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-center text-lg">
              ACID Compliant
            </CardTitle>
            <CardDescription className="text-center">
              Full transactional integrity and data consistency
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="h-12 w-12 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-center text-lg">
              High Performance
            </CardTitle>
            <CardDescription className="text-center">
              Advanced indexing and query optimization
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="h-12 w-12 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-purple-600" />
            </div>
            <CardTitle className="text-center text-lg">Secure</CardTitle>
            <CardDescription className="text-center">
              Encryption at rest and in transit
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="h-12 w-12 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mx-auto mb-4">
              <Settings className="h-6 w-6 text-orange-600" />
            </div>
            <CardTitle className="text-center text-lg">Managed</CardTitle>
            <CardDescription className="text-center">
              Automatic backups and maintenance
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started with PostgreSQL</CardTitle>
          <CardDescription>
            How Nimbly sets up PostgreSQL for your applications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeBlock
            language="bash"
            code={`$ nimbly init my-app
? Select database: PostgreSQL
? Select version: 15
✔ Database configured!
Connection string: postgresql://user:pass@host:5432/db`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">What Nimbly Provides</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• PostgreSQL instance (versions 13-16)</li>
                <li>• Automatic connection management</li>
                <li>• Environment-specific databases</li>
                <li>• Connection pooling</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Your Responsibilities</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Schema design</li>
                <li>• Data migrations</li>
                <li>• Query optimization</li>
                <li>• Application logic</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration */}
      <Tabs defaultValue="connection" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>
                How to connect your application to PostgreSQL.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock
                language="javascript"
                code={`// Node.js with pg library
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production'
});`}
              />

              <CodeBlock
                language="bash"
                code={`# Environment variable (auto-provided by Nimbly)
DATABASE_URL=postgresql://user:pass@host:5432/dbname`}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Connection Pooling</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automatic connection management</li>
                    <li>• Configurable pool size</li>
                    <li>• Connection health monitoring</li>
                    <li>• Graceful shutdown handling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Supported Libraries</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• pg (Node.js)</li>
                    <li>• Prisma</li>
                    <li>• TypeORM</li>
                    <li>• Sequelize</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Optimization</CardTitle>
              <CardDescription>
                Tips for getting the best performance from PostgreSQL.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Indexing Strategies</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• B-tree indexes for equality/range queries</li>
                    <li>• Hash indexes for simple equality</li>
                    <li>• GIN indexes for array/json operations</li>
                    <li>• Partial indexes for filtered data</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Query Optimization</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Use EXPLAIN ANALYZE</li>
                    <li>• Avoid SELECT *</li>
                    <li>• Use appropriate JOIN types</li>
                    <li>• Consider query result caching</li>
                  </ul>
                </div>
              </div>

              <Alert>
                <BarChart3 className="h-4 w-4" />
                <AlertDescription>
                  Nimbly automatically monitors query performance and suggests
                  optimizations in the dashboard.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Backup & Recovery</CardTitle>
              <CardDescription>
                Automatic backups with point-in-time recovery.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    Daily
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Automatic backups
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    30 days
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Retention period
                  </div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    PITR
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Point-in-time recovery
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Backup Features</h4>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li>• Automatic daily backups</li>
                  <li>• Transaction log archiving</li>
                  <li>• Cross-region replication</li>
                  <li>• One-click restore</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Features</CardTitle>
              <CardDescription>
                Enterprise-grade security for your PostgreSQL data.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Encryption</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Data encrypted at rest</li>
                    <li>• SSL/TLS for connections</li>
                    <li>• Encrypted backups</li>
                    <li>• Key rotation support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Access Control</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Database-level permissions</li>
                    <li>• Row-level security</li>
                    <li>• Connection limiting</li>
                    <li>• Audit logging</li>
                  </ul>
                </div>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  All PostgreSQL instances are deployed in private networks with
                  strict firewall rules.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Migration Support */}
      <Card>
        <CardHeader>
          <CardTitle>Database Migrations</CardTitle>
          <CardDescription>
            Safely evolve your database schema over time.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <CodeBlock
            language="bash"
            code={`# Using Prisma migrations
npx prisma migrate dev --name add-user-email
✔ Migration created

# Apply to staging
nimbly deploy --env staging
✔ Migration applied safely`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Migration Tools</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Prisma Migrate</li>
                <li>• TypeORM Migrations</li>
                <li>• Flyway</li>
                <li>• Liquibase</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Safety Features</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Transaction-wrapped migrations</li>
                <li>• Rollback on failure</li>
                <li>• Migration history tracking</li>
                <li>• Environment isolation</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle>Database Monitoring</CardTitle>
          <CardDescription>
            Monitor performance, health, and usage of your PostgreSQL instances.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Performance Metrics</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Query execution time</li>
                <li>• Connection count</li>
                <li>• Cache hit ratio</li>
                <li>• Disk I/O</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Health Checks</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Database connectivity</li>
                <li>• Replication lag</li>
                <li>• Disk space usage</li>
                <li>• Long-running queries</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scaling */}
      <Card>
        <CardHeader>
          <CardTitle>Scaling PostgreSQL</CardTitle>
          <CardDescription>
            Handle increased load with read replicas and connection pooling.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Vertical Scaling</h4>
              <p className="text-sm text-muted-foreground">
                Increase CPU, memory, and storage for a single instance.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Read Replicas</h4>
              <p className="text-sm text-muted-foreground">
                Add read-only replicas to distribute read load.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Connection Pooling</h4>
              <p className="text-sm text-muted-foreground">
                Efficiently manage database connections.
              </p>
            </div>
          </div>

          <Alert>
            <Zap className="h-4 w-4" />
            <AlertDescription>
              Nimbly automatically scales your database based on usage patterns
              and can add read replicas on demand.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* CLI Commands */}
      <Card>
        <CardHeader>
          <CardTitle>Database CLI Commands</CardTitle>
          <CardDescription>
            Manage your PostgreSQL database from the command line.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Command</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <code>nimbly db connect</code>
                </TableCell>
                <TableCell>Connect to database</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code>nimbly db backup</code>
                </TableCell>
                <TableCell>Create manual backup</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code>nimbly db migrate</code>
                </TableCell>
                <TableCell>Run pending migrations</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code>nimbly db status</code>
                </TableCell>
                <TableCell>Check database health</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card>
        <CardHeader>
          <CardTitle>Common Issues</CardTitle>
          <CardDescription>
            Solutions to frequent PostgreSQL problems.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold">Connection Timeouts</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Check connection pool settings and network configuration.
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                nimbly db status
              </code>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-semibold">Slow Queries</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Use EXPLAIN ANALYZE and add appropriate indexes.
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                EXPLAIN ANALYZE SELECT...
              </code>
            </div>
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold">Disk Space Issues</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Monitor disk usage and clean up old data.
              </p>
              <code className="text-xs bg-muted px-2 py-1 rounded">
                nimbly db cleanup
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Learn More</CardTitle>
          <CardDescription>Deepen your PostgreSQL knowledge.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/docs/databases">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Other Databases
              </Button>
            </Link>
            <Link href="/docs/services">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                All Services
              </Button>
            </Link>
            <Link href="/docs/monitoring">
              <Button variant="outline" className="w-full justify-start">
                <ArrowRight className="h-4 w-4 mr-2" />
                Database Monitoring
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
