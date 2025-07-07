import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X, Heart, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

const menuItems = [
  { name: 'Início', path: '/' },
  { 
    name: 'Coleções', 
    path: '/produtos',
    subItems: [
      { name: 'Anéis', path: '/produtos/aneis', subcategories: ['Solitários', 'Aparadores', 'Falange'] },
      { name: 'Colares', path: '/produtos/colares', subcategories: ['Chokers', 'Gravatinhas', 'Pingentes'] },
      { name: 'Brincos', path: '/produtos/brincos', subcategories: ['Argolas', 'Ear Cuffs', 'Pequenos'] },
      { name: 'Pulseiras', path: '/produtos/pulseiras', subcategories: ['Braceletes', 'Berloques', 'Infantis'] },
    ],
    images: [
      'https://images.unsplash.com/photo-1611652022417-a55339f97247?w=500&q=80',
      'https://images.unsplash.com/photo-1617038220319-c5a0cf1b92b2?w=500&q=80'
    ]
  },
  { name: 'Sobre Nós', path: '/sobre-nos' },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const { getCartItemsCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value;
    if (searchQuery.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(searchQuery)}`);
      e.target.elements.search.value = '';
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWishlist = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  const logoDefault = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2beba3b7-4b9d-439e-8b64-51213a0e9ec8/93c3decb51596d56f05781d880e030df.png";
  const logoScrolled = "https://storage.googleapis.com/hostinger-horizons-assets-prod/2beba3b7-4b9d-439e-8b64-51213a0e9ec8/93c3decb51596d56f05781d880e030df.png";

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ scale: 1.05 }}>
              <img src={isScrolled ? logoScrolled : logoDefault} alt="Natal Acessórios Logo" className="h-20 transition-all duration-300" />
            </motion.div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8 font-sans">
            {menuItems.map((item) => (
              <div key={item.name} className="relative" onMouseEnter={() => item.subItems && setActiveMenu(item.name)}>
                <Link to={item.path} className="flex items-center text-gray-700 hover:text-tan-dark transition-colors font-medium">
                  {item.name}
                  {item.subItems && <ChevronDown className="h-4 w-4 ml-1" />}
                </Link>
              </div>
            ))}
          </nav>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="icon" onClick={handleWishlist} className="hidden md:inline-flex text-gray-700 hover:text-tan-dark">
              <Heart className="h-5 w-5" />
            </Button>

            <Link to="/perfil">
              <Button variant="ghost" size="icon" className="hidden md:inline-flex text-gray-700 hover:text-tan-dark relative">
                <User className="h-5 w-5" />
                {isAuthenticated && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-carmine ring-2 ring-white" />}
              </Button>
            </Link>

            <Link to="/carrinho" className="relative">
              <Button variant="ghost" size="icon" className="text-gray-700 hover:text-tan-dark">
                <ShoppingBag className="h-5 w-5" />
                {getCartItemsCount() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 cart-badge text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
                  >
                    {getCartItemsCount()}
                  </motion.span>
                )}
              </Button>
            </Link>

            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-700">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-tan/20"
            >
              <div className="flex flex-col space-y-4">
                {menuItems.map(item => (
                  <Link key={item.name} to={item.path} onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-tan-dark transition-colors font-medium py-2">{item.name}</Link>
                ))}
                <Link to="/perfil" onClick={() => setIsMenuOpen(false)} className="text-gray-700 hover:text-tan-dark transition-colors font-medium py-2">Minha Conta</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {activeMenu === 'Coleções' && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg"
          >
            <div className="container mx-auto px-4 py-8 grid grid-cols-6 gap-8">
              {menuItems.find(item => item.name === 'Coleções').subItems.map(subItem => (
                <div key={subItem.name} className="space-y-3">
                  <Link to={subItem.path} className="font-bold text-carmine hover:underline">{subItem.name}</Link>
                  <ul className="space-y-2">
                    {subItem.subcategories.map(cat => (
                      <li key={cat}><Link to={`${subItem.path}?sub=${cat.toLowerCase()}`} className="text-gray-600 hover:text-carmine">{cat}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <img  alt="Modelo com joias 1" class="rounded-lg object-cover w-full h-full" src="https://images.unsplash.com/photo-1611652022419-a9419f74343d" />
                <img  alt="Modelo com joias 2" class="rounded-lg object-cover w-full h-full" src="https://images.unsplash.com/photo-1559126204-56c6da39ecd1" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;