import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/ui/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

export default function DatabaseMigrationsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Database</Badge>
          <Badge variant="outline">Migrations</Badge>
        </div>
        <h1 className="text-4xl font-bold">Database Migrations</h1>
        <p className="text-xl text-muted-foreground">
          Manage database schema changes safely and efficiently
        </p>
      </div>

      <Alert>
        <AlertDescription>
          Database migrations help you version and apply schema changes to your
          databases. Always test migrations in development before applying them
          to production.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Migration Workflow</CardTitle>
          <CardDescription>
            The standard process for creating and applying database migrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <div>
                <h4 className="font-semibold">Create Migration</h4>
                <p className="text-sm text-muted-foreground">
                  Generate a new migration file with your schema changes
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <div>
                <h4 className="font-semibold">Write Migration Code</h4>
                <p className="text-sm text-muted-foreground">
                  Implement the up and down methods for your changes
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <div>
                <h4 className="font-semibold">Test Migration</h4>
                <p className="text-sm text-muted-foreground">
                  Run the migration in a development environment
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                4
              </div>
              <div>
                <h4 className="font-semibold">Deploy Migration</h4>
                <p className="text-sm text-muted-foreground">
                  Apply the migration to production databases
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="creating" className="space-y-4">
        <TabsList>
          <TabsTrigger value="creating">Creating Migrations</TabsTrigger>
          <TabsTrigger value="running">Running Migrations</TabsTrigger>
          <TabsTrigger value="rollback">Rollback</TabsTrigger>
          <TabsTrigger value="best-practices">Best Practices</TabsTrigger>
        </TabsList>

        <TabsContent value="creating" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Generate Migration Files</CardTitle>
              <CardDescription>
                Use the Nimbly CLI to create new migration files
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Create a new migration
nimbly migration create add_user_email_index

# This creates a file like:
# migrations/20240101120000_add_user_email_index.js`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Migration File Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="javascript"
                code={`// migrations/20240101120000_add_user_email_index.js
module.exports = {
  up: async (db) => {
    // Add your migration logic here
    await db.query(\`
      CREATE INDEX idx_users_email
      ON users (email)
    \`);
  },

  down: async (db) => {
    // Add rollback logic here
    await db.query(\`
      DROP INDEX idx_users_email
    \`);
  }
};`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Common Migration Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Adding Columns</h4>
                <CodeBlock
                  language="javascript"
                  code={`up: async (db) => {
  await db.query(\`
    ALTER TABLE users
    ADD COLUMN phone VARCHAR(20)
  \`);
},

down: async (db) => {
  await db.query(\`
    ALTER TABLE users
    DROP COLUMN phone
  \`);
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Creating Tables</h4>
                <CodeBlock
                  language="javascript"
                  code={`up: async (db) => {
  await db.query(\`
    CREATE TABLE posts (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      content TEXT,
      user_id INTEGER REFERENCES users(id),
      created_at TIMESTAMP DEFAULT NOW()
    )
  \`);
},

down: async (db) => {
  await db.query('DROP TABLE posts');
}`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="running" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Apply Migrations</CardTitle>
              <CardDescription>
                Run pending migrations to update your database schema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Apply all pending migrations
nimbly migration up

# Apply specific number of migrations
nimbly migration up --count 3

# Apply migrations for specific database
nimbly migration up --database production`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Check Migration Status</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Show current migration status
nimbly migration status

# Output:
# Migration                    Status
# 20240101120000_add_user_email_index  applied
# 20240102130000_create_posts_table    pending`}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rollback" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rolling Back Migrations</CardTitle>
              <CardDescription>
                Revert applied migrations when needed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="bash"
                code={`# Rollback last migration
nimbly migration down

# Rollback multiple migrations
nimbly migration down --count 2

# Rollback to specific migration
nimbly migration down --to 20240101120000`}
              />
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Warning:</strong> Rolling back migrations can result in
              data loss. Always backup your database before performing rollbacks
              in production.
            </AlertDescription>
          </Alert>
        </TabsContent>

        <TabsContent value="best-practices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Migration Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">
                  1. Always Write Rollback Scripts
                </h4>
                <p className="text-sm text-muted-foreground">
                  Every migration should have both up and down methods to ensure
                  reversibility.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">2. Test Migrations Thoroughly</h4>
                <p className="text-sm text-muted-foreground">
                  Run migrations in development and staging environments before
                  production deployment.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">3. Use Descriptive Names</h4>
                <p className="text-sm text-muted-foreground">
                  Migration filenames should clearly describe what the migration
                  does.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">4. Avoid Large Data Changes</h4>
                <p className="text-sm text-muted-foreground">
                  Break large data migrations into smaller, manageable chunks.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">5. Backup Before Migration</h4>
                <p className="text-sm text-muted-foreground">
                  Always create database backups before running migrations in
                  production.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/databases/postgresql">← PostgreSQL</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/configuration">Configuration →</Link>
        </Button>
      </div>
    </div>
  );
}
