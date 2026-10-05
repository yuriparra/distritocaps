import { Bebas_Neue } from "next/font/google";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import { MapPin, ArrowRight } from "lucide-react";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});


export default function ContactHero() {
  return (
    <section className="relative h-[560px] overflow-hidden bg-black md:h-[650px]">

      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 bg-cover"
        style={{
            backgroundImage: "url('/contacto-bogota.png')",
            backgroundPosition: "100% center",
        }}
        />

      {/* Degradado oscuro */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/10" />

      {/* Contenido */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 md:px-10">

        <div className="max-w-xl">

          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-yellow-400">
            Contacto
          </p>

          <h1
            className={`${bebas.className} text-5xl leading-[0.9] sm:text-6xl md:text-8xl`}
          >
            HABLEMOS
            <span className="block text-yellow-400">
              DE GORRAS
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-gray-300 md:text-lg">
            ¿Tienes preguntas, quieres hacer un pedido o necesitas más
            información? Estamos aquí para ayudarte.
          </p>

          {/* Opciones de contacto */}

<div className="mt-7 grid grid-cols-3 gap-4 md:mt-10 md:gap-8">

  {/* WhatsApp */}
  <a
    href="https://wa.me/573007657164"
    target="_blank"
    rel="noopener noreferrer"
    className="group"
  >
    <FaWhatsapp className="mb-2 h-6 w-6 text-white md:h-7 md:w-7" />

    <p className={`${bebas.className} text-lg tracking-wide md:text-xl`}>
      WhatsApp
    </p>

    <p className="hidden text-sm text-gray-400 md:block">
      300 765 7164
    </p>

    <ArrowRight className="mt-2 h-4 w-4 text-yellow-400 transition-transform group-hover:translate-x-1" />
  </a>


  {/* Instagram */}
  <a
    href="https://instagram.com/distritocaps_co"
    target="_blank"
    rel="noopener noreferrer"
    className="group"
  >
    <FaInstagram className="mb-2 h-6 w-6 text-white md:h-7 md:w-7" />

    <p className={`${bebas.className} text-lg tracking-wide md:text-xl`}>
      Instagram
    </p>

    <p className="hidden text-sm text-gray-400 md:block">
      @distritocaps_co
    </p>

    <ArrowRight className="mt-2 h-4 w-4 text-yellow-400 transition-transform group-hover:translate-x-1" />
  </a>


  {/* Ubicación */}
  <div>
    <MapPin className="mb-2 h-6 w-6 text-white md:h-7 md:w-7" />

    <p className={`${bebas.className} text-lg tracking-wide md:text-xl`}>
      Ubicación
    </p>

    <p className="hidden text-sm text-gray-400 md:block">
      Bogotá, Colombia
    </p>
  </div>

</div>

        </div>

      </div>

    </section>
  );
}