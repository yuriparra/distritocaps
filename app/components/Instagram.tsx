import Image from "next/image";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function Instagram() {
  return (
    <section className="px-6 py-8 md:px-10">
      <div className="relative mx-auto max-w-7xl overflow-hidden">

        {/* Imagen */}
        <Image
          src="/instagram-banner.png"
          alt="DistritoCaps en Bogotá"
          width={1920}
          height={300}
          className="h-auto w-full"
        />

        {/* Título */}
        <div className="absolute left-4 top-2 md:left-6 md:top-3">
          <p
            className={`${bebas.className} text-xs tracking-wide text-yellow-400 md:text-sm`}
          >
            SÍGUENOS EN INSTAGRAM
          </p>
        </div>

        {/* Usuario */}
        <div className="absolute right-4 top-2 md:right-6 md:top-3">
          <p className="text-[9px] text-gray-300 md:text-xs">
            @DISTRITOCAPS_CO
          </p>
        </div>

      </div>
    </section>
  );
}