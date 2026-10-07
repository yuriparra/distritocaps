"use client";

// ======================================================
// IMPORTACIONES
// ======================================================

// ======================================================
// IMPORTACIONES
// ======================================================

import { useState } from "react";

// Permitirá actualizar el panel después de eliminar
// correctamente el producto.
import { useRouter } from "next/navigation";

import { AlertTriangle, X, Trash2 } from "lucide-react";

// Cliente de Supabase.
// Lo utilizaremos para eliminar las fotografías
// y posteriormente el producto.
import { createClient } from "@/utils/supabase/client";


// ======================================================
// TIPO DE PRODUCTO
// ======================================================

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

type DeleteProductModalProps = {
  product: Product;
  onClose: () => void;
};


// ======================================================
// COMPONENTE PRINCIPAL
// ======================================================

export default function DeleteProductModal({
  product,
  onClose,
}: DeleteProductModalProps) {

  // ======================================================
// CONEXIÓN CON NEXT.JS Y SUPABASE
// ======================================================

// Nos permitirá actualizar /admin después de eliminar.
const router = useRouter();

// Cliente para comunicarnos con Supabase.
const supabase = createClient();


// ======================================================
// ESTADO DEL PROCESO DE ELIMINACIÓN
// ======================================================

// Indica si actualmente estamos eliminando el producto.
const [isDeleting, setIsDeleting] = useState(false);

// Aquí mostraremos cualquier error que pueda ocurrir.
const [error, setError] = useState("");

// ======================================================
// OBTENER LA RUTA DE UNA IMAGEN DE SUPABASE
// ======================================================

// En la base de datos guardamos la URL pública completa:
//
// https://...supabase.co/storage/v1/object/public/
// product-images/products/archivo.jpg
//
// Pero Storage necesita solamente:
//
// products/archivo.jpg
//
// Esta función extrae esa parte de la URL.

function getStoragePath(imageUrl: string) {
  const marker = "/product-images/";

  const markerPosition = imageUrl.indexOf(marker);

  // Si por alguna razón la URL no tiene el formato
  // esperado, devolvemos null para evitar borrar
  // una ruta incorrecta.
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
// ELIMINAR PRODUCTO
// ======================================================

async function handleDelete() {

  // Evitamos que el usuario pueda pulsar varias veces.
  if (isDeleting) return;

  setError("");
  setIsDeleting(true);

  try {

    // ==================================================
    // 1. ELIMINAR EL PRODUCTO DE LA BASE DE DATOS
    // ==================================================

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", product.id);

    if (deleteError) {
      throw new Error(
        `No se pudo eliminar la gorra: ${deleteError.message}`
      );
    }


    // ==================================================
    // 2. OBTENER LAS RUTAS DE LAS TRES IMÁGENES
    // ==================================================

    const imagePaths = [
      getStoragePath(product.image_1),
      getStoragePath(product.image_2),
      getStoragePath(product.image_3),
    ].filter(
      (path): path is string => path !== null
    );


    // ==================================================
    // 3. ELIMINAR LAS IMÁGENES DE STORAGE
    // ==================================================

    // Si encontramos rutas válidas, eliminamos
    // las fotografías del bucket product-images.

    if (imagePaths.length > 0) {
      const { error: storageError } =
        await supabase.storage
          .from("product-images")
          .remove(imagePaths);

      // El producto ya fue eliminado de la base de datos.
      // Si Storage falla, mostramos el problema para
      // saber que quedaron archivos pendientes.
      if (storageError) {
        throw new Error(
          `La gorra fue eliminada, pero hubo un problema al borrar sus imágenes: ${storageError.message}`
        );
      }
    }


    // ==================================================
    // 4. CERRAR Y ACTUALIZAR EL PANEL
    // ==================================================

    onClose();

    router.refresh();

  } catch (err) {

    // ==================================================
    // MANEJO DE ERRORES
    // ==================================================

    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError(
        "Ocurrió un error inesperado al eliminar la gorra."
      );
    }

  } finally {

    setIsDeleting(false);
  }
}

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#0d1216] shadow-2xl">

        {/* ==================================================
            ENCABEZADO
        ================================================== */}

        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

          <h2 className="text-xl font-bold text-white">
            Eliminar gorra
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

        </div>


        {/* ==================================================
            CONTENIDO
        ================================================== */}

        <div className="p-6">

          {/* Icono de advertencia */}

          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-500/10">
            <AlertTriangle className="h-7 w-7 text-red-400" />
          </div>


          {/* Mensaje */}

          <p className="text-white">
            ¿Estás seguro de que deseas eliminar
            <span className="font-bold">
              {" "}
              {product.name}
            </span>
            ?
          </p>

          <p className="mt-3 text-sm leading-6 text-white/50">
            El producto será eliminado permanentemente del
            catálogo junto con sus fotografías.
          </p>


          {/* ==================================================
              PRODUCTO
          ================================================== */}

          <div className="mt-5 flex items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-3">

            <img
              src={product.image_1}
              alt={product.name}
              className="h-16 w-16 rounded-lg object-cover"
            />

            <div className="min-w-0">
              <p className="truncate font-semibold text-white">
                {product.name}
              </p>

              <p className="mt-1 text-sm text-yellow-400">
                ${product.price.toLocaleString("es-CO")}
              </p>
            </div>

          </div>

        {/* ==================================================
            MENSAJE DE ERROR
        ================================================== */}

        {error && (
        <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-sm leading-5 text-red-400">
            {error}
            </p>
        </div>
        )}
        
          {/* ==================================================
              BOTONES
          ================================================== */}

          <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="h-12 rounded-xl border border-white/15 px-6 font-semibold text-white transition hover:bg-white/5"
            >
              Cancelar
            </button>

        {/* ==================================================
            BOTÓN ELIMINAR
        ================================================== */}

        <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="
            flex
            h-12
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-red-500
            px-6
            font-bold
            text-white
            transition
            hover:bg-red-400
            disabled:cursor-not-allowed
            disabled:opacity-50
        "
        >
        <Trash2 className="h-4 w-4" />

        {isDeleting ? "Eliminando..." : "Eliminar"}
        </button>

          </div>

        </div>

      </div>
    </div>
  );
}