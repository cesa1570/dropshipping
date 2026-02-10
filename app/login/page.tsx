"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../lib/supabase";
import { Suspense } from "react";

function LoginContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/";
    const supabase = createClient();

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push(redirect);
            router.refresh();
        }
    };

    const handleGoogleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
            },
        });
        if (error) setError(error.message);
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-16">
            {/* Background Effects */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-neon-green/8 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-md">
                <div className="text-center mb-8 animate-slide-up">
                    <div className="text-5xl mb-4">🧠</div>
                    <h1 className="text-3xl font-black text-white mb-2">
                        Welcome Back to <span className="gradient-text">Ohio Drip</span>
                    </h1>
                    <p className="text-text-secondary text-sm">
                        Login to continue your brainrot shopping spree 🔥
                    </p>
                </div>

                <div className="glass-strong rounded-2xl p-6 space-y-5 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                            {error}
                        </div>
                    )}

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-white text-gray-800 font-semibold text-sm hover:bg-gray-100 transition-colors"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-xs text-text-secondary">or</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* Email Login */}
                    <form onSubmit={handleEmailLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wider">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-bg-card border border-white/10 text-white text-sm placeholder:text-text-secondary focus:outline-none focus:border-neon-green/50 transition-colors"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-text-secondary mb-1.5 uppercase tracking-wider">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-bg-card border border-white/10 text-white text-sm placeholder:text-text-secondary focus:outline-none focus:border-neon-green/50 transition-colors"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-neon w-full py-3 text-sm disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "🔓 Login"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-sm text-text-secondary mt-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                    Don&apos;t have an account?{" "}
                    <Link href={`/register?redirect=${redirect}`} className="text-neon-green font-semibold hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-2xl animate-spin-slow">🧠</div></div>}>
            <LoginContent />
        </Suspense>
    );
}
