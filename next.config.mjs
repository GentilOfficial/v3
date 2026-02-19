/** @type {import('next').NextConfig} */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL

const nextConfig = {
    images: {
        remotePatterns: [
            new URL(`${supabaseUrl}/**`)
        ]
    },
    swcMinify: true,
    experimental: {
        legacyBrowsers: false,
    },
};

export default nextConfig;
