import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { Database, CheckCircle, ArrowRight } from "lucide-react";

export default function MongoDBPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Database</Badge>
          <Badge variant="outline">NoSQL</Badge>
          <Badge variant="outline">Document</Badge>
        </div>
        <h1 className="text-4xl font-bold">MongoDB</h1>
        <p className="text-xl text-muted-foreground">
          Leading NoSQL document database for modern applications with flexible schema design.
        </p>
      </div>

      <Alert>
        <CheckCircle className="h-4 w-4" />
        <AlertDescription>
          MongoDB is the most popular document database, used by millions of developers worldwide.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>MongoDB Overview</CardTitle>
          <CardDescription>
            Key features and capabilities of MongoDB database service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Document Model</h3>
              <p className="text-sm text-muted-foreground">JSON-like documents</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Flexible Schema</h3>
              <p className="text-sm text-muted-foreground">Adaptable data structures</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Horizontal Scaling</h3>
              <p className="text-sm text-muted-foreground">Built for scale</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="connection" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="queries">Queries</TabsTrigger>
          <TabsTrigger value="scaling">Scaling</TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>
                How to connect your application to MongoDB.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock
                language="javascript"
                code={`// Node.js with MongoDB driver
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('your_database');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}`}
              />

              <CodeBlock
                language="bash"
                code={`# Environment variables (auto-provided by Nimbly)
MONGODB_URI=mongodb://user:pass@mongodb-123456.nimbly.app:27017/your_database?ssl=true&replicaSet=rs0`}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Connection Options</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Automatic connection pooling</li>
                    <li>• SSL/TLS encryption</li>
                    <li>• Replica set support</li>
                    <li>• Connection health monitoring</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Authentication & authorization</li>
                    <li>• Network encryption</li>
                    <li>• Role-based access control</li>
                    <li>• Audit logging</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>MongoDB Features</CardTitle>
              <CardDescription>
                Key features available in Nimbly's MongoDB service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Document Model</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• JSON/BSON document storage</li>
                    <li>• Dynamic schema</li>
                    <li>• Nested documents & arrays</li>
                    <li>• Rich data types</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Indexing</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Single field indexes</li>
                    <li>• Compound indexes</li>
                    <li>• Geospatial indexes</li>
                    <li>• Text search indexes</li>
                    <li>• TTL indexes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Aggregation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Aggregation pipeline</li>
                    <li>• Map-reduce operations</li>
                    <li>• Group operations</li>
                    <li>• Statistical operations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Advanced Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Change streams</li>
                    <li>• GridFS for large files</li>
                    <li>• Transactions (MongoDB 4.0+)</li>
                    <li>• Time series collections</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="queries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Query Examples</CardTitle>
              <CardDescription>
                Common MongoDB query patterns and operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Basic CRUD Operations</h4>
                <CodeBlock
                  language="javascript"
                  code={`// Insert document
await collection.insertOne({
  name: "John Doe",
  email: "john@example.com",
  age: 30,
  createdAt: new Date()
});

// Find documents
const users = await collection.find({ age: { $gte: 25 } }).toArray();

// Update document
await collection.updateOne(
  { email: "john@example.com" },
  { $set: { lastLogin: new Date() } }
);

// Delete document
await collection.deleteOne({ email: "john@example.com" });`}
/>
              </div>

              <div>
                <h4 className="font-semibold">Advanced Queries</h4>
                <CodeBlock
                  language="javascript"
                  code={`// Complex query with operators
const results = await collection.find({
  age: { $gte: 18, $lte: 65 },
  status: "active",
  tags: { $in: ["developer", "admin"] },
  createdAt: { $gte: new Date('2023-01-01') }
}).sort({ createdAt: -1 }).limit(10).toArray();

// Aggregation pipeline
const pipeline = [
  { $match: { status: "active" } },
  { $group: { _id: "$department", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
];

const stats = await collection.aggregate(pipeline).toArray();`}
/>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scaling" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Scaling & High Availability</CardTitle>
              <CardDescription>
                MongoDB scaling strategies and replication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Replica Sets</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Automatic replica set configuration for high availability and data redundancy.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Primary node for writes</li>
                  <li>• Secondary nodes for reads</li>
                  <li>• Automatic failover</li>
                  <li>• Data synchronization</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">Sharding</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Horizontal scaling across multiple servers for massive datasets.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Automatic data distribution</li>
                  <li>• Shard key selection</li>
                  <li>• Query routing</li>
                  <li>• Rebalancing operations</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">Read Preferences</h4>
                <CodeBlock
                  language="javascript"
                  code={`// Read from primary (default)
await collection.find().readPreference('primary');

// Read from secondaries for better performance
await collection.find().readPreference('secondaryPreferred');

// Read from nearest node
await collection.find().readPreference('nearest');`}
/>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/databases">← Databases Overview</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/databases/cassandra">Cassandra →</Link>
        </Button>
      </div>
    </div>
  );
}
