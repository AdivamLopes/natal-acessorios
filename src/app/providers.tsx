// app/providers.tsx
'use client';

import { ReactNode } from 'react';
import { CartProvider } from '@/contexts/CartContext';
// import { AuthProvider } from '@/contexts/AuthContext'; // Se houver

export function Providers({ children }: { children: ReactNode }) {
    return (
        <CartProvider>
            {/* <AuthProvider> */}
            {children}
            {/* </AuthProvider> */}
        </CartProvider>
    );
}
