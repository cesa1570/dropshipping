import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { fetchAliExpressProduct } from "../../../lib/aliexpress";
import { createServerSupabase } from "../../../lib/supabase-server";

export async function POST(request: Request) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        // 1. Fetch from AliExpress (RapidAPI)
        const aliData = await fetchAliExpressProduct(id);

        if (!aliData) {
            return NextResponse.json({ error: "Failed to fetch data from AliExpress. Check your API Key." }, { status: 502 });
        }

        // 2. Map to our schema
        const product = {
            id: id, // Use AliExpress ID as our ID
            name: aliData.title.slice(0, 100), // Truncate if too long
            description: aliData.description.slice(0, 500) || "Imported from AliExpress",
            price: aliData.price,
            original_price: aliData.original_price || aliData.price * 1.5,
            images: aliData.images.slice(0, 5), // Take top 5 images
            category: "imported", // Default category
            tags: ["aliexpress", "imported"],
            rating: aliData.rating || 5,
            review_count: aliData.sold || 0,
            badge: "new",
            aliexpress_url: `https://www.aliexpress.com/item/${id}.html`,
            stock: 100, // Default stock
            is_active: true
        };

        // 3. Save to Supabase
        const supabase = await createServerSupabase();
        const { data, error } = await supabase
            .from("products")
            .upsert(product)
            .select()
            .single();

        if (error) {
            console.error("Supabase Error:", error);
            return NextResponse.json({ error: "Failed to save to database: " + error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, product: data });

    } catch (error: any) {
        console.error("Import Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
