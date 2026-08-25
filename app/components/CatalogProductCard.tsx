import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

type CatalogProductCardProps = {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    images: string[];
  };
};

export default function CatalogProductCard({
  product,
}: CatalogProductCardProps) {
  return (
    <Link
      href={`/producto/${product.id}`}
      className="group block overflow-hidden rounded-xl border border-white/10 bg-[#111111] transition-all duration-300 hover:-translate-y-1 hover:border-yellow-400/50 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
    >
      {/* Imagen */}

      <div className="relative aspect-square overflow-hidden">

        {/* Fondo */}

        <Image
          src="/fondo-gorras-catalogo.png"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-cover"
        />

        {/* Gorra  hover scale para zoom*/}

        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 25vw"
          className="object-contain p-0 scale-100 transition-transform duration-500 group-hover:scale-115 sm:p-3"
        />

      </div>

    {/* INFORMACIÓN */}

      <div className="p-2 sm:p-3 md:p-4">

        {/* Marca */}

        <p
          className={`
            ${bebas.className}
            mb-1
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-yellow-400
            sm:text-xs
          `}
        >
          {product.brand}
        </p>


        {/* Nombre */}

        <h2
          className={`
            ${bebas.className}
            text-lg
            uppercase
            leading-tight
            tracking-wide
            text-white
            sm:text-xl
            md:text-2xl
          `}
        >
          {product.name}
        </h2>


        {/* Precio */}

        <p
          className={`
            ${bebas.className}
            mt-2
            text-xl
            tracking-wide
            text-white
            sm:text-2xl
          `}
        >
          ${product.price.toLocaleString("es-CO")}
        </p>

      </div>

    </Link>
  );
}