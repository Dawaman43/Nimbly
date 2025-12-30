"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import { Header } from "@/components/layout/Header";

export default function App() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check auth on mount
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <>
      <Header
        onLogin={() => router.push("/auth")}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      <LandingPage
        onLogin={() => router.push("/auth")}
        onGetStarted={() => router.push(isLoggedIn ? "/dashboard" : "/auth")}
      />
    </>
  );
}
