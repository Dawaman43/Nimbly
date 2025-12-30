"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import LandingPage from "@/components/LandingPage";
import DashboardView from "@/components/DashboardView";
import AuthPage from "@/components/AuthPage";
import FeaturesPage from "@/components/FeaturesPage";
import DocsPage from "@/components/DocsPage";
import PricingPage from "@/components/PricingPage";
import { Header } from "@/components/layout/Header";

type ViewType = "landing" | "dashboard" | "auth" | "features" | "docs" | "pricing";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("landing");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setCurrentView("dashboard");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView("landing");
  };

  const navigateToAuth = () => {
    setCurrentView("auth");
  };

  const handleDashboardNavigation = () => {
    if (isLoggedIn) {
      setCurrentView("dashboard");
    } else {
      setCurrentView("auth");
    }
  };

  return (
    <>
      {/* Hide Header on Auth Page for cleaner look, or keep it. Keeping it but simplifying props. */}
      {currentView !== "auth" && (
        <Header
          onLogin={navigateToAuth}
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
          onDashboardClick={handleDashboardNavigation}
          onFeaturesClick={() => setCurrentView("features")}
          onDocsClick={() => setCurrentView("docs")}
          onPricingClick={() => setCurrentView("pricing")}
          onLogoClick={() => setCurrentView("landing")}
        />
      )}

      {/* Demo Switcher */}
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
          <select
            className="h-7 text-xs rounded border bg-background px-1"
            value={currentView}
            onChange={(e) => setCurrentView(e.target.value as ViewType)}
          >
            <option value="landing">Landing</option>
            <option value="auth">Auth</option>
            <option value="features">Features</option>
            <option value="docs">Docs</option>
            <option value="pricing">Pricing</option>
            <option value="dashboard">Dashboard</option>
          </select>
        </div>
      </div>

      {currentView === "landing" && (
        <LandingPage
          onLogin={navigateToAuth}
          onGetStarted={handleDashboardNavigation}
        />
      )}

      {currentView === "features" && <FeaturesPage />}
      {currentView === "docs" && <DocsPage />}
      {currentView === "pricing" && <PricingPage />}

      {currentView === "auth" && (
        <AuthPage onLoginSuccess={handleLoginSuccess} />
      )}

      {currentView === "dashboard" && (
        isLoggedIn ? (
          <DashboardView />
        ) : (
          <AuthPage onLoginSuccess={handleLoginSuccess} />
        )
      )}
    </>
  );
}
