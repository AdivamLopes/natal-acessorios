import React from 'react';
import { Head } from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Gem, Users, Heart } from 'lucide-react';
import Image from 'next/image';

const About = () => {
  const familyPhotos = [
    { src: "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=1974&auto=format&fit=crop", alt: "Matriarca da família Natal sorrindo, uma mulher de cabelos grisalhos e olhar sábio" },
    { src: "https://images.unsplash.com/photo-1521141424236-c054c6d489c9?q=80&w=1974&auto=format&fit=crop", alt: "Três gerações de mulheres da família Natal rindo juntas em um jardim florido" },
    { src: "https://images.unsplash.com/photo-1556742521-9638c1a7a8a8?q=80&w=1974&auto=format&fit=crop", alt: "Jovem empreendedora da família Natal trabalhando em seu ateliê de joias" },
    { src: "https://images.unsplash.com/photo-1561406636-b8023750916f?q=80&w=1974&auto=format&fit=crop", alt: "Foto antiga em preto e branco da família Natal reunida em uma celebração" },
    { src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=2070&auto=format&fit=crop", alt: "Duas irmãs da família Natal se abraçando em um campo ao pôr do sol" },
    { src: "https://images.unsplash.com/photo-1588444968368-a315ebb75747?q=80&w=1974&auto=format&fit=crop", alt: "Detalhe das mãos de uma artesã da família Natal criando uma joia com delicadeza" },
  ];

  return (
    <div className="bg-white">
      <Head>
        <title>Sobre Nós - Natal Acessórios</title>
        <meta name="description" content="Conheça a história da Natal Acessórios, uma marca inspirada na força e no legado das mulheres da família Natal." />
      </Head>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-tan/20 py-20 md:py-32"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl font-display font-bold gradient-text mb-4"
          >
            Nossa História
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl max-w-3xl mx-auto text-gray-700"
          >
            Inspirada por gerações de mulheres fortes, corajosas e empreendedoras.
          </motion.p>
        </div>
      </motion.section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-display font-bold text-carmine">
                O Legado da Família Natal
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                A Natal Acessórios é mais do que uma marca de jóias; é a celebração de um legado. Nossa história começa com as mulheres da família Natal, uma linhagem de personalidades marcantes, dotadas de uma incrível iniciativa, coragem e um espírito empreendedor contagiante.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Desde a nossa matriarca, que com poucas ferramentas e muita determinação criou as primeiras peças, até as gerações seguintes, que expandiram o sonho e transformaram a paixão em um negócio, cada mulher Natal deixou sua marca. Elas nos ensinaram que a verdadeira beleza reside na força interior e na capacidade de criar o próprio destino.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Hoje, cada anel, colar, brinco e pulseira que desenhamos carrega um fragmento dessa herança. São peças criadas para adornar e, acima de tudo, para inspirar outras mulheres a reconhecerem e celebrarem sua própria força.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute -top-4 -left-4 w-full h-full border-4 border-tan rounded-xl"></div>
                              <Image
                                  src="https://images.unsplash.com/photo-1593267720070-2ed9337829a7"
                                  alt="Foto da matriarca da família Natal, uma mulher sorridente e elegante"
                                  fill
                                  className="object-cover rounded-xl"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  priority
                              />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-tan/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-display font-bold text-carmine mb-4">
              Nossa Galeria de Inspirações
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Um vislumbre das mulheres que moldaram quem somos.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {familyPhotos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                    <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }} className="p-6">
              <Gem className="h-12 w-12 mx-auto text-tan mb-4" />
              <h3 className="text-2xl font-display font-semibold text-carmine mb-2">Nossa Missão</h3>
              <p className="text-gray-600">Criar jóias atemporais que celebrem a força e a individualidade de cada mulher.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} viewport={{ once: true }} className="p-6">
              <Users className="h-12 w-12 mx-auto text-tan mb-4" />
              <h3 className="text-2xl font-display font-semibold text-carmine mb-2">Nossa Visão</h3>
              <p className="text-gray-600">Ser reconhecida como uma marca que inspira e empodera através de design e história.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} viewport={{ once: true }} className="p-6">
              <Heart className="h-12 w-12 mx-auto text-tan mb-4" />
              <h3 className="text-2xl font-display font-semibold text-carmine mb-2">Nossos Valores</h3>
              <p className="text-gray-600">Legado, coragem, qualidade, autenticidade e paixão pelo que fazemos.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;