import Link from "next/link";
import { getDashboardStats } from "../lib/analytics";
import AnalyticsCharts from "../components/admin/AnalyticsCharts";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const stats = await getDashboardStats();

    return (
        <div className="space-y-8">
            {/* 1. KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-neon-green transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-text-secondary text-sm font-medium">Total Revenue</h3>
                        <span className="text-neon-green text-xs bg-neon-green/10 px-2 py-1 rounded">30 Days</span>
                    </div>
                    <p className="text-3xl font-black text-white">${stats.totalRevenue.toFixed(2)}</p>
                </div>

                <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-neon-blue transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-text-secondary text-sm font-medium">Total Orders</h3>
                        <span className="text-neon-blue text-xs bg-neon-blue/10 px-2 py-1 rounded">30 Days</span>
                    </div>
                    <p className="text-3xl font-black text-white">{stats.totalOrders}</p>
                </div>

                <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-neon-purple transition-colors">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-text-secondary text-sm font-medium">Avg. Order Value</h3>
                        <span className="text-neon-purple text-xs bg-neon-purple/10 px-2 py-1 rounded">LTV</span>
                    </div>
                    <p className="text-3xl font-black text-white">${stats.averageOrderValue.toFixed(2)}</p>
                </div>
            </div>

            {/* 2. Charts & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 glass-strong rounded-2xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-6">📈 Revenue Trends</h2>
                    <AnalyticsCharts dailyRevenue={stats.dailyRevenue} />
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <Link href="/admin/import" className="block group">
                        <div className="glass rounded-xl p-5 border border-white/10 hover:bg-white/5 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center text-xl">📦</div>
                                <div>
                                    <h3 className="font-bold text-white group-hover:text-neon-green transition-colors">Import Product</h3>
                                    <p className="text-xs text-text-secondary">Add from AliExpress</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link href="/shop" className="block group">
                        <div className="glass rounded-xl p-5 border border-white/10 hover:bg-white/5 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-neon-purple/20 flex items-center justify-center text-xl">🏪</div>
                                <div>
                                    <h3 className="font-bold text-white group-hover:text-neon-purple transition-colors">View Storefront</h3>
                                    <p className="text-xs text-text-secondary">Go to live site</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>

            {/* 3. Top Products & Recent Orders */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Products */}
                <div className="glass-strong rounded-2xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-4">🏆 Top Selling Products</h2>
                    <div className="space-y-4">
                        {stats.topProducts.length === 0 ? (
                            <p className="text-text-secondary text-sm">No sales yet.</p>
                        ) : (
                            stats.topProducts.map((product, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                                    <div className="flex items-center gap-3">
                                        <span className="text-neon-green font-mono font-bold text-lg">#{i + 1}</span>
                                        <div>
                                            <h4 className="text-white font-medium text-sm truncate max-w-[200px]">{product.name}</h4>
                                            <p className="text-xs text-text-secondary">{product.quantity} sold</p>
                                        </div>
                                    </div>
                                    <span className="text-white font-bold">${product.revenue.toFixed(2)}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="glass-strong rounded-2xl p-6 border border-white/10">
                    <h2 className="text-xl font-bold text-white mb-4">🕒 Recent Orders</h2>
                    <div className="space-y-3">
                        {stats.recentOrders.length === 0 ? (
                            <p className="text-text-secondary text-sm">No orders found.</p>
                        ) : (
                            stats.recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                                    <div>
                                        <p className="text-white text-sm font-mono">#{order.id.slice(0, 8)}</p>
                                        <p className="text-[10px] text-text-secondary">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-neon-green font-bold text-sm">${order.total.toFixed(2)}</p>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${order.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
