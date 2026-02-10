"use client";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";

interface AnalyticsChartsProps {
    dailyRevenue: { date: string; revenue: number }[];
}

export default function AnalyticsCharts({ dailyRevenue }: AnalyticsChartsProps) {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={dailyRevenue}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 0,
                        bottom: 5,
                    }}
                >
                    {/* Dark Mode Styling */}
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis
                        dataKey="date"
                        stroke="#888"
                        tick={{ fill: "#888", fontSize: 12 }}
                        tickLine={false}
                    />
                    <YAxis
                        stroke="#888"
                        tick={{ fill: "#888", fontSize: 12 }}
                        tickLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: "#000", borderColor: "#333", color: "#fff" }}
                        itemStyle={{ color: "#39ff14" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#39ff14" // Neon Green
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#000", stroke: "#39ff14", strokeWidth: 2 }}
                        activeDot={{ r: 8, fill: "#39ff14" }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
