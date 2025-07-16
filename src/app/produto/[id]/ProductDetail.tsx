'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

import {
    ArrowLeft, Heart, Share2, Star, Shield, Truck, Gem, XCircle,
    Ruler, Weight, Sparkles
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ecommerce/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';
import { getRelatedProducts } from '@/lib/api';

const ProductDetail = ({ product }: { product: any }) => {
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchRelated = async () => {
            const related = await getRelatedProducts(product.category, product.id);
            setRelatedProducts(related);
        };
        fetchRelated();
    }, [product]);

    const handleAddToCart = () => {
        addToCart({ ...product, quantity });
        toast({
            title: "Produto adicionado! 🛍️",
            description: `${quantity}x ${product.name} foi adicionado ao carrinho.`,
        });
    };

    const handleActionClick = () => {
        toast({ title: "🚧 Funcionalidade em desenvolvimento!" });
    };

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">💎</div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Produto não encontrado</h2>
                    <Link href="/produtos" passHref>
                        <Button as="a" className="bg-carmine hover:bg-carmine-light text-white">
                            Ver Todas as Coleções
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 bg-white">
            <div className="container mx-auto px-4">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <Link href="/produtos">
                        <Button variant="ghost" className="text-gray-600 hover:text-carmine">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Voltar para Coleções
                        </Button>
                    </Link>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                        <div className="aspect-square relative rounded-2xl overflow-hidden bg-tan/10 shadow-lg">
                            <Image
                                src={product.mainImage}
                                alt={`Imagem do produto ${product.name}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                        <h1 className="text-3xl lg:text-4xl font-display font-bold text-carmine">{product.name}</h1>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                                <span className="ml-2 text-gray-600">({product.reviews} avaliações)</span>
                            </div>
                        </div>

                        <div className="text-4xl font-bold text-tan-dark">R$ {product.price.toFixed(2)}</div>

                        <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4">
                                <label className="text-gray-700 font-medium">Quantidade:</label>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2">-</button>
                                    <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2">+</button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button onClick={handleAddToCart} size="lg" className="flex-1 bg-carmine text-white py-4 text-lg">
                                    Adicionar ao Carrinho
                                </Button>
                                <Button onClick={handleActionClick} variant="outline" size="lg"><Heart className="h-5 w-5" /></Button>
                                <Button onClick={handleActionClick} variant="outline" size="lg"><Share2 className="h-5 w-5" /></Button>
                            </div>
                        </div>

                        <ProductHighlights />
                    </motion.div>
                </div>

                <ProductExtraDetails />

                {relatedProducts.length > 0 && (
                    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                        <h2 className="text-3xl font-display font-bold text-carmine mb-8 text-center">Você também pode gostar</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct: any, index: number) => (
                                <motion.div key={relatedProduct.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}>
                                    <ProductCard product={relatedProduct} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </div>
        </div>
    );
};

const ProductHighlights = () => (
    <div className="bg-tan/10 rounded-2xl p-6 mt-8 space-y-4">
        {[{
            Icon: Truck, title: "Frete Grátis", text: "Acima de R$299 para todo Brasil."
        }, {
            Icon: Gem, title: "Banhado a Ouro 18k e Ródio", text: "Metal nobre de 5 a 10 milésimos, muito usado em joalheria."
        }, {
            Icon: XCircle, title: "Níquel Free", text: "Nossa fábrica não manipula níquel, garantindo a não contaminação."
        }, {
            Icon: Shield, title: "Garantia de 1 Ano", text: "Cobrimos o banho e defeitos de fabricação."
        }].map(({ Icon, title, text }) => (
            <div className="flex items-start gap-4" key={title}>
                <div className="bg-white p-2 rounded-full"><Icon className="h-6 w-6 text-tan-dark" /></div>
                <div><h4 className="font-semibold text-gray-800">{title}</h4><p className="text-sm text-gray-600">{text}</p></div>
            </div>
        ))}
    </div>
);

const ProductExtraDetails = () => (
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-carmine">Especificações</h3>
            <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3"><Ruler className="h-5 w-5 text-tan-dark" /><span>Dimensões: 15cm x 10cm x 5cm</span></div>
                <div className="flex items-center gap-3"><Weight className="h-5 w-5 text-tan-dark" /><span>Peso: 150g</span></div>
                <div className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-tan-dark" /><span>Cuidados: Evitar contato com produtos químicos.</span></div>
            </div>
        </div>
        <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-carmine">Avaliações de Clientes</h3>
            <div className="space-y-4">
                {[1, 2].map((_, i) => (
                    <div key={i} className="border-b border-tan/20 pb-4">
                        <div className="flex items-center mb-1">
                            {[...Array(5)].map((_, si) => <Star key={si} className="h-4 w-4 text-yellow-400 fill-current" />)}
                            <span className="ml-2 font-semibold text-gray-800">Cliente Satisfeita</span>
                        </div>
                        <p className="text-gray-600">"Peça maravilhosa, superou minhas expectativas! Qualidade incrível e brilho sem igual. Recomendo!"</p>
                    </div>
                ))}
                <Button variant="link" className="text-carmine p-0">Ver todas as avaliações</Button>
            </div>
        </div>
    </div>
);

export default ProductDetail;
