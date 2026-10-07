// ======================================================
// DETALLE DEL PRODUCTO - DISTRITOCAPS
// ======================================================
//
// Esta página recibe el ID del producto desde la URL
// y busca ese producto directamente en Supabase.
// ======================================================

import ProductContent from "../../components/ProductContent";
import { createClient } from "../../../utils/supabase/server";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

// ======================================================
// PÁGINA DEL PRODUCTO
// ======================================================

export default async function ProductPage({
  params,
}: ProductPageProps) {
  // Obtener el ID enviado en la URL.
  const { id } = await params;

  // Crear conexión con Supabase.
  const supabase = await createClient();

  // Buscar únicamente el producto correspondiente al ID.
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  // ======================================================
  // PRODUCTO NO ENCONTRADO
  // ======================================================

  if (error || !product) {
    if (error) {
      console.error("Error cargando producto:", error);
    }

    return (
      <main className="min-h-screen bg-black p-10 text-white">
        <h1 className="text-4xl">
          Producto no encontrado
        </h1>
      </main>
    );
  }

  // ======================================================
  // PRODUCTO ENCONTRADO
  // ======================================================

  return <ProductContent product={product} />;
}