import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const categories = [
  {
    name: 'Anéis',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1974&auto=format&fit=crop',
    description: 'Anel de noivado de diamante em uma caixa de veludo'
  },
  {
    name: 'Colares',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1974&auto=format&fit=crop',
    description: 'Colar de pérolas elegante em um busto de exibição de joias'
  },
  {
    name: 'Brincos',
    image: 'https://images.unsplash.com/photo-1610214352438-924c55a557b7?q=80&w=1974&auto=format&fit=crop',
    description: 'Par de brincos de diamante brilhantes em fundo escuro'
  },
  {
    name: 'Pulseiras',
    image: 'https://images.unsplash.com/photo-1620921443223-5d5440294f99?q=80&w=1974&auto=format&fit=crop',
    description: 'Pulseira de ouro e prata entrelaçadas em uma superfície texturizada'
  },
];

const Hero = () => {
  const [activeImage, setActiveImage] = useState(categories[0].image);
  const [activeDescription, setActiveDescription] = useState(categories[0].description);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value;
    if (searchQuery.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative h-screen bg-cover bg-center hero-bg-transition" style={{ backgroundImage: `url(${activeImage})` }}>
      <AnimatePresence>
        <motion.div
          key={activeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${activeImage})` }}
        >
          <img  className="hidden" alt={activeDescription} src={activeImage} />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/50" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-display font-bold mb-4"
        >
          A roupa veste, o acessório revela.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl max-w-2xl mb-8"
        >
          Encontre a jóia atemporal que conta a sua história. Peças únicas para mulheres fortes.
        </motion.p>
        
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full max-w-2xl bg-white/20 backdrop-blur-sm rounded-full flex items-center pr-2"
        >
          <input
            type="text"
            name="search"
            placeholder="Encontre sua jóia perfeita..."
            className="w-full bg-transparent text-white placeholder-white/80 py-3 px-6 rounded-full focus:outline-none"
          />
          <Button type="submit" size="icon" className="bg-tan hover:bg-tan-dark rounded-full flex-shrink-0">
            <Search className="h-5 w-5 text-carmine" />
          </Button>
        </motion.form>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-2 md:grid-cols-4">
        {categories.map((cat, index) => (
          <div
            key={cat.name}
            onMouseEnter={() => {
              setActiveImage(cat.image);
              setActiveDescription(cat.description);
            }}
            onClick={() => navigate(`/produtos?category=${cat.name.toLowerCase()}`)}
            className="relative p-6 text-white text-center cursor-pointer bg-black/30 backdrop-blur-sm hover:bg-tan/80 hover:text-carmine transition-colors duration-300 border-t border-r border-white/10"
          >
            <h3 className="font-display text-2xl font-semibold">{cat.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;