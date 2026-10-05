import Image from "next/image";
import Link from "next/link";
import { Bebas_Neue } from "next/font/google";

// Configuramos la fuente
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

// Componente principal de la sección Hero
export default function Hero() {
  return (
    <section className="relative h-[520px] w-full overflow-hidden md:h-[650px]">

      {/* Imagen principal de Bogotá */}
      <Image
        src="/hero-bogota.png"
        alt="Bogotá de noche"
        fill
        priority
        className="pointer-events-none object-cover object-[45%_25%] md:object-[45%_center]"
      />

      {/* Contenido del Hero */}
      <div className="absolute inset-0 flex items-center">

        {/* Bloque de texto */}
        <div className="ml-6 max-w-[300px] text-white sm:ml-10 sm:max-w-md md:ml-16 md:max-w-xl">

          {/* Texto pequeño */}
          <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.25em] text-yellow-400 sm:text-xs md:mb-3 md:tracking-[0.3em]">
            Estilo que representa
          </p>

          {/* Título principal */}
          <h1
            className={`${bebas.className} text-6xl tracking-wide text-white sm:text-7xl md:text-9xl`}
          >
            BOGOTÁ
          </h1>

          {/* Subtítulo */}
          <p
            className={`${bebas.className} mt-1 text-2xl uppercase tracking-[0.3em] sm:text-3xl md:mt-2 md:tracking-[0.35em]`}
          >
            CAP COLLECTION
          </p>

          {/* Descripción */}
          <p className="mt-4 max-w-[260px] text-xs leading-5 text-gray-300 sm:text-sm md:mt-6 md:max-w-md md:text-base md:leading-7">
            Estilo urbano y autenticidad en cada detalle.
          </p>

          {/* Botón */}
          <Link
            href="/catalogo"
            className="mt-4 inline-flex items-center gap-5 bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-gray-200 sm:px-6 sm:py-3 sm:text-sm md:mt-6"
          >
            COMPRAR AHORA

            <span className="text-lg">→</span>
          </Link>

        </div>

      </div>

    </section>
  );
}