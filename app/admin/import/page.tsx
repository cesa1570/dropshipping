"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ImportPage() {
    const [urlOrId, setUrlOrId] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const extractId = (input: string) => {
        // Basic regex to find ID in URL or return input if it's just numbers
        const match = input.match(/\/(\d+)\.html/) || input.match(/^(\d+)$/);
        return match ? match[1] : null;
    };

    const handleImport = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setResult(null);
        setSuccess(false);

        const id = extractId(urlOrId);
        if (!id) {
            setError("Invalid AliExpress URL or ID");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/admin/import", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to import");

            setResult(data.product);
            setSuccess(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Link href="/shop" className="text-sm text-text-secondary hover:text-white mb-4 block">
                ← Back to Shop
            </Link>

            <div className="glass-strong rounded-2xl p-8 border border-white/10">
                <h2 className="text-2xl font-bold mb-6 text-white">📦 Import from AliExpress</h2>

                <form onSubmit={handleImport} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-secondary mb-1">
                            Product URL or ID
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={urlOrId}
                                onChange={(e) => setUrlOrId(e.target.value)}
                                placeholder="https://www.aliexpress.com/item/100500123456.html"
                                className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-green"
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-neon px-6 py-3 font-bold"
                            >
                                {loading ? "Fetching..." : "Import"}
                            </button>
                        </div>
                    </div>
                </form>

                {error && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
                        ❌ {error}
                    </div>
                )}

                {success && result && (
                    <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 mb-4">
                            ✅ Product Imported Successfully!
                        </div>

                        <div className="glass rounded-xl p-4 flex gap-4">
                            <div className="relative w-32 h-32 flex-shrink-0 bg-white/5 rounded-lg overflow-hidden">
                                {result.images?.[0] && (
                                    <Image
                                        src={result.images[0]}
                                        alt={result.name}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-white truncate">{result.name}</h3>
                                <p className="text-neon-green font-mono text-lg mt-1">
                                    ${result.price}
                                </p>
                                <div className="flex gap-2 mt-2">
                                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-text-secondary">
                                        {result.category}
                                    </span>
                                    <span className="text-xs bg-white/10 px-2 py-1 rounded text-text-secondary">
                                        Stock: {result.stock}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Link href={`/product/${result.id}`} className="btn-outline px-4 py-2 text-sm">
                                View in Store
                            </Link>
                            <button
                                onClick={() => { setUrlOrId(""); setResult(null); setSuccess(false); }}
                                className="btn-ghost px-4 py-2 text-sm"
                            >
                                Import Another
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
