import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Heart, Share2, Star, Shield, Truck, Gem, XCircle, Ruler, Weight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getRelatedProducts } from '@/data/api';
import { toast } from '@/components/ui/use-toast';
import ProductCard from '@/components/ProductCard';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCardSkeleton from '@/components/ProductCardSkeleton';

const ProductHighlights = () => (
  <div className="bg-tan/10 rounded-2xl p-6 mt-8 space-y-4">
    <div className="flex items-start gap-4">
      <div className="bg-white p-2 rounded-full"><Truck className="h-6 w-6 text-tan-dark" /></div>
      <div>
        <h4 className="font-semibold text-gray-800">Frete Grátis</h4>
        <p className="text-sm text-gray-600">Acima de R$299 para todo Brasil.</p>
      </div>
    </div>
    <div className="flex items-start gap-4">
      <div className="bg-white p-2 rounded-full"><Gem className="h-6 w-6 text-tan-dark" /></div>
      <div>
        <h4 className="font-semibold text-gray-800">Banhado a Ouro 18k e Ródio</h4>
        <p className="text-sm text-gray-600">Metal nobre de 5 a 10 milésimos, muito usado em joalheria.</p>
      </div>
    </div>
    <div className="flex items-start gap-4">
      <div className="bg-white p-2 rounded-full"><XCircle className="h-6 w-6 text-tan-dark" /></div>
      <div>
        <h4 className="font-semibold text-gray-800">Níquel Free</h4>
        <p className="text-sm text-gray-600">Nossa fábrica não manipula níquel, garantindo a não contaminação.</p>
      </div>
    </div>
    <div className="flex items-start gap-4">
      <div className="bg-white p-2 rounded-full"><Shield className="h-6 w-6 text-tan-dark" /></div>
      <div>
        <h4 className="font-semibold text-gray-800">Garantia de 1 Ano</h4>
        <p className="text-sm text-gray-600">Cobrimos o banho e defeitos de fabricação.</p>
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const productData = await getProductById(id);
        if (productData) {
          setProduct(productData);
          const related = await getRelatedProducts(productData.category, productData.id);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        toast({ title: "Erro ao carregar produto", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      toast({ title: "Produto adicionado! 🛍️", description: `${quantity}x ${product.name} foi adicionado ao carrinho.` });
    }
  };

  const handleActionClick = () => {
    toast({ title: "🚧 Funcionalidade em desenvolvimento!" });
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💎</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Produto não encontrado</h2>
          <Link to="/produtos"><Button className="bg-carmine hover:bg-carmine-light text-white">Ver Todas as Coleções</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-white">
      <Helmet>
        <title>{product.name} - Natal Acessórios</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Link to="/produtos">
            <Button variant="ghost" className="text-gray-600 hover:text-carmine"><ArrowLeft className="h-4 w-4 mr-2" />Voltar para Coleções</Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square rounded-2xl overflow-hidden bg-tan/10 shadow-lg flex items-center justify-center">
              <img alt={`Imagem principal do produto ${product.name}`} className="w-full h-full object-cover" src={product.mainImage} />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-carmine mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (<Star key={i} className={`h-5 w-5 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />))}
                  <span className="ml-2 text-gray-600">({product.reviews} avaliações)</span>
                </div>
              </div>
              <div className="text-4xl font-bold text-tan-dark mb-4">R$ {product.price.toFixed(2)}</div>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <label className="text-gray-700 font-medium">Quantidade:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-tan/20 transition-colors rounded-l-lg">-</button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-tan/20 transition-colors rounded-r-lg">+</button>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button onClick={handleAddToCart} size="lg" className="flex-1 bg-carmine hover:bg-carmine-light text-white py-4 text-lg">Adicionar ao Carrinho</Button>
                <Button onClick={handleActionClick} variant="outline" size="lg" className="border-tan text-carmine hover:bg-tan/20 hover:text-carmine"><Heart className="h-5 w-5" /></Button>
                <Button onClick={handleActionClick} variant="outline" size="lg" className="border-gray-300 text-gray-600 hover:bg-gray-100"><Share2 className="h-5 w-5" /></Button>
              </div>
            </div>
            <ProductHighlights />
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-carmine">Especificações</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-center gap-3"><Ruler className="h-5 w-5 text-tan-dark"/><span>Dimensões: 15cm x 10cm x 5cm</span></div>
              <div className="flex items-center gap-3"><Weight className="h-5 w-5 text-tan-dark"/><span>Peso: 150g</span></div>
              <div className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-tan-dark"/><span>Cuidados: Evitar contato com produtos químicos.</span></div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-display font-bold text-carmine">Avaliações de Clientes</h3>
            <div className="space-y-4">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="border-b border-tan/20 pb-4">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((s, si) => <Star key={si} className="h-4 w-4 text-yellow-400 fill-current"/>)}
                    <span className="ml-2 font-semibold text-gray-800">Cliente Satisfeita</span>
                  </div>
                  <p className="text-gray-600">"Peça maravilhosa, superou minhas expectativas! Qualidade incrível e brilho sem igual. Recomendo!"</p>
                </div>
              ))}
              <Button variant="link" className="text-carmine p-0">Ver todas as avaliações</Button>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-3xl font-display font-bold text-carmine mb-8 text-center">Você também pode gostar</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
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

const ProductDetailSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <Skeleton className="h-8 w-48 mb-8" />
    <div className="grid lg:grid-cols-2 gap-12 mb-16">
      <div className="space-y-4">
        <Skeleton className="aspect-square rounded-2xl w-full" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-10 w-1/3 mb-4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Skeleton className="h-14 flex-1" />
          <Skeleton className="h-14 w-14" />
          <Skeleton className="h-14 w-14" />
        </div>
      </div>
    </div>
    <div className="text-center mb-8"><Skeleton className="h-10 w-72 mx-auto" /></div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  </div>
);

export default ProductDetail;