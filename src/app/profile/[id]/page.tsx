import ProductDetail from '@/components/ecommerce/ProductDetail';
import { getProductById } from '@/lib/api'; // Função que busca produto pelo id, você deve criar essa função

interface Props {
    params: {
        id: string;
    };
}

export default async function ProfilePage({ params }: Props) {
    const { id } = params;
    const product = await getProductById(id);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Produto não encontrado.</p>
            </div>
        );
    }

    // ProductDetail é um client component, aqui server component passa a prop
    return <ProductDetail product={product} />;
}
