import { createServerSupabase } from "../lib/supabase-server";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    original_price: number;
    images: string[];
    category: string;
    tags: string[];
    rating: number;
    review_count: number;
    badge?: "hot" | "new" | "sale" | null;
    aliexpress_url?: string;
    stock: number;
    is_active: boolean;
}

export const categories = [
    { id: "italian-brainrot", name: "Italian Brainrot", emoji: "🇮🇹", description: "Bombardiro, Tung Tung & the crew" },
    { id: "skibidi-collection", name: "Skibidi Collection", emoji: "🚽", description: "Toilet warriors assemble" },
    { id: "sigma-essentials", name: "Sigma Essentials", emoji: "🐺", description: "Mewing, Rizz & Sigma grind" },
    { id: "ohio-specials", name: "Ohio Specials", emoji: "🌽", description: "Only in Ohio moments" },
];

// Fallback static products for when Supabase is not configured
const fallbackProducts: Product[] = [
    {
        id: "bombardiro-crocodilo",
        name: "Bombardiro Crocodilo Figure",
        description: "Premium collectible figure of the legendary Bombardiro Crocodilo. High-detail resin cast, hand-painted finish. The ultimate meme artifact for your desk. 🐊💣",
        price: 29.99, original_price: 49.99,
        images: [], category: "italian-brainrot",
        tags: ["figure", "collectible", "bombardiro"],
        rating: 4.8, review_count: 342, badge: "hot",
        stock: 45, is_active: true,
    },
    {
        id: "tung-tung-sahur",
        name: "Tung Tung Sahur Plushie",
        description: "Soft and huggable Tung Tung Sahur plushie. Premium plush material, perfect for cuddling or flexing. 🥁",
        price: 24.99, original_price: 39.99,
        images: [], category: "italian-brainrot",
        tags: ["plushie", "tung tung", "sahur"],
        rating: 4.9, review_count: 567, badge: "hot",
        stock: 32, is_active: true,
    },
    {
        id: "tralalero-tralala",
        name: "Tralalero Tralala T-Shirt",
        description: "Premium 240gsm heavy cotton tee featuring the iconic Tralalero Tralala design. 🦈",
        price: 19.99, original_price: 34.99,
        images: [], category: "italian-brainrot",
        tags: ["t-shirt", "apparel", "tralalero"],
        rating: 4.7, review_count: 213, badge: "sale",
        stock: 120, is_active: true,
    },
    {
        id: "skibidi-toilet-figure",
        name: "Skibidi Toilet Action Figure",
        description: "Fully articulated Skibidi Toilet action figure with movable head and flush mechanism. 🚽",
        price: 22.99, original_price: 34.99,
        images: [], category: "skibidi-collection",
        tags: ["figure", "skibidi", "action"],
        rating: 4.6, review_count: 891, badge: "hot",
        stock: 78, is_active: true,
    },
    {
        id: "cameraman-scientist-set",
        name: "Cameraman vs Scientist Set",
        description: "Epic battle set featuring Cameraman and Scientist figures with accessories. 📷🔬",
        price: 39.99, original_price: 59.99,
        images: [], category: "skibidi-collection",
        tags: ["set", "cameraman", "scientist"],
        rating: 4.5, review_count: 156, badge: "new",
        stock: 25, is_active: true,
    },
    {
        id: "titan-speaker-hoodie",
        name: "Titan Speaker Hoodie",
        description: "Premium 380gsm French terry hoodie with Titan Speakerman graphic. 🔊",
        price: 49.99, original_price: 79.99,
        images: [], category: "skibidi-collection",
        tags: ["hoodie", "apparel", "titan"],
        rating: 4.8, review_count: 234, badge: "sale",
        stock: 55, is_active: true,
    },
    {
        id: "mewing-trainer",
        name: "Jawline Mewing Trainer Pro",
        description: "Professional-grade jawline trainer. Medical-grade silicone, 3 resistance levels. 💪",
        price: 14.99, original_price: 29.99,
        images: [], category: "sigma-essentials",
        tags: ["fitness", "mewing", "jawline"],
        rating: 4.3, review_count: 1203, badge: "hot",
        stock: 200, is_active: true,
    },
    {
        id: "sigma-poster",
        name: "Sigma Mindset Poster Set",
        description: "Set of 3 premium posters featuring sigma grindset quotes. 🐺",
        price: 16.99, original_price: 24.99,
        images: [], category: "sigma-essentials",
        tags: ["poster", "sigma", "decor"],
        rating: 4.4, review_count: 89, badge: "new",
        stock: 150, is_active: true,
    },
    {
        id: "rizz-tumbler",
        name: "Rizz Energy Drink Tumbler",
        description: "Insulated stainless steel tumbler with UNSPOKEN RIZZ holographic design. 💎",
        price: 18.99, original_price: 29.99,
        images: [], category: "sigma-essentials",
        tags: ["tumbler", "rizz", "drinkware"],
        rating: 4.6, review_count: 178, badge: null,
        stock: 90, is_active: true,
    },
    {
        id: "ohio-led-sign",
        name: '"Only in Ohio" LED Sign',
        description: "Neon-style LED sign. USB powered, dimmable, wall-mountable. 💡",
        price: 34.99, original_price: 54.99,
        images: [], category: "ohio-specials",
        tags: ["led", "sign", "decor"],
        rating: 4.7, review_count: 445, badge: "hot",
        stock: 38, is_active: true,
    },
    {
        id: "grimace-shake-cup",
        name: "Grimace Shake Cup",
        description: "Limited edition Grimace Shake collector's cup with lid and reusable straw. 🟣",
        price: 12.99, original_price: 19.99,
        images: [], category: "ohio-specials",
        tags: ["cup", "grimace", "drinkware"],
        rating: 4.2, review_count: 67, badge: "sale",
        stock: 60, is_active: true,
    },
    {
        id: "sus-crewmate-backpack",
        name: "Sus Crewmate Backpack",
        description: "Spacious backpack shaped like an Among Us crewmate. Padded laptop sleeve. 📮",
        price: 39.99, original_price: 59.99,
        images: [], category: "ohio-specials",
        tags: ["backpack", "amogus", "bag"],
        rating: 4.5, review_count: 312, badge: "new",
        stock: 42, is_active: true,
    },
];

const isSupabaseConfigured = () =>
    !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "your_supabase_project_url";

export async function getProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured()) return fallbackProducts;

    try {
        const supabase = await createServerSupabase();
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("is_active", true)
            .order("review_count", { ascending: false });

        if (error || !data) return fallbackProducts;
        return data;
    } catch {
        return fallbackProducts;
    }
}

export async function getProductById(id: string): Promise<Product | null> {
    if (!isSupabaseConfigured()) {
        return fallbackProducts.find((p) => p.id === id) ?? null;
    }

    try {
        const supabase = await createServerSupabase();
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) return fallbackProducts.find((p) => p.id === id) ?? null;
        return data;
    } catch {
        return fallbackProducts.find((p) => p.id === id) ?? null;
    }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
    if (!isSupabaseConfigured()) {
        return fallbackProducts.filter((p) => p.category === category);
    }

    try {
        const supabase = await createServerSupabase();
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("category", category)
            .eq("is_active", true);

        if (error || !data) return fallbackProducts.filter((p) => p.category === category);
        return data;
    } catch {
        return fallbackProducts.filter((p) => p.category === category);
    }
}

export async function getFeaturedProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured()) {
        return fallbackProducts.filter((p) => p.badge === "hot");
    }

    try {
        const supabase = await createServerSupabase();
        const { data, error } = await supabase
            .from("products")
            .select("*")
            .eq("badge", "hot")
            .eq("is_active", true);

        if (error || !data) return fallbackProducts.filter((p) => p.badge === "hot");
        return data;
    } catch {
        return fallbackProducts.filter((p) => p.badge === "hot");
    }
}
