"use client";

import Link from "next/link";
import { Product } from "../data/products";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };

    const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    const renderStars = (rating: number) => {
        const full = Math.floor(rating);
        const half = rating % 1 >= 0.5;
        return (
            <span className="stars text-sm">
                {"★".repeat(full)}
                {half ? "½" : ""}
                {"☆".repeat(5 - full - (half ? 1 : 0))}
            </span>
        );
    };

    return (
        <Link href={`/product/${product.id}`} className="block">
            <div className="product-card group">
                {/* Image */}
                <div className="relative overflow-hidden aspect-square bg-bg-secondary">
                    <div className="product-image w-full h-full flex items-center justify-center text-6xl bg-gradient-to-br from-bg-card to-bg-secondary">
                        {product.category === "italian-brainrot" && "🇮🇹"}
                        {product.category === "skibidi-collection" && "🚽"}
                        {product.category === "sigma-essentials" && "🐺"}
                        {product.category === "ohio-specials" && "🌽"}
                    </div>

                    {/* Badge */}
                    {product.badge && (
                        <span
                            className={`badge absolute top-3 left-3 ${product.badge === "hot"
                                    ? "badge-hot"
                                    : product.badge === "new"
                                        ? "badge-new"
                                        : "badge-sale"
                                }`}
                        >
                            {product.badge === "hot"
                                ? "🔥 HOT"
                                : product.badge === "new"
                                    ? "⚡ NEW"
                                    : `−${discount}%`}
                        </span>
                    )}
                </div>

                {/* Info */}
                <div className="p-4 space-y-2">
                    <h3 className="font-bold text-sm text-white group-hover:text-neon-green transition-colors line-clamp-1">
                        {product.name}
                    </h3>

                    <div className="flex items-center gap-2">
                        {renderStars(product.rating)}
                        <span className="text-[11px] text-text-secondary">
                            ({product.reviewCount})
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-lg font-black text-neon-green">
                            ${product.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-text-secondary line-through">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                    </div>

                    <button
                        onClick={handleAdd}
                        className={`w-full mt-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${added
                                ? "bg-neon-green text-bg-primary"
                                : "bg-white/5 text-white hover:bg-neon-green hover:text-bg-primary"
                            }`}
                    >
                        {added ? "✓ Added!" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </Link>
    );
}
