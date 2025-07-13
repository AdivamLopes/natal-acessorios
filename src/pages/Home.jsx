'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowRight, Shield, Truck, Gem, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../components/ecommerce/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { getFeaturedProducts } from '../data/products';
import Hero from '@/components/Hero';
import ProductCarousel from '@/components/ProductCarousel';
import Testimonials from '@/components/Testimonials';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = await getFeaturedProducts();
        setFeaturedProducts(products);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const features = [
    { icon: Gem, title: "Design Único", description: "Peças atemporais e refinadas, criadas para mulheres fortes e autênticas." },
    { icon: Shield, title: "Qualidade Garantida", description: "Jóias com certificado de qualidade e garantia de 1 ano para sua tranquilidade." },
    { icon: Truck, title: "Entrega Rápida", description: "Receba seus acessórios com segurança e rapidez em todo o Brasil." },
    { icon: Star, title: "Atendimento Exclusivo", description: "Nossa equipe está pronta para te ajudar a encontrar a peça perfeita." }
  ];

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Helmet>
        <title>Natal Acessórios - Jóias Refinadas, Únicas e Atemporais</title>
        <meta name="description" content="Descubra a coleção da Natal Acessórios. A roupa veste, o acessório revela." />
      </Helmet>

      <Hero />
      <ProductCarousel />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-carmine mb-4">Nossos Destaques</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Peças selecionadas que representam a essência da Natal Acessórios.</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
            ) : (
              featuredProducts.map((product, index) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }}>
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} viewport={{ once: true }} className="text-center mt-12">
            <Link to="/produtos">
              <Button size="lg" variant="outline" className="border-2 border-tan text-carmine hover:bg-tan/10 px-8 py-3">
                Ver Todas as Coleções <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Testimonials />

      <section className="py-20 bg-tan/10">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-carmine mb-4">Por que Natal Acessórios?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Nossos pilares são a base da sua confiança.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.1 }} viewport={{ once: true }} className="text-center group">
                <div className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105 border border-tan/20">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-carmine rounded-full mb-6">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;