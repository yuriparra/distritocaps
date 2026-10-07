"use client";
/// ======================================================
// IMPORTACIONES
// ======================================================

import { useState } from "react";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import NewProductModal from "./NewProductModal";
// Modal utilizado para modificar una gorra existente.
import EditProductModal from "./EditProductModal";
// Modal utilizado para confirmar la eliminación
// de una gorra existente.
import DeleteProductModal from "./DeleteProductModal";

// ======================================================
// TIPO DE PRODUCTO
// ======================================================

// Esta estructura representa exactamente la información
// que recibimos desde la tabla "products" de Supabase.

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
// PROPIEDADES DEL COMPONENTE
// ======================================================

// ProductsManager recibirá desde admin/page.tsx
// todos los productos encontrados en Supabase.

type ProductsManagerProps = {
  products: Product[];
};

export default function ProductsManager({
  products,
}: ProductsManagerProps) {

      // ====================================================
  // ESTADO DEL FORMULARIO "NUEVA GORRA"
  // ====================================================

  // false = formulario cerrado
  // true  = formulario abierto
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======================================================
// PRODUCTO SELECCIONADO PARA EDITAR
// ======================================================

// Aquí guardaremos la gorra sobre la que el administrador
// presionó el botón "Editar".
//
// Cuando sea null significa que actualmente
// no estamos editando ningún producto.

const [productToEdit, setProductToEdit] =
  useState<Product | null>(null);

  // ======================================================
// PRODUCTO SELECCIONADO PARA ELIMINAR
// ======================================================

// Aquí guardaremos la gorra sobre la que se presionó
// el botón "Eliminar".
//
// Más adelante utilizaremos este producto para mostrar
// una ventana de confirmación antes de borrarlo.

const [productToDelete, setProductToDelete] =
  useState<Product | null>(null);

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        {/* Buscador */}
        <div className="relative flex-1">
          <Search
            className="
              absolute
              left-4
              top-1/2
              h-5
              w-5
              -translate-y-1/2
              text-white/40
            "
          />

          <input
            type="text"
            placeholder="Buscar gorras..."
            className="
              h-14
              w-full
              rounded-xl
              border
              border-white/10
              bg-white/[0.04]
              pl-12
              pr-4
              text-white
              outline-none
              transition
              placeholder:text-white/35
              focus:border-yellow-400
            "
          />
        </div>

        {/* Nueva gorra */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="
            flex
            h-14
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-yellow-400
            px-7
            font-bold
            text-black
            transition
            hover:bg-yellow-300
            sm:min-w-[190px]
          "
        >
          <Plus className="h-5 w-5" />
          Nueva gorra
        </button>
      </div>

{/* ======================================================
    LISTADO DE PRODUCTOS
====================================================== */}

<div className="mt-6 space-y-3">

  {/* Si todavía no existen productos */}
  {products.length === 0 && (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center">
      <p className="font-semibold text-white">
        No hay gorras registradas
      </p>

      <p className="mt-1 text-sm text-white/45">
        Las nuevas gorras aparecerán aquí.
      </p>
    </div>
  )}


  {/* ==================================================
      PRODUCTOS REGISTRADOS
  ================================================== */}

  {products.map((product) => (
    <div
      key={product.id}
      className="
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-4
        sm:flex-row
        sm:items-center
      "
    >

      {/* ==============================================
          IMAGEN PRINCIPAL
      ============================================== */}

      <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-white/5 sm:h-24 sm:w-24">
        <img
          src={product.image_1}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>


      {/* ==============================================
          INFORMACIÓN DEL PRODUCTO
      ============================================== */}

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
          {product.brand}
        </p>

        <h3 className="mt-1 truncate text-lg font-bold text-white">
          {product.name}
        </h3>

        <p className="mt-1 font-semibold text-yellow-400">
          ${product.price.toLocaleString("es-CO")}
        </p>
      </div>


      {/* ==============================================
          ESTADO
      ============================================== */}

      <div>
        {product.available ? (
          <span className="inline-flex rounded-full bg-green-500/10 px-3 py-1.5 text-xs font-semibold text-green-400">
            Disponible
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400">
            No disponible
          </span>
        )}
      </div>


      {/* ==============================================
          ACCIONES
      ============================================== */}

      <div className="flex gap-2">

        {/* Editar */}
        <button
          type="button"
          onClick={() => setProductToEdit(product)}
          className="
            flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-white/10
            px-4
            text-sm
            font-semibold
            text-white
            transition
            hover:border-yellow-400
            hover:text-yellow-400
          "
        >
          <Pencil className="h-4 w-4" />

          <span className="hidden md:inline">
            Editar
          </span>
        </button>


        {/* Eliminar */}
        <button
          type="button"
          onClick={() => setProductToDelete(product)}
          className="
            flex
            h-10
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-red-500/20
            px-4
            text-sm
            font-semibold
            text-red-400
            transition
            hover:bg-red-500/10
          "
        >
          <Trash2 className="h-4 w-4" />

          <span className="hidden md:inline">
            Eliminar
          </span>
        </button>

      </div>

    </div>
  ))}

</div>

    {/* ================================================
          FORMULARIO NUEVA GORRA
      ================================================= */}

      {isModalOpen && (
        <NewProductModal
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* ======================================================
        FORMULARIO EDITAR GORRA
    ====================================================== */}

    {productToEdit && (
    <EditProductModal
        product={productToEdit}
        onClose={() => setProductToEdit(null)}
    />
    )}
    {/* ======================================================
            CONFIRMACIÓN PARA ELIMINAR GORRA
        ====================================================== */}

        {productToDelete && (
        <DeleteProductModal
            product={productToDelete}
            onClose={() => setProductToDelete(null)}
        />
        )}

    </div>
  );

}