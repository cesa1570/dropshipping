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
