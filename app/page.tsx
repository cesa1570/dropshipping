import HeroBanner from "./components/HeroBanner";
import ProductCard from "./components/ProductCard";
import { getProducts, getFeaturedProducts, categories } from "./data/products";
import Link from "next/link";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [allProducts, featuredProducts] = await Promise.all([
    getProducts(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <HeroBanner />

      {/* Featured Products */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              🔥 Trending <span className="gradient-text">Right Now</span>
            </h2>
            <p className="text-text-secondary text-sm">The most unhinged products flying off the shelves</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product, i) => (
              <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/shop" className="btn-outline text-sm px-6 py-3">View All Products →</Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-24 bg-bg-secondary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Shop by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-text-secondary text-sm">Find your flavor of brainrot</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, i) => (
              <Link href={`/shop?category=${cat.id}`} key={cat.id} className="category-card text-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-5xl mb-4">{cat.emoji}</div>
                <h3 className="text-lg font-bold text-white mb-1">{cat.name}</h3>
                <p className="text-xs text-text-secondary">{cat.description}</p>
                <span className="inline-block mt-3 text-xs font-semibold text-neon-purple">Browse →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">All <span className="gradient-text">Products</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {allProducts.map((product, i) => (
              <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-24 bg-bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/3 w-64 h-64 bg-neon-purple/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-neon-green/5 rounded-full blur-[100px]" />
        </div>
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Stay in the <span className="gradient-text">Loop</span> 🧠
          </h2>
          <p className="text-text-secondary text-sm mb-8">Get notified when new brainrot drops. No spam, only vibes.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="your@email.com" className="flex-1 px-4 py-3 rounded-xl bg-bg-card border border-white/10 text-white text-sm placeholder:text-text-secondary focus:outline-none focus:border-neon-green/50 transition-colors" />
            <button className="btn-neon text-sm px-6 py-3 whitespace-nowrap">Subscribe 🔔</button>
          </div>
        </div>
      </section>
    </>
  );
}
