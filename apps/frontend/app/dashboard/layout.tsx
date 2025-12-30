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

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const { setTheme } = useTheme();
    const router = useRouter();

    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    React.useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) {
                router.push("/auth");
                return;
            }

            try {
                const res = await fetch('http://localhost:4000/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    // If token invalid, maybe redirect?
                }
            } catch (e) {
                console.error("Failed to fetch profile", e);
            }
        };
        fetchProfile();
    }, [router]);


    const userName = user?.name || "User";

    const navItems = [
        { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/resources", label: "Resources", icon: Server },
        { href: "/dashboard/monitoring", label: "Monitoring", icon: Activity },
        { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
        { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex w-64 flex-col border-r bg-background fixed inset-y-0 z-10 transition-all">
                <div className="h-16 flex items-center px-6 border-b">
                    <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
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
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive
                                        ? "bg-secondary text-secondary-foreground"
                                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                                    }`}
                            >
                                <item.icon className="h-4 w-4" /> {item.label}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t">
                    <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-lg border border-orange-100 dark:border-orange-900">
                        <p className="text-xs font-medium text-orange-800 dark:text-orange-400 mb-2">
                            Usage Limit
                        </p>
                        <div className="h-1.5 w-full bg-orange-200 dark:bg-orange-900 rounded-full mb-2 overflow-hidden">
                            <div className="h-full bg-orange-500 w-[75%] rounded-full" />
                        </div>
                        <p className="text-[10px] text-muted-foreground">
                            75% of included tier used
                        </p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 mb-16 md:mb-0">
                {/* Top Header */}
                <header className="h-16 border-b bg-background/50 backdrop-blur sticky top-0 z-10 px-6 flex items-center justify-between">
                    <div className="md:hidden flex items-center gap-2 font-bold">
                        <Cloud className="h-5 w-5 text-orange-600" /> Nimbly
                    </div>

                    <div className="hidden md:flex items-center text-muted-foreground text-sm">
                        <span className="text-foreground font-medium">Team Titan</span>
                        <span className="mx-2">/</span>
                        <span>Production Environment</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search resources..."
                                className="w-64 pl-9 h-9 bg-background"
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

                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="h-4 w-4" />
                            <span className="absolute top-2 right-2 h-2 w-2 bg-orange-500 rounded-full border-2 border-background" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <Avatar className="h-8 w-8 border">
                                        <AvatarImage src="/placeholder-avatar.jpg" />
                                        <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <div className="p-6 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t z-[100] grid grid-cols-5 h-16 safe-area-bottom pb-safe">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive
                                    ? "text-orange-600 dark:text-orange-500"
                                    : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            <item.icon className="h-5 w-5 mb-1" />
                            <span className="text-[10px] font-medium tracking-tight">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>
        </div>
    );
}
