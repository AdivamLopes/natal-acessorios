'use client'; // ** NÃO colocar aqui, pois é server component **

import ProductDetail from '@/components/ecommerce/ProductDetail';
import { getProductById } from '@/lib/api'; // Função que busca produto pelo id, você deve criar essa função

interface Props {
    params: {
        id: string;
    };
}

export default async function ProdutoPage({ params }: Props) {
    const { id } = params;
    const product = await getProductById(id);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Produto não encontrado.</p>
            </div>
        );
    }

    // Importante: seu ProductDetail deve ser client component
    // Aqui, estamos no server component, então passamos o produto como prop
    return <ProductDetail product={product} />;
}
