import { NextResponse } from "next/server";
import { getProducts } from "../../data/products";

export const revalidate = 60;

export async function GET() {
    const products = await getProducts();
    return NextResponse.json(products);
}
