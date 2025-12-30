"use client";

import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  Home,
  Zap,
  Cloud,
  AlertTriangle,
  Settings,
  User,
  LogOut,
  BarChart3,
  Monitor,
  Command,
  CreditCard,
  Keyboard,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility, otherwise remove this usage

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2 text-muted-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>

        {/* Logo Section */}
        <div className="mr-4 flex lg:mr-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold shadow-sm">
              N
            </div>
            <span className="hidden font-bold text-lg tracking-tight sm:inline-block text-foreground">
              Nimbly
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium xl:gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent h-9 px-4">
                  Dashboard
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-muted/40 border border-border/50 p-6 no-underline outline-none focus:shadow-md hover:bg-muted transition-colors"
                          href="/"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium flex items-center gap-2">
                            <Home className="h-5 w-5" />
                            Nimbly
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Experience the next generation of cloud deployment.
                            Fast, secure, and scalable.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/overview"
                        >
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            Overview
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                            High-level resource views.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          href="/analytics"
                        >
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <Zap className="h-4 w-4 text-muted-foreground" />
                            Analytics
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                            Real-time performance metrics.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/deployments" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Deployments
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/resources" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Resources
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/alerts" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Alerts
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Search Bar - Modernized */}
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 h-9 md:w-[200px] lg:w-[300px] bg-background border-muted-foreground/20 focus:w-[300px] transition-all duration-300"
              />
              <kbd className="pointer-events-none absolute right-2.5 top-2.5 hidden h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>

          {/* Right Side Actions */}
          <nav className="flex items-center gap-2">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="h-9 w-9 px-0"
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-600 rounded-full ring-2 ring-background animate-pulse" />
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full ml-1 ring-1 ring-border/50"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatars/01.png" alt="@user" />
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">
                      JD
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      john@nimbly.app
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/20">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top-5">
          <div className="grid gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/deployments"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Zap className="h-4 w-4" />
              Deployments
            </Link>
            <Link
              href="/resources"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Cloud className="h-4 w-4" />
              Resources
            </Link>
            <Link
              href="/alerts"
              className="flex items-center gap-2 text-sm font-medium hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <AlertTriangle className="h-4 w-4" />
              Alerts
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
