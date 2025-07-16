import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            "images.unsplash.com",
            "storage.googleapis.com", // apenas se voc� estiver usando esse dom�nio tamb�m
        ],
    },
    // outras configura��es aqui
};

export default nextConfig;
