import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Database, CheckCircle, ArrowRight } from "lucide-react";

export default function MySQLPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Database</Badge>
          <Badge variant="outline">SQL</Badge>
        </div>
        <h1 className="text-4xl font-bold">MySQL</h1>
        <p className="text-xl text-muted-foreground">
          Widely adopted relational database known for its speed, reliability, and extensive ecosystem.
        </p>
      </div>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          MySQL is one of the most popular relational databases, powering millions of applications worldwide.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>MySQL Overview</CardTitle>
          <CardDescription>
            Key features and capabilities of MySQL database service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">High Performance</h3>
              <p className="text-sm text-muted-foreground">Optimized for speed and efficiency</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">ACID Compliant</h3>
              <p className="text-sm text-muted-foreground">Reliable transactions</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Wide Adoption</h3>
              <p className="text-sm text-muted-foreground">Massive ecosystem and community</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="connection" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="migration">Migration</TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>
                How to connect your application to MySQL.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock
                language="javascript"
                code={`// Node.js with mysql2 library
const mysql = require('mysql2/promise');

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === 'production' ? {
    rejectUnauthorized: true
  } : false
});`}
              />

              <CodeBlock
                language="bash"
                code={`# Environment variables (auto-provided by Nimbly)
DB_HOST=mysql-123456.nimbly.app
DB_USER=your_app_user
DB_PASSWORD=auto_generated_password
DB_NAME=your_database_name`}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Connection Pooling</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automatic connection management</li>
                    <li>• Configurable pool size (1-100)</li>
                    <li>• Connection health monitoring</li>
                    <li>• Graceful shutdown handling</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• SSL/TLS encryption</li>
                    <li>• User authentication</li>
                    <li>• Network isolation</li>
                    <li>• Automated backups</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>MySQL Features</CardTitle>
              <CardDescription>
                Key features available in Nimbly's MySQL service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Storage Engines</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• InnoDB (default, ACID compliant)</li>
                    <li>• MyISAM (high-performance reads)</li>
                    <li>• Memory (in-memory tables)</li>
                    <li>• CSV (data import/export)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Data Types</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Numeric: INT, BIGINT, DECIMAL</li>
                    <li>• String: VARCHAR, TEXT, BLOB</li>
                    <li>• Date/Time: DATETIME, TIMESTAMP</li>
                    <li>• Spatial: GEOMETRY, POINT</li>
                    <li>• JSON (MySQL 5.7.8+)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Indexing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• B-Tree indexes</li>
                    <li>• Full-text search indexes</li>
                    <li>• Spatial indexes</li>
                    <li>• Composite indexes</li>
                    <li>• Unique constraints</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Advanced Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Stored procedures</li>
                    <li>• Triggers</li>
                    <li>• Views</li>
                    <li>• Foreign key constraints</li>
                    <li>• Partitioning</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Replication & High Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Master-Slave Replication</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatic setup of read replicas for improved performance and high availability.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Automatic Failover</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatic promotion of slave to master in case of primary failure.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold">Load Balancing</h4>
                  <p className="text-sm text-muted-foreground">
                    Intelligent routing of read queries to replica instances.
                  </p>
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
                Tips and best practices for optimal MySQL performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Query Optimization</h4>
                <CodeBlock
                  language="sql"
                  code={`-- Use EXPLAIN to analyze query execution
EXPLAIN SELECT * FROM users WHERE email = 'user@example.com';

-- Add appropriate indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_created ON posts(user_id, created_at);

-- Use LIMIT for large result sets
SELECT * FROM logs ORDER BY created_at DESC LIMIT 100;`}
/>
              </div>

              <div>
                <h4 className="font-semibold">Configuration Tuning</h4>
                <CodeBlock
                  language="ini"
                  code={`# MySQL configuration (managed by Nimbly)
[mysqld]
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
max_connections = 100
query_cache_size = 64M
tmp_table_size = 128M
max_heap_table_size = 128M`}
/>
              </div>

              <div>
                <h4 className="font-semibold">Connection Pooling Best Practices</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use connection pooling libraries</li>
                  <li>• Set appropriate pool sizes</li>
                  <li>• Implement connection health checks</li>
                  <li>• Handle connection timeouts gracefully</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="migration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Migration from Other Databases</CardTitle>
              <CardDescription>
                Tools and strategies for migrating to MySQL
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Common Migration Tools</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• mysqldump for SQL exports</li>
                  <li>• MySQL Workbench Migration Wizard</li>
                  <li>• Third-party tools like pgloader (from PostgreSQL)</li>
                  <li>• AWS Database Migration Service</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">Migration Steps</h4>
                <ol className="text-sm text-muted-foreground space-y-1">
                  <li>1. Schema conversion and assessment</li>
                  <li>2. Data export from source database</li>
                  <li>3. Data import to MySQL</li>
                  <li>4. Index recreation and optimization</li>
                  <li>5. Application code updates</li>
                  <li>6. Testing and validation</li>
                </ol>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monitoring and Maintenance</CardTitle>
              <CardDescription>
                Tools for monitoring MySQL performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="sql"
                code={`-- Check active connections
SHOW PROCESSLIST;

-- View InnoDB status
SHOW ENGINE INNODB STATUS;

-- Global status variables
SHOW GLOBAL STATUS;

-- Configuration variables
SHOW VARIABLES LIKE 'innodb%';`}
/>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/databases">← Databases Overview</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/databases/mariadb">MariaDB →</Link>
        </Button>
      </div>
    </div>
  );
}
