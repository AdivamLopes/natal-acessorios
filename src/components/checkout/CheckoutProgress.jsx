import React from 'react';
import { Check } from 'lucide-react';

const CheckoutProgress = ({ step }) => {
  return (
    <div className="flex items-center gap-4 mb-8">
      <div className={`flex items-center gap-2 ${step >= 1 ? 'text-pink-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          step >= 1 ? 'bg-pink-600 text-white' : 'bg-gray-200'
        }`}>
          {step > 1 ? <Check className="h-4 w-4" /> : '1'}
        </div>
        <span className="font-medium">Entrega</span>
      </div>
      <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-pink-600' : 'bg-gray-200'}`} />
      <div className={`flex items-center gap-2 ${step >= 2 ? 'text-pink-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          step >= 2 ? 'bg-pink-600 text-white' : 'bg-gray-200'
        }`}>
          2
        </div>
        <span className="font-medium">Pagamento</span>
      </div>
    </div>
  );
};

export default CheckoutProgress;