export interface AliExpressProduct {
    title: string;
    price: number;
    original_price: number;
    images: string[];
    description: string;
    specs: Record<string, string>;
    rating: number;
    sold: number;
}

export async function fetchAliExpressProduct(id: string): Promise<AliExpressProduct | null> {
    const apiKey = process.env.RAPID_API_KEY;
    if (!apiKey) {
        console.warn("RAPID_API_KEY is missing via process.env");
        // Return mock data if no key (for testing UI)
        return {
            title: "Mock AliExpress Product (No API Key)",
            price: 99.99,
            original_price: 129.99,
            images: ["https://ae01.alicdn.com/kf/Sfoobar.jpg"],
            description: "This is a mock product because RAPID_API_KEY is not set.",
            specs: { Material: "Cotton", Origin: "CN" },
            rating: 4.5,
            sold: 100
        };
    }

    const url = `https://ali-express1.p.rapidapi.com/product/${id}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'ali-express1.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`RapidAPI Error: ${response.status}`);
        }
        const data = await response.json();

        // Mapping logic depends on specific API, this is a generic robust mapping
        // Adjust based on actual API response structure
        return {
            title: data.title || data.product?.title || "Unknown Product",
            price: data.price?.current || data.product?.price?.current || 0,
            original_price: data.price?.original || data.product?.price?.original || 0,
            images: data.images || data.product?.images || [],
            description: data.description || "No description available",
            specs: data.specs || {},
            rating: data.rating || 4.5,
            sold: data.sold || 0
        };
    } catch (error) {
        console.error("Failed to fetch AliExpress product:", error);
        return null;
    }
}
