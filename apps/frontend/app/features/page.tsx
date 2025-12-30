"use client";

import React from "react";
import FeaturesPage from "@/components/FeaturesPage";
import { Header } from "@/components/layout/Header";
import { useRouter } from "next/navigation";

export default function FeaturesRoute() {
    const router = useRouter();

    return (
        <>
            <Header
                onLogin={() => router.push("/auth")}
                onLogout={() => { }}
            />
            <FeaturesPage />
        </>
    );
}
