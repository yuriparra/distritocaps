"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import { useState } from "react";
import { Bebas_Neue } from "next/font/google";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

type ProductContentProps = {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    description: string;
    category: string;
    stock: number;
    active: boolean;
    images: string[];
  };
};

export default function ProductContent({
  product,
}: ProductContentProps) {

  // Solamente utilizamos las 3 imágenes oficiales
  const images = product.images.slice(0, 3);

  // Selección de imagen para escritorio
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const selectedImage = images[selectedImageIndex];

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ==========================================
          NAVBAR
      ========================================== */}

      <div className="sticky top-0 z-50">
        <Navbar />
      </div>


      {/* ==========================================
          CONTENIDO DEL PRODUCTO
      ========================================== */}

      <main className="px-6 py-8">

        {/* ==========================================
            BREADCRUMB
        ========================================== */}

        <div
          className={`${bebas.className} mb-6 text-xs uppercase tracking-[0.15em] text-gray-400`}
        >
          Inicio

          <span className="mx-2">
            ›
          </span>

          Catálogo

          <span className="mx-2">
            ›
          </span>

          <span className="text-yellow-400">
            {product.name}
          </span>
        </div>


        {/* ==========================================
            PRODUCTO
        ========================================== */}

        <div className="grid gap-6 md:grid-cols-[70px_1fr_1fr]">


          {/* =====================================================
              MINIATURAS DE ESCRITORIO
          ===================================================== */}

          <div
            className="
              order-2
              hidden
              w-[70px]
              flex-col
              gap-3
              md:flex
              md:order-1
            "
          >

            {images.map((image, index) => (

              <button
                key={`${product.id}-desktop-${index}`}
                type="button"
                onClick={() => setSelectedImageIndex(index)}
                aria-label={`Ver imagen ${index + 1}`}
                className={`
                  relative
                  h-20
                  w-16
                  shrink-0
                  cursor-pointer
                  overflow-hidden
                  rounded-lg
                  border
                  bg-black
                  transition-all

                  ${
                    selectedImageIndex === index
                      ? "border-yellow-400"
                      : "border-white/10 hover:border-white/40"
                  }
                `}
              >

                <Image
                  src={image}
                  alt={`${product.name} vista ${index + 1}`}
                  fill
                  sizes="64px"
                  draggable={false}
                  className="
                    pointer-events-none
                    select-none
                    object-contain
                  "
                />

              </button>

            ))}

          </div>


          {/* =====================================================
              IMAGEN PRINCIPAL DE ESCRITORIO
          ===================================================== */}

          <div
            className="
              order-1
              hidden
              md:order-2
              md:block
            "
          >

            <div
              className="
                group
                relative
                aspect-square
                overflow-hidden
                rounded-xl
              "
            >

              {/* Fondo */}

              <Image
                src="/fondo-gorras.png"
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="
                  pointer-events-none
                  select-none
                  object-cover
                "
              />


              {/* Gorra con efecto zoom */}

              <Image
                key={selectedImage}
                src={selectedImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                draggable={false}
                className="
                  pointer-events-none
                  select-none
                  object-contain
                  p-4
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:scale-[1.1]
                "
              />

            </div>

          </div>


          {/* =====================================================
              CARRUSEL MÓVIL
          ===================================================== */}

          <div
            className="
              order-1
              block
              min-w-0
              md:hidden
            "
          >

            {/* Área deslizable */}

            <div
              className="
                flex
                w-full
                snap-x
                snap-mandatory
                overflow-x-auto
                overscroll-x-contain
                touch-pan-x
                [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >

              {images.map((image, index) => (

                <div
                  key={`${product.id}-mobile-slide-${index}`}
                  className="
                    relative
                    min-w-full
                    shrink-0
                    snap-center
                  "
                >

                  <div
                    className="
                      relative
                      aspect-square
                      overflow-hidden
                      rounded-xl
                    "
                  >

                    {/* Fondo */}

                    <Image
                      src="/fondo-gorras.png"
                      alt=""
                      fill
                      sizes="100vw"
                      className="
                        pointer-events-none
                        select-none
                        object-cover
                      "
                    />


                    {/* Gorra */}

                    <Image
                      src={image}
                      alt={`${product.name} vista ${index + 1}`}
                      fill
                      sizes="100vw"
                      draggable={false}
                      className="
                        pointer-events-none
                        select-none
                        object-contain
                        p-4
                      "
                    />

                  </div>

                </div>

              ))}

            </div>


            {/* Miniaturas móviles */}

            <div
              className="
                mt-4
                flex
                justify-center
                gap-3
              "
            >

              {images.map((image, index) => (

                <div
                  key={`${product.id}-mobile-thumb-${index}`}
                  className="
                    relative
                    h-16
                    w-14
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    border
                    border-white/10
                    bg-black
                  "
                >

                  <Image
                    src={image}
                    alt={`${product.name} vista ${index + 1}`}
                    fill
                    sizes="56px"
                    draggable={false}
                    className="
                      pointer-events-none
                      select-none
                      object-contain
                    "
                  />

                </div>

              ))}

            </div>

          </div>


          {/* =====================================================
              INFORMACIÓN DEL PRODUCTO
          ===================================================== */}

          <div
            className="
              order-3
              flex
              flex-col
              justify-center
            "
          >

            {/* Marca */}

            <p
              className={`
                ${bebas.className}
                text-sm
                uppercase
                tracking-[0.2em]
                text-yellow-400
              `}
            >
              {product.brand}
            </p>


            {/* Nombre */}

            <h1
              className={`
                ${bebas.className}
                mt-3
                text-4xl
                uppercase
                tracking-wide
                text-white
                md:text-5xl
              `}
            >
              {product.name}
            </h1>


            {/* Precio */}

            <p
              className={`
                ${bebas.className}
                mt-4
                text-3xl
                tracking-wide
                text-white
              `}
            >
              ${product.price.toLocaleString("es-CO")}
            </p>


            {/* Separador */}

            <div className="my-6 h-px bg-white/10" />


            {/* Descripción */}

            <p className="leading-7 text-gray-400">
              {product.description}
            </p>


            {/* Comprar */}

            <a
            href={`https://wa.me/573007657164?text=${encodeURIComponent(
              `Hola, estoy interesado en la gorra ${product.name}. Precio: $${product.price.toLocaleString(
                "es-CO"
              )}. Quisiera más información para realizar la compra.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${bebas.className}
              mt-8
              flex
              w-full
              items-center
              justify-center
              bg-yellow-400
              px-6
              py-4
              text-lg
              uppercase
              tracking-wider
              text-black
              transition
              hover:bg-yellow-300
            `}
          >
            Comprar ahora
          </a>

          </div>

        </div>

      </main>

    </div>
  );
}