"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LandingPage from "@/components/LandingPage";
import DashboardView from "@/components/DashboardView";
import { Header } from "@/components/layout/Header";

export default function App() {
  // State to simulate navigation for this demo
  const [currentView, setCurrentView] = useState<"landing" | "dashboard">(
    "landing"
  );

  return (
    <>
      <Header
        onLogin={
          currentView === "landing"
            ? () => setCurrentView("dashboard")
            : undefined
        }
      />

      {/* Demo Switcher - Remove in production */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-background/80 backdrop-blur border p-2 rounded-full shadow-lg">
        <span className="text-xs font-semibold pl-2">View Mode:</span>
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

      {currentView === "landing" ? (
        <LandingPage onLogin={() => setCurrentView("dashboard")} />
      ) : (
        <DashboardView />
      )}
    </>
  );
}
