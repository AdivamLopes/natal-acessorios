import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "As peças são ainda mais lindas pessoalmente! A qualidade é impecável e o design é único. Me sinto poderosa usando meu colar da Natal.",
    name: "Juliana S.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop",
    alt: "Retrato de Juliana S., cliente satisfeita",
    rating: 5,
  },
  {
    quote: "Atendimento incrível! Me ajudaram a escolher o presente perfeito para minha mãe e ela amou. A história da marca é inspiradora.",
    name: "Fernanda L.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    alt: "Retrato de Fernanda L., cliente satisfeita",
    rating: 5,
  },
  {
    quote: "Recebi minha pulseira super rápido e a embalagem é um charme. Dá pra ver o carinho em cada detalhe. Já quero a coleção completa!",
    name: "Mariana P.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop",
    alt: "Retrato de Mariana P., cliente satisfeita",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-carmine mb-4">
            O que nossas clientes dizem
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Histórias reais de mulheres que brilham com Natal Acessórios.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-tan/10 rounded-2xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
            >
              <Quote className="h-10 w-10 text-tan mb-4" />
              <p className="text-gray-700 italic mb-6 flex-grow">
                "{testimonial.quote}"
              </p>
              <div className="flex flex-col items-center">
                <img  alt={testimonial.alt} className="h-16 w-16 rounded-full object-cover mb-4 shadow-md" src={testimonial.avatar} />
                <span className="font-semibold text-carmine">{testimonial.name}</span>
                <div className="flex mt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;