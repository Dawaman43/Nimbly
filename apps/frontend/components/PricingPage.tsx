"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-background py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        Simple, transparent <span className="text-orange-600">pricing</span>.
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Start for free, scale as you grow. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Starter Plan */}
                    <div className="rounded-2xl border bg-card p-8 shadow-sm flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Starter</h3>
                            <p className="text-muted-foreground text-sm">For hobbyists and side projects.</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">$0</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                        <Button variant="outline" className="w-full mb-8" size="lg">Get Started</Button>
                        <div className="space-y-4 flex-1">
                            {[
                                "Up to 3 projects",
                                "100 GB Bandwidth",
                                "Community Support",
                                "Shared CPU",
                                "1 Database instance"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="rounded-2xl border border-orange-200 bg-orange-50/50 dark:bg-orange-950/10 p-8 shadow-md relative flex flex-col scale-105 z-10">
                        <div className="absolute top-0 right-0 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">
                            POPULAR
                        </div>
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2 text-orange-600">Pro</h3>
                            <p className="text-muted-foreground text-sm">For startups and growing teams.</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">$29</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                        <Button className="w-full mb-8 bg-orange-600 hover:bg-orange-700 text-white" size="lg">Start Free Trial</Button>
                        <div className="space-y-4 flex-1">
                            {[
                                "Unlimited projects",
                                "1 TB Bandwidth",
                                "Email Priority Support",
                                "Dedicated CPU",
                                "5 Database instances",
                                "Team Collaboration",
                                "Preview Environments"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="rounded-2xl border bg-card p-8 shadow-sm flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                            <p className="text-muted-foreground text-sm">For large scale applications.</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-bold">Custom</span>
                        </div>
                        <Button variant="outline" className="w-full mb-8" size="lg">Contact Sales</Button>
                        <div className="space-y-4 flex-1">
                            {[
                                "Unlimited Bandwidth",
                                "24/7 Phone Support",
                                "Private Cloud Deployment",
                                "Custom SLAs",
                                "SSO & Audit Logs",
                                "Account Manager"
                            ].map((feature, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
