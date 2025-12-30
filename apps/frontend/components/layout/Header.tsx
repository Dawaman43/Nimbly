"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Cloud, Sun, Moon, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  onLogin?: () => void;
  isLoggedIn?: boolean;
  onLogout?: () => void;
  onDashboardClick?: () => void;
  onFeaturesClick?: () => void;
  onDocsClick?: () => void;
  onPricingClick?: () => void;
  onLogoClick?: () => void;
}

export function Header({
  onLogin,
  isLoggedIn,
  onLogout,
  onDashboardClick,
  onFeaturesClick,
  onDocsClick,
  onPricingClick,
  onLogoClick
}: HeaderProps) {
  const { setTheme } = useTheme();

  const NavLinks = () => (
    <>
      <a href="#" className="hover:text-foreground transition-colors" onClick={(e) => { e.preventDefault(); onFeaturesClick?.(); }}>
        Features
      </a>
      <a href="#" className="hover:text-foreground transition-colors" onClick={(e) => { e.preventDefault(); onDocsClick?.(); }}>
        Documentation
      </a>
      <a href="#" className="hover:text-foreground transition-colors" onClick={(e) => { e.preventDefault(); onPricingClick?.(); }}>
        Pricing
      </a>
      <a href="#" className="hover:text-foreground transition-colors" onClick={(e) => { e.preventDefault(); onDashboardClick?.(); }}>
        Dashboard
      </a>
    </>
  );

  return (
    <nav className="border-b bg-background/50 backdrop-blur z-20 sticky top-0">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <a href="#" onClick={(e) => { e.preventDefault(); onLogoClick?.(); }} className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-orange-600 flex items-center justify-center text-white">
              <Cloud className="h-5 w-5" />
            </div>
            Nimbly
          </a>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground items-center">
          <NavLinks />
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="hidden md:flex gap-4">
            {isLoggedIn ? (
              <Button variant="ghost" onClick={onLogout}>
                Log out
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={onLogin}>
                  Log in
                </Button>
                <Button
                  onClick={onLogin}
                  className="bg-foreground text-background hover:bg-foreground/90"
                >
                  Sign up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 mt-8">
                  <NavLinks />
                  <div className="h-px bg-border my-2" />
                  {isLoggedIn ? (
                    <Button variant="ghost" onClick={onLogout} className="justify-start px-0">
                      Log out
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" onClick={onLogin} className="justify-start px-0">
                        Log in
                      </Button>
                      <Button onClick={onLogin} className="w-full">
                        Sign up
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
