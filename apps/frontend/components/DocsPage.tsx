"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-background pt-8 pb-20">
            <div className="container mx-auto px-4 max-w-7xl flex flex-col md:flex-row gap-10">

                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0 hidden md:block">
                    <div className="sticky top-24 space-y-8">
                        <div>
                            <h4 className="font-semibold mb-3">Getting Started</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="text-orange-600 font-medium cursor-pointer">Introduction</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Installation</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Project Structure</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Core Concepts</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="hover:text-foreground cursor-pointer transition-colors">Services</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Resources</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Deployments</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">API Reference</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="hover:text-foreground cursor-pointer transition-colors">CLI Commands</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Configuration</li>
                            </ul>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 max-w-4xl">
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold mb-4">Introduction to Nimbly</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Nimbly is an infrastructure-from-code platform designed to help developers deploy full-stack applications to the cloud without managing servers.
                        </p>
                    </div>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4 border-b pb-2">What is Nimbly?</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Traditional infrastructure tools require you to learn complex DSLs or manage YAML files that span thousands of lines. Nimbly takes a different approach by analyzing your code and automatically provisioning the necessary resources.
                            </p>
                            <div className="bg-muted/50 p-4 rounded-lg border font-mono text-sm flex items-center gap-2">
                                <span className="text-orange-600 font-bold">nimbly</span> deploy --env=production
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Key Features</h2>
                            <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                <li>Automatic dependency detection</li>
                                <li>Zero-config deployments for Next.js, Node.js, and Python</li>
                                <li>Built-in CI/CD pipelines</li>
                                <li>Preview environments for every Pull Request</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Quick Start</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                Install the Nimbly CLI to get started with your first project.
                            </p>
                            <div className="bg-[#1e1e1e] text-white p-6 rounded-lg border shadow-sm font-mono text-sm overflow-x-auto relative group">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="sm" className="h-6 text-xs text-white hover:text-white hover:bg-white/10">Copy</Button>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <span className="text-green-400 select-none">$</span>
                                        <span>npm install -g nimbly-cli</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-green-400 select-none">$</span>
                                        <span>nimbly login</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <span className="text-green-400 select-none">$</span>
                                        <span>nimbly init my-app</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    <div className="mt-20 pt-8 border-t text-center text-muted-foreground text-sm">
                        <p>Built by Nimbly Infrastructure. The source code is available on GitHub.</p>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span>All systems operational</span>
                        </div>
                    </div>
                </main>

                {/* Mobile Sidebar (Simplified) */}
                <div className="md:hidden mt-8 border-t pt-8">
                    <h4 className="font-semibold mb-4">Documentation Menu</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <Button variant="outline" className="w-full justify-start">Getting Started</Button>
                        <Button variant="outline" className="w-full justify-start">Core Concepts</Button>
                        <Button variant="outline" className="w-full justify-start">API Reference</Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
