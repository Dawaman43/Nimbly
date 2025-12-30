"use client";

import React from "react";
import AuthPage from "@/components/AuthPage";
import { useRouter } from "next/navigation";

export default function AuthRoute() {
    const router = useRouter();

    const handleLoginSuccess = () => {
        router.push("/dashboard");
    };

    return <AuthPage onLoginSuccess={handleLoginSuccess} />;
}
