import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { Database, CheckCircle, Zap } from "lucide-react";

export default function RedisPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Database</Badge>
          <Badge variant="outline">NoSQL</Badge>
          <Badge variant="outline">Key-Value</Badge>
          <Badge variant="outline">In-Memory</Badge>
        </div>
        <h1 className="text-4xl font-bold">Redis</h1>
        <p className="text-xl text-muted-foreground">
          High-performance in-memory data structure store used as database, cache, and message broker.
        </p>
      </div>

      <Alert>
        <Zap className="h-4 w-4" />
        <AlertDescription>
          Redis delivers sub-millisecond response times with advanced data structures and powerful features.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Redis Overview</CardTitle>
          <CardDescription>
            Key features and capabilities of Redis database service
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">In-Memory Storage</h3>
              <p className="text-sm text-muted-foreground">Lightning-fast access</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Data Structures</h3>
              <p className="text-sm text-muted-foreground">Rich data types</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">Persistence</h3>
              <p className="text-sm text-muted-foreground">Durable storage options</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="connection" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connection">Connection</TabsTrigger>
          <TabsTrigger value="data-types">Data Types</TabsTrigger>
          <TabsTrigger value="commands">Commands</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Database Connection</CardTitle>
              <CardDescription>
                How to connect your application to Redis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CodeBlock
                language="javascript"
                code={`// Node.js with redis client
const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 60000,
    lazyConnect: true,
  }
});

client.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
  try {
    await client.connect();
    console.log('Connected to Redis');
    return client;
  } catch (error) {
    console.error('Redis connection error:', error);
    throw error;
  }
}`}
              />

              <CodeBlock
                language="bash"
                code={`# Environment variables (auto-provided by Nimbly)
REDIS_URL=redis://user:pass@redis-123456.nimbly.app:6379/0`}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold mb-2">Connection Features</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Connection pooling</li>
                    <li>• Automatic reconnection</li>
                    <li>• TLS/SSL support</li>
                    <li>• Sentinel support</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Security</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Password authentication</li>
                    <li>• ACL (Access Control List)</li>
                    <li>• TLS encryption</li>
                    <li>• Network isolation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data-types" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Redis Data Types</CardTitle>
              <CardDescription>
                Rich data structures supported by Redis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Basic Types</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><strong>Strings:</strong> Binary-safe strings up to 512MB</li>
                    <li><strong>Integers:</strong> 64-bit signed integers</li>
                    <li><strong>Floats:</strong> Double precision floating point</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Complex Types</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><strong>Lists:</strong> Linked lists of strings</li>
                    <li><strong>Sets:</strong> Unordered unique strings</li>
                    <li><strong>Sorted Sets:</strong> Ordered unique strings with scores</li>
                    <li><strong>Hashes:</strong> Field-value pairs</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Advanced Types</h4>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li><strong>Bitmaps:</strong> Bit operations on strings</li>
                    <li><strong>HyperLogLog:</strong> Probabilistic cardinality estimation</li>
                    <li><strong>Geospatial:</strong> Longitude/latitude coordinates</li>
                    <li><strong>Streams:</strong> Append-only log data structure</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Usage Examples</h4>
                  <CodeBlock
                    language="bash"
                    code={`# Strings
SET user:123:name "John Doe"
GET user:123:name

# Lists
LPUSH mylist "item1"
LPUSH mylist "item2"
LRANGE mylist 0 -1

# Hashes
HSET user:123 name "John" age 30
HGET user:123 name

# Sets
SADD myset "member1"
SADD myset "member2"
SMEMBERS myset`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="commands" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Common Redis Commands</CardTitle>
              <CardDescription>
                Essential Redis commands for data operations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">String Operations</h4>
                <CodeBlock
                  language="bash"
                  code={`# Set and get values
SET key "value"
GET key
SETEX key 3600 "value"  # Set with expiration
INCR counter           # Increment integer
APPEND key "more"      # Append to string`}
                />
              </div>

              <div>
                <h4 className="font-semibold">List Operations</h4>
                <CodeBlock
                  language="bash"
                  code={`# List operations
LPUSH mylist "item"    # Push to left
RPUSH mylist "item"    # Push to right
LPOP mylist           # Pop from left
RPOP mylist           # Pop from right
LRANGE mylist 0 -1    # Get all items`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Hash Operations</h4>
                <CodeBlock
                  language="bash"
                  code={`# Hash operations
HSET user:123 name "John" age 30
HGET user:123 name
HGETALL user:123
HINCRBY user:123 age 1
HEXISTS user:123 name`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Set Operations</h4>
                <CodeBlock
                  language="bash"
                  code={`# Set operations
SADD myset "member1"
SADD myset "member2"
SMEMBERS myset
SISMEMBER myset "member1"
SCARD myset`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
              <CardDescription>
                Powerful Redis features for modern applications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Caching & Expiration</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Automatic key expiration and memory management.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• TTL (Time To Live) for keys</li>
                  <li>• Automatic cleanup of expired keys</li>
                  <li>• Memory-efficient data structures</li>
                  <li>• LRU eviction policies</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">Pub/Sub Messaging</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Publish/subscribe pattern for real-time messaging.
                </p>
                <CodeBlock
                  language="bash"
                  code={`# Publisher
PUBLISH channel "message"

# Subscriber
SUBSCRIBE channel
PSUBSCRIBE pattern*`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Transactions</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Atomic operations with MULTI/EXEC commands.
                </p>
                <CodeBlock
                  language="bash"
                  code={`# Transaction example
MULTI
SET key1 "value1"
SET key2 "value2"
INCR counter
EXEC`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Persistence</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Data durability options for Redis.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• RDB snapshots</li>
                  <li>• AOF (Append Only File)</li>
                  <li>• Point-in-time recovery</li>
                  <li>• Background saving</li>
                </ul>
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
          <Link href="/docs/databases/postgresql">PostgreSQL →</Link>
        </Button>
      </div>
    </div>
  );
}
