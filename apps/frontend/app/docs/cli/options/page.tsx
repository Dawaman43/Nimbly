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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default function CliOptionsPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">CLI</Badge>
          <Badge variant="outline">Options</Badge>
        </div>
        <h1 className="text-4xl font-bold">CLI Options Reference</h1>
        <p className="text-xl text-muted-foreground">
          Global options and configuration settings for the Nimbly CLI
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Global Options</CardTitle>
          <CardDescription>
            Options that apply to all CLI commands
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Option</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Example</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <code>--help, -h</code>
                </TableCell>
                <TableCell>Show help information</TableCell>
                <TableCell>
                  <code>nimbly --help</code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code>--version, -v</code>
                </TableCell>
                <TableCell>Show CLI version</TableCell>
                <TableCell>
                  <code>nimbly --version</code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code>--verbose</code>
                </TableCell>
                <TableCell>Enable verbose output</TableCell>
                <TableCell>
                  <code>nimbly deploy --verbose</code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code>--quiet, -q</code>
                </TableCell>
                <TableCell>Suppress non-error output</TableCell>
                <TableCell>
                  <code>nimbly logs --quiet</code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code>--json</code>
                </TableCell>
                <TableCell>Output in JSON format</TableCell>
                <TableCell>
                  <code>nimbly status --json</code>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <code>--config</code>
                </TableCell>
                <TableCell>Specify config file path</TableCell>
                <TableCell>
                  <code>nimbly --config ./nimbly.json</code>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Tabs defaultValue="output" className="space-y-4">
        <TabsList>
          <TabsTrigger value="output">Output Options</TabsTrigger>
          <TabsTrigger value="environment">Environment Options</TabsTrigger>
          <TabsTrigger value="filtering">Filtering Options</TabsTrigger>
          <TabsTrigger value="configuration">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="output" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Output Formatting</CardTitle>
              <CardDescription>
                Control how command output is displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">JSON Output</h4>
                <CodeBlock
                  language="bash"
                  code={`# Get status in JSON format
nimbly status --json

# Parse with jq
nimbly status --json | jq '.services[0].status'

# Pretty print JSON
nimbly status --json | jq`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Table Output</h4>
                <CodeBlock
                  language="bash"
                  code={`# Default table format
nimbly resources list

# Wide table (more columns)
nimbly resources list --wide

# Custom columns
nimbly resources list --columns name,type,status`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Verbose Mode</h4>
                <CodeBlock
                  language="bash"
                  code={`# Show detailed operation information
nimbly deploy --verbose

# Debug mode (includes HTTP requests)
nimbly deploy --debug

# Show timing information
nimbly deploy --timing`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Environment Selection</CardTitle>
              <CardDescription>
                Specify which environment to operate on
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Environment Options</h4>
                <CodeBlock
                  language="bash"
                  code={`# Specify environment explicitly
nimbly deploy --environment production
nimbly deploy -e staging

# Use environment variable
export NIMBLY_ENV=development
nimbly deploy

# List available environments
nimbly environments list`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Environment Variables</h4>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Variable</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Default</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <code>NIMBLY_ENV</code>
                      </TableCell>
                      <TableCell>Target environment</TableCell>
                      <TableCell>
                        <code>development</code>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <code>NIMBLY_PROJECT</code>
                      </TableCell>
                      <TableCell>Project name</TableCell>
                      <TableCell>Auto-detected</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <code>NIMBLY_API_KEY</code>
                      </TableCell>
                      <TableCell>API key for authentication</TableCell>
                      <TableCell>From config</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <code>NIMBLY_CONFIG</code>
                      </TableCell>
                      <TableCell>Path to config file</TableCell>
                      <TableCell>
                        <code>./nimbly.json</code>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="filtering" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filtering and Selection</CardTitle>
              <CardDescription>
                Filter results and select specific resources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Resource Selection</h4>
                <CodeBlock
                  language="bash"
                  code={`# Select by name
nimbly logs --service api
nimbly logs --resource db-1

# Select by type
nimbly resources list --type postgres
nimbly resources list --type redis

# Select by status
nimbly resources list --status running
nimbly resources list --status failed`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Time-based Filtering</h4>
                <CodeBlock
                  language="bash"
                  code={`# Filter by time range
nimbly logs --since 1h
nimbly logs --since "2024-01-01"
nimbly logs --until "2024-01-02"

# Relative time
nimbly logs --since 30m    # 30 minutes ago
nimbly logs --since 2h     # 2 hours ago
nimbly logs --since 1d     # 1 day ago
nimbly logs --since 1w     # 1 week ago`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Text Filtering</h4>
                <CodeBlock
                  language="bash"
                  code={`# Search in logs
nimbly logs --grep "error"
nimbly logs --grep "database.*connection"

# Case insensitive search
nimbly logs --grep "ERROR" --ignore-case

# Invert match
nimbly logs --grep "debug" --invert`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="configuration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Configuration Files</CardTitle>
              <CardDescription>CLI configuration and settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Global Configuration</h4>
                <CodeBlock
                  language="bash"
                  code={`# Location: ~/.nimbly/config.json
{
  "api_url": "https://api.nimbly.app",
  "default_environment": "development",
  "output_format": "table",
  "theme": "auto",
  "auto_update": true,
  "telemetry": false
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Project Configuration</h4>
                <CodeBlock
                  language="bash"
                  code={`# Location: ./nimbly.json or ./package.json (nimbly field)
{
  "name": "my-app",
  "version": "1.0.0",
  "nimbly": {
    "project": "my-app",
    "region": "us-east-1",
    "environments": {
      "development": {
        "domain": "dev.myapp.com"
      },
      "production": {
        "domain": "myapp.com"
      }
    }
  }
}`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Configuration Commands</h4>
                <CodeBlock
                  language="bash"
                  code={`# View current configuration
nimbly config show

# Edit configuration
nimbly config edit

# Validate configuration
nimbly config validate

# Reset to defaults
nimbly config reset`}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shell Completion</CardTitle>
              <CardDescription>
                Enable tab completion for faster CLI usage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Bash</h4>
                <CodeBlock
                  language="bash"
                  code={`# Add to ~/.bashrc
nimbly completion bash >> ~/.bashrc
source ~/.bashrc`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Zsh</h4>
                <CodeBlock
                  language="bash"
                  code={`# Add to ~/.zshrc
nimbly completion zsh >> ~/.zshrc
source ~/.zshrc`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Fish</h4>
                <CodeBlock
                  language="bash"
                  code={`# Create completion file
nimbly completion fish > ~/.config/fish/completions/nimbly.fish`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/cli/commands">← Commands</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/cli/examples">Examples →</Link>
        </Button>
      </div>
    </div>
  );
}
