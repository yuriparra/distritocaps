"use client";

import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";
import type { Product } from "../data/products";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/producto/${product.id}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-[#111111] transition-all duration-300 hover:border-yellow-400/40"
    >
      {/* Imagen del producto */}
        <div className="relative aspect-square overflow-hidden">
        {/* Fondo */}
        <Image
          src="/fondo-gorras.png"
          alt=""
          fill
          className="object-cover"
        />

        {/* Gorra */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="relative object-contain p-4 scale-115 transition-transform duration-500 group-hover:scale-[1.1]"
        />
      </div>

      {/* Información */}
      <div className="p-4">

        {/* Marca */}
        <p
          className={`${bebas.className} mb-1 text-xs uppercase tracking-[0.2em] text-yellow-400`}
        >
          {product.brand}
        </p>

        {/* Nombre */}
        <h3
          className={`${bebas.className} text-lg uppercase tracking-wide text-white`}
        >
          {product.name}
        </h3>

        {/* Precio */}
        <p
          className={`${bebas.className} mt-2 text-xl tracking-wide text-white`}
        >
          ${product.price.toLocaleString("es-CO")}
        </p>

      </div>
    </Link>
  );
}