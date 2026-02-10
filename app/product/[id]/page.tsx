import { getProductById, getProducts } from "../../data/products";
import ProductDetailComponent from "./ProductDetailComponent";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
    const products = await getProducts();
    return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const product = await getProductById(id);
    if (!product) notFound();

    const allProducts = await getProducts();
    const related = allProducts
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return <ProductDetailComponent product={product} relatedProducts={related} />;
}
