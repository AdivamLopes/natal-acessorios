import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Filter, Grid, List, SlidersHorizontal, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';
import { getAllProducts, searchProducts } from '@/data/api';
import { toast } from '@/components/ui/use-toast';
import { Slider } from '@/components/ui/slider';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { category: categoryParam } = useParams();
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState([1000]);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => [
    { id: '', name: 'Todas as Coleções' },
    { id: 'aneis', name: 'Anéis' },
    { id: 'colares', name: 'Colares' },
    { id: 'brincos', name: 'Brincos' },
    { id: 'pulseiras', name: 'Pulseiras' }
  ], []);

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      setLoading(true);
      try {
        const searchQuery = searchParams.get('search') || '';
        const productsData = searchQuery ? await searchProducts(searchQuery) : await getAllProducts();
        setAllProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast({ title: "Erro ao buscar produtos", description: "Tente novamente mais tarde.", variant: "destructive" });
      }
      setLoading(false);
    };
    fetchAndSetProducts();
  }, [searchParams]);

  const applyFilters = useCallback(() => {
    let productsToFilter = [...allProducts];

    if (selectedCategory) {
      productsToFilter = productsToFilter.filter(p => p.category === selectedCategory);
    }

    productsToFilter = productsToFilter.filter(p => p.price <= priceRange[0]);

    productsToFilter.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price;
        case 'price-high': return b.price - a.price;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
    
    setFilteredProducts(productsToFilter);
  }, [allProducts, selectedCategory, priceRange, sortBy]);
  
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    const params = new URLSearchParams(searchParams);
    if (categoryId) {
      params.set('category', categoryId);
    } else {
      params.delete('category');
    }
    setSearchParams(params, { replace: true });
  };
  
  const handleAdvancedFilters = () => {
    toast({ title: "🚧 Funcionalidade em desenvolvimento!" });
  };

  return (
    <div className="min-h-screen py-8 bg-white">
      <Helmet>
        <title>Coleções - Natal Acessórios</title>
        <meta name="description" content="Explore nossa coleção completa de semijóias." />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold gradient-text mb-4">Nossas Coleções</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Descubra peças únicas que combinam elegância e sofisticação.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className={`lg:w-72 space-y-6 transition-all duration-300 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-tan/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-carmine mb-4">Categorias</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button key={category.id} onClick={() => handleCategoryChange(category.id)} className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-base ${selectedCategory === category.id ? 'bg-tan text-carmine font-semibold' : 'text-gray-700 hover:bg-tan/50'}`}>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-tan/10 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-carmine mb-4">Faixa de Preço</h3>
              <div className="space-y-4">
                <Slider defaultValue={[1000]} max={1000} step={10} onValueChange={setPriceRange} className="w-full" />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>R$ 0</span>
                  <span>R$ {priceRange[0]}</span>
                </div>
              </div>
            </div>

            <Button onClick={handleAdvancedFilters} variant="outline" className="w-full border-tan text-carmine hover:bg-tan/20 hover:text-carmine">
              <SlidersHorizontal className="h-4 w-4 mr-2" /> Mais Filtros
            </Button>
          </motion.aside>

          <main className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="lg:hidden border-tan text-carmine">
                  <Filter className="h-4 w-4 mr-2" /> Filtros
                </Button>
                {!loading && <span className="text-gray-600">{filteredProducts.length} produtos</span>}
              </div>

              <div className="flex items-center gap-4">
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tan">
                  <option value="name">Ordenar por Nome</option>
                  <option value="price-low">Menor Preço</option>
                  <option value="price-high">Maior Preço</option>
                </select>
                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                  <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('grid')} className="rounded-none bg-tan/50 data-[state=active]:bg-tan"><Grid className="h-4 w-4" /></Button>
                  <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="sm" onClick={() => setViewMode('list')} className="rounded-none bg-tan/50 data-[state=active]:bg-tan"><List className="h-4 w-4" /></Button>
                </div>
              </div>
            </motion.div>

            {loading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)}
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {filteredProducts.map((product, index) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                    <ProductCard product={product} viewMode={viewMode} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {!loading && filteredProducts.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <div className="text-6xl mb-4">🧐</div>
                <h3 className="text-2xl font-semibold text-carmine mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 mb-6">Tente ajustar os filtros ou buscar por outro termo.</p>
                <Button onClick={() => handleCategoryChange('')} className="bg-carmine hover:bg-carmine-light text-white">Limpar Filtros</Button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;