/** @type {import('next').NextConfig} */
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL

function getRemotePatterns(url) {
  if (!url) return []

  try {
    return [new URL(`${url}/**`)]
  } catch {
    return []
  }
}

const nextConfig = {
  images: {
    remotePatterns: getRemotePatterns(supabaseUrl),
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  experimental: {
    optimizePackageImports: ["lenis", "motion"],
  },
}

export default nextConfig
