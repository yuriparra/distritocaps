import Image from "next/image";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function Novedades() {
  return (
    <section className="px-6 py-10 md:px-10">
      <div className="relative mx-auto h-[180px] md:h-[220px] max-w-7xl overflow-hidden rounded-xl">

        {/* Imagen de fondo */}
        <Image
          src="/banner-novedades.png"
          alt="Novedades DistritoCaps"
          fill
          className="object-cover"
        />

        {/* Contenido */}
        <div className="absolute inset-0 flex items-center justify-end">
          <div className="mr-8 max-w-md text-white md:mr-16">

            {/* Título pequeño */}
            <p
              className={`${bebas.className} mb-2 text-sm tracking-[0.25em] text-yellow-400`}
            >
              NOVEDADES
            </p>

            {/* Título principal */}
            <h2
              className={`${bebas.className} text-3xl uppercase leading-none tracking-wide md:text-5xl`}
            >
              EXCLUSIVAS.
              <br />
              URBANAS. ICÓNICAS.
            </h2>

            {/* Descripción */}
            <p className="mt-3 text-xs text-gray-300 md:text-sm">
              Descubre nuestra selección de gorras.
            </p>

          </div>
        </div>

      </div>
    </section>
  );
}