"use client";

import { useState, useTransition } from "react";
import { login } from "./actions";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleLogin(formData: FormData) {
  setError("");

  startTransition(async () => {
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
    }
  });
}

  return (
    <main
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black bg-cover bg-center px-5 py-10"
      style={{
        backgroundImage: "url('/admin-login-bg.png')",
      }}
    >
      {/* Capa oscura sobre la fotografía */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-[540px]">
        {/* Marca */}
        <div className="mb-10 text-center">
          <h1
            className={`${bebasNeue.className} text-6xl tracking-[0.02em] text-white sm:text-7xl`}
          >
            DISTRITO<span className="text-yellow-400">CAPS</span>
          </h1>
        </div>

        {/* Formulario */}
        <div className="rounded-[22px] border border-white/20 bg-black/65 p-7 shadow-2xl backdrop-blur-md sm:p-12">
          <form action={handleLogin} className="space-y-7">
            <div>
              <label
                htmlFor="email"
                className="mb-3 block text-xs font-medium uppercase tracking-[0.22em] text-white"
              >
                Correo electrónico
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-yellow-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-3 block text-xs font-medium uppercase tracking-[0.22em] text-white"
              >
                Contraseña
              </label>

              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-black/50 px-5 py-4 text-white outline-none transition placeholder:text-white/40 focus:border-yellow-400"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className={`${bebasNeue.className} w-full rounded-xl bg-white px-5 py-4 text-2xl tracking-wide text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {isPending ? "INGRESANDO..." : "INGRESAR"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}