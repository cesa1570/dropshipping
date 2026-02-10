import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import { stripe } from "../../lib/stripe";
import { createServerSupabase } from "../../lib/supabase-server";

interface CartItem {
    product: {
        id: string;
        name: string;
        price: number;
        images: string[];
    };
    quantity: number;
}

export async function POST(request: Request) {
    try {
        const supabase = await createServerSupabase();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "You must be logged in to checkout" },
                { status: 401 }
            );
        }

        const { items } = (await request.json()) as { items: CartItem[] };

        if (!items || items.length === 0) {
            return NextResponse.json(
                { error: "Cart is empty" },
                { status: 400 }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            mode: "payment",
            customer_email: user.email,
            metadata: {
                user_id: user.id,
                items_json: JSON.stringify(
                    items.map((i) => ({
                        id: i.product.id,
                        name: i.product.name,
                        price: i.product.price,
                        quantity: i.quantity,
                    }))
                ),
            },
            line_items: items.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.product.name,
                        images: item.product.images?.length > 0 ? [item.product.images[0]] : [],
                    },
                    unit_amount: Math.round(item.product.price * 100),
                },
                quantity: item.quantity,
            })),
            shipping_address_collection: {
                allowed_countries: ["US", "CA", "GB", "AU", "TH", "JP", "KR", "SG"],
            },
            success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/cart`,
        });

        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Checkout error:", error);
        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 }
        );
    }
}
