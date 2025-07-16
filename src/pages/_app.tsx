// pages/_app.tsx
import type { AppProps } from 'next/app'
import { CartProvider } from '@/contexts/CartContext' // ajuste o caminho conforme necess�rio

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <CartProvider>
            <Component {...pageProps} />
        </CartProvider>
    )
}

export default MyApp
