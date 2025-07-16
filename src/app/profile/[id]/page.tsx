import ProductDetail from '@/components/ecommerce/ProductDetail';
import { getProductById } from '@/lib/api'; // Fun��o que busca produto pelo id, voc� deve criar essa fun��o

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
                <p>Produto n�o encontrado.</p>
            </div>
        );
    }

    // ProductDetail � um client component, aqui server component passa a prop
    return <ProductDetail product={product} />;
}
