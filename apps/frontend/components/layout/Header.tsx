"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Cloud } from "lucide-react";

interface HeaderProps {
  onLogin?: () => void;
}

export function Header({ onLogin }: HeaderProps) {
  return (
    <nav className="border-b bg-background/50 backdrop-blur z-20 sticky top-0">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="h-8 w-8 rounded bg-orange-600 flex items-center justify-center text-white">
            <Cloud className="h-5 w-5" />
          </div>
          Nimbly
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <Link href="#" className="hover:text-foreground transition-colors">
            Features
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Documentation
          </Link>
          <Link href="#" className="hover:text-foreground transition-colors">
            Pricing
          </Link>
        </div>
        {onLogin && (
          <div className="flex gap-4">
            <Button variant="ghost" onClick={onLogin}>
              Log in
            </Button>
            <Button
              onClick={onLogin}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
