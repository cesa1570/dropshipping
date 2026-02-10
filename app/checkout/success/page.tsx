"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const [confetti, setConfetti] = useState(true);

    useEffect(() => {
        // Clear cart from localStorage after successful purchase
        localStorage.removeItem("ohio-drip-cart");
        // Clear confetti after a while
        const t = setTimeout(() => setConfetti(false), 5000);
        return () => clearTimeout(t);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16 relative overflow-hidden">
            {/* Confetti */}
            {confetti && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`,
                                animationDuration: `${2 + Math.random() * 3}s`,
                                fontSize: `${12 + Math.random() * 20}px`,
                                opacity: 0.8,
                            }}
                        >
                            {["🎉", "🔥", "🧠", "✨", "💎", "🚀", "⚡"][Math.floor(Math.random() * 7)]}
                        </div>
                    ))}
                </div>
            )}

            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-neon-green/15 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-neon-purple/10 rounded-full blur-[120px]" />
            </div>

            <div className="text-center max-w-lg animate-slide-up">
                <div className="text-8xl mb-6">🎉</div>
                <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                    Order <span className="gradient-text">Confirmed!</span>
                </h1>
                <p className="text-text-secondary text-lg mb-2">
                    Your brainrot merch is on its way! 🚀
                </p>
                <p className="text-text-secondary text-sm mb-8">
                    You&apos;ll receive a confirmation email with tracking info soon.
                </p>

                {sessionId && (
                    <div className="glass-strong rounded-xl p-4 mb-8 text-left">
                        <p className="text-xs text-text-secondary mb-1">Order Reference</p>
                        <p className="text-sm font-mono text-neon-green break-all">
                            {sessionId}
                        </p>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/account" className="btn-outline text-sm px-6 py-3">
                        📦 View Orders
                    </Link>
                    <Link href="/shop" className="btn-neon text-sm px-6 py-3">
                        🔥 Keep Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl animate-spin-slow">🧠</div></div>}>
            <SuccessContent />
        </Suspense>
    );
}
