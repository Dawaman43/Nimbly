"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cloud, Github } from "lucide-react";
import { toast } from "sonner";

interface AuthPageProps {
  onLoginSuccess: () => void;
}

export default function AuthPage({ onLoginSuccess }: AuthPageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    try {
      const res = await fetch("http://[::1]:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        if (res.status === 401) throw new Error("Invalid credentials");
        throw new Error("Login failed");
      }

      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);
      onLoginSuccess();
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.message === "Failed to fetch" || err.name === "TypeError") {
        toast.error("Cannot connect to server. Is the backend running?");
      } else if (err.message === "Invalid credentials") {
        toast.error("Invalid email or password.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const name = (e.target as any).name.value;
    const email = (e.target as any).elements["register-email"].value;
    const password = (e.target as any).elements["register-password"].value;

    try {
      const res = await fetch("http://[::1]:4000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) throw new Error("Registration failed");

      // Auto login after register? Or just ask to login.
      // Let's auto-login for better UX
      const loginRes = await fetch("http://[::1]:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (loginRes.ok) {
        const data = await loginRes.json();
        localStorage.setItem("access_token", data.access_token);
        onLoginSuccess();
      } else {
        toast.error("Registration successful but login failed.");
      }
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err.message === "Failed to fetch" || err.name === "TypeError") {
        toast.error("Cannot connect to server. Is the backend running?");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-4">
            <div className="h-10 w-10 rounded bg-orange-600 flex items-center justify-center text-white">
              <Cloud className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome to Nimbly</CardTitle>
          <CardDescription>
            Deploy your infrastructure in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    name="register-email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    name="register-password"
                    type="password"
                    required
                  />
                </div>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={onLoginSuccess}
          >
            <Github className="mr-2 h-4 w-4" />
            GitHub
          </Button>
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-xs text-muted-foreground text-center px-4">
            By clicking continue, you agree to our Terms of Service and Privacy
            Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
