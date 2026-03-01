/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

const nextConfig = {
    images: {
        remotePatterns: [
            new URL(`${supabaseUrl}/**`)
        ]
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
        optimizePackageImports: ["motion", "lucide-react"]
    }
};

export default nextConfig;