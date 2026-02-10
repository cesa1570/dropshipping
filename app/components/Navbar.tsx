"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { cartCount } = useCart();
    const { user, loading, signOut } = useAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const displayName =
        user?.user_metadata?.full_name ||
        user?.user_metadata?.name ||
        user?.email?.split("@")[0] ||
        "User";

    return (
        <nav className="glass-strong fixed top-[36px] left-0 right-0 z-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-2xl">🧠</span>
                        <span className="text-xl font-black tracking-tight">
                            <span className="gradient-text">Ohio</span>
                            <span className="text-white"> Drip</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/" className="text-sm font-medium text-text-secondary hover:text-neon-green transition-colors">
                            Home
                        </Link>
                        <Link href="/shop" className="text-sm font-medium text-text-secondary hover:text-neon-green transition-colors">
                            Shop
                        </Link>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">
                        {/* Cart */}
                        <Link href="/cart" className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.773 2.337-1.872l1.695-7.538a1.125 1.125 0 0 0-1.097-1.34H6.312l-.381-1.428A2.25 2.25 0 0 0 3.77 1.5H2.25m5.25 15.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm7.5 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-neon-green text-[10px] font-bold text-bg-primary">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Auth */}
                        {loading ? (
                            <div className="w-8 h-8 rounded-full bg-bg-card animate-pulse" />
                        ) : user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setProfileOpen(!profileOpen)}
                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-green to-neon-purple flex items-center justify-center text-xs font-bold text-bg-primary hover:ring-2 hover:ring-neon-green/50 transition-all"
                                >
                                    {displayName[0]?.toUpperCase()}
                                </button>
                                {profileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                                        <div className="absolute right-0 top-12 w-48 glass-strong rounded-xl overflow-hidden z-50 shadow-xl">
                                            <div className="px-4 py-3 border-b border-white/5">
                                                <p className="text-sm font-bold text-white truncate">{displayName}</p>
                                                <p className="text-[10px] text-text-secondary truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                href="/account"
                                                className="block px-4 py-2.5 text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                                                onClick={() => setProfileOpen(false)}
                                            >
                                                📦 My Orders
                                            </Link>
                                            <button
                                                onClick={async () => {
                                                    await signOut();
                                                    setProfileOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2.5 text-sm text-text-secondary hover:text-neon-pink hover:bg-white/5 transition-colors"
                                            >
                                                🚪 Sign Out
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-neon-green/10 text-neon-green text-xs font-semibold hover:bg-neon-green/20 transition-colors"
                            >
                                🔓 Login
                            </Link>
                        )}

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="md:hidden border-t border-white/5 px-4 py-4 space-y-3">
                    <Link href="/" className="block text-sm font-medium text-text-secondary hover:text-neon-green transition-colors" onClick={() => setMobileOpen(false)}>
                        Home
                    </Link>
                    <Link href="/shop" className="block text-sm font-medium text-text-secondary hover:text-neon-green transition-colors" onClick={() => setMobileOpen(false)}>
                        Shop
                    </Link>
                    {!user && (
                        <Link href="/login" className="block text-sm font-medium text-neon-green" onClick={() => setMobileOpen(false)}>
                            🔓 Login / Register
                        </Link>
                    )}
                </div>
            )}
        </nav>
    );
}
