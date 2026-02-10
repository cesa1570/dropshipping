import { NextResponse } from "next/server";
import { stripe } from "../../../lib/stripe";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";

// Use service role for webhook (bypasses RLS)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    const body = await request.text();
    const sig = request.headers.get("stripe-signature");

    if (!sig) {
        return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const metadata = session.metadata || {};

        try {
            let items = [];
            try {
                items = JSON.parse(metadata.items_json || "[]");
            } catch {
                items = [];
            }

            await supabaseAdmin.from("orders").insert({
                user_id: metadata.user_id,
                stripe_session_id: session.id,
                stripe_payment_intent: typeof session.payment_intent === "string"
                    ? session.payment_intent
                    : null,
                status: "paid",
                total: (session.amount_total || 0) / 100,
                items,
                shipping_address: session.shipping_details?.address || null,
                customer_email: session.customer_email,
            });
        } catch (err) {
            console.error("Error creating order:", err);
        }
    }

    return NextResponse.json({ received: true });
}
