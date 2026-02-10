"use client";

import { useAuth } from "../context/AuthContext";
import { createClient } from "../lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Order {
    id: string;
    status: string;
    total: number;
    items: { id: string; name: string; price: number; quantity: number }[];
    created_at: string;
    shipping_address: Record<string, string> | null;
}

export default function AccountPage() {
    const { user, loading, signOut } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login?redirect=/account");
            return;
        }

        if (user) {
            supabase
                .from("orders")
                .select("*")
                .eq("user_id", user.id)
                .order("created_at", { ascending: false })
                .then(({ data }) => {
                    setOrders(data || []);
                    setOrdersLoading(false);
                });
        }
    }, [user, loading, router, supabase]);

    const handleSignOut = async () => {
        await signOut();
        router.push("/");
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-3xl animate-spin-slow">🧠</div>
            </div>
        );
    }

    if (!user) return null;

    const displayName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Brainrot Fan";

    const statusColors: Record<string, string> = {
        pending: "bg-yellow-500/20 text-yellow-400",
        paid: "bg-neon-green/20 text-neon-green",
        shipped: "bg-neon-blue/20 text-neon-blue",
        delivered: "bg-green-500/20 text-green-400",
        cancelled: "bg-red-500/20 text-red-400",
    };

    return (
        <div className="pt-24 pb-16">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Profile Header */}
                <div className="glass-strong rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-green to-neon-purple flex items-center justify-center text-3xl font-bold text-bg-primary">
                        {displayName[0]?.toUpperCase()}
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-2xl font-black text-white">{displayName}</h1>
                        <p className="text-sm text-text-secondary">{user.email}</p>
                        <p className="text-xs text-neon-green mt-1">
                            🧠 Brainrot Collector since {new Date(user.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="btn-outline text-xs px-4 py-2"
                    >
                        Sign Out
                    </button>
                </div>

                {/* Orders */}
                <h2 className="text-xl font-bold text-white mb-4">
                    📦 Order History
                </h2>

                {ordersLoading ? (
                    <div className="text-center py-12">
                        <div className="text-2xl animate-spin-slow">🧠</div>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="glass-strong rounded-2xl p-8 text-center">
                        <div className="text-5xl mb-4">🛒</div>
                        <p className="text-text-secondary mb-4">No orders yet. Start your brainrot collection!</p>
                        <Link href="/shop" className="btn-neon text-sm px-6 py-3">
                            🔥 Shop Now
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="glass-strong rounded-2xl p-5">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
                                    <div>
                                        <p className="text-xs text-text-secondary">
                                            {new Date(order.created_at).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                        <p className="text-[10px] font-mono text-text-secondary mt-0.5">
                                            #{order.id.slice(0, 8)}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${statusColors[order.status] || "bg-white/10 text-white"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                        <span className="text-lg font-bold text-neon-green">
                                            ${order.total.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="border-t border-white/5 pt-3 space-y-1">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="text-text-secondary">
                                                {item.name} × {item.quantity}
                                            </span>
                                            <span className="text-white font-medium">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
