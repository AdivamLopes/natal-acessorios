'use client'
import React, { useState } from 'react';
import { Truck, MapPin } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface ShippingOption {
    method: string;
    price: number;
    days: string;
    description: string;
}

export const ShippingCalculator: React.FC = () => {
    const { cart } = useCart();
    const [cep, setCep] = useState('');
    const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
    const [isCalculating, setIsCalculating] = useState(false);
    const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);

    const calculateShipping = async () => {
        if (cep.length !== 8) return;

        setIsCalculating(true);

        try {
            // Simular chamada para API de frete
            const response = await fetch('/api/shipping/calculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cep, items: cart })
            });

            const options = await response.json();
            setShippingOptions(options);
        } catch (error) {
            // Fallback com dados simulados
            const simulatedOptions = [
                {
                    method: 'PAC',
                    price: 12.50,
                    days: '5-8 dias úteis',
                    description: 'Entrega econômica dos Correios'
                },
                {
                    method: 'SEDEX',
                    price: 25.90,
                    days: '2-3 dias úteis',
                    description: 'Entrega expressa dos Correios'
                }
            ];
            setShippingOptions(simulatedOptions);
        } finally {
            setIsCalculating(false);
        }
    };

    const formatCep = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        return numbers.replace(/(\d{5})(\d{3})/, '$1-$2');
    };

    return (
        <div className="border-t pt-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Truck size={16} />
                Calcular Frete
            </h4>

            <div className="flex gap-2 mb-4">
                <div className="flex-1 relative">
                    <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Digite seu CEP"
                        value={cep}
                        onChange={(e) => setCep(e.target.value.replace(/\D/g, '').slice(0, 8))}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength={8}
                    />
                </div>
                <button
                    onClick={calculateShipping}
                    disabled={cep.length !== 8 || isCalculating}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 whitespace-nowrap"
                >
                    {isCalculating ? 'Calculando...' : 'Calcular'}
                </button>
            </div>

            {shippingOptions.length > 0 && (
                <div className="space-y-2">
                    <h5 className="font-medium text-gray-700">Opções de entrega:</h5>
                    {shippingOptions.map((option, index) => (
                        <label key={index} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <input
                                type="radio"
                                name="shipping"
                                value={option.method}
                                checked={selectedShipping?.method === option.method}
                                onChange={() => setSelectedShipping(option)}
                                className="text-blue-600"
                            />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="font-semibold">{option.method}</div>
                                        <div className="text-sm text-gray-600">{option.description}</div>
                                        <div className="text-sm text-gray-600">{option.days}</div>
                                    </div>
                                    <div className="text-green-600 font-bold">
                                        R$ {option.price.toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};