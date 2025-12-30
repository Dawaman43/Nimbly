"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Cloud, Activity, Settings, Plus } from "lucide-react";

export default function App() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        setIsLoggedIn(true);
        try {
          const res = await fetch("http://[::1]:4000/auth/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          }
        } catch (e) {
          console.error("Failed to fetch profile", e);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  if (isLoggedIn && user) {
    return (
      <>
        <Header
          onLogin={() => router.push("/auth")}
          onLogout={handleLogout}
          user={user}
          showDashboardLink={true}
        />
        <div className="min-h-screen bg-background relative overflow-hidden">
          {/* Grid Background Effect */}
          <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

          <div className="relative container mx-auto px-4 pt-20 pb-24">
            {/* Welcome Section for Logged-in Users */}
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                Welcome back,{" "}
                <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  {user.name}
                </span>
                ! 👋
              </h1>

              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Ready to deploy some infrastructure? Check out your dashboard or
                create a new project.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="h-12 px-8 text-base bg-orange-600 hover:bg-orange-700 text-white shadow-lg shadow-orange-500/20"
                  onClick={() => router.push("/dashboard")}
                >
                  <Activity className="mr-2 h-5 w-5" />
                  Go to Dashboard
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base"
                  onClick={() => router.push("/dashboard/settings")}
                >
                  <Settings className="mr-2 h-5 w-5" />
                  Account Settings
                </Button>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                <CardHeader className="text-center">
                  <div className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mx-auto mb-4">
                    <Cloud className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>View Resources</CardTitle>
                  <CardDescription>
                    Monitor your deployed infrastructure and current usage.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push("/dashboard")}
              >
                <CardHeader className="text-center">
                  <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>New Deployment</CardTitle>
                  <CardDescription>
                    Create and deploy new infrastructure projects.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push("/dashboard/settings")}
              >
                <CardHeader className="text-center">
                  <div className="h-12 w-12 rounded-2xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                    <Settings className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Update your profile and manage account preferences.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header onLogin={() => router.push("/auth")} />
      <LandingPage
        onLogin={() => router.push("/auth")}
        onGetStarted={() => router.push("/auth")}
      />
    </>
  );
}
