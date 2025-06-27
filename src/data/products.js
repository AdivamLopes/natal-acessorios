const products = [
  {
    id: 1,
    name: "Anel Solitário Radiante",
    description: "Elegante anel solitário banhado a ouro 18k com uma zircônia cúbica de alto brilho. Perfeito para ocasiões especiais e para adicionar um toque de sofisticação ao dia a dia.",
    price: 189.90,
    category: "aneis",
    images: [],
    rating: 5,
    reviews: 127,
    featured: true
  },
  {
    id: 2,
    name: "Anel Trio Harmonia",
    description: "Conjunto de três anéis delicados em prata 925 com detalhes em microzircônias. Ideal para compor um mix de anéis moderno e cheio de estilo.",
    price: 149.90,
    category: "aneis",
    images: [],
    rating: 4,
    reviews: 89,
    featured: false
  },
  {
    id: 3,
    name: "Anel Vintage Rosé",
    description: "Anel de design vintage em banho de ouro rosé com uma deslumbrante pedra central morganita. Uma peça atemporal e sofisticada.",
    price: 229.90,
    category: "aneis",
    images: [],
    rating: 5,
    reviews: 156,
    featured: true
  },
  {
    id: 4,
    name: "Colar Ponto de Luz",
    description: "Colar em corrente veneziana dourada com um pingente de zircônia solitária. Delicado e perfeito para iluminar o colo no dia a dia.",
    price: 159.90,
    category: "colares",
    images: [],
    rating: 4,
    reviews: 203,
    featured: true
  },
  {
    id: 5,
    name: "Colar Choker Elos",
    description: "Choker de elos grossos em banho de ouro. Uma peça statement que traz modernidade e atitude para qualquer look.",
    price: 89.90,
    category: "colares",
    images: [],
    rating: 4,
    reviews: 145,
    featured: false
  },
  {
    id: 6,
    name: "Colar Pérolas Clássico",
    description: "Colar de pérolas de água doce com fecho em prata 925. A elegância clássica que nunca sai de moda, para todas as ocasiões.",
    price: 199.90,
    category: "colares",
    images: [],
    rating: 5,
    reviews: 178,
    featured: true
  },
  {
    id: 7,
    name: "Brincos Argola Essencial",
    description: "Brincos de argola média em banho de ouro 18k com acabamento polido. Clássicos e versáteis para qualquer ocasião.",
    price: 129.90,
    category: "brincos",
    images: [],
    rating: 5,
    reviews: 234,
    featured: true
  },
  {
    id: 8,
    name: "Brincos Gota de Cristal",
    description: "Brincos pendentes com cristais em formato de gota e base em ródio branco. Brilho e elegância garantidos para eventos especiais.",
    price: 179.90,
    category: "brincos",
    images: [],
    rating: 4,
    reviews: 167,
    featured: false
  },
  {
    id: 9,
    name: "Brincos Botão Pérola",
    description: "Brincos de botão com pérolas barrocas e base em banho de ouro rosé. Delicados, orgânicos e sofisticados.",
    price: 99.90,
    category: "brincos",
    images: [],
    rating: 4,
    reviews: 192,
    featured: false
  },
  {
    id: 10,
    name: "Pulseira Elos Delicados",
    description: "Pulseira em corrente de elos finos em prata 925 com pingentes de estrela. Moderna e cheia de personalidade.",
    price: 119.90,
    category: "pulseiras",
    images: [],
    rating: 4,
    reviews: 156,
    featured: false
  },
  {
    id: 11,
    name: "Pulseira Riviera Zircônias",
    description: "Pulseira estilo riviera com zircônias coloridas em banho de ouro 18k. Cada pedra conta uma história de brilho e cor.",
    price: 249.90,
    category: "pulseiras",
    images: [],
    rating: 5,
    reviews: 143,
    featured: true
  },
  {
    id: 12,
    name: "Pulseira Tênis Cristal",
    description: "Pulseira modelo tênis com zircônias brancas cravejadas em base de ródio. Luxo e brilho em cada detalhe.",
    price: 189.90,
    category: "pulseiras",
    images: [],
    rating: 5,
    reviews: 198,
    featured: false
  },
  {
    id: 13,
    name: "Anel Infinito Delicado",
    description: "Anel com símbolo do infinito em prata 925 cravejado com microzircônias. Representa amor eterno e conexão.",
    price: 139.90,
    category: "aneis",
    images: [],
    rating: 4,
    reviews: 112,
    featured: false
  },
  {
    id: 14,
    name: "Colar Mandala Energética",
    description: "Colar com pingente de mandala em banho de ouro com detalhes vazados. Para atrair boas energias com muito estilo.",
    price: 169.90,
    category: "colares",
    images: [],
    rating: 5,
    reviews: 187,
    featured: false
  },
  {
    id: 15,
    name: "Brincos Ear Cuff Moderno",
    description: "Ear cuff em prata 925 com design geométrico e minimalista. Tendência moderna para looks despojados e elegantes.",
    price: 79.90,
    category: "brincos",
    images: [],
    rating: 4,
    reviews: 98,
    featured: false
  },
  {
    id: 16,
    name: "Pulseira Rígida Minimalista",
    description: "Pulseira bracelete rígido em banho de ouro com design liso e minimalista. Estilo casual, moderno e chique.",
    price: 69.90,
    category: "pulseiras",
    images: [],
    rating: 4,
    reviews: 134,
    featured: false
  }
];

export const getAllProducts = () => products;
export const getProductById = (id) => products.find(p => p.id === id);
export const getProductsByCategory = (category) => products.filter(p => p.category === category);
export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getRelatedProducts = (category, excludeId, limit = 4) => products.filter(p => p.category === category && p.id !== excludeId).slice(0, limit);
export const searchProducts = (query) => {
  if (!query) return products;
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerCaseQuery) ||
    p.description.toLowerCase().includes(lowerCaseQuery) ||
    p.category.toLowerCase().includes(lowerCaseQuery)
  );
};