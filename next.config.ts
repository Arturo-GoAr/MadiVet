import type { NextConfig } from "next";

// En GitHub Pages el sitio vive en /<repo>; el workflow define NEXT_PUBLIC_BASE_PATH.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  // DESACTIVADO: el export estático (GitHub Pages) no funciona con el backend: las rutas /citas/[id],
  // /mascotas/[id] y /clientes/[id] ya no se pueden pregenerar porque los ids vienen de la API.
  // output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
