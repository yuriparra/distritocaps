import { Bebas_Neue } from "next/font/google";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
} from "lucide-react";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function Navbar() {
  const menu = [
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Catálogo",
      href: "/catalogo",
    },
    {
      name: "Colecciones",
      href: "#",
    },
    {
      name: "Accesorios",
      href: "#",
    },
    {
      name: "Contacto",
      href: "#",
    },
  ];

  return (
    <nav className="relative z-[100] w-full bg-black text-white">

      {/* ================================================
          CONTENEDOR PRINCIPAL
      ================================================= */}

      <div className="flex h-20 items-center px-4 md:px-8">

        {/* ================================================
            LOGO + NOMBRE DISTRITOCAPS
        ================================================= */}

        <a
          href="/"
          aria-label="DistritoCaps - Inicio"
          className="flex shrink-0 items-center"
        >

          <img
            src="/logo.png"
            alt="Logo de DistritoCaps"
            className="
              h-14
              w-14
              object-contain
              sm:h-16
              sm:w-16
              md:h-20
              md:w-20
            "
          />

          <span
            className={`
              ${bebas.className}
              ml-2
              hidden
              text-2xl
              tracking-wide
              sm:block
              md:text-3xl
            `}
          >
            <span className="text-white">
              DISTRITO
            </span>

            <span className="text-yellow-400">
              CAPS
            </span>
          </span>

        </a>


        {/* ================================================
            MENÚ ESCRITORIO
        ================================================= */}

        <div className="ml-8 hidden items-center gap-7 md:flex">

          {menu.map((item) => (
            <a
              href={item.href}
              key={item.name}
              className="
                group
                relative
                whitespace-nowrap
                text-sm
                text-gray-200
                transition-colors
                duration-200
                hover:text-yellow-400
              "
            >

              {item.name}

              {/* Línea amarilla al pasar el mouse */}

              <span
                className="
                  pointer-events-none
                  absolute
                  -bottom-2
                  left-0
                  h-[2px]
                  w-full
                  origin-center
                  scale-x-0
                  bg-yellow-400
                  transition-transform
                  duration-200
                  group-hover:scale-x-100
                "
              />

            </a>
          ))}

        </div>


        {/* ================================================
            ICONOS
        ================================================= */}

        <div className="ml-auto flex items-center gap-1 sm:gap-2 md:gap-4">

          {/* BÚSQUEDA */}

          <button
            type="button"
            aria-label="Buscar"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              transition
              hover:text-yellow-400
            "
          >
            <Search className="h-5 w-5" />
          </button>


          {/* USUARIO */}

          <button
            type="button"
            aria-label="Mi cuenta"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              transition
              hover:text-yellow-400
            "
          >
            <User className="h-5 w-5" />
          </button>


          {/* CARRITO */}

          <button
            type="button"
            aria-label="Carrito"
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              transition
              hover:text-yellow-400
            "
          >

            <ShoppingBag className="h-5 w-5" />

            {/* BURBUJA */}

            <span
              className="
                absolute
                right-0
                top-0
                flex
                h-4
                min-w-4
                items-center
                justify-center
                rounded-full
                bg-yellow-400
                px-1
                text-[9px]
                font-bold
                leading-none
                text-black
              "
            >
              0
            </span>

          </button>


          {/* ================================================
              MENÚ MÓVIL
          ================================================= */}

          <details className="relative md:hidden">

            {/* BOTÓN HAMBURGUESA */}

            <summary
              className="
                flex
                h-10
                w-10
                cursor-pointer
                list-none
                items-center
                justify-center
              "
              aria-label="Abrir menú"
            >

              <Menu className="h-6 w-6" />

            </summary>


            {/* MENÚ DESPLEGABLE */}

            <div
              className="
                absolute
                right-0
                top-full
                z-[120]
                mt-2
                w-56
                border
                border-white/10
                bg-black
                shadow-2xl
              "
            >

              <div className="flex flex-col px-6 py-3">

                {menu.map((item) => (
                  <a
                    href={item.href}
                    key={item.name}
                    className="
                      border-b
                      border-white/10
                      py-4
                      text-sm
                      text-white
                      transition-colors
                      hover:text-yellow-400
                      last:border-b-0
                    "
                  >
                    {item.name}
                  </a>
                ))}

              </div>

            </div>

          </details>

        </div>

      </div>

    </nav>
  );
}