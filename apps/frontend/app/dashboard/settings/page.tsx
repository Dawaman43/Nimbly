"use client";

import React, { useState, useEffect } from "react";
import SettingsView from "@/components/dashboard/settings-view";

export default function SettingsPage() {
    const [user, setUser] = useState<{ name: string, email: string } | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('access_token');
            if (!token) return;

            try {
                const res = await fetch('http://localhost:4000/auth/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                }
            } catch (e) {
                console.error("Failed to fetch profile", e);
            }
        };
        fetchProfile();
    }, []);

    return <SettingsView user={user} />;
}
