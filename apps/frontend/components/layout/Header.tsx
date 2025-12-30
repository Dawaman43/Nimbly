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
  user?: { name: string; email: string };
  showDashboardLink?: boolean;
}

export function Header({
  onLogin,
  isLoggedIn: propIsLoggedIn,
  onLogout,
  user,
  showDashboardLink = false,
}: HeaderProps) {
  const { setTheme } = useTheme();
  const [internalIsLoggedIn, setInternalIsLoggedIn] = useState(false);

  // Use prop if provided, otherwise default to internal state
  const isUserLoggedIn =
    propIsLoggedIn !== undefined ? propIsLoggedIn : internalIsLoggedIn;

  React.useEffect(() => {
    // Only verify auth if prop is NOT provided (let parent control if they want)
    if (propIsLoggedIn === undefined) {
      const token = localStorage.getItem("access_token");
      setInternalIsLoggedIn(!!token);
    }
  }, [propIsLoggedIn]);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      // Default logout behavior if no handler
      localStorage.removeItem("access_token");
      setInternalIsLoggedIn(false);
      window.location.href = "/";
    }
  };

  const NavLinks = () => (
    <>
      <Link
        href="/features"
        className="hover:text-foreground transition-colors"
      >
        Features
      </Link>
      <Link href="/docs" className="hover:text-foreground transition-colors">
        Documentation
      </Link>
      <Link href="/pricing" className="hover:text-foreground transition-colors">
        Pricing
      </Link>
      {showDashboardLink && (
        <Link
          href="/dashboard"
          className="hover:text-foreground transition-colors"
        >
          Dashboard
        </Link>
      )}
    </>
  );

  return (
    <nav className="border-b bg-background/50 backdrop-blur z-20 sticky top-0">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-orange-600 flex items-center justify-center text-white">
              <Cloud className="h-5 w-5" />
            </div>
            Nimbly
          </Link>
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
            {isUserLoggedIn ? (
              <div className="flex items-center gap-4">
                {user && (
                  <div className="text-sm text-muted-foreground">
                    Welcome, {user.name}
                  </div>
                )}
                <Button variant="ghost" onClick={handleLogout}>
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={onLogin || (() => (window.location.href = "/auth"))}
                >
                  Log in
                </Button>
                <Button
                  onClick={onLogin || (() => (window.location.href = "/auth"))}
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
                  {isUserLoggedIn ? (
                    <div className="flex flex-col gap-2">
                      {user && (
                        <div className="text-sm text-muted-foreground px-2 py-1">
                          Welcome, {user.name}
                        </div>
                      )}
                      <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="justify-start px-0"
                      >
                        Log out
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="ghost"
                        onClick={
                          onLogin || (() => (window.location.href = "/auth"))
                        }
                        className="justify-start px-0"
                      >
                        Log in
                      </Button>
                      <Button
                        onClick={
                          onLogin || (() => (window.location.href = "/auth"))
                        }
                        className="w-full"
                      >
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
