"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LandingPage from "@/components/LandingPage";
import DashboardView from "@/components/DashboardView";
import { Header } from "@/components/layout/Header";
import { Lock } from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "dashboard">("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView("landing");
  };

  return (
    <>
      <Header
        onLogin={handleLogin}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onDashboardClick={() => setCurrentView("dashboard")}
      />

      {/* Demo Switcher - To help verify states easily */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 bg-background/80 backdrop-blur border p-2 rounded-lg shadow-lg items-end">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold">User:</span>
          <Button
            size="sm"
            variant={isLoggedIn ? "default" : "outline"}
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="h-6 text-xs"
          >
            {isLoggedIn ? "Logged In" : "Guest"}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold">View:</span>
          <Button
            size="sm"
            variant={currentView === "landing" ? "default" : "ghost"}
            onClick={() => setCurrentView("landing")}
            className="rounded-full text-xs h-7"
          >
            Landing
          </Button>
          <Button
            size="sm"
            variant={currentView === "dashboard" ? "default" : "ghost"}
            onClick={() => setCurrentView("dashboard")}
            className="rounded-full text-xs h-7"
          >
            App
          </Button>
        </div>
      </div>

      {currentView === "landing" ? (
        <LandingPage onLogin={handleLogin} />
      ) : (
        /* Dashboard View - Protected */
        isLoggedIn ? (
          <DashboardView />
        ) : (
          <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-muted/20 p-4">
            <div className="text-center max-w-md mx-auto p-8 rounded-xl border bg-background shadow-lg space-y-4 animate-in zoom-in-95 duration-300">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Lock className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Access Restricted</h2>
              <p className="text-muted-foreground">
                You must be logged in to view the dashboard and manage your account.
              </p>
              <div className="pt-4 flex justify-center gap-4">
                <Button variant="outline" onClick={() => setCurrentView("landing")}>
                  Back to Home
                </Button>
                <Button onClick={handleLogin} className="bg-orange-600 hover:bg-orange-700">
                  Log In Now
                </Button>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}
