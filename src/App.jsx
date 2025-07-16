import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Head } from 'next/head';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/contexts/CartContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import ProductDetail from '@/pages/ProductDetail';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import Profile from '@/pages/Profile';
import About from '@/pages/About';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[#fefefe]">
            <Head>
              <title>Natal Acessórios - Jóias Refinadas, Únicas e Atemporais</title>
              <meta name="description" content="Descubra a coleção da Natal Acessórios. Peças refinadas, únicas e atemporais para mulheres fortes. A roupa veste, o acessório revela." />
            </Head>
            
            <Header />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Products />} />
                <Route path="/produtos/:category" element={<Products />} />
                <Route path="/produto/:id" element={<ProductDetail />} />
                <Route path="/carrinho" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/perfil" element={<Profile />} />
                <Route path="/sobre-nos" element={<About />} />
              </Routes>
            </main>
            
            <Footer />
            <Toaster />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;