import { useState, useEffect } from 'react'
import { client } from '../lib/sanity'
import { PRODUCTS_QUERY, CATEGORIES_QUERY } from '../lib/queries'
import ProductCard from '../components/ProductCard'

export default function ProdutosPage({ products, categories }) {
    const [filteredProducts, setFilteredProducts] = useState(products)
    const [selectedCategory, setSelectedCategory] = useState('')
    const [sortBy, setSortBy] = useState('newest')

    const filterAndSortProducts = () => {
        let filtered = products

        // Filtrar por categoria
        if (selectedCategory) {
            filtered = filtered.filter(product => product.category === selectedCategory)
        }

        // Ordenar
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
                break
            case 'price-high':
                filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
                break
            case 'name':
                filtered.sort((a, b) => a.name.localeCompare(b.name))
                break
            default: // newest
                // Já vem ordenado por data de criação
                break
        }

        setFilteredProducts(filtered)
    }

    useEffect(() => {
        filterAndSortProducts()
    }, [selectedCategory, sortBy])

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Nossos Produtos</h1>

            {/* Filtros */}
            <div className="flex flex-wrap gap-4 mb-8 p-4 bg-gray-100 rounded-lg">
                <div>
                    <label className="block text-sm font-medium mb-2">Categoria:</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border rounded px-3 py-2"
                    >
                        <option value="">Todas as categorias</option>
                        {categories.map(category => (
                            <option key={category._id} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Ordenar por:</label>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="border rounded px-3 py-2"
                    >
                        <option value="newest">Mais recentes</option>
                        <option value="price-low">Menor preço</option>
                        <option value="price-high">Maior preço</option>
                        <option value="name">Nome A-Z</option>
                    </select>
                </div>
            </div>

            {/* Grid de produtos */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Nenhum produto encontrado com os filtros selecionados.</p>
                </div>
            )}
        </div>
    )
}

export async function getStaticProps() {
    const products = await client.fetch(PRODUCTS_QUERY)
    const categories = await client.fetch(CATEGORIES_QUERY)

    return {
        props: {
            products,
            categories,
        },
        revalidate: 60, // Revalidar a cada 60 segundos
    }
}