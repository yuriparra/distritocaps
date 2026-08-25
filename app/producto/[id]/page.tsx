import { products } from "../../data/products";
import ProductContent from "../../components/ProductContent";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  const product = products.find(
    (product) => product.id === id
  );

  if (!product) {
    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="text-4xl">
          Producto no encontrado
        </h1>
      </main>
    );
  }

  return <ProductContent product={product} />;
}