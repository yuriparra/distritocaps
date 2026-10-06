import { Bebas_Neue } from "next/font/google";
import { Menu, User } from "lucide-react";

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
      href: "/catalogo",
    },
    {
      name: "Contacto",
      href: "/contacto",
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

          {/* LOGO */}

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


          {/* NOMBRE */}

          <span
            className={`
              ${bebas.className}
              ml-2
              block
              whitespace-nowrap
              text-2xl
              tracking-wide
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
            ACCESO ADMINISTRADOR - ESCRITORIO
        ================================================= */}

        <a
          href="/admin"
          aria-label="Acceso administrador"
          title="Acceso administrador"
          className="
            ml-auto
            hidden
            h-10
            w-10
            items-center
            justify-center
            text-white
            transition-colors
            duration-200
            hover:text-yellow-400
            md:flex
          "
        >
          <User className="h-5 w-5" />
        </a>


        {/* ================================================
            MENÚ MÓVIL
        ================================================= */}

        <div className="ml-auto md:hidden">

          <details className="relative">

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
                transition-colors
                hover:text-yellow-400
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

              <a
                href="/admin"
                className="
                  flex
                  items-center
                  gap-3
                  border-t
                  border-white/10
                  py-4
                  text-sm
                  text-white
                  transition-colors
                  hover:text-yellow-400
                "
              >
                <User className="h-5 w-5" />
                <span>Acceso administrador</span>
              </a>

            </div>

            </div>

          </details>

        </div>

      </div>

    </nav>
  );
}