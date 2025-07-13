// app/layout.tsx
'use client';

import './globals.css';
import { CartProvider } from '@/contexts/CartContext'; // ← importa o provider

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body>
                <CartProvider>
                    {children}
                </CartProvider>
            </body>
        </html>
    );
}
