"use client";

import React, { useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Cloud,
  Activity,
  CreditCard,
  Server,
  LayoutDashboard,
  Settings,
  Search,
  Bell,
  Sun,
  Moon,
} from "lucide-react";
import { api } from "@/lib/api";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { setTheme } = useTheme();
  const router = useRouter();

  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );

  const [isLoading, setIsLoading] = React.useState(true);

  // Notification state
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Welcome to Nimbly!",
      message:
        "Your account has been successfully set up. Start exploring our features.",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      type: "welcome",
    },
    {
      id: "2",
      title: "Resource Deployed",
      message:
        "Your web application has been successfully deployed to production.",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: false,
      type: "deployment",
    },
    {
      id: "3",
      title: "Billing Update",
      message: "Your monthly billing cycle has started. Current usage: $45.20",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      read: true,
      type: "billing",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Notification handlers
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (
    notification: Omit<(typeof notifications)[0], "id" | "timestamp" | "read">
  ) => {
    const newNotification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  // Simulate real-time notifications
  React.useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add notifications for demo purposes
      if (Math.random() < 0.1) {
        // 10% chance every 30 seconds
        const notificationTypes = [
          {
            title: "Deployment Completed",
            message: "Your latest deployment has finished successfully.",
            type: "deployment",
          },
          {
            title: "Resource Alert",
            message: "High CPU usage detected on your web server.",
            type: "alert",
          },
          {
            title: "Team Activity",
            message: "Alice Smith joined your project.",
            type: "team",
          },
        ];
        const randomType =
          notificationTypes[
            Math.floor(Math.random() * notificationTypes.length)
          ];
        addNotification(randomType);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Expose addNotification globally for other components to use
  React.useEffect(() => {
    (window as any).addNotification = addNotification;
    return () => {
      delete (window as any).addNotification;
    };
  }, [addNotification]);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/auth");
        return;
      }

      try {
        const res = await fetch("http://localhost:4000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          // Token is invalid, clear it and redirect to auth
          localStorage.removeItem("access_token");
          router.push("/auth");
        }
      } catch (e) {
        console.error("Failed to fetch profile", e);
        // On error, clear token and redirect
        localStorage.removeItem("access_token");
        router.push("/auth");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    // Clear cache on logout
    api.clearCache();
    router.push("/auth");
  };

  const userName = user?.name || "User";

  // Usage Limit Widget Component
  function UsageLimitWidget() {
    const [usage, setUsage] = React.useState<{
      current: number;
      budget: number;
      percentage: number;
    } | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const fetchUsage = async () => {
        try {
          const billingData = await api.get("/billing");
          const percentage =
            billingData.budget > 0
              ? Math.min(
                  100,
                  (billingData.currentSpend / billingData.budget) * 100
                )
              : 0;
          setUsage({
            current: billingData.currentSpend || 0,
            budget: billingData.budget || 0,
            percentage,
          });
        } catch (e) {
          console.error("Failed to fetch usage", e);
        } finally {
          setLoading(false);
        }
      };
      fetchUsage();
    }, []);

    if (loading) {
      return (
        <div className="p-4 border-t">
          <div className="bg-muted/50 p-4 rounded-lg border border-border">
            <div className="h-4 bg-muted animate-pulse rounded mb-2" />
            <div className="h-1.5 bg-muted animate-pulse rounded" />
          </div>
        </div>
      );
    }

    if (!usage) return null;

    // Determine color scheme based on usage percentage
    const getColorScheme = (percentage: number) => {
      if (percentage < 33) {
        return {
          bg: "bg-green-50 dark:bg-green-950/20",
          border: "border-green-100 dark:border-green-900",
          text: "text-green-800 dark:text-green-400",
          progressBg: "bg-green-200 dark:bg-green-900",
          progressFill: "bg-green-500",
        };
      } else if (percentage < 67) {
        return {
          bg: "bg-yellow-50 dark:bg-yellow-950/20",
          border: "border-yellow-100 dark:border-yellow-900",
          text: "text-yellow-800 dark:text-yellow-400",
          progressBg: "bg-yellow-200 dark:bg-yellow-900",
          progressFill: "bg-yellow-500",
        };
      } else {
        return {
          bg: "bg-red-50 dark:bg-red-950/20",
          border: "border-red-100 dark:border-red-900",
          text: "text-red-800 dark:text-red-400",
          progressBg: "bg-red-200 dark:bg-red-900",
          progressFill: "bg-red-500",
        };
      }
    };

    const colorScheme = getColorScheme(usage.percentage);

    return (
      <div className="p-4 border-t">
        <div
          className={`${colorScheme.bg} p-4 rounded-lg border ${colorScheme.border}`}
        >
          <p className={`text-xs font-medium ${colorScheme.text} mb-2`}>
            Usage Limit
          </p>
          <div
            className={`h-1.5 w-full ${colorScheme.progressBg} rounded-full mb-2 overflow-hidden`}
          >
            <div
              className={`h-full ${colorScheme.progressFill} rounded-full transition-all duration-300`}
              style={{ width: `${usage.percentage}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground">
            {usage.percentage.toFixed(0)}% of ${usage.budget.toFixed(2)} budget
            used
          </p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/resources", label: "Resources", icon: Server },
    { href: "/dashboard/monitoring", label: "Monitoring", icon: Activity },
    { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-background fixed inset-y-0 z-10 transition-all">
        <div className="h-16 flex items-center px-6 border-b">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
          >
            <div className="h-6 w-6 rounded bg-orange-600 flex items-center justify-center text-white">
              <Cloud className="h-4 w-4" />
            </div>
            Nimbly
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" /> {item.label}
              </Link>
            );
          })}
        </nav>
        <UsageLimitWidget />
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 mb-16 md:mb-0">
        {/* Top Header */}
        <header className="h-16 border-b bg-background/50 backdrop-blur sticky top-0 z-10 px-4 sm:px-6 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-bold min-w-0">
            <Cloud className="h-5 w-5 text-orange-600 flex-shrink-0" />
            <span className="hidden sm:inline">Nimbly</span>
          </div>

          <div className="hidden lg:flex items-center text-muted-foreground text-sm">
            <span className="text-foreground font-medium">Team Titan</span>
            <span className="mx-2">/</span>
            <span>Production Environment</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="relative hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                className="w-48 lg:w-64 pl-9 h-9 bg-background"
              />
            </div>

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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-orange-500 rounded-full border-2 border-background flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  Notifications
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="h-auto p-1 text-xs"
                    >
                      Mark all read
                    </Button>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <DropdownMenuItem
                        key={notification.id}
                        className={`flex flex-col items-start p-4 cursor-pointer ${
                          !notification.read
                            ? "bg-blue-50 dark:bg-blue-950/20"
                            : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="font-medium text-sm flex items-center gap-2 w-full">
                          {notification.title}
                          {!notification.read && (
                            <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {notification.message}
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {notification.timestamp.toLocaleString()}
                        </div>
                      </DropdownMenuItem>
                    ))
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8 border">
                    <AvatarFallback>
                      {userName.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/settings")}
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/dashboard/billing")}
                >
                  Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="p-4 sm:p-6 max-w-7xl mx-auto w-full">{children}</div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-lg border-t z-[100] grid grid-cols-5 h-16 safe-area-bottom pb-safe shadow-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-200 px-1 py-1 ${
                isActive
                  ? "text-orange-600 dark:text-orange-500 bg-orange-50/50 dark:bg-orange-950/20"
                  : "text-muted-foreground active:text-orange-600 active:bg-orange-50/30"
              }`}
            >
              <item.icon
                className={`h-5 w-5 mb-0.5 ${isActive ? "scale-110" : ""} transition-transform`}
              />
              <span className="text-[9px] sm:text-[10px] font-medium tracking-tight truncate w-full text-center leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
