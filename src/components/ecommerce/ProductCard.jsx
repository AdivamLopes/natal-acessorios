'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { toast } from '@/components/ui/use-toast';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { urlFor } from '@/lib/sanity';

const ProductCard = ({ product, viewMode = 'grid' }) => {
    const { addToCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast({
            title: "Produto adicionado! 🛍️",
            description: `${product.name} foi adicionado ao carrinho.`,
        });
    };

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toast({
            title: "🚧 Esta funcionalidade ainda não foi implementada!",
        });
    };

    const videoUrl = "https://videos.pexels.com/video-files/4834891/4834891-hd_1080_1920_25fps.mp4";

    if (viewMode === 'list') {
        return (
            <Card className="product-card overflow-hidden shadow-lg w-full border-tan/20 hover:shadow-xl">
                <Link href={`/produto/${product.id}`}>
                    <div className="flex flex-col sm:flex-row cursor-pointer">
                        <div className="w-full sm:w-48 h-48 sm:h-auto relative overflow-hidden">
                            <Image
                                alt={product.name}
                                src={urlFor(product.mainImage).width(500).url()}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-110"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleWishlist}
                                className="absolute top-2 right-2 h-8 w-8 bg-white/80 rounded-full hover:bg-white"
                            >
                                <Heart className="h-4 w-4 text-gray-600 hover:text-carmine" />
                            </Button>
                        </div>

                        <div className="flex-1 p-4 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-carmine transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                    {product.description}
                                </p>
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < product.rating
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-500">({product.reviews})</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-4">
                                <span className="text-2xl font-bold text-carmine">
                                    R$ {product.price.toFixed(2)}
                                </span>
                                <Button
                                    onClick={handleAddToCart}
                                    size="sm"
                                    className="bg-carmine hover:bg-carmine-light text-white"
                                >
                                    <ShoppingBag className="h-4 w-4 mr-2" />
                                    Adicionar
                                </Button>
                            </div>
                        </div>
                    </div>
                </Link>
            </Card>
        );
    } else {
        return (
            <Card
                className="product-card rounded-2xl overflow-hidden shadow-lg group border-none border-tan/20 hover:shadow-xl h-full flex flex-col"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Link href={`/produto/${product.id}`} className="flex flex-col flex-grow">
                    <CardHeader className="p-0 relative overflow-hidden aspect-[4/5]">
                        <AnimatePresence>
                            {isHovered ? (
                                <motion.video
                                    key="video"
                                    src={videoUrl}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            ) : (
                                <motion.div
                                    key="image"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full relative"
                                >
                                    <Image
                                        alt={product.name}
                                        src={urlFor(product.mainImage).width(500).url()}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleWishlist}
                            className="absolute top-3 right-3 h-8 w-8 bg-white/80 rounded-full hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                        >
                            <Heart className="h-4 w-4 text-gray-600 hover:text-carmine" />
                        </Button>

                        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-y-0 translate-y-4 duration-300">
                            <Button
                                onClick={handleAddToCart}
                                size="sm"
                                className="w-full bg-white/90 text-carmine hover:bg-white backdrop-blur-sm font-semibold"
                            >
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                Adicionar ao Carrinho
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-4 flex-grow">
                        <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-carmine transition-colors truncate">
                            {product.name}
                        </h3>
                        <span className="text-sm text-gray-500 capitalize">{product.category}</span>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex items-center justify-between">
                        <span className="text-xl font-bold text-carmine">
                            R$ {product.price.toFixed(2)}
                        </span>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                    </CardFooter>
                </Link>
            </Card>
        );
    }
};

export default ProductCard;
