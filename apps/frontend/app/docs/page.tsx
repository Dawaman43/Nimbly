"use client";

import React from "react";
import DocsPage from "@/components/DocsPage";
import { Header } from "@/components/layout/Header";
import { useRouter } from "next/navigation";

export default function DocsRoute() {
    const router = useRouter();

    return (
        <>
            <Header
                onLogin={() => router.push("/auth")}
                onLogout={() => { }}
            />
            <DocsPage />
        </>
    );
}
