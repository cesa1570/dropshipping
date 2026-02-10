"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { categories, type Product } from "../data/products";
import ProductCard from "../components/ProductCard";
import { Suspense } from "react";

function ShopContent() {
    const searchParams = useSearchParams();
    const initialCategory = searchParams.get("category") || "all";
    const [activeCategory, setActiveCategory] = useState(initialCategory);
    const [sortBy, setSortBy] = useState<"popular" | "price-low" | "price-high">("popular");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/products")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        let list = activeCategory === "all"
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
                list = [...list].sort((a, b) => b.review_count - a.review_count);
        }
        return list;
    }, [activeCategory, sortBy, products]);

    return (
        <div className="pt-32 pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
                        <span className="gradient-text">Shop</span> All Products
                    </h1>
                    <p className="text-text-secondary text-sm">{filtered.length} products available</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div className="flex flex-wrap gap-2">
                        <button onClick={() => setActiveCategory("all")} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeCategory === "all" ? "bg-neon-green text-bg-primary" : "bg-bg-card text-text-secondary hover:text-white border border-white/5"}`}>
                            All
                        </button>
                        {categories.map((cat) => (
                            <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${activeCategory === cat.id ? "bg-neon-green text-bg-primary" : "bg-bg-card text-text-secondary hover:text-white border border-white/5"}`}>
                                {cat.emoji} {cat.name}
                            </button>
                        ))}
                    </div>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="px-4 py-2 rounded-xl bg-bg-card border border-white/5 text-sm text-white focus:outline-none focus:border-neon-green/50 cursor-pointer">
                        <option value="popular">Most Popular</option>
                        <option value="price-low">Price: Low → High</option>
                        <option value="price-high">Price: High → Low</option>
                    </select>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="product-card animate-pulse">
                                <div className="aspect-square bg-bg-secondary" />
                                <div className="p-4 space-y-3">
                                    <div className="h-4 bg-bg-secondary rounded w-3/4" />
                                    <div className="h-3 bg-bg-secondary rounded w-1/2" />
                                    <div className="h-5 bg-bg-secondary rounded w-1/3" />
                                    <div className="h-10 bg-bg-secondary rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {filtered.map((product, i) => (
                            <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}

                {!loading && filtered.length === 0 && (
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
        <Suspense fallback={<div className="pt-32 pb-16 text-center"><div className="text-2xl animate-spin-slow">🧠</div></div>}>
            <ShopContent />
        </Suspense>
    );
}
