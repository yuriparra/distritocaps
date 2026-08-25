import Image from "next/image";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function CatalogHero() {
  return (
    <section className="px-6 py-8 md:px-10">

      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-xl">

        <Image
          src="/catalogo-fondo.png"
          alt="Catálogo DistritoCaps"
          width={1920}
          height={500}
          priority
          className="h-[220px] w-full object-cover md:h-[300px]"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

        <div className="absolute inset-0 flex items-center">

          <div className="px-6 md:px-10">

            <p
              className={`${bebas.className} text-sm tracking-[0.2em] text-yellow-400 md:text-base`}
            >
              CATÁLOGO
            </p>

            <h1
              className={`${bebas.className} mt-2 text-4xl uppercase tracking-wide text-white md:text-6xl`}
            >
              TODAS LAS GORRAS
            </h1>

            <p className="mt-3 max-w-md text-xs leading-5 text-gray-300 md:text-sm md:leading-6">
              Explora nuestra colección completa de gorras urbanas.
              <br className="hidden md:block" />
              Estilo, autenticidad y calidad en cada detalle.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}