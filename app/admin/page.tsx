import Link from "next/link";

export default function AdminDashboard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/admin/import" className="group">
                <div className="glass-strong rounded-2xl p-6 h-full border border-white/10 hover:border-neon-green transition-all duration-300">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">📦</div>
                    <h2 className="text-xl font-bold text-white mb-2">Import Products</h2>
                    <p className="text-text-secondary text-sm">
                        Fetch product data directly from AliExpress using ID or URL.
                    </p>
                </div>
            </Link>

            <Link href="/shop" className="group">
                <div className="glass-strong rounded-2xl p-6 h-full border border-white/10 hover:border-neon-purple transition-all duration-300">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">🏪</div>
                    <h2 className="text-xl font-bold text-white mb-2">View Store</h2>
                    <p className="text-text-secondary text-sm">
                        Go to the main shop page to see your live products.
                    </p>
                </div>
            </Link>

            <div className="glass rounded-2xl p-6 h-full border border-white/5 opacity-50 cursor-not-allowed">
                <div className="text-4xl mb-4">📊</div>
                <h2 className="text-xl font-bold text-white mb-2">Analytics</h2>
                <p className="text-text-secondary text-sm">
                    Coming soon... Track your sales and brainrot metrics.
                </p>
            </div>
        </div>
    );
}
