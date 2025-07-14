// app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Providers } from './providers';

export const metadata = {
    title: 'Natal Acessórios',
    description: 'Loja de acessórios em Natal',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="pt-BR">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    );
}
