'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '@/components/ui/button';
import { getFeaturedProducts } from '@/data/api';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        async function fetchProducts() {
            const products = await getFeaturedProducts();
            setProducts(products);
        }
        fetchProducts();
    }, []);


  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-[#fefefe]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-display font-bold text-carmine mb-4">
            Lançamentos & Destaques
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Inspire-se com nossas novas coleções e as peças mais desejadas.
          </p>
        </motion.div>
        
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {products.map((product) => (
                <div key={product.id} className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 p-4">
                  <Link to={`/produto/${product.id}`} className="block group">
                    <div className="relative overflow-hidden rounded-lg aspect-[4/5]">
                              <Image
                                  src={product.mainImage}
                                  alt={`Imagem do produto ${product.name}`}
                                  width={500}
                                  height={625} // Mantém proporção 4/5
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <h3 className="text-2xl font-display font-bold">{product.name}</h3>
                        <p className="text-lg font-bold text-tan">R$ {product.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-4 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Ver Detalhes <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute top-1/2 -left-4 transform -translate-y-1/2 rounded-full h-12 w-12 bg-white/80 hover:bg-white border-tan/50"
          >
            <ChevronLeft className="h-6 w-6 text-carmine" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute top-1/2 -right-4 transform -translate-y-1/2 rounded-full h-12 w-12 bg-white/80 hover:bg-white border-tan/50"
          >
            <ChevronRight className="h-6 w-6 text-carmine" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;