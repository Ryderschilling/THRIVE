import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack/webpack don't walk up to ~/Downloads
  // when resolving modules like `tailwindcss` from CSS imports.
  turbopack: {
    root: path.resolve("."),
  },
  outputFileTracingRoot: path.resolve("."),
};

export default nextConfig;
