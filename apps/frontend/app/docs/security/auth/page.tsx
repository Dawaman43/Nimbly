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

export default function AuthPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary">Security</Badge>
          <Badge variant="outline">Authentication</Badge>
        </div>
        <h1 className="text-4xl font-bold">Authentication</h1>
        <p className="text-xl text-muted-foreground">
          Implement secure user authentication and authorization in your
          applications
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Authentication Methods</CardTitle>
          <CardDescription>
            Nimbly supports multiple authentication methods for different use
            cases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">JWT Tokens</h3>
              <p className="text-sm text-muted-foreground">
                Stateless token-based authentication
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">OAuth 2.0</h3>
              <p className="text-sm text-muted-foreground">
                Third-party authentication providers
              </p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h3 className="font-semibold">API Keys</h3>
              <p className="text-sm text-muted-foreground">
                Service-to-service authentication
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="jwt" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jwt">JWT Authentication</TabsTrigger>
          <TabsTrigger value="oauth">OAuth Integration</TabsTrigger>
          <TabsTrigger value="sessions">Session Management</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="jwt" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>JWT Token Configuration</CardTitle>
              <CardDescription>
                Configure JWT tokens for secure API authentication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "auth": {
      "jwt": {
        "secret": "\${JWT_SECRET}",
        "expires_in": "24h",
        "issuer": "nimbly-app",
        "algorithm": "HS256"
      }
    }
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Token Usage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Generating Tokens</h4>
                <CodeBlock
                  language="javascript"
                  code={`const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }
);`}
                />
              </div>

              <div>
                <h4 className="font-semibold">Verifying Tokens</h4>
                <CodeBlock
                  language="javascript"
                  code={`const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="oauth" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>OAuth 2.0 Providers</CardTitle>
              <CardDescription>
                Integrate with popular OAuth providers for user authentication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "auth": {
      "oauth": {
        "google": {
          "client_id": "\${GOOGLE_CLIENT_ID}",
          "client_secret": "\${GOOGLE_CLIENT_SECRET}",
          "redirect_uri": "https://yourapp.com/auth/google/callback"
        },
        "github": {
          "client_id": "\${GITHUB_CLIENT_ID}",
          "client_secret": "\${GITHUB_CLIENT_SECRET}",
          "redirect_uri": "https://yourapp.com/auth/github/callback"
        }
      }
    }
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OAuth Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Authorization Request</h4>
                    <p className="text-sm text-muted-foreground">
                      User is redirected to OAuth provider
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">User Consent</h4>
                    <p className="text-sm text-muted-foreground">
                      User grants permission to your application
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Authorization Code</h4>
                    <p className="text-sm text-muted-foreground">
                      Provider redirects back with authorization code
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Token Exchange</h4>
                    <p className="text-sm text-muted-foreground">
                      Exchange code for access token
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Session Management</CardTitle>
              <CardDescription>
                Configure session handling and security settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "auth": {
      "sessions": {
        "store": "redis",
        "ttl": 86400,
        "secure": true,
        "http_only": true,
        "same_site": "strict"
      }
    }
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Session Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold">Session Hijacking Protection</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Secure cookies with HttpOnly flag</li>
                  <li>• SameSite cookie attribute</li>
                  <li>• Session ID rotation on login</li>
                  <li>• IP address binding (optional)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold">Session Expiration</h4>
                <CodeBlock
                  language="javascript"
                  code={`// Automatic session cleanup
const sessionConfig = {
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict'
  }
};`}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Role-Based Access Control</CardTitle>
              <CardDescription>
                Define roles and permissions for your application users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="json"
                code={`{
  "config": {
    "auth": {
      "roles": {
        "admin": {
          "permissions": ["read", "write", "delete", "manage_users"]
        },
        "editor": {
          "permissions": ["read", "write"]
        },
        "viewer": {
          "permissions": ["read"]
        }
      }
    }
  }
}`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permission Checking</CardTitle>
            </CardHeader>
            <CardContent>
              <CodeBlock
                language="javascript"
                code={`const checkPermission = (user, permission) => {
  if (!user || !user.role) return false;

  const role = roles[user.role];
  if (!role) return false;

  return role.permissions.includes(permission);
};

// Usage in middleware
const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!checkPermission(req.user, permission)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};`}
              />
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Best Practice:</strong> Always check permissions on both
              the client and server side. Client-side checks provide UX
              improvements, but server-side checks ensure security.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4">
        <Button asChild>
          <Link href="/docs/security">← Security</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/docs/security/api-keys">API Keys →</Link>
        </Button>
      </div>
    </div>
  );
}
