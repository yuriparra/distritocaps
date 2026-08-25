import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function NewCollection() {
  const activeProducts = products.filter((product) => product.active);

  return (
    <section className="bg-black px-6 py-12 md:px-10">
      
      {/* Encabezado */}
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

        <button
          type="button"
          className="hidden text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:text-yellow-400 sm:block"
        >
          Ver todos →
        </button>
      </div>

      {/* Productos */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {activeProducts.slice(0, 4).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
      </div>

      {/* Botón móvil */}
      <div className="mt-6 text-center sm:hidden">
        <button
          type="button"
          className="text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:text-yellow-400"
        >
          Ver todos →
        </button>
      </div>
    </section>
  );
}