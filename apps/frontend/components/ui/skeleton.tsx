import React from "react";
import { Card, CardContent, CardHeader } from "./card";

export function Skeleton({ className = "", ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={`animate-pulse rounded-md bg-muted ${className}`}
            {...props}
        />
    );
}

export function DashboardSkeleton() {
    return (
        <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-4 w-64" />
                </div>
                <div className="flex gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-32" />
                </div>
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4 rounded" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-16 mb-2" />
                            <Skeleton className="h-3 w-32" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Content Skeleton */}
            <div className="grid gap-6 md:grid-cols-7">
                <Card className="md:col-span-5">
                    <CardHeader>
                        <Skeleton className="h-6 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Skeleton key={i} className="h-16 w-full" />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="md:col-span-2 space-y-4">
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-5 w-32" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-32 w-full" />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <Skeleton className="h-5 w-28" />
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex gap-3">
                                        <Skeleton className="h-4 w-4 rounded-full flex-shrink-0" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-3 w-3/4" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export function TableRowSkeleton() {
    return (
        <div className="flex items-center space-x-4 py-4">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
        </div>
    );
}

export function EmptyState({
    icon: Icon,
    title,
    description,
    action,
}: {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    action?: React.ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
                <Icon className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                {description}
            </p>
            {action}
        </div>
    );
}
