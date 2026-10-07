import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, CircleCheck, CircleX, ExternalLink } from "lucide-react";
import ProductsManager from "./ProductsManager";

import { createClient } from "@/utils/supabase/server";
import LogoutButton from "./LogoutButton";

export default async function AdminPage() {
  const supabase = await createClient();

  // ================================================
  // VERIFICAR USUARIO
  // ================================================

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  // ================================================
  // OBTENER PRODUCTOS DE SUPABASE
  // ================================================

  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  // ================================================
  // ESTADÍSTICAS
  // ================================================

  const totalProducts = products?.length ?? 0;

  const availableProducts =
    products?.filter((product) => product.available).length ?? 0;

  const unavailableProducts =
    products?.filter((product) => !product.available).length ?? 0;

  return (
    <main className="min-h-screen bg-[#070b0e] text-white">
      {/* ================================================
          ENCABEZADO
      ================================================= */}

      <header className="border-b border-white/10 bg-black">
        <div className="mx-auto flex min-h-24 max-w-7xl items-center justify-between gap-4 px-5 py-5 md:px-8">
          {/* Marca */}
          <div>
            <p className="text-sm tracking-wide text-white/60">
              ADMIN
            </p>

            <h1 className="text-xl font-bold tracking-wide md:text-2xl">
              DISTRITO<span className="text-yellow-400">CAPS</span>
            </h1>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold transition hover:border-yellow-400 hover:text-yellow-400 sm:flex"
            >
              <ExternalLink className="h-4 w-4" />
              Ver tienda
            </Link>

            <LogoutButton />
          </div>
        </div>
      </header>

      {/* ================================================
          CONTENIDO
      ================================================= */}

      <section className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold md:text-4xl">
            Productos
          </h2>

          <p className="mt-2 text-sm text-white/55 md:text-base">
            Gestiona las gorras de tu catálogo
          </p>
        </div>

        {/* ================================================
            TARJETAS DE RESUMEN
        ================================================= */}

        <div className="grid gap-4 md:grid-cols-3">
          {/* Total */}
          <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-800">
              <Package className="h-6 w-6 text-white" />
            </div>

            <div>
              <p className="text-3xl font-bold">
                {totalProducts}
              </p>

              <p className="mt-1 text-sm text-white/55">
                Gorras en total
              </p>
            </div>
          </div>

          {/* Disponibles */}
          <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-500/10">
              <CircleCheck className="h-6 w-6 text-green-400" />
            </div>

            <div>
              <p className="text-3xl font-bold">
                {availableProducts}
              </p>

              <p className="mt-1 text-sm text-white/55">
                Disponibles
              </p>
            </div>
          </div>

          {/* No disponibles */}
          <div className="flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-red-500/10">
              <CircleX className="h-6 w-6 text-red-400" />
            </div>

            <div>
              <p className="text-3xl font-bold">
                {unavailableProducts}
              </p>

              <p className="mt-1 text-sm text-white/55">
                No disponibles
              </p>
            </div>
          </div>
        </div>

        <ProductsManager products={products ?? []} />

        {/* Error de Supabase */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-sm text-red-400">
              Error al cargar productos: {error.message}
            </p>
          </div>
        )}
      </section>
    </main>
  );
}