import React from 'react';
import { Shield } from 'lucide-react';

const OrderSummary = ({ items, getCartTotal }) => {
  const shippingCost = getCartTotal() >= 150 ? 0 : 15;
  const total = getCartTotal() + shippingCost;

  return (
    <div className="glass-effect rounded-2xl p-6 sticky top-24">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Resumo do Pedido
      </h2>

      <div className="space-y-4 mb-6">
        {items.map((item, index) => (
          <div key={`${item.id}-${index}`} className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white">
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800">{item.name}</div>
              <div className="text-xs text-gray-600">Qtd: {item.quantity}</div>
            </div>
            <div className="text-sm font-medium text-gray-800">
              R$ {(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>R$ {getCartTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Frete</span>
          <span className={shippingCost === 0 ? 'text-green-600' : ''}>
            {shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2)}`}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-800 border-t border-gray-200 pt-3">
          <span>Total</span>
          <span className="gradient-text">R$ {total.toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center gap-2 text-green-800">
          <Shield className="h-5 w-5" />
          <span className="font-medium">Compra Segura</span>
        </div>
        <p className="text-green-700 text-sm mt-1">
          Seus dados estão protegidos com criptografia SSL
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;