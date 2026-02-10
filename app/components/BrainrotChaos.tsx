"use client";

import { useEffect, useState } from "react";

const CHARACTERS = [
    {
        id: "toilet",
        src: "https://media1.tenor.com/m/ixS3gVz7eQAAAAAd/skibidi-toilet-dance.gif",
        label: "Skibidi",
        size: "w-24 md:w-32"
    },
    {
        id: "maxwell",
        src: "https://media.tenor.com/F0j7T_-vD3MAAAAi/maxwell-cat.gif",
        label: "Maxwell",
        size: "w-20 md:w-24"
    },
    {
        id: "huh",
        src: "https://media1.tenor.com/m/fTTVgyDbTSSAAAAAC/huh-cat-huh-m44.gif",
        label: "Huh?",
        size: "w-20 md:w-28"
    },
    {
        id: "pedro",
        src: "https://media1.tenor.com/m/t1kfa8_uK-AAAAAC/racoon-pedro.gif",
        label: "Pedro",
        size: "w-24 md:w-32 rounded-full"
    },
    {
        id: "sigma",
        src: "https://media.tenor.com/HuP_YgXh1DQAAAAi/sigma-sigma-male.gif",
        label: "Sigma",
        size: "w-20 md:w-28"
    },
];

export default function BrainrotChaos() {
    const [items, setItems] = useState<{ id: number; char: typeof CHARACTERS[0]; x: number; y: number; rotate: number; anim: string }[]>([]);

    useEffect(() => {
        // Spawn a new character every 3 seconds
        const interval = setInterval(() => {
            const char = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
            const id = Date.now();

            const newItem = {
                id,
                char,
                x: Math.random() * 85 + 5, // 5% to 90% width
                y: Math.random() * 85 + 5, // 5% to 90% height
                rotate: Math.random() * 40 - 20,
                anim: Math.random() > 0.5 ? "animate-bounce" : "animate-pulse",
            };

            setItems((prev) => [...prev.slice(-3), newItem]); // Keep max 4 items

            // Remove after 6 seconds
            setTimeout(() => {
                setItems((prev) => prev.filter((i) => i.id !== id));
            }, 6000);

        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            {items.map((item) => (
                <div
                    key={item.id}
                    className={`absolute opacity-80 hover:opacity-100 transition-all duration-300 ${item.anim}`}
                    style={{
                        left: `${item.x}%`,
                        top: `${item.y}%`,
                        transform: `rotate(${item.rotate}deg)`,
                    }}
                >
                    <img
                        src={item.char.src}
                        alt={item.char.label}
                        className={`${item.char.size} object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
                    />
                </div>
            ))}

            {/* Peeking Skibidi (Fixed Bottom Right) */}
            <div className="absolute bottom-0 right-0 z-10 opacity-40 hover:opacity-100 transition-all duration-500 hover:translate-y-[-20px] cursor-pointer">
                <img
                    src="https://media1.tenor.com/m/ixS3gVz7eQAAAAAd/skibidi-toilet-dance.gif"
                    alt="Skibidi"
                    className="w-32 md:w-48 object-contain hover:scale-110 transition-transform"
                />
            </div>
        </div>
    );
}
