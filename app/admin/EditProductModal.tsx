"use client";

// ======================================================
// IMPORTACIONES
// ======================================================

import { useState } from "react";

// Nos permitirá actualizar el panel cuando
// terminemos de editar el producto.
import { useRouter } from "next/navigation";

import { X, ImagePlus } from "lucide-react";

// Cliente de Supabase para actualizar el producto
// y subir nuevas fotografías cuando sea necesario.
import { createClient } from "@/utils/supabase/client";


// ======================================================
// TIPO DE PRODUCTO
// ======================================================

// Representa la información de una gorra
// almacenada actualmente en Supabase.

type Product = {
  id: number;
  created_at: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  available: boolean;
  image_1: string;
  image_2: string;
  image_3: string;
};


// ======================================================
// PROPIEDADES DEL MODAL
// ======================================================

// Recibimos:
// product -> gorra que queremos modificar.
// onClose -> función para cerrar el formulario.

type EditProductModalProps = {
  product: Product;
  onClose: () => void;
};


// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export default function EditProductModal({
  product,
  onClose,
}: EditProductModalProps) {

    // ======================================================
// CONEXIÓN CON NEXT.JS Y SUPABASE
// ======================================================

// Permitirá refrescar /admin después de guardar.
const router = useRouter();

// Cliente que se comunica con Supabase.
const supabase = createClient();


// ======================================================
// ESTADO DEL GUARDADO
// ======================================================

// Nos indica si la actualización está en proceso.
const [isSaving, setIsSaving] = useState(false);

// Aquí mostraremos cualquier error que ocurra.
const [error, setError] = useState("");

   // ======================================================
// VISTA PREVIA DE LA NUEVA IMAGEN 1
// ======================================================

// Al principio mostramos la fotografía que ya está
// guardada en Supabase.
const [preview1, setPreview1] = useState(product.image_1);
// Imágenes 2 y 3.
// Inicialmente muestran las fotografías guardadas en Supabase.

const [preview2, setPreview2] = useState(product.image_2);
const [preview3, setPreview3] = useState(product.image_3);

// ======================================================
// IMÁGENES ANTIGUAS QUE DEBEN ELIMINARSE
// ======================================================

// Estos estados nos permiten saber si una fotografía
// fue reemplazada.
//
// Si permanecen en false, significa que esa imagen
// no fue modificada y NO debemos tocarla en Storage.

const [image1Changed, setImage1Changed] = useState(false);
const [image2Changed, setImage2Changed] = useState(false);
const [image3Changed, setImage3Changed] = useState(false);

// ======================================================
// CAMBIAR IMAGEN 1
// ======================================================

// Cuando el administrador selecciona otra fotografía,
// creamos una vista previa local.
//
// Todavía NO modificamos nada en Supabase.

function changeImage1(file: File | undefined) {
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setPreview1(imageUrl);
  setImage1Changed(true);
} 
// ======================================================
// CAMBIAR IMAGEN 2
// ======================================================

function changeImage2(file: File | undefined) {
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setPreview2(imageUrl);
  setImage2Changed(true);
}


// ======================================================
// CAMBIAR IMAGEN 3
// ======================================================

function changeImage3(file: File | undefined) {
  if (!file) return;

  const imageUrl = URL.createObjectURL(file);

  setPreview3(imageUrl);
  setImage3Changed(true);
}
// ======================================================
// SUBIR UNA NUEVA IMAGEN A SUPABASE
// ======================================================

// Esta función solamente se utilizará cuando el
// administrador haya seleccionado una fotografía nueva.
//
// Si no cambiamos una imagen, conservaremos la URL
// que el producto ya tenía guardada.

async function uploadImage(file: File) {

  // ----------------------------------------------------
  // 1. OBTENER LA EXTENSIÓN
  // ----------------------------------------------------

  // Ejemplos:
  // gorra.jpg  -> jpg
  // foto.webp  -> webp

  const fileExtension = file.name.split(".").pop();


  // ----------------------------------------------------
  // 2. CREAR UN NOMBRE ÚNICO
  // ----------------------------------------------------

  // Evitamos que una nueva fotografía sobrescriba
  // accidentalmente otra existente.

  const fileName =
    `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`;

  const filePath = `products/${fileName}`;


  // ----------------------------------------------------
  // 3. SUBIR LA IMAGEN
  // ----------------------------------------------------

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });


  // ----------------------------------------------------
  // 4. COMPROBAR ERRORES
  // ----------------------------------------------------

  if (uploadError) {
    throw new Error(
      `Error al subir la imagen: ${uploadError.message}`
    );
  }


  // ----------------------------------------------------
  // 5. OBTENER SU URL PÚBLICA
  // ----------------------------------------------------

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);


  // ----------------------------------------------------
  // 6. DEVOLVER LA URL
  // ----------------------------------------------------

  return data.publicUrl;
}

// ======================================================
// OBTENER RUTA DE UNA IMAGEN EN STORAGE
// ======================================================

// En "products" guardamos la URL pública completa:
//
// https://...supabase.co/storage/v1/object/public/
// product-images/products/archivo.jpg
//
// Pero para eliminar un archivo de Storage necesitamos
// únicamente:
//
// products/archivo.jpg
//
// Esta función obtiene esa ruta.

function getStoragePath(imageUrl: string) {
  const marker = "/product-images/";

  const markerPosition = imageUrl.indexOf(marker);

  // Si la URL no tiene el formato esperado,
  // devolvemos null para evitar eliminar algo incorrecto.
  if (markerPosition === -1) {
    return null;
  }

  return decodeURIComponent(
    imageUrl.substring(
      markerPosition + marker.length
    )
  );
}

// ======================================================
// GUARDAR CAMBIOS DEL PRODUCTO
// ======================================================

async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  // Evitamos que el navegador recargue la página.
  event.preventDefault();

  setError("");
  setIsSaving(true);

  try {
    // ==================================================
    // 1. OBTENER LOS DATOS DEL FORMULARIO
    // ==================================================

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(
      formData.get("name") ?? ""
    ).trim();

    const brand = String(
      formData.get("brand") ?? ""
    ).trim();

    const description = String(
      formData.get("description") ?? ""
    ).trim();

    const price = Number(
      formData.get("price")
    );

    const available =
      formData.get("available") === "true";


    // ==================================================
    // 2. VALIDAR LOS DATOS
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


    // ==================================================
    // 3. OBTENER POSIBLES IMÁGENES NUEVAS
    // ==================================================

    const newImage1 = formData.get("image_1");
    const newImage2 = formData.get("image_2");
    const newImage3 = formData.get("image_3");


    // ==================================================
    // 4. CONSERVAR LAS IMÁGENES ACTUALES
    // ==================================================

    // Comenzamos utilizando las URLs que el producto
    // ya tiene guardadas en Supabase.

    let imageUrl1 = product.image_1;
    let imageUrl2 = product.image_2;
    let imageUrl3 = product.image_3;


    // ==================================================
    // 5. REEMPLAZAR SOLO LAS IMÁGENES MODIFICADAS
    // ==================================================

    // Si se seleccionó una nueva Imagen 1,
    // la subimos y sustituimos su URL.

    if (
      newImage1 instanceof File &&
      newImage1.size > 0
    ) {
      imageUrl1 = await uploadImage(newImage1);
    }


    // Imagen 2

    if (
      newImage2 instanceof File &&
      newImage2.size > 0
    ) {
      imageUrl2 = await uploadImage(newImage2);
    }


    // Imagen 3

    if (
      newImage3 instanceof File &&
      newImage3.size > 0
    ) {
      imageUrl3 = await uploadImage(newImage3);
    }


    // ==================================================
    // 6. ACTUALIZAR EL PRODUCTO EN SUPABASE
    // ==================================================

    const { error: updateError } = await supabase
      .from("products")
      .update({
        name,
        brand,
        price,
        description,
        available,
        image_1: imageUrl1,
        image_2: imageUrl2,
        image_3: imageUrl3,
      })
      .eq("id", product.id);


    // ==================================================
    // 7. COMPROBAR EL RESULTADO
    // ==================================================

    if (updateError) {
      throw new Error(
        `No se pudo actualizar la gorra: ${updateError.message}`
      );
    }

    // ==================================================
// 8. ELIMINAR LAS IMÁGENES ANTIGUAS REEMPLAZADAS
// ==================================================

// Aquí guardaremos únicamente las fotografías antiguas
// que realmente fueron sustituidas por una nueva.

const oldImagePaths: string[] = [];


// --------------------------------------------------
// IMAGEN 1
// --------------------------------------------------

if (image1Changed) {
  const oldPath = getStoragePath(product.image_1);

  if (oldPath) {
    oldImagePaths.push(oldPath);
  }
}


// --------------------------------------------------
// IMAGEN 2
// --------------------------------------------------

if (image2Changed) {
  const oldPath = getStoragePath(product.image_2);

  if (oldPath) {
    oldImagePaths.push(oldPath);
  }
}


// --------------------------------------------------
// IMAGEN 3
// --------------------------------------------------

if (image3Changed) {
  const oldPath = getStoragePath(product.image_3);

  if (oldPath) {
    oldImagePaths.push(oldPath);
  }
}


// --------------------------------------------------
// BORRAR ARCHIVOS ANTIGUOS DE STORAGE
// --------------------------------------------------

// Solo hacemos la petición si realmente existe
// alguna fotografía antigua para eliminar.

if (oldImagePaths.length > 0) {
  const { error: storageDeleteError } =
    await supabase.storage
      .from("product-images")
      .remove(oldImagePaths);

  if (storageDeleteError) {
    throw new Error(
      `El producto fue actualizado, pero no se pudieron eliminar las imágenes antiguas: ${storageDeleteError.message}`
    );
  }
}


// ==================================================
// 9. CERRAR Y ACTUALIZAR EL PANEL
// ==================================================

onClose();

router.refresh();


    // ==================================================
    // 8. CERRAR Y ACTUALIZAR EL PANEL
    // ==================================================

    onClose();

    // Vuelve a ejecutar la consulta de /admin
    // para mostrar inmediatamente los cambios.
    router.refresh();

  } catch (err) {

    // ==================================================
    // MANEJO DE ERRORES
    // ==================================================

    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError(
        "Ocurrió un error inesperado al actualizar la gorra."
      );
    }

  } finally {

    // Habilitamos nuevamente el formulario.
    setIsSaving(false);
  }
}
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#0d1216] shadow-2xl">

        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#0d1216] px-6 py-5">

          <div>
            <h2 className="text-2xl font-bold text-white">
              Editar gorra
            </h2>

            <p className="mt-1 text-sm text-white/50">
              Modifica la información del producto
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


       {/* ==================================================
            FORMULARIO DE EDICIÓN
        ================================================== */}

        <form
        onSubmit={handleSubmit}
        className="space-y-7 p-6"
        >

          {/* Nombre y marca */}

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label
                htmlFor="edit-name"
                className="mb-2 block text-sm font-medium text-white"
              >
                Nombre
              </label>

              <input
                id="edit-name"
                name="name"
                type="text"
                defaultValue={product.name}
                className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none transition focus:border-yellow-400"
              />
            </div>


            <div>
              <label
                htmlFor="edit-brand"
                className="mb-2 block text-sm font-medium text-white"
              >
                Marca
              </label>

              <input
                id="edit-brand"
                name="brand"
                type="text"
                defaultValue={product.brand}
                className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none transition focus:border-yellow-400"
              />
            </div>


            {/* Precio */}

            <div>
              <label
                htmlFor="edit-price"
                className="mb-2 block text-sm font-medium text-white"
              >
                Precio
              </label>

              <input
                id="edit-price"
                name="price"
                type="number"
                min="0"
                defaultValue={product.price}
                className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-white outline-none transition focus:border-yellow-400"
              />
            </div>


            {/* Estado */}

            <div>
              <label
                htmlFor="edit-available"
                className="mb-2 block text-sm font-medium text-white"
              >
                Estado
              </label>

              <select
                id="edit-available"
                name="available"
                defaultValue={String(product.available)}
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


          {/* ==================================================
              DESCRIPCIÓN
          ================================================== */}

          <div>
            <label
              htmlFor="edit-description"
              className="mb-2 block text-sm font-medium text-white"
            >
              Descripción
            </label>

            <textarea
              id="edit-description"
              name="description"
              rows={5}
              defaultValue={product.description}
              className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none transition focus:border-yellow-400"
            />
          </div>


          {/* ==================================================
              IMÁGENES ACTUALES
          ================================================== */}

          <div>
            <div className="mb-4">
              <h3 className="font-semibold text-white">
                Imágenes actuales
              </h3>

              <p className="mt-1 text-sm text-white/45">
                Estas son las fotografías guardadas actualmente
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">

        {/* ==================================================
            IMAGEN 1
        ================================================== */}

        <label className="group relative h-40 cursor-pointer overflow-hidden rounded-xl border border-white/10">

        {/* Fotografía actual o nueva vista previa */}
        <img
            src={preview1}
            alt={`${product.name} imagen 1`}
            className="h-full w-full object-cover"
        />

        {/* Capa que aparece al pasar el mouse */}
        <div
            className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/60
            opacity-0
            transition
            group-hover:opacity-100
                "
            >
                <div className="text-center">
                <ImagePlus className="mx-auto h-6 w-6 text-yellow-400" />

                <span className="mt-2 block text-sm font-semibold text-white">
                    Cambiar imagen
                </span>
                </div>
            </div>

            {/* Selector del archivo */}
            <input
                name="image_1"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(e) =>
                changeImage1(e.target.files?.[0])
                }
            />

            </label>

        {/* ==================================================
            IMAGEN 2
        ================================================== */}

        <label className="group relative h-40 cursor-pointer overflow-hidden rounded-xl border border-white/10">

        <img
            src={preview2}
            alt={`${product.name} imagen 2`}
            className="h-full w-full object-cover"
        />

        <div
            className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/60
            opacity-0
            transition
            group-hover:opacity-100
            "
        >
            <div className="text-center">
            <ImagePlus className="mx-auto h-6 w-6 text-yellow-400" />

            <span className="mt-2 block text-sm font-semibold text-white">
                Cambiar imagen
            </span>
            </div>
        </div>

        <input
            name="image_2"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) =>
            changeImage2(e.target.files?.[0])
            }
        />

        </label>

        {/* ==================================================
            IMAGEN 3
        ================================================== */}

        <label className="group relative h-40 cursor-pointer overflow-hidden rounded-xl border border-white/10">

        <img
            src={preview3}
            alt={`${product.name} imagen 3`}
            className="h-full w-full object-cover"
        />

        <div
            className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/60
            opacity-0
            transition
            group-hover:opacity-100
            "
        >
            <div className="text-center">
            <ImagePlus className="mx-auto h-6 w-6 text-yellow-400" />

            <span className="mt-2 block text-sm font-semibold text-white">
                Cambiar imagen
            </span>
            </div>
        </div>

        <input
            name="image_3"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) =>
            changeImage3(e.target.files?.[0])
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
            
          {/* ==================================================
              BOTONES
          ================================================== */}

          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="h-12 rounded-xl border border-white/15 px-6 font-semibold text-white transition hover:bg-white/5"
            >
              Cancelar
            </button>

        {/* ==================================================
            BOTÓN GUARDAR CAMBIOS
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
        {isSaving ? "Guardando..." : "Guardar cambios"}
        </button>

          </div>

        </form>

      </div>
    </div>
  );
}