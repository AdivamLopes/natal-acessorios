'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Head } from 'next/head';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import CheckoutProgress from '@/components/checkout/CheckoutProgress';
import EmptyCartMessage from '@/components/checkout/EmptyCartMessage';

const Checkout = () => {
  const { items, getCartTotal } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNextStep = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos de entrega."
      });
      return;
    }
    setStep(2);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    
    const requiredPaymentFields = ['cardNumber', 'expiryDate', 'cvv', 'cardName'];
    const missingFields = requiredPaymentFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Dados do cartão incompletos",
        description: "Por favor, preencha todos os dados do cartão."
      });
      return;
    }

    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  if (items.length === 0) {
    return <EmptyCartMessage />;
  }

  return (
    <div className="min-h-screen py-8">
      <Head>
        <title>Finalizar Compra - Natal Acessórios</title>
        <meta name="description" content="Finalize sua compra de forma segura na Natal Acessórios" />
      </Head>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/carrinho">
            <Button variant="ghost" className="text-gray-600 hover:text-carmine mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Carrinho
            </Button>
          </Link>
          
          <h1 className="text-3xl lg:text-4xl font-display font-bold gradient-text mb-4">
            Finalizar Compra
          </h1>

          <CheckoutProgress step={step} />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {step === 1 && (
                <ShippingForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  onNextStep={handleNextStep}
                />
              )}
              {step === 2 && (
                <PaymentForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  onSubmit={handleSubmitOrder}
                  onBack={() => setStep(1)}
                />
              )}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <OrderSummary items={items} getCartTotal={getCartTotal} />
            <div className="mt-4 text-center text-sm text-gray-500 p-4 bg-gray-50 rounded-lg">
              <p>O prazo de entrega estimado será calculado após a confirmação do pagamento e pode variar de acordo com a sua localidade.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;