import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "images.unsplash.com",
            "storage.googleapis.com", // apenas se você estiver usando esse domínio também
        ],
    },
    // outras configurações aqui
};

export default nextConfig;
