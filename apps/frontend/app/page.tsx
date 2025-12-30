"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import { Header } from "@/components/layout/Header";

export default function App() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("access_token");
    if (token) {
      // If logged in, redirect to dashboard
      router.push("/dashboard");
    }
  }, [router]);

  return (
    <>
      <Header
        onLogin={() => router.push("/auth")}
      />
      <LandingPage onLogin={() => router.push("/auth")} />
    </>
  );
}
