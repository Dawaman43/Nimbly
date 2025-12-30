"use client";

import React from "react";
import PricingPage from "@/components/PricingPage";
import { Header } from "@/components/layout/Header";
import { useRouter } from "next/navigation";

export default function PricingRoute() {
    const router = useRouter();

    return (
        <>
            <Header
                onLogin={() => router.push("/auth")}
                isLoggedIn={false}
                onLogout={() => { }}
            />
            <PricingPage />
        </>
    );
}
