import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
                      <div className="relative aspect-square max-w-lg mx-auto">
                          <div className="absolute inset-8 border-4 border-tan rounded-xl"></div>

                          <Image
                              alt="Mulher forte e elegante da família Natal usando joias"
                              src="https://images.unsplash.com/photo-1635175779836-e0db4f9a2c10"
                              fill
                              className="object-cover rounded-xl shadow-2xl z-10"
                              sizes="(max-width: 768px) 100vw, 512px"
                          />
                      </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <span className="font-display text-tan font-semibold text-lg">Nossa História</span>
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-carmine leading-tight">
              Um legado de força e elegância familiar.
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              A Natal Acessórios nasceu da admiração pelas mulheres da nossa família. Mulheres de iniciativa, coragem e um espírito empreendedor que nos inspira todos os dias. Cada peça que criamos é uma homenagem a essa força.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nossa missão é traduzir esse legado em jóias atemporais que celebram a história de cada mulher.
            </p>
            <Link to="/sobre-nos">
              <Button size="lg" className="bg-carmine hover:bg-carmine-light text-white px-8 py-3">
                Conheça a Família Natal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;