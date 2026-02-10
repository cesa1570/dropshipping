"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { cartCount } = useCart();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="glass-strong fixed top-0 left-0 right-0 z-50">
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
                        <Link
                            href="/"
                            className="text-sm font-medium text-text-secondary hover:text-neon-green transition-colors"
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            className="text-sm font-medium text-text-secondary hover:text-neon-green transition-colors"
                        >
                            Shop
                        </Link>
                    </div>

                    {/* Cart + Mobile Menu */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/cart"
                            className="relative p-2 rounded-xl hover:bg-white/5 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-white"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121 0 2.09-.773 2.337-1.872l1.695-7.538a1.125 1.125 0 0 0-1.097-1.34H6.312l-.381-1.428A2.25 2.25 0 0 0 3.77 1.5H2.25m5.25 15.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm7.5 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-neon-green text-[10px] font-bold text-bg-primary">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            className="md:hidden p-2 rounded-xl hover:bg-white/5 transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Toggle menu"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 text-white"
                            >
                                {mobileOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="md:hidden border-t border-white/5 px-4 py-4 space-y-3">
                    <Link
                        href="/"
                        className="block text-sm font-medium text-text-secondary hover:text-neon-green transition-colors"
                        onClick={() => setMobileOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/shop"
                        className="block text-sm font-medium text-text-secondary hover:text-neon-green transition-colors"
                        onClick={() => setMobileOpen(false)}
                    >
                        Shop
                    </Link>
                </div>
            )}
        </nav>
    );
}
