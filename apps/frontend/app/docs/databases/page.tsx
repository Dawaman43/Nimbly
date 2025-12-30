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
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Database,
  ArrowRight,
  CheckCircle,
  Star,
  Zap,
  Shield,
} from "lucide-react";

export default function DatabasesPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/docs" className="hover:text-foreground">
            Docs
          </Link>
          <span>/</span>
          <span>Databases</span>
        </div>
        <h1 className="text-4xl font-bold">Database Services</h1>
        <p className="text-xl text-muted-foreground">
          Choose the right database for your application with fully managed
          infrastructure.
        </p>
      </div>

      {/* Overview */}
      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          All Nimbly databases come with automatic backups, scaling, monitoring,
          and high availability.
        </AlertDescription>
      </Alert>

      {/* Database Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* SQL Databases */}
        <Link href="/docs/databases/postgresql">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">PostgreSQL</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Recommended
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Advanced open-source relational database with JSON support,
                advanced indexing, and ACID compliance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>ACID transactions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>JSON/JSONB support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Advanced indexing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Full-text search</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Versions:</strong> 13, 14, 15, 16
                  <br />
                  <strong>Use cases:</strong> Web apps, analytics, complex
                  queries
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/databases/mysql">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">MySQL</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Popular
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Widely adopted relational database known for its speed,
                reliability, and extensive ecosystem.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>High performance</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Replication support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Wide ecosystem</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>ACID compliance</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Versions:</strong> 5.7, 8.0, 8.1, 8.2
                  <br />
                  <strong>Use cases:</strong> Web apps, e-commerce, CMS
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/databases/mariadb">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-cyan-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">MariaDB</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    MySQL Compatible
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Enhanced, open-source MySQL fork with additional features and
                improved performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>MySQL compatible</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Enhanced features</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Better performance</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Open source</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Versions:</strong> 10.6, 10.11, 11.0, 11.1
                  <br />
                  <strong>Use cases:</strong> Drop-in MySQL replacement
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/databases/sqlite">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">SQLite</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Embedded
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Self-contained, file-based SQL database engine. Perfect for
                development, testing, and small applications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Zero configuration</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Single file database</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>ACID transactions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Small footprint</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Versions:</strong> 3.39, 3.40, 3.41, 3.42
                  <br />
                  <strong>Use cases:</strong> Development, mobile apps, embedded
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        {/* NoSQL Databases */}
        <Link href="/docs/databases/redis">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Redis</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Cache & More
                  </Badge>
                </div>
              </div>
              <CardDescription>
                High-performance in-memory data structure store for caching,
                sessions, and real-time features.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Sub-millisecond latency</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Data structures</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Pub/Sub messaging</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Persistence options</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Versions:</strong> 6.x, 7.x
                  <br />
                  <strong>Use cases:</strong> Caching, sessions, real-time
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/databases/mongodb">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">MongoDB</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Document DB
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Leading NoSQL document database for modern applications with
                flexible schema design.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Document model</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Flexible schema</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Rich queries</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Horizontal scaling</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Versions:</strong> 5.0, 6.0, 7.0
                  <br />
                  <strong>Use cases:</strong> Content management, IoT, analytics
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/databases/cassandra">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Cassandra</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Wide Column
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Highly scalable NoSQL database designed for handling large
                amounts of data across many servers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Linear scalability</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>High availability</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Wide column store</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Tunable consistency</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Versions:</strong> 3.11, 4.0, 4.1
                  <br />
                  <strong>Use cases:</strong> Time series, IoT, messaging
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/databases/elasticsearch">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Elasticsearch</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Search & Analytics
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Distributed search and analytics engine based on Apache Lucene.
                Perfect for full-text search and log analytics.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Full-text search</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Real-time analytics</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Distributed architecture</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>RESTful API</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Versions:</strong> 7.x, 8.x
                  <br />
                  <strong>Use cases:</strong> Search, logging, analytics
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/databases/dynamodb">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">DynamoDB</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    AWS Managed
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Fully managed NoSQL database service that provides fast and
                predictable performance with seamless scalability.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Single-digit millisecond</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Auto scaling</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Global tables</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Backup & restore</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Features:</strong> Streams, DAX, Global tables
                  <br />
                  <strong>Use cases:</strong> Serverless apps, gaming, IoT
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/databases/couchdb">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">CouchDB</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Document DB
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Apache CouchDB is a document database that seamlessly syncs with
                web browsers and mobile devices.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Document storage</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Offline-first sync</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>MapReduce queries</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>RESTful HTTP API</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Versions:</strong> 3.1, 3.2, 3.3
                  <br />
                  <strong>Use cases:</strong> Mobile apps, offline sync
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/databases/neo4j">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-teal-100 dark:bg-teal-900/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">Neo4j</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Graph DB
                  </Badge>
                </div>
              </div>
              <CardDescription>
                Native graph database that stores and processes data
                relationships with high performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Graph data model</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Cypher query language</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>ACID transactions</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>High performance</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Versions:</strong> 4.4, 5.0, 5.1
                  <br />
                  <strong>Use cases:</strong> Social networks, recommendations
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/docs/databases/timescaledb">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center">
                  <Database className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <CardTitle className="text-lg">TimescaleDB</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    Time Series
                  </Badge>
                </div>
              </div>
              <CardDescription>
                PostgreSQL extension for time-series data with automatic
                partitioning and optimized queries.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Time-series optimization</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Automatic partitioning</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>PostgreSQL compatible</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Advanced analytics</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="text-sm text-muted-foreground">
                  <strong>Versions:</strong> 2.8, 2.9, 2.10
                  <br />
                  <strong>Use cases:</strong> IoT, monitoring, analytics
                </div>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Choosing a Database */}
      <Card>
        <CardHeader>
          <CardTitle>Choosing the Right Database</CardTitle>
          <CardDescription>
            Guidance for selecting the best database for your use case.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                Relational Databases (SQL)
              </h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm">PostgreSQL</h5>
                  <p className="text-xs text-muted-foreground">
                    Complex relationships, JSON data, advanced queries, ACID
                    transactions
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">MySQL</h5>
                  <p className="text-xs text-muted-foreground">
                    High performance, wide ecosystem, web applications,
                    e-commerce
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">MariaDB</h5>
                  <p className="text-xs text-muted-foreground">
                    MySQL compatible, enhanced features, open source, better
                    performance
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">SQLite</h5>
                  <p className="text-xs text-muted-foreground">
                    Embedded, zero configuration, development, mobile apps
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-purple-600" />
                NoSQL Databases
              </h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm">Redis</h5>
                  <p className="text-xs text-muted-foreground">
                    Caching, sessions, real-time messaging, data structures
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">MongoDB</h5>
                  <p className="text-xs text-muted-foreground">
                    Document storage, flexible schema, content management, IoT
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">Cassandra</h5>
                  <p className="text-xs text-muted-foreground">
                    Wide column, high scalability, time series, messaging
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">Elasticsearch</h5>
                  <p className="text-xs text-muted-foreground">
                    Full-text search, analytics, logging, distributed search
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-600" />
                Specialized Databases
              </h4>
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm">DynamoDB</h5>
                  <p className="text-xs text-muted-foreground">
                    Serverless, auto-scaling, single-digit millisecond latency
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">CouchDB</h5>
                  <p className="text-xs text-muted-foreground">
                    Document DB, offline sync, mobile applications
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">Neo4j</h5>
                  <p className="text-xs text-muted-foreground">
                    Graph database, relationships, social networks,
                    recommendations
                  </p>
                </div>
                <div>
                  <h5 className="font-medium text-sm">TimescaleDB</h5>
                  <p className="text-xs text-muted-foreground">
                    Time series, IoT data, monitoring, analytics
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Decision Factors
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>
                  • <strong>Data Structure:</strong> Relational vs Document vs
                  Graph
                </li>
                <li>
                  • <strong>Scalability:</strong> Vertical vs Horizontal scaling
                </li>
                <li>
                  • <strong>Consistency:</strong> ACID vs Eventual consistency
                </li>
                <li>
                  • <strong>Query Patterns:</strong> Complex joins vs Simple
                  lookups
                </li>
                <li>
                  • <strong>Development Speed:</strong> Schema flexibility
                </li>
                <li>
                  • <strong>Operational Complexity:</strong> Management overhead
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Features */}
      <Card>
        <CardHeader>
          <CardTitle>All Databases Include</CardTitle>
          <CardDescription>
            Every database service comes with these enterprise features.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Shield className="h-8 w-8 text-red-500" />
              <div>
                <div className="font-semibold">Security</div>
                <div className="text-sm text-muted-foreground">
                  Encryption & access control
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Database className="h-8 w-8 text-blue-500" />
              <div>
                <div className="font-semibold">Backups</div>
                <div className="text-sm text-muted-foreground">
                  Automatic & on-demand
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Zap className="h-8 w-8 text-yellow-500" />
              <div>
                <div className="font-semibold">Scaling</div>
                <div className="text-sm text-muted-foreground">
                  Auto-scaling support
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Star className="h-8 w-8 text-purple-500" />
              <div>
                <div className="font-semibold">Monitoring</div>
                <div className="text-sm text-muted-foreground">
                  Performance metrics
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Add a database to your Nimbly project in minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-[#1e1e1e] text-white p-4 rounded-lg border font-mono text-sm">
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-green-400 select-none">$</span>
                <span>nimbly init my-app</span>
              </div>
              <div className="text-gray-400">
                ? What is the name of your project? my-app
              </div>
              <div className="text-gray-400">
                ? Select your framework: Next.js
              </div>
              <div className="text-gray-400">? Select database: PostgreSQL</div>
              <div className="text-gray-400">? Select database version: 15</div>
              <div className="text-green-400">✔ Database configured!</div>
              <div className="text-gray-300">
                Connection string available as DATABASE_URL
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href="/docs/quick-start">
              <Button>
                <ArrowRight className="h-4 w-4 mr-2" />
                Start Building
              </Button>
            </Link>
            <Link href="/docs/databases/postgresql">
              <Button variant="outline">PostgreSQL Guide</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
