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

interface AuthPageProps {
    onLoginSuccess: () => void;
}

export default function AuthPage({ onLoginSuccess }: AuthPageProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onLoginSuccess();
        }, 1500);
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
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="m@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" required />
                                </div>
                                <Button className="w-full bg-orange-600 hover:bg-orange-700" type="submit" disabled={isLoading}>
                                    {isLoading ? "Signing in..." : "Sign In"}
                                </Button>
                            </form>
                        </TabsContent>

                        <TabsContent value="register">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input id="name" placeholder="John Doe" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-email">Email</Label>
                                    <Input id="register-email" type="email" placeholder="m@example.com" required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="register-password">Password</Label>
                                    <Input id="register-password" type="password" required />
                                </div>
                                <Button className="w-full bg-orange-600 hover:bg-orange-700" type="submit" disabled={isLoading}>
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

                    <Button variant="outline" className="w-full" type="button" onClick={onLoginSuccess}>
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </Button>

                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-xs text-muted-foreground text-center px-4">
                        By clicking continue, you agree to our Terms of Service and Privacy Policy.
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}
