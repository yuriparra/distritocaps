// ======================================================
// NUEVA COLECCIÓN - DISTRITOCAPS
// ======================================================
//
// Esta sección obtiene directamente desde Supabase
// los 4 productos creados más recientemente.
// ======================================================

import ProductCard from "./ProductCard";
import { Bebas_Neue } from "next/font/google";
import Link from "next/link";
import { createClient } from "../../utils/supabase/server";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

// ======================================================
// COMPONENTE
// ======================================================

export default async function NewCollection() {
  // Crear conexión con Supabase desde el servidor.
  const supabase = await createClient();

  // Obtener únicamente los 4 productos más recientes.
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(4);

  // Si Supabase presenta un error, lo mostramos en consola.
  // La página puede seguir cargando normalmente.
  if (error) {
    console.error("Error cargando nueva colección:", error);
  }

  return (
    <section className="bg-black px-6 py-12 md:px-10">

      {/* =================================================
          ENCABEZADO
      ================================================= */}

      <div className="mb-8 flex items-end justify-between">
        <div>
          <p
            className={`${bebas.className} mb-2 text-sm uppercase tracking-[0.25em] text-yellow-400`}
          >
            Nueva colección
          </p>

          <h2
            className={`${bebas.className} text-3xl uppercase tracking-wide text-white md:text-4xl`}
          >
            Ver nueva colección
          </h2>
        </div>

        <Link
          href="/catalogo"
          className="hidden text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:text-yellow-400 sm:block"
        >
          Ver todos →
        </Link>
      </div>

      {/* =================================================
          PRODUCTOS
      ================================================= */}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {(products ?? []).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      {/* =================================================
          BOTÓN MÓVIL
      ================================================= */}

      <div className="mt-6 text-center sm:hidden">
        <Link
          href="/catalogo"
          className="text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:text-yellow-400"
        >
          Ver todos →
        </Link>
      </div>

    </section>
  );
}