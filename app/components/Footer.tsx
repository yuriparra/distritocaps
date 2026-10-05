import Image from "next/image";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">

      {/* =====================================================
          CONTENIDO PRINCIPAL
      ===================================================== */}

      <div
        className="
          mx-auto
          grid
          grid-cols-2
          gap-x-5
          gap-y-5
          px-5
          py-5

          md:max-w-7xl
          md:grid-cols-[1.35fr_1fr_1fr_1.15fr]
          md:gap-8
          md:px-6
          md:py-10
        "
      >

        {/* =================================================
            DISTRITOCAPS
        ================================================= */}

        <div className="col-span-2 md:col-span-1">

          <div className="flex items-center gap-3 md:gap-4">

            <Image
              src="/logo.png"
              alt="DistritoCaps"
              width={52}
              height={52}
              className="
                object-contain

                md:-mt-4
                md:h-[65px]
                md:w-[65px]
              "
            />

            <h2
              className={`
                ${bebas.className}
                text-2xl
                tracking-wide

                md:-mt-8
                md:text-3xl
              `}
            >
              DISTRITO
              <span className="text-yellow-400">
                CAPS
              </span>
            </h2>

          </div>

          {/* Descripción */}

          <p
            className="
              mt-2
              text-xs
              leading-5
              text-gray-400

              md:mt-4
              md:text-sm
              md:leading-6
            "
          >
            Estilo urbano. Autenticidad real.
            <br />
            Somos DistritoCaps.
          </p>

        </div>

        {/* =================================================
            TIENDA
        ================================================= */}

        <div>

          <h3
            className="
              text-xs
              font-semibold
              uppercase

              md:text-sm
            "
          >
            Tienda
          </h3>

          <ul
            className="
              mt-2
              space-y-1
              text-xs
              leading-5
              text-gray-400

              md:mt-4
              md:space-y-2
              md:text-sm
            "
          >
            <li>Catálogo</li>
            <li>Colecciones</li>
            <li>Productos de calidad</li>
            <li>Ofertas</li>
          </ul>

        </div>

        {/* =================================================
            INFORMACIÓN
        ================================================= */}

        <div>

          <h3
            className="
              text-xs
              font-semibold
              uppercase

              md:text-sm
            "
          >
            Información
          </h3>

          <ul
            className="
              mt-2
              space-y-1
              text-xs
              leading-5
              text-gray-400

              md:mt-4
              md:space-y-2
              md:text-sm
            "
          >
            <li>Nosotros</li>
            <li>Envíos y entregas</li>
            <li>Cambios y devoluciones</li>
            <li>Términos y condiciones</li>
          </ul>

        </div>

        {/* =================================================
            CONTACTO
        ================================================= */}

        <div className="col-span-2 md:col-span-1">

          <h3
            className="
              text-xs
              font-semibold
              uppercase

              md:text-sm
            "
          >
            Contacto
          </h3>

          <ul
            className="
              mt-2
              space-y-1
              text-xs
              leading-5
              text-gray-400

              md:mt-4
              md:space-y-3
              md:text-sm
            "
          >
            <li>300 765 7164</li>
            <li>@distritocaps_co</li>
            <li>Bogotá, Colombia</li>
          </ul>

        </div>

      </div>

      {/* =====================================================
          COPYRIGHT
      ===================================================== */}

      <div
        className="
          border-t
          border-white/10
          px-5
          py-3
          text-center
          text-[11px]
          text-gray-500

          md:px-6
          md:py-5
          md:text-sm
        "
      >
        © 2026 DistritoCaps.
      </div>

    </footer>
  );
}