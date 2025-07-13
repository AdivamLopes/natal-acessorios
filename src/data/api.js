import { client, urlFor } from '@/lib/sanity';
import groq from 'groq';

//  Utilitário para formatar produtos com URL da imagem
const formatProduct = (product) => ({
    ...product,
    imagemUrl: product.imagem ? urlFor(product.imagem).url() : null
});

// Buscar todos os produtos
export const getAllProducts = async () => {
    const query = groq`*[_type == "produto"]{
    _id,
    nome,
    preco,
    imagem,
    "categoria": categoria->nome,
    estoque,
    featured
  }`;
    const products = await client.fetch(query);
    return products.map(formatProduct);
};

// Buscar um produto por ID
export const getProductById = async (id) => {
    const query = groq`*[_type == "produto" && _id == $id][0]{
    _id,
    nome,
    preco,
    imagem,
    "categoria": categoria->nome,
    estoque,
    featured
  }`;
    const product = await client.fetch(query, { id });
    return product ? formatProduct(product) : null;
};

// Buscar produtos por nome (pesquisa)
export const searchProducts = async (term) => {
    const query = groq`*[_type == "produto" && nome match $term]{
    _id,
    nome,
    preco,
    imagem,
    "categoria": categoria->nome,
    estoque,
    featured
  }`;
    const products = await client.fetch(query, { term: `*${term}*` });
    return products.map(formatProduct);
};

//  Buscar produtos por categoria
export const getProductsByCategory = async (categoryName) => {
    const query = groq`*[_type == "produto" && categoria->nome == $categoryName]{
    _id,
    nome,
    preco,
    imagem,
    "categoria": categoria->nome,
    estoque,
    featured
  }`;
    const products = await client.fetch(query, { categoryName });
    return products.map(formatProduct);
};

//  Produtos em destaque (featured == true)
export const getFeaturedProducts = async () => {
    const query = groq`*[_type == "produto" && featured == true]{
    _id,
    nome,
    preco,
    imagem,
    "categoria": categoria->nome,
    estoque,
    featured
  }`;
    const products = await client.fetch(query);
    return products.map(formatProduct);
};

//  Buscar categorias
export const getAllCategories = async () => {
    const query = groq`*[_type == "categoria"]{
    _id,
    nome
  }`;
    return await client.fetch(query);
};
