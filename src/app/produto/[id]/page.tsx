// app/produtos/[id]/page.tsx
import { getProductById } from '@/lib/api'; // ajuste para seu fetch real
import ProductDetail from './ProductDetail';

export async function generateMetadata({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);

    if (!product) {
        return {
            title: 'Produto n�o encontrado - Natal Acess�rios',
            description: 'Produto n�o dispon�vel no momento.',
        };
    }

    return {
        title: `${product.name} - Natal Acess�rios`,
        description: product.description,
    };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await getProductById(params.id);
    return <ProductDetail product={product} />;
}
