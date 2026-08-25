import Image from "next/image";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">

      {/* Contenido principal */}
      <div className="mx-auto grid grid-cols-2 gap-x-6 gap-y-8 px-5 py-8 md:mx-auto md:max-w-7xl md:grid-cols-[1.35fr_1fr_1fr_1.15fr] md:gap-8 md:px-6 md:py-10">

        {/* DistritoCaps */}
        <div className="col-span-2 md:col-span-1">
        <div className="flex items-center gap-4">
            <Image
            src="/logo.png"
            alt="DistritoCaps"
            width={65}
            height={65}
            className="object-contain -mt-4"
            />

            <h2 className={`${bebas.className} -mt-8 text-3xl tracking-wide`}>
            DISTRITO<span className="text-yellow-400">CAPS</span>
            </h2>
        </div>

        <p className="mt-4 text-sm leading-6 text-gray-400">
            Estilo urbano. Autenticidad real.
            <br />
            Somos DistritoCaps.
        </p>
        </div>

        {/* Tienda */}
        <div>
          <h3 className="text-sm font-semibold uppercase">
            Tienda
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li>Catálogo</li>
            <li>Colecciones</li>
            <li>Productos de calidad</li>
            <li>Ofertas</li>
          </ul>
        </div>

        {/* Información */}
        <div>
          <h3 className="text-sm font-semibold uppercase">
            Información
          </h3>

          <ul className="mt-4 space-y-2 text-sm text-gray-400">
            <li>Nosotros</li>
            <li>Envíos y entregas</li>
            <li>Cambios y devoluciones</li>
            <li>Términos y condiciones</li>
          </ul>
        </div>


        {/* Contacto */}
        {/* Contacto */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-sm font-semibold uppercase">
            Contacto
          </h3>

          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <li>300 765 7164</li>
            <li>@distritocaps_co</li>
            <li>Bogotá, Colombia</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 px-6 py-5 text-center text-sm text-gray-500">
        © 2026 DistritoCaps.
      </div>

    </footer>
  );
}