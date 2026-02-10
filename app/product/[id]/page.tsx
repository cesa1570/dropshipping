"use client";

import { useParams } from "next/navigation";
import { getProductById, products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/ProductCard";
import Link from "next/link";
import { useState } from "react";

export default function ProductDetailPage() {
    const params = useParams();
    const product = getProductById(params.id as string);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <div className="pt-24 pb-16 text-center min-h-screen flex items-center justify-center">
                <div>
                    <div className="text-6xl mb-4">🫠</div>
                    <h1 className="text-2xl font-bold text-white mb-2">Product Not Found</h1>
                    <p className="text-text-secondary mb-6">This product has been yoinked from our store.</p>
                    <Link href="/shop" className="btn-neon text-sm px-6 py-3">
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    const discount = Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
    );

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

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

    return (
        <div className="pt-24 pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs text-text-secondary mb-8">
                    <Link href="/" className="hover:text-neon-green transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-neon-green transition-colors">Shop</Link>
                    <span>/</span>
                    <span className="text-white">{product.name}</span>
                </nav>

                {/* Product Main */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Image */}
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-bg-card border border-white/5">
                        <div className="w-full h-full flex items-center justify-center text-9xl bg-gradient-to-br from-bg-card to-bg-secondary">
                            {product.category === "italian-brainrot" && "🇮🇹"}
                            {product.category === "skibidi-collection" && "🚽"}
                            {product.category === "sigma-essentials" && "🐺"}
                            {product.category === "ohio-specials" && "🌽"}
                        </div>
                        {product.badge && (
                            <span
                                className={`badge absolute top-4 left-4 text-sm ${product.badge === "hot"
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
                    <div className="flex flex-col justify-center">
                        <div className="space-y-6">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {product.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[10px] uppercase tracking-wider font-semibold text-neon-purple bg-neon-purple/10 px-3 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                                {product.name}
                            </h1>

                            {/* Rating */}
                            <div className="flex items-center gap-3">
                                {renderStars(product.rating)}
                                <span className="text-sm text-text-secondary">
                                    {product.rating} ({product.reviewCount} reviews)
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-black text-neon-green">
                                    ${product.price.toFixed(2)}
                                </span>
                                <span className="text-xl text-text-secondary line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                                <span className="badge badge-sale text-xs">−{discount}%</span>
                            </div>

                            {/* Description */}
                            <p className="text-text-secondary leading-relaxed">
                                {product.description}
                            </p>

                            {/* Quantity + Add to Cart */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex items-center gap-3 bg-bg-card rounded-xl border border-white/5 px-2">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-white hover:text-neon-green transition-colors text-lg font-bold"
                                    >
                                        −
                                    </button>
                                    <span className="w-8 text-center font-bold text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center text-white hover:text-neon-green transition-colors text-lg font-bold"
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className={`flex-1 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-300 ${added
                                            ? "bg-neon-green text-bg-primary neon-box-glow"
                                            : "btn-neon"
                                        }`}
                                >
                                    {added ? "✓ Added to Cart!" : `Add to Cart — $${(product.price * quantity).toFixed(2)}`}
                                </button>
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
                                {[
                                    { icon: "🚚", text: "Free Shipping" },
                                    { icon: "🔄", text: "30-Day Returns" },
                                    { icon: "🔒", text: "Secure Checkout" },
                                ].map((b) => (
                                    <div key={b.text} className="text-center">
                                        <div className="text-xl mb-1">{b.icon}</div>
                                        <div className="text-[10px] text-text-secondary font-semibold uppercase tracking-wider">
                                            {b.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-20">
                        <h2 className="text-2xl font-black text-white mb-8">
                            You Might Also <span className="gradient-text">Like</span>
                        </h2>
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
