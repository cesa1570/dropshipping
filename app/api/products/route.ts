import { NextResponse } from "next/server";
import { getProducts } from "../../data/products";

export const dynamic = "force-dynamic";

export async function GET() {
    const products = await getProducts();
    return NextResponse.json(products);
}
