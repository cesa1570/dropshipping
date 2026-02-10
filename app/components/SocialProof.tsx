"use client";

import { useEffect, useState } from "react";

const names = [
    "Skibidi_Fan_420", "SigmaGrinder", "OhioLegend", "BrainrotKing",
    "MewingMaster", "TungTungFan", "RizzGod_69", "BombardiroFan",
    "ToiletWarrior", "GigaChadVibes", "GenAlpha_Pro", "CroCodile_Drip",
    "TikTokKid23", "GrimaceShaker", "SusCrew_Mate", "SpeakerTitan",
];

const products = [
    "Bombardiro Crocodilo Figure", "Tung Tung Sahur Plushie",
    "Tralalero Tralala T-Shirt", "Skibidi Toilet Figure",
    "Cameraman Set", "Titan Speaker Hoodie",
    "Jawline Mewing Trainer", "Sigma Poster Set",
    "Rizz Tumbler", "Ohio LED Sign",
    "Grimace Shake Cup", "Sus Crewmate Backpack",
];

const cities = [
    "Ohio 🌽", "Tokyo 🇯🇵", "Bangkok 🇹🇭", "London 🇬🇧",
    "Sydney 🇦🇺", "Toronto 🇨🇦", "NYC 🗽", "LA 🌴",
    "Seoul 🇰🇷", "Singapore 🇸🇬",
];

export default function SocialProof() {
    const [notification, setNotification] = useState<{
        name: string;
        product: string;
        city: string;
        timeAgo: string;
    } | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const generateNotification = () => {
            const name = names[Math.floor(Math.random() * names.length)];
            const product = products[Math.floor(Math.random() * products.length)];
            const city = cities[Math.floor(Math.random() * cities.length)];
            const mins = Math.floor(Math.random() * 30) + 1;
            const timeAgo = mins === 1 ? "1 min ago" : `${mins} mins ago`;

            setNotification({ name, product, city, timeAgo });
            setShow(true);

            setTimeout(() => setShow(false), 4000);
        };

        // Initial delay
        const initialTimeout = setTimeout(generateNotification, 5000);

        // Repeat every 15-25 seconds
        const interval = setInterval(
            generateNotification,
            (15 + Math.random() * 10) * 1000
        );

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    if (!notification) return null;

    return (
        <div
            className={`fixed bottom-4 left-4 z-40 max-w-sm transition-all duration-500 ${show
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0 pointer-events-none"
                }`}
        >
            <div className="glass-strong rounded-xl p-3.5 flex items-start gap-3 shadow-lg">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-green to-neon-blue flex items-center justify-center text-lg flex-shrink-0">
                    🛒
                </div>
                <div className="min-w-0">
                    <p className="text-xs text-white font-semibold line-clamp-1">
                        {notification.name}
                    </p>
                    <p className="text-[11px] text-text-secondary line-clamp-1">
                        just bought <span className="text-neon-green font-semibold">{notification.product}</span>
                    </p>
                    <p className="text-[10px] text-text-secondary mt-0.5">
                        {notification.city} • {notification.timeAgo}
                    </p>
                </div>
            </div>
        </div>
    );
}
