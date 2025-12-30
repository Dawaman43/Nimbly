"use client";

import React from "react";
import { Cloud, ShieldCheck, Globe, Zap, Cpu, Server } from "lucide-react";

export default function FeaturesPage() {
    const features = [
        {
            icon: Cloud,
            title: "Cloud Agnostic",
            description: "Deploy to AWS, GCP, Azure, or DigitalOcean with a single configuration. Avoid vendor lock-in.",
        },
        {
            icon: Zap,
            title: "Instant Deployments",
            description: "Optimized build pipelines ensuring your code goes from commit to production in seconds, not minutes.",
        },
        {
            icon: ShieldCheck,
            title: "Enterprise Security",
            description: "SOC2 Type II compliant. Automated secrets management, DDoS protection, and encrypted data at rest.",
        },
        {
            icon: Globe,
            title: "Global Edge Network",
            description: "Your content is cached and served from 35+ regions worldwide, ensuring low latency for every user.",
        },
        {
            icon: Cpu,
            title: "Serverless Compute",
            description: "Scale to zero when idle and auto-scale to handle millions of requests. Pay only for what you use.",
        },
        {
            icon: Server,
            title: "Managed Databases",
            description: "One-click provisioned Postgres, Redis, and MySQL databases with automated backups and point-in-time recovery.",
        },
    ];

    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Everything you need to <span className="text-orange-600">scale</span>.
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Nimbly provides the building blocks for modern applications. Focus on your code, we handle the infrastructure.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="p-8 rounded-2xl border bg-card/50 hover:bg-card hover:shadow-lg transition-all duration-300"
                        >
                            <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/20 rounded-xl flex items-center justify-center mb-6">
                                <feature.icon className="h-6 w-6 text-orange-600" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
