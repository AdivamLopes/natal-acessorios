import Link from 'next/link'

export default function ProductCard({ product }) {
    const formatPrice = (price) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price)
    }

    const hasDiscount = product.salePrice && product.salePrice < product.price

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link href={`/produto/${product.slug.current}`}>
                <a className="relative aspect-square block">
                    {product.images && product.images[0] && (
                        <img
                            src={product.images?.[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}

                    {hasDiscount && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                            {Math.round(((product.price - product.salePrice) / product.price) * 100)}% OFF
                        </div>
                    )}

                    {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">ESGOTADO</span>
                        </div>
                    )}
                </a>
            </Link>

            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        {hasDiscount ? (
                            <>
                                <span className="text-gray-400 line-through text-sm">
                                    {formatPrice(product.price)}
                                </span>
                                <span className="text-green-600 font-bold text-lg">
                                    {formatPrice(product.salePrice)}
                                </span>
                            </>
                        ) : (
                            <span className="text-gray-900 font-bold text-lg">
                                {formatPrice(product.price)}
                            </span>
                        )}
                    </div>

                    <Link href={`/produto/${product.slug.current}`}>
                        <a className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition-colors duration-200">
                            Ver Detalhes
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    );
}