"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import type { Product } from "../../data/products";
import ProductCard from "../../components/ProductCard";

export default function ProductDetail({
    product,
    relatedProducts,
}: {
    product: Product;
    relatedProducts: Product[];
}) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);
    const [qty, setQty] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    const handleAdd = () => {
        for (let i = 0; i < qty; i++) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.original_price,
                image: product.images?.[0] || "",
                category: product.category,
            });
        }
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const discount = Math.round(
        ((product.original_price - product.price) / product.original_price) * 100
    );

    const renderStars = (rating: number) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        return (
            <span className="stars text-lg">
                {"★".repeat(full)}
                {half ? "½" : ""}
                {"☆".repeat(5 - full - (half ? 1 : 0))}
            </span>
        );
    };

    const categoryEmoji: Record<string, string> = {
        "italian-brainrot": "🇮🇹",
        "skibidi-collection": "🚽",
        "sigma-essentials": "🐺",
        "ohio-specials": "🌽",
    };

    const viewersNow = Math.floor(Math.random() * 40) + 15;

    return (
        <div className="pt-32 pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="text-xs text-text-secondary mb-6 flex items-center gap-2">
                    <Link href="/" className="hover:text-neon-green transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-neon-green transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-white">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Images */}
                    <div className="space-y-4">
                        <div className="relative aspect-square rounded-2xl overflow-hidden bg-bg-card border border-white/5">
                            {product.images && product.images.length > 0 && product.images[activeImage] ? (
                                <img
                                    src={product.images[activeImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-[120px] bg-gradient-to-br from-bg-card to-bg-secondary">
                                    {categoryEmoji[product.category] || "🧠"}
                                </div>
                            )}
                            {product.badge && (
                                <span className={`badge absolute top-4 left-4 ${product.badge === "hot" ? "badge-hot" : product.badge === "new" ? "badge-new" : "badge-sale"
                                    }`}>
                                    {product.badge === "hot" ? "🔥 HOT" : product.badge === "new" ? "⚡ NEW" : `−${discount}%`}
                                </span>
                            )}
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-3">
                                {product.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(i)}
                                        className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-neon-green" : "border-transparent opacity-60 hover:opacity-100"
                                            }`}
                                    >
                                        <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black text-white mb-2">{product.name}</h1>
                            <div className="flex items-center gap-3">
                                {renderStars(product.rating)}
                                <span className="text-sm text-text-secondary">{product.rating}/5 ({product.review_count} reviews)</span>
                            </div>
                        </div>

                        {/* FOMO */}
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs bg-neon-pink/10 text-neon-pink px-3 py-1.5 rounded-full font-semibold">
                                👁 {viewersNow} people viewing now
                            </span>
                            {product.stock < 50 && (
                                <span className="text-xs bg-red-500/10 text-red-400 px-3 py-1.5 rounded-full font-semibold">
                                    ⚠ Only {product.stock} left in stock!
                                </span>
                            )}
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-3">
                            <span className="text-4xl font-black text-neon-green">${product.price.toFixed(2)}</span>
                            <span className="text-xl text-text-secondary line-through">${product.original_price.toFixed(2)}</span>
                            <span className="badge badge-sale">Save {discount}%</span>
                        </div>

                        {/* Description */}
                        <p className="text-text-secondary text-sm leading-relaxed">{product.description}</p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {product.tags.map((tag) => (
                                <span key={tag} className="text-[10px] text-text-secondary bg-bg-card px-3 py-1 rounded-full border border-white/5">
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Quantity + Add to cart */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-bg-card rounded-xl border border-white/5">
                                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-10 h-10 flex items-center justify-center text-white hover:text-neon-green transition-colors font-bold">−</button>
                                <span className="w-8 text-center text-sm font-bold text-white">{qty}</span>
                                <button onClick={() => setQty(qty + 1)} className="w-10 h-10 flex items-center justify-center text-white hover:text-neon-green transition-colors font-bold">+</button>
                            </div>
                            <button onClick={handleAdd} className={`btn-neon flex-1 py-3.5 text-sm ${added ? "!bg-neon-green !text-bg-primary" : ""}`}>
                                {added ? "✓ Added to Cart!" : "🛒 Add to Cart"}
                            </button>
                        </div>

                        {/* Trust */}
                        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                            {[
                                { icon: "🚚", title: "Free Shipping", sub: "On orders $50+" },
                                { icon: "🔄", title: "30-Day Returns", sub: "No questions asked" },
                                { icon: "🔒", title: "Secure Checkout", sub: "Stripe encrypted" },
                            ].map((t) => (
                                <div key={t.title} className="text-center">
                                    <div className="text-xl">{t.icon}</div>
                                    <p className="text-[10px] font-bold text-white mt-1">{t.title}</p>
                                    <p className="text-[9px] text-text-secondary">{t.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-16 sm:mt-24">
                        <h2 className="text-2xl font-black text-white mb-8">You Might Also Like 🧠</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
