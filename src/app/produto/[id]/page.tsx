// app/produtos/[id]/page.tsx
import { getProductById } from '@/lib/api'; // ajuste para seu fetch real
import ProductDetail from './ProductDetail';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);

    if (!product) {
        return {
            title: 'Produto não encontrado - Natal Acessórios',
            description: 'Produto não disponível no momento.',
        };
    }

    return {
        title: `${product.name} - Natal Acessórios`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);
    return <ProductDetail product={product} />;
}
