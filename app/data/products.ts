export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    image: string;
    category: string;
    tags: string[];
    rating: number;
    reviewCount: number;
    badge?: "hot" | "new" | "sale";
}

export const categories = [
    { id: "italian-brainrot", name: "Italian Brainrot", emoji: "🇮🇹", description: "Bombardiro, Tung Tung & the crew" },
    { id: "skibidi-collection", name: "Skibidi Collection", emoji: "🚽", description: "Toilet warriors assemble" },
    { id: "sigma-essentials", name: "Sigma Essentials", emoji: "🐺", description: "Mewing, Rizz & Sigma grind" },
    { id: "ohio-specials", name: "Ohio Specials", emoji: "🌽", description: "Only in Ohio moments" },
];

export const products: Product[] = [
    // Italian Brainrot
    {
        id: "bombardiro-crocodilo",
        name: "Bombardiro Crocodilo Figure",
        description: "Premium collectible figure of the legendary Bombardiro Crocodilo. High-detail resin cast, hand-painted finish. The ultimate meme artifact for your desk. 🐊💣",
        price: 29.99,
        originalPrice: 49.99,
        image: "/products/bombardiro.webp",
        category: "italian-brainrot",
        tags: ["figure", "collectible", "bombardiro"],
        rating: 4.8,
        reviewCount: 342,
        badge: "hot",
    },
    {
        id: "tung-tung-sahur",
        name: "Tung Tung Sahur Plushie",
        description: "Soft and huggable Tung Tung Sahur plushie. Premium plush material, perfect for cuddling or flexing on your friends. Comes with sound chip that plays the iconic beat! 🥁",
        price: 24.99,
        originalPrice: 39.99,
        image: "/products/tungtung.webp",
        category: "italian-brainrot",
        tags: ["plushie", "tung tung", "sahur"],
        rating: 4.9,
        reviewCount: 567,
        badge: "hot",
    },
    {
        id: "tralalero-tralala",
        name: "Tralalero Tralala T-Shirt",
        description: "Premium cotton t-shirt featuring the iconic Tralalero Tralala design. Oversized fit, 240gsm heavy cotton. Available in Black. Walk around being a living meme. 🦈",
        price: 19.99,
        originalPrice: 34.99,
        image: "/products/tralalero.webp",
        category: "italian-brainrot",
        tags: ["t-shirt", "apparel", "tralalero"],
        rating: 4.7,
        reviewCount: 213,
        badge: "sale",
    },

    // Skibidi Collection
    {
        id: "skibidi-toilet-figure",
        name: "Skibidi Toilet Action Figure",
        description: "Fully articulated Skibidi Toilet action figure with movable head and flush mechanism. The OG brainrot character. Collect all variants! 🚽",
        price: 22.99,
        originalPrice: 34.99,
        image: "/products/skibidi.webp",
        category: "skibidi-collection",
        tags: ["figure", "skibidi", "action"],
        rating: 4.6,
        reviewCount: 891,
        badge: "hot",
    },
    {
        id: "cameraman-scientist-set",
        name: "Cameraman vs Scientist Set",
        description: "Epic battle set featuring Cameraman and Scientist figures. Includes removable accessories and battle stand. Choose your side in the ultimate brainrot war! 📷🔬",
        price: 39.99,
        originalPrice: 59.99,
        image: "/products/cameraman.webp",
        category: "skibidi-collection",
        tags: ["set", "cameraman", "scientist"],
        rating: 4.5,
        reviewCount: 156,
        badge: "new",
    },
    {
        id: "titan-speaker-hoodie",
        name: "Titan Speaker Hoodie",
        description: "Premium heavyweight hoodie with Titan Speakerman graphic. 380gsm French terry, oversized fit. Built-in speaker (Bluetooth) in the hood for maximum brainrot energy. 🔊",
        price: 49.99,
        originalPrice: 79.99,
        image: "/products/titan.webp",
        category: "skibidi-collection",
        tags: ["hoodie", "apparel", "titan"],
        rating: 4.8,
        reviewCount: 234,
        badge: "sale",
    },

    // Sigma Essentials
    {
        id: "mewing-trainer",
        name: "Jawline Mewing Trainer",
        description: "Professional-grade jawline trainer for that sigma mewing aesthetic. Medical-grade silicone, 3 resistance levels. Become the gigachad you were meant to be. 💪",
        price: 14.99,
        originalPrice: 29.99,
        image: "/products/mewing.webp",
        category: "sigma-essentials",
        tags: ["fitness", "mewing", "jawline"],
        rating: 4.3,
        reviewCount: 1203,
        badge: "hot",
    },
    {
        id: "sigma-poster",
        name: "Sigma Mindset Poster Set",
        description: "Set of 3 premium posters featuring sigma grindset quotes. UV-printed on thick 300gsm matte cardstock. Frame not included. Motivate your grind daily. 🐺",
        price: 16.99,
        originalPrice: 24.99,
        image: "/products/sigma.webp",
        category: "sigma-essentials",
        tags: ["poster", "sigma", "decor"],
        rating: 4.4,
        reviewCount: 89,
        badge: "new",
    },
    {
        id: "rizz-tumbler",
        name: "Rizz Energy Drink Tumbler",
        description: "Insulated stainless steel tumbler with 'UNSPOKEN RIZZ' holographic design. Keeps drinks cold 24hrs. W Rizz not included but strongly implied. 💎",
        price: 18.99,
        originalPrice: 29.99,
        image: "/products/rizz.webp",
        category: "sigma-essentials",
        tags: ["tumbler", "rizz", "drinkware"],
        rating: 4.6,
        reviewCount: 178,
    },

    // Ohio Specials
    {
        id: "ohio-led-sign",
        name: '"Only in Ohio" LED Sign',
        description: "Neon-style LED sign that reads 'ONLY IN OHIO'. USB powered, dimmable, wall-mountable. Perfect for your gaming setup or brainrot shrine. Ships with controller. 💡",
        price: 34.99,
        originalPrice: 54.99,
        image: "/products/ohio.webp",
        category: "ohio-specials",
        tags: ["led", "sign", "decor"],
        rating: 4.7,
        reviewCount: 445,
        badge: "hot",
    },
    {
        id: "grimace-shake-cup",
        name: "Grimace Shake Cup",
        description: "Limited edition Grimace Shake collector's cup (empty, no purple sludge included). Food-grade plastic, reusable straw. Survive the shake or die trying. 🟣",
        price: 12.99,
        originalPrice: 19.99,
        image: "/products/grimace.webp",
        category: "ohio-specials",
        tags: ["cup", "grimace", "drinkware"],
        rating: 4.2,
        reviewCount: 67,
        badge: "sale",
    },
    {
        id: "sus-crewmate-backpack",
        name: "Sus Crewmate Backpack",
        description: "Spacious backpack shaped like an Among Us crewmate. Multiple compartments, padded laptop sleeve (fits 15.6\"). Bus red or space blue. Pretty sus ngl. 📮",
        price: 39.99,
        originalPrice: 59.99,
        image: "/products/sus.webp",
        category: "ohio-specials",
        tags: ["backpack", "amogus", "bag"],
        rating: 4.5,
        reviewCount: 312,
        badge: "new",
    },
];

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
    return products.filter((p) => p.badge === "hot");
}
