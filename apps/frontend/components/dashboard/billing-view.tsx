"use client";

import React, { useEffect, useState } from "react";
import {
    CreditCard, FileText, Download,
    AlertTriangle, PieChart, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { api } from "@/lib/api";

export default function BillingView() {
    const [summary, setSummary] = useState<any>(null);

    useEffect(() => {
        const fetchBilling = async () => {
            try {
                const data = await api.get('/billing', true); // Use cache
                setSummary(data);
            } catch (error) {
                console.error("Failed to load billing", error);
            }
        };
        fetchBilling();
    }, []);

    if (!summary) return <div className="p-8">Loading billing data...</div>;

    const percentage = Math.min(100, (summary.currentSpend / summary.budget) * 100);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Billing & Plans</h2>
                    <p className="text-muted-foreground">Manage your subscription and payment methods.</p>
                </div>
                <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" /> Billing Docs
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Current Cost Card */}
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Current Period Consumption</CardTitle>
                        <CardDescription>Billing period: Oct 1 - Oct 31</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-4xl font-bold">${summary.currentSpend?.toFixed(2) || '0.00'}</span>
                            <span className="text-muted-foreground">/ ${summary.budget?.toFixed(2) || '0.00'} limit</span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Progress to budget alert</span>
                                <span className="font-medium text-orange-600">{percentage.toFixed(0)}%</span>
                            </div>
                            <Progress value={percentage} className="h-2 w-full bg-muted rounded-full overflow-hidden" />
                            <p className="text-xs text-muted-foreground pt-1">
                                You are projected to spend <span className="font-medium text-foreground">${summary.projectedSpend?.toFixed(2) || '0.00'}</span> by end of month.
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-3 bg-muted/40 rounded-lg border">
                                <div className="text-sm font-medium text-muted-foreground mb-1">Current Spend</div>
                                <div className="text-lg font-bold">
                                    ${summary.currentSpend?.toFixed(2) || '0.00'}
                                </div>
                            </div>
                            <div className="p-3 bg-muted/40 rounded-lg border">
                                <div className="text-sm font-medium text-muted-foreground mb-1">Projected</div>
                                <div className="text-lg font-bold">
                                    ${summary.projectedSpend?.toFixed(2) || '0.00'}
                                </div>
                            </div>
                            <div className="p-3 bg-muted/40 rounded-lg border">
                                <div className="text-sm font-medium text-muted-foreground mb-1">Budget</div>
                                <div className="text-lg font-bold">${summary.budget?.toFixed(2) || '0.00'}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Method Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {summary.paymentMethods && summary.paymentMethods.length > 0 ? (
                            summary.paymentMethods.map((pm: any) => (
                                <div key={pm.id} className="flex items-center gap-4 p-3 border rounded-lg bg-card">
                                    <div className="h-10 w-14 bg-blue-900 rounded flex items-center justify-center text-white text-xs font-bold font-serif italic">
                                        {pm.type.toUpperCase().substring(0, 4)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">{pm.type} ending in {pm.last4}</p>
                                        <p className="text-xs text-muted-foreground">Expires {pm.expiry}</p>
                                    </div>
                                    <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">Default</Badge>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No payment methods</p>
                        )}
                        <Button variant="outline" className="w-full">
                            <CreditCard className="h-4 w-4 mr-2" /> Add Method
                        </Button>
                    </CardContent>
                    <CardFooter className="bg-muted/20 border-t p-4">
                        <div className="flex gap-2 text-sm text-muted-foreground items-start">
                            <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5" />
                            <p className="text-xs">Your next invoice will be processed on Nov 1st automatically.</p>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/* Invoices Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Invoice History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Invoice ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {summary.invoices && summary.invoices.length > 0 ? (
                                summary.invoices.map((inv: any) => (
                                    <TableRow key={inv.id}>
                                        <TableCell className="font-medium">{inv.id}</TableCell>
                                        <TableCell>{new Date(inv.date).toLocaleDateString()}</TableCell>
                                        <TableCell>${inv.amount.toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Badge 
                                                variant="outline" 
                                                className={`flex w-fit items-center gap-1 ${
                                                    inv.status === 'Paid' 
                                                        ? 'bg-green-50 text-green-700 border-green-200' 
                                                        : inv.status === 'Pending'
                                                        ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                                        : 'bg-red-50 text-red-700 border-red-200'
                                                }`}
                                            >
                                                <Check className="h-3 w-3" /> {inv.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                        No invoices found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
