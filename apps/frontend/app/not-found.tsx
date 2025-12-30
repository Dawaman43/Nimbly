"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  CloudOff,
  Home,
  ArrowLeft,
  Search,
  Zap,
  LayoutDashboard,
  Terminal,
} from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background text-foreground relative overflow-hidden">
      {/* Background Technical Grid Pattern */}
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="relative z-10 max-w-2xl w-full px-4 flex flex-col items-center text-center">
        {/* 404 Visual - Layered Text & Icon */}
        <div className="relative mb-8">
          {/* Large background number */}
          <h1 className="text-[150px] font-black leading-none tracking-tighter text-muted-foreground/10 select-none">
            404
          </h1>
          {/* Overlaid Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background p-4 rounded-full border border-border shadow-sm">
              <CloudOff className="w-12 h-12 text-primary" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          <h2 className="text-3xl font-semibold tracking-tight">
            Page not found
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            The resource you are looking for might have been removed, had its
            name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Primary Actions */}
        <div className="flex items-center gap-3 mb-12">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="h-11 px-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button asChild className="h-11 px-6">
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
        </div>

        {/* Helpful Links Grid */}
        <div className="w-full border-t border-border pt-10">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
            Useful Destinations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/deployments"
              className="group flex flex-col items-start p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-all duration-200 hover:border-primary/50"
            >
              <div className="p-2 rounded-md bg-muted group-hover:bg-background mb-3 border border-transparent group-hover:border-border transition-colors">
                <Zap className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </div>
              <span className="font-medium text-sm text-foreground">
                Deployments
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Manage active instances
              </span>
            </Link>

            <Link
              href="/resources"
              className="group flex flex-col items-start p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-all duration-200 hover:border-primary/50"
            >
              <div className="p-2 rounded-md bg-muted group-hover:bg-background mb-3 border border-transparent group-hover:border-border transition-colors">
                <Terminal className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </div>
              <span className="font-medium text-sm text-foreground">
                Logs & Resources
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                View infrastructure
              </span>
            </Link>

            <Link
              href="/dashboard"
              className="group flex flex-col items-start p-4 rounded-lg border border-border bg-card hover:bg-muted/50 transition-all duration-200 hover:border-primary/50"
            >
              <div className="p-2 rounded-md bg-muted group-hover:bg-background mb-3 border border-transparent group-hover:border-border transition-colors">
                <LayoutDashboard className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
              </div>
              <span className="font-medium text-sm text-foreground">
                Dashboard
              </span>
              <span className="text-xs text-muted-foreground mt-1">
                Return to overview
              </span>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-sm text-muted-foreground">
          Need help?{" "}
          <Link
            href="/support"
            className="text-primary hover:underline underline-offset-4"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
