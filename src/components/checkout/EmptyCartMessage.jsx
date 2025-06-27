import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const EmptyCartMessage = () => {
  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="text-center py-16">
          <div className="text-8xl mb-6">🛍️</div>
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">
            Carrinho vazio
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Adicione produtos ao carrinho antes de finalizar a compra.
          </p>
          <Link to="/produtos">
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">
              Explorar Produtos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCartMessage;