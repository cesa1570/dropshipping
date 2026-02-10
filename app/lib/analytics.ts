import { createAdminClient } from "./supabase-server";

export interface DashboardStats {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    dailyRevenue: { date: string; revenue: number }[];
    topProducts: { name: string; quantity: number; revenue: number }[];
    recentOrders: any[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
    const supabase = await createAdminClient();

    // Fetch orders from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .gte("created_at", thirtyDaysAgo.toISOString())
        .order("created_at", { ascending: false });

    if (error || !orders) {
        console.error("Error fetching orders:", error);
        return {
            totalRevenue: 0,
            totalOrders: 0,
            averageOrderValue: 0,
            dailyRevenue: [],
            topProducts: [],
            recentOrders: [],
        };
    }

    // Calculate specific metrics
    let totalRevenue = 0;
    const productMap = new Map<string, { name: string; quantity: number; revenue: number }>();
    const dailyMap = new Map<string, number>();

    // Initialize last 30 days with 0 revenue
    for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        if (!dailyMap.has(dateStr)) dailyMap.set(dateStr, 0);
    }

    orders.forEach((order) => {
        totalRevenue += order.total;

        // Daily Revenue
        const date = new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
        dailyMap.set(date, (dailyMap.get(date) || 0) + order.total);

        // Top Products
        if (Array.isArray(order.items)) {
            order.items.forEach((item: any) => {
                const current = productMap.get(item.id) || { name: item.name, quantity: 0, revenue: 0 };
                current.quantity += item.quantity;
                current.revenue += item.price * item.quantity;
                productMap.set(item.id, current);
            });
        }
    });

    // Convert maps to arrays
    const dailyRevenue = Array.from(dailyMap)
        .map(([date, revenue]) => ({ date, revenue }))
        .reverse(); // Show oldest to newest

    const topProducts = Array.from(productMap.values())
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

    return {
        totalRevenue,
        totalOrders: orders.length,
        averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
        dailyRevenue,
        topProducts,
        recentOrders: orders.slice(0, 5),
    };
}
