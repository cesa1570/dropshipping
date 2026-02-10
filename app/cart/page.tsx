"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CartPage() {
    const { items, updateQuantity, removeFromCart, clearCart, cartTotal } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCheckout = async () => {
        if (!user) {
            router.push("/login?redirect=/cart");
            return;
        }

        setCheckoutLoading(true);
        setError("");

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: items.map((item) => ({
                        product: {
                            id: item.product.id,
                            name: item.product.name,
                            price: item.product.price,
                            images: item.product.image ? [item.product.image] : [],
                        },
                        quantity: item.quantity,
                    })),
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Checkout failed");
                setCheckoutLoading(false);
                return;
            }

            // Redirect to Stripe Checkout
            window.location.href = data.url;
        } catch {
            setError("Something went wrong. Please try again.");
            setCheckoutLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="pt-32 pb-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-7xl mb-6 animate-float">🛒</div>
                    <h1 className="text-3xl font-black text-white mb-3">Your Cart is Empty</h1>
                    <p className="text-text-secondary mb-8">No brainrot acquired yet. Time to fix that.</p>
                    <Link href="/shop" className="btn-neon text-sm px-8 py-4">🔥 Start Shopping</Link>
                </div>
            </div>
        );
    }

    const shipping = cartTotal >= 50 ? 0 : 4.99;
    const total = cartTotal + shipping;

    const categoryEmoji: Record<string, string> = {
        "italian-brainrot": "🇮🇹",
        "skibidi-collection": "🚽",
        "sigma-essentials": "🐺",
        "ohio-specials": "🌽",
    };

    return (
        <div className="pt-32 pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl sm:text-4xl font-black text-white mb-8">
                    Shopping <span className="gradient-text">Cart</span>
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => {
                            const discount = Math.round(
                                ((item.product.originalPrice - item.product.price) / item.product.originalPrice) * 100
                            );
                            return (
                                <div key={item.product.id} className="flex gap-4 p-4 rounded-2xl bg-bg-card border border-white/5 group hover:border-white/10 transition-colors">
                                    {/* Image */}
                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-bg-secondary flex-shrink-0">
                                        {item.product.image ? (
                                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl">
                                                {categoryEmoji[item.product.category] || "🧠"}
                                            </div>
                                        )}
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <Link href={`/product/${item.product.id}`} className="font-bold text-sm text-white hover:text-neon-green transition-colors line-clamp-1">
                                            {item.product.name}
                                        </Link>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-sm font-bold text-neon-green">${item.product.price.toFixed(2)}</span>
                                            <span className="text-xs text-text-secondary line-through">${item.product.originalPrice.toFixed(2)}</span>
                                            <span className="text-[10px] text-neon-pink font-bold">−{discount}%</span>
                                        </div>

                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center gap-2 bg-bg-secondary rounded-lg">
                                                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-white hover:text-neon-green transition-colors font-bold">−</button>
                                                <span className="w-6 text-center text-sm font-bold text-white">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-white hover:text-neon-green transition-colors font-bold">+</button>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-sm font-bold text-white">${(item.product.price * item.quantity).toFixed(2)}</span>
                                                <button onClick={() => removeFromCart(item.product.id)} className="text-text-secondary hover:text-neon-pink transition-colors" title="Remove">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <button onClick={clearCart} className="text-xs text-text-secondary hover:text-neon-pink transition-colors font-medium mt-2">Clear Cart</button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="glass-strong rounded-2xl p-6 sticky top-32 space-y-4">
                            <h2 className="text-lg font-bold text-white">Order Summary</h2>

                            {error && (
                                <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-400">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Subtotal</span>
                                    <span className="text-white font-semibold">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-text-secondary">Shipping</span>
                                    <span className="text-white font-semibold">
                                        {shipping === 0 ? <span className="text-neon-green">FREE</span> : `$${shipping.toFixed(2)}`}
                                    </span>
                                </div>
                                {shipping > 0 && (
                                    <p className="text-[10px] text-neon-green">Add ${(50 - cartTotal).toFixed(2)} more for free shipping!</p>
                                )}
                                <div className="border-t border-white/10 pt-3 flex justify-between">
                                    <span className="text-white font-bold">Total</span>
                                    <span className="text-xl font-black text-neon-green">${total.toFixed(2)}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={checkoutLoading}
                                className="btn-neon w-full py-4 text-sm mt-4 disabled:opacity-50"
                            >
                                {checkoutLoading ? "Processing..." : user ? "🔐 Checkout with Stripe" : "🔓 Login to Checkout"}
                            </button>

                            {!user && (
                                <p className="text-[10px] text-text-secondary text-center">
                                    You need to <Link href="/login?redirect=/cart" className="text-neon-green font-semibold">login</Link> to complete your purchase
                                </p>
                            )}

                            <Link href="/shop" className="block text-center text-xs text-text-secondary hover:text-neon-green transition-colors">
                                ← Continue Shopping
                            </Link>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
                                {[
                                    { icon: "🔒", text: "Secure" },
                                    { icon: "🚚", text: "Free 50$+" },
                                    { icon: "🔄", text: "30-Day" },
                                ].map((b) => (
                                    <div key={b.text} className="text-center">
                                        <div className="text-lg">{b.icon}</div>
                                        <div className="text-[9px] text-text-secondary font-semibold">{b.text}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
