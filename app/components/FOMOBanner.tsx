"use client";

import { useState, useEffect } from "react";

export default function FOMOBanner() {
    const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 33 });

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev;
                seconds--;
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                    if (minutes < 0) {
                        minutes = 59;
                        hours--;
                        if (hours < 0) {
                            // Reset timer
                            return { hours: 2, minutes: 47, seconds: 33 };
                        }
                    }
                }
                return { hours, minutes, seconds };
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const pad = (n: number) => String(n).padStart(2, "0");

    return (
        <div className="bg-gradient-to-r from-neon-pink/20 via-neon-purple/20 to-neon-green/20 border-b border-white/5">
            <div className="mx-auto max-w-7xl px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
                <span className="text-xs font-bold text-white animate-glow-pulse">
                    ⚡ FLASH SALE — Up to 50% OFF
                </span>
                <div className="flex items-center gap-1.5">
                    {[
                        { value: pad(timeLeft.hours), label: "h" },
                        { value: pad(timeLeft.minutes), label: "m" },
                        { value: pad(timeLeft.seconds), label: "s" },
                    ].map((t, i) => (
                        <div key={i} className="flex items-center gap-1">
                            <span className="bg-bg-card px-2 py-0.5 rounded text-xs font-mono font-bold text-neon-green">
                                {t.value}
                            </span>
                            <span className="text-[10px] text-text-secondary">{t.label}</span>
                        </div>
                    ))}
                </div>
                <span className="text-[10px] text-text-secondary hidden sm:inline">
                    🔥 2,847 orders today
                </span>
            </div>
        </div>
    );
}
