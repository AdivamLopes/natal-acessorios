import { client, urlFor } from '@/lib/sanity';

const mapProduct = (p) => {
  if (!p) return null;
  return {
    id: p._id,
    name: p.name || 'Nome do Produto',
    slug: p.slug,
    description: p.description || 'Descrição não disponível.',
    price: p.price || 0,
    inStock: p.inStock ?? true,
    mainImage: p.image ? urlFor(p.image).width(600).height(750).url() : 'https://via.placeholder.com/600x750',
    images: [p.image ? urlFor(p.image).url() : 'https://via.placeholder.com/600x750'],
    categories: p.categories || [],
    category: p.categories?.length > 0 ? p.categories[0].slug : 'sem-categoria',
    rating: 4.5,
    reviews: Math.floor(Math.random() * 50) + 5,
  };
};

const productFields = `
  _id,
  name,
  "slug": slug.current,
  description,
  price,
  inStock,
  image,
  "categories": categories[]->{
    name,
    "slug": slug.current
  }
`;

export async function getAllProducts() {
  const query = `*[_type == "product"]{${productFields}}`;
  const sanityProducts = await client.fetch(query);
  return sanityProducts.map(mapProduct);
}

export async function getProductById(id) {
  const query = `*[_type == "product" && _id == $id][0]{${productFields}}`;
  const sanityProduct = await client.fetch(query, { id });
  return mapProduct(sanityProduct);
}

export async function getFeaturedProducts() {
  const query = `*[_type == "product"] | order(_createdAt desc) [0...4] {${productFields}}`;
  const sanityProducts = await client.fetch(query);
  return sanityProducts.map(mapProduct);
}

export async function searchProducts(searchQuery) {
  if (!searchQuery) return getAllProducts();
  const query = `*[_type == "product" && (name match $query || description match $query)]{${productFields}}`;
  const sanityProducts = await client.fetch(query, { query: `${searchQuery}*` });
  return sanityProducts.map(mapProduct);
}

export async function getRelatedProducts(category, excludeId) {
  if (!category) return [];
  const query = `*[_type == "product" && $category in categories[]->slug.current && _id != $excludeId][0...4]{${productFields}}`;
  const sanityProducts = await client.fetch(query, { category, excludeId });
  return sanityProducts.map(mapProduct);
}