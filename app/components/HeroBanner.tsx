import Link from "next/link";

export default function HeroBanner() {
    return (
        <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-24">
            {/* Background effects */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-1/4 w-72 h-72 bg-neon-green/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-[150px]" />
            </div>

            {/* Floating decorations */}
            <div className="absolute top-32 left-8 text-4xl animate-float opacity-40 select-none hidden md:block">🚽</div>
            <div className="absolute top-48 right-12 text-5xl animate-float opacity-30 select-none hidden md:block" style={{ animationDelay: "1s" }}>🐊</div>
            <div className="absolute bottom-20 left-16 text-3xl animate-float opacity-35 select-none hidden md:block" style={{ animationDelay: "2s" }}>🐺</div>
            <div className="absolute bottom-32 right-20 text-4xl animate-float opacity-25 select-none hidden md:block" style={{ animationDelay: "0.5s" }}>🌽</div>
            <div className="absolute top-40 left-1/2 text-3xl animate-float opacity-20 select-none hidden lg:block" style={{ animationDelay: "1.5s" }}>💎</div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative">
                {/* Pill badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-neon-green/20 bg-neon-green/5 px-4 py-1.5 mb-8 animate-slide-up">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green" />
                    </span>
                    <span className="text-xs font-semibold text-neon-green uppercase tracking-wider">
                        New drops every week
                    </span>
                </div>

                {/* Main headline */}
                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6 animate-slide-up" style={{ animationDelay: "0.1s" }}>
                    <span className="text-white">The </span>
                    <span className="gradient-text">Brainrot</span>
                    <br />
                    <span className="text-white">Merch Store</span>
                </h1>

                {/* Subtitle */}
                <p
                    className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                >
                    Skibidi Toilet • Bombardiro Crocodilo • Sigma Essentials
                    <br className="hidden sm:block" />
                    Only the most <span className="text-neon-green font-semibold">unhinged merch</span> on the internet.
                </p>

                {/* CTAs */}
                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
                    style={{ animationDelay: "0.3s" }}
                >
                    <Link href="/shop" className="btn-neon text-base px-8 py-4">
                        🔥 Shop Now
                    </Link>
                    <Link
                        href="/shop"
                        className="btn-outline text-base px-8 py-4"
                    >
                        Browse Categories
                    </Link>
                </div>

                {/* Stats */}
                <div
                    className="grid grid-cols-3 gap-8 max-w-md mx-auto mt-16 animate-slide-up"
                    style={{ animationDelay: "0.4s" }}
                >
                    {[
                        { value: "12+", label: "Products" },
                        { value: "4.7★", label: "Avg Rating" },
                        { value: "5K+", label: "Happy Customers" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="text-2xl font-black text-white">{stat.value}</div>
                            <div className="text-xs text-text-secondary mt-1">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
