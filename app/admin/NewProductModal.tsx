"use client";

// ======================================================
// IMPORTACIONES
// ======================================================

// useState:
// Controla los estados del formulario y las imágenes.

import { useState } from "react";

// useRouter:
// Nos permitirá actualizar el panel después de guardar
// correctamente una nueva gorra.

import { useRouter } from "next/navigation";

// Iconos utilizados por el formulario.

import { X, ImagePlus } from "lucide-react";

// Cliente de Supabase:
// Lo utilizaremos para subir las fotografías a Storage
// y posteriormente crear el producto.

import { createClient } from "@/utils/supabase/client";


// ======================================================
// PROPIEDADES DEL COMPONENTE
// ======================================================

// El componente recibe una función "onClose".
// ProductsManager la utilizará para cerrar el formulario.
type NewProductModalProps = {
  onClose: () => void;
};


// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export default function NewProductModal({
  onClose,
}: NewProductModalProps) {
   
      // ====================================================
  // VISTAS PREVIAS DE LAS IMÁGENES
  // ====================================================

  // Aquí guardamos temporalmente la dirección local
  // de cada fotografía seleccionada.
  //
  // Todavía NO estamos subiendo las imágenes a Supabase.

  // ======================================================
// CONEXIÓN CON NEXT.JS Y SUPABASE
// ======================================================

// Router de Next.js.
// Más adelante utilizaremos router.refresh() para que
// el panel muestre inmediatamente el producto creado.

const router = useRouter();

// Creamos el cliente que se comunicará con Supabase.

const supabase = createClient();

  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [preview3, setPreview3] = useState<string | null>(null);

  // ======================================================
// ESTADO DEL PROCESO DE GUARDADO
// ======================================================

// Indica si la gorra se está guardando.
// Más adelante permitirá mostrar "GUARDANDO..."
// y evitar varios clics sobre el botón.
const [isSaving, setIsSaving] = useState(false);

// Guarda un mensaje si ocurre algún problema
// durante el proceso.
const [error, setError] = useState("");


  // ====================================================
  // GENERAR VISTA PREVIA
  // ====================================================

  function createPreview(
    file: File | undefined,
    setPreview: (value: string) => void
  ) {
    // Si el usuario no seleccionó ningún archivo,
    // simplemente no hacemos nada.
    if (!file) return;

    // Creamos una dirección temporal para poder mostrar
    // la fotografía antes de subirla a Supabase.
    const imageUrl = URL.createObjectURL(file);

    setPreview(imageUrl);
  }

// ======================================================
// SUBIR UNA IMAGEN A SUPABASE STORAGE
// ======================================================

// Esta función recibe una fotografía seleccionada
// y la guarda dentro del bucket "product-images".
//
// Al finalizar devuelve la URL pública de la imagen,
// que posteriormente guardaremos en la tabla products.

async function uploadImage(file: File) {

  // ----------------------------------------------------
  // 1. CREAR UN NOMBRE ÚNICO PARA EL ARCHIVO
  // ----------------------------------------------------

  // Obtenemos la extensión original:
  // jpg, png, webp, etc.

  const fileExtension = file.name.split(".").pop();

  // Creamos un nombre prácticamente irrepetible.
  // Ejemplo:
  // 1728349212345-a8d31f.jpg

  const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

  // Guardaremos todas las imágenes de productos
  // dentro de esta carpeta del bucket.

  const filePath = `products/${fileName}`;


  // ----------------------------------------------------
  // 2. SUBIR EL ARCHIVO
  // ----------------------------------------------------

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });


  // ----------------------------------------------------
  // 3. COMPROBAR SI HUBO UN ERROR
  // ----------------------------------------------------

  if (uploadError) {
    throw new Error(
      `Error al subir la imagen: ${uploadError.message}`
    );
  }


  // ----------------------------------------------------
  // 4. OBTENER LA URL PÚBLICA
  // ----------------------------------------------------

  // Nuestro bucket product-images es público,
  // por eso podemos generar una URL que luego podrá
  // utilizar la tienda para mostrar la fotografía.

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);


  // ----------------------------------------------------
  // 5. DEVOLVER LA URL
  // ----------------------------------------------------

  return data.publicUrl;
}

// ======================================================
// GUARDAR NUEVA GORRA
// ======================================================

// Esta función se ejecutará cuando presionemos
// el botón "Guardar gorra".
async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  // Evitamos que el navegador recargue toda la página.
  event.preventDefault();

  // Limpiamos errores anteriores e indicamos
  // que comenzó el proceso de guardado.
  setError("");
  setIsSaving(true);

  try {
    // ==================================================
    // 1. OBTENER LOS DATOS DEL FORMULARIO
    // ==================================================

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();

    const brand = String(
      formData.get("brand") ?? ""
    ).trim();

    const description = String(
      formData.get("description") ?? ""
    ).trim();

    const price = Number(formData.get("price"));

    const available =
      formData.get("available") === "true";


    // ==================================================
    // 2. OBTENER LAS TRES IMÁGENES
    // ==================================================

    const image1 = formData.get("image_1");
    const image2 = formData.get("image_2");
    const image3 = formData.get("image_3");


    // ==================================================
    // 3. VALIDAR LOS DATOS
    // ==================================================

    if (!name || !brand || !description) {
      throw new Error(
        "Completa el nombre, la marca y la descripción."
      );
    }

    if (!Number.isFinite(price) || price <= 0) {
      throw new Error(
        "Ingresa un precio válido."
      );
    }

    if (
      !(image1 instanceof File) ||
      image1.size === 0 ||
      !(image2 instanceof File) ||
      image2.size === 0 ||
      !(image3 instanceof File) ||
      image3.size === 0
    ) {
      throw new Error(
        "Debes seleccionar las 3 imágenes de la gorra."
      );
    }


    // ==================================================
    // 4. SUBIR LAS TRES IMÁGENES
    // ==================================================

    const imageUrl1 = await uploadImage(image1);
    const imageUrl2 = await uploadImage(image2);
    const imageUrl3 = await uploadImage(image3);


    // ==================================================
    // 5. CREAR EL PRODUCTO EN SUPABASE
    // ==================================================

    const { error: insertError } = await supabase
      .from("products")
      .insert({
        name,
        brand,
        price,
        description,
        available,
        image_1: imageUrl1,
        image_2: imageUrl2,
        image_3: imageUrl3,
      });

    if (insertError) {
      throw new Error(
        `No se pudo guardar la gorra: ${insertError.message}`
      );
    }


    // ==================================================
    // 6. ACTUALIZAR EL PANEL
    // ==================================================

    // Cerramos el formulario.
    onClose();

    // Hacemos que /admin vuelva a consultar Supabase.
    router.refresh();

  } catch (err) {
    // ==================================================
    // MANEJO DE ERRORES
    // ==================================================

    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError(
        "Ocurrió un error inesperado al guardar la gorra."
      );
    }

  } finally {
    // Terminó el proceso de guardado.
    setIsSaving(false);
  }
}

  return (
    // ==================================================
    // FONDO OSCURO DEL MODAL
    // ==================================================

    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

      {/* ================================================
          VENTANA DEL FORMULARIO
      ================================================= */}

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1216] shadow-2xl">

        {/* ================================================
            ENCABEZADO
        ================================================= */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0d1216] px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Nueva gorra
            </h2>

            <p className="mt-1 text-sm text-white/50">
              Agrega un nuevo producto al catálogo
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar formulario"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>


       {/* ======================================================
            FORMULARIO DE NUEVA GORRA
        ====================================================== */}

        <form
        onSubmit={handleSubmit}
        className="space-y-7 p-6"
>

          {/* ==============================================
              INFORMACIÓN PRINCIPAL
          =============================================== */}

          <div className="grid gap-5 md:grid-cols-2">

            {/* Nombre */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-white"
              >
                Nombre
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Ej: Vikings Purple & White"
                className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400"
              />
            </div>


            {/* Marca */}
            <div>
              <label
                htmlFor="brand"
                className="mb-2 block text-sm font-medium text-white"
              >
                Marca
              </label>

              <input
                id="brand"
                name="brand"
                type="text"
                placeholder="Ej: 47 BRAND"
                className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400"
              />
            </div>


            {/* Precio */}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-white"
              >
                Precio
              </label>

              <input
                id="price"
                name="price"
                type="number"
                min="0"
                placeholder="Ej: 60000"
                className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400"
              />
            </div>


            {/* Disponibilidad */}
            <div>
              <label
                htmlFor="available"
                className="mb-2 block text-sm font-medium text-white"
              >
                Estado
              </label>

              <select
                id="available"
                name="available"
                defaultValue="true"
                className="h-12 w-full rounded-xl border border-white/10 bg-[#10161a] px-4 text-white outline-none transition focus:border-yellow-400"
              >
                <option value="true">
                  Disponible
                </option>

                <option value="false">
                  No disponible
                </option>
              </select>
            </div>
          </div>


          {/* ==============================================
              DESCRIPCIÓN
          =============================================== */}

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-white"
            >
              Descripción
            </label>

            <textarea
              id="description"
              name="description"
              rows={5}
              placeholder="Describe la gorra, colores, diseño y detalles..."
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition placeholder:text-white/30 focus:border-yellow-400"
            />
          </div>


          {/* ==============================================
              IMÁGENES DEL PRODUCTO
          =============================================== */}

          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-white">
                Imágenes
              </h3>

              <p className="mt-1 text-sm text-white/45">
                Selecciona las 3 fotografías de la gorra
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">

             {/* ==================================================
                    IMAGEN 1 - FOTOGRAFÍA PRINCIPAL
                ================================================== */}

                <label className="group relative flex min-h-36 cursor-pointer overflow-hidden rounded-xl border border-dashed border-white/20 bg-black/20 transition hover:border-yellow-400">

                {/* Si ya seleccionamos una imagen, mostramos la vista previa */}
                {preview1 ? (
                    <img
                    src={preview1}
                    alt="Vista previa imagen principal"
                    className="absolute inset-0 h-full w-full object-cover"
                    />
                ) : (
                    // Si todavía no hay imagen, mostramos el selector normal
                    <div className="flex w-full flex-col items-center justify-center p-4 text-center">
                    <ImagePlus className="mb-3 h-7 w-7 text-white/40 transition group-hover:text-yellow-400" />

                    <span className="text-sm font-medium text-white">
                        Imagen 1
                    </span>

                    <span className="mt-1 text-xs text-white/40">
                        Principal
                    </span>
                    </div>
                )}

                {/* Input real del archivo */}
                <input
                        name="image_1"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) =>
                    createPreview(
                        e.target.files?.[0],
                        setPreview1
                    )
                    }
                />
                </label>


           {/* ==================================================
            IMAGEN 2 - VISTA ADICIONAL
            ================================================== */}

            <label className="group relative flex min-h-36 cursor-pointer overflow-hidden rounded-xl border border-dashed border-white/20 bg-black/20 transition hover:border-yellow-400">

            {/* Vista previa de la segunda fotografía */}
            {preview2 ? (
                <img
                src={preview2}
                alt="Vista previa imagen 2"
                className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <div className="flex w-full flex-col items-center justify-center p-4 text-center">
                <ImagePlus className="mb-3 h-7 w-7 text-white/40 transition group-hover:text-yellow-400" />

                <span className="text-sm font-medium text-white">
                    Imagen 2
                </span>

                <span className="mt-1 text-xs text-white/40">
                    Vista adicional
                </span>
                </div>
            )}

            {/* Archivo seleccionado */}
            <input
                name="image_2"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) =>
                createPreview(
                    e.target.files?.[0],
                    setPreview2
                )
                }
            />
            </label>

              {/* ==================================================
                 IMAGEN 3 - VISTA ADICIONAL
            ================================================== */}

            <label className="group relative flex min-h-36 cursor-pointer overflow-hidden rounded-xl border border-dashed border-white/20 bg-black/20 transition hover:border-yellow-400">

            {/* Vista previa de la tercera fotografía */}
            {preview3 ? (
                <img
                src={preview3}
                alt="Vista previa imagen 3"
                className="absolute inset-0 h-full w-full object-cover"
                />
            ) : (
                <div className="flex w-full flex-col items-center justify-center p-4 text-center">
                <ImagePlus className="mb-3 h-7 w-7 text-white/40 transition group-hover:text-yellow-400" />

                <span className="text-sm font-medium text-white">
                    Imagen 3
                </span>

                <span className="mt-1 text-xs text-white/40">
                    Vista adicional
                </span>
                </div>
            )}

            {/* Archivo seleccionado */}
            <input
                name="image_3"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) =>
                createPreview(
                    e.target.files?.[0],
                    setPreview3
                )
                }
            />
            </label>
            </div>
          </div>

        
          {/* ==================================================
                MENSAJE DE ERROR
            ================================================== */}

            {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                <p className="text-sm text-red-400">
                {error}
                </p>
            </div>
            )}


          {/* ==============================================
              BOTONES DEL FORMULARIO
          =============================================== */}
          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">

            {/* Cancelar */}
            <button
              type="button"
              onClick={onClose}
              className="h-12 rounded-xl border border-white/15 px-6 font-semibold text-white transition hover:bg-white/5"
            >
              Cancelar
            </button>


            {/* ==================================================
                BOTÓN GUARDAR
            ================================================== */}

            <button
            type="submit"
            disabled={isSaving}
            className="
                h-12
                rounded-xl
                bg-yellow-400
                px-7
                font-bold
                text-black
                transition
                hover:bg-yellow-300
                disabled:cursor-not-allowed
                disabled:opacity-50
            "
            >
            {isSaving ? "Guardando..." : "Guardar gorra"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}