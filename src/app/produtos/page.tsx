// /app/produtos/page.tsx
import Link from 'next/link';
import { getAllProducts } from '@/lib/api'; // Função que busca todos os produtos, você deve criar essa função

export default async function ProdutosPage() {
    const produtos = await getAllProducts();

    if (!produtos.length) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Nenhum produto encontrado.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-carmine">Produtos</h1>
            <ul className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {produtos.map((produto: any) => (
                    <li key={produto.id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <Link href={`/produtos/${produto.id}`}>
                            <a>
                                <img
                                    src={produto.mainImage}
                                    alt={`Imagem do produto ${produto.name}`}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-lg font-semibold text-gray-800">{produto.name}</h2>
                                <p className="text-carmine font-bold">R$ {produto.price.toFixed(2)}</p>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
