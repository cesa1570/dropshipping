"use client";

import { useEffect, useState } from "react";

export default function BrainrotCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [trails, setTrails] = useState<{ x: number; y: number; id: number; emoji: string }[]>([]);

    useEffect(() => {
        const emojis = ["💀", "🧠", "🔥", "🤡", "💎", "🦍"];
        let count = 0;

        const updatePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });

            // Add trail every 5th move
            count++;
            if (count % 3 === 0) {
                const id = Date.now();
                const emoji = emojis[Math.floor(Math.random() * emojis.length)];
                setTrails((prev) => [...prev.slice(-15), { x: e.clientX, y: e.clientY, id, emoji }]);

                setTimeout(() => {
                    setTrails((prev) => prev.filter((t) => t.id !== id));
                }, 800);
            }
        };

        window.addEventListener("mousemove", updatePosition);
        return () => window.removeEventListener("mousemove", updatePosition);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
            {/* Main Cursor */}
            <div
                className="absolute text-2xl transition-transform duration-75 will-change-transform"
                style={{ transform: `translate(${position.x - 10}px, ${position.y - 10}px)` }}
            >
                🖕
            </div>

            {/* Trail */}
            {trails.map((trail) => (
                <div
                    key={trail.id}
                    className="absolute text-xl animate-fade-out"
                    style={{
                        left: trail.x,
                        top: trail.y,
                        transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`
                    }}
                >
                    {trail.emoji}
                </div>
            ))}
        </div>
    );
}
