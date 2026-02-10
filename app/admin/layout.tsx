"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
        // In a real app, check for role === 'admin' here
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-neon-green">
                Loading Admin...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-8 border-b border-white/10 pb-4">
                    <h1 className="text-3xl font-black text-neon-green">⚡ Admin Dashboard</h1>
                </header>
                {children}
            </div>
        </div>
    );
}
