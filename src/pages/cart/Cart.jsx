import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

    const subtotal = getCartTotal();
    const shipping = subtotal >= 150 ? 0 : 15;
    const total = subtotal + shipping;

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId);
            toast({ title: "Produto removido", description: "Item removido do carrinho." });
        } else {
            updateQuantity(productId, newQuantity);
        }
    };

    const handleRemoveItem = (productId, productName) => {
        removeFromCart(productId);
        toast({ title: "Produto removido", description: `${productName} foi removido.` });
    };

    const handleClearCart = () => {
        clearCart();
        toast({ title: "Carrinho limpo", description: "Todos os itens foram removidos." });
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen py-8">
                <Head>
                    <title>Carrinho - Natal Acessórios</title>
                    <meta name="description" content="Seu carrinho de compras na Natal Acessórios" />
                </Head>

                <div className="container mx-auto px-4">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
                        <div className="text-8xl mb-6">🛍️</div>
                        <h1 className="text-3xl font-display font-bold text-gray-800 mb-4">Seu carrinho está vazio</h1>
                        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                            Que tal explorar nossa coleção e encontrar peças incríveis?
                        </p>
                        <Link href="/produtos">
                            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4">
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                Explorar Produtos
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8">
            <Head>
                <title>Carrinho ({items.length} {items.length === 1 ? 'item' : 'itens'}) - Natal Acessórios</title>
                <meta name="description" content="Revise seus itens selecionados e finalize sua compra" />
            </Head>

            <div className="container mx-auto px-4">
                {/* o resto do seu código permanece quase igual, com as correções acima */}

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <Link href="/produtos" passHref>
                        <Button
                            as="a"
                            variant="ghost"
                            className="text-gray-600 hover:text-pink-600 mb-4"
                        >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Continuar Comprando
                        </Button>
                    </Link>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-3xl lg:text-4xl font-display font-bold gradient-text">
                                Seu Carrinho
                            </h1>
                            <p className="text-gray-600 mt-2">
                                {items.length} {items.length === 1 ? 'item selecionado' : 'itens selecionados'}
                            </p>
                        </div>

                        {items.length > 0 && (
                            <Button
                                variant="outline"
                                onClick={handleClearCart}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                            >
                                Limpar Carrinho
                            </Button>
                        )}
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item, index) => (
                            <motion.div
                                key={`${item.id}-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass-effect rounded-2xl p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Product Image */}
                                    <div className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden bg-white">
                                        <Image
                                            src={item.images[0]}
                                            alt={item.name}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>

                                    {/* Product Details */}
                                    <div className="flex-1 space-y-2">
                                        <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                                            <div>
                                                <Link href={`/produto/${item.id}`} passHref>
                                                    <a className="text-lg font-semibold text-gray-800 hover:text-pink-600 transition-colors">
                                                        {item.name}
                                                    </a>
                                                </Link>
                                                <p className="text-gray-600 text-sm">{item.category}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-pink-600">
                                                    R$ {(item.price * item.quantity).toFixed(2)}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    R$ {item.price.toFixed(2)} cada
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-700 font-medium">Quantidade:</span>
                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </button>
                                                    <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                                        className="px-3 py-1 hover:bg-gray-100 transition-colors"
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveItem(item.id, item.name)}
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="glass-effect rounded-2xl p-6 sticky top-24">
                            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                                Resumo do Pedido
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>R$ {getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Frete</span>
                                    <span className="text-green-600">
                                        {getCartTotal() >= 150 ? 'Grátis' : 'R$ 15,00'}
                                    </span>
                                </div>
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex justify-between text-lg font-bold text-gray-800">
                                        <span>Total</span>
                                        <span className="gradient-text">
                                            R$ {(getCartTotal() + (getCartTotal() >= 150 ? 0 : 15)).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {getCartTotal() < 150 && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                                    <p className="text-blue-800 text-sm">
                                        💡 Adicione mais R$ {(150 - getCartTotal()).toFixed(2)} e ganhe frete grátis!
                                    </p>
                                </div>
                            )}

                            <Link href="/checkout" passHref>
                                <Button
                                    as="a"
                                    size="lg"
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white py-4 text-lg"
                                >
                                    Finalizar Compra
                                </Button>
                            </Link>

                            <div className="mt-4 text-center">
                                <Link href="/produtos" passHref>
                                    <Button
                                        as="a"
                                        variant="ghost"
                                        className="text-pink-600 hover:text-pink-700"
                                    >
                                        Continuar Comprando
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Cart;

