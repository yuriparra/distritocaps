import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite acceder al servidor local desde el celular.
  allowedDevOrigins: ["192.168.1.41"],

  // =====================================================
  // IMÁGENES EXTERNAS
  // =====================================================
  // Autoriza a Next.js para mostrar las imágenes
  // almacenadas en Supabase Storage.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dyonajojkqfpckvuapey.supabase.co",
        pathname: "/storage/v1/object/public/product-images/**",
      },
    ],
  },
};

export default nextConfig;