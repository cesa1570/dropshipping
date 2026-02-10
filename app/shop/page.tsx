"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Suspense } from "react";

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "all";
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high">("popular");

    const filtered = useMemo(() => {
        let list =
            activeCategory === "all"
                ? products
                : products.filter((p) => p.category === activeCategory);

        switch (sortBy) {
            case "price-low":
                list = [...list].sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                list = [...list].sort((a, b) => b.price - a.price);
                break;
            case "popular":
            default:
                list = [...list].sort((a, b) => b.reviewCount - a.reviewCount);
        }

        return list;
    }, [activeCategory, sortBy]);

    return (
        <div className="pt-24 pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
                        <span className="gradient-text">Shop</span> All Products
                    </h1>
                    <p className="text-text-secondary text-sm">
                        {filtered.length} products available
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    {/* Category tabs */}
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => setActiveCategory("all")}
                            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeCategory === "all"
                                    ? "bg-neon-green text-bg-primary"
                                    : "bg-bg-card text-text-secondary hover:text-white border border-white/5"
                                }`}
                        >
                            All
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeCategory === cat.id
                                        ? "bg-neon-green text-bg-primary"
                                        : "bg-bg-card text-text-secondary hover:text-white border border-white/5"
                                    }`}
                            >
                                {cat.emoji} {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Sort */}
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                        className="px-4 py-2 rounded-xl bg-bg-card border border-white/5 text-sm text-white focus:outline-none focus:border-neon-green/50 cursor-pointer"
                    >
                        <option value="popular">Most Popular</option>
                        <option value="price-low">Price: Low → High</option>
                        <option value="price-high">Price: High → Low</option>
                    </select>
                </div>

                {/* Product grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {filtered.map((product, i) => (
                        <div
                            key={product.id}
                            className="animate-slide-up"
                            style={{ animationDelay: `${i * 0.05}s` }}
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-5xl mb-4">😔</div>
                        <p className="text-text-secondary">No products found in this category.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ShopPage() {
    return (
        <Suspense fallback={
            <div className="pt-24 pb-16 text-center">
                <div className="text-2xl animate-spin-slow">🧠</div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
