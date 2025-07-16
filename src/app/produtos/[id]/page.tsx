'use client'; // ** N�O colocar aqui, pois � server component **

import ProductDetail from '@/components/ecommerce/ProductDetail';
import { getProductById } from '@/lib/api'; // Fun��o que busca produto pelo id, voc� deve criar essa fun��o

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
                <p>Produto n�o encontrado.</p>
            </div>
        );
    }

    // Importante: seu ProductDetail deve ser client component
    // Aqui, estamos no server component, ent�o passamos o produto como prop
    return <ProductDetail product={product} />;
}
