'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft,
    Tag,
    Edit2,
    ToggleLeft,
    ToggleRight
} from 'lucide-react';

type Product = {
    id: string;
    name: string;
    image: string;
    category: string;
    promoActive: boolean;
    promoBadgeText: string | null;
    promoHighlights: string[];
};

export default function PromoPage() {
    const { status } = useSession();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/admin/products');
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    const togglePromo = async (id: string, currentStatus: boolean) => {
        try {
            await fetch(`/api/admin/products/${id}/toggle-promo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ promoActive: !currentStatus }),
            });
            fetchProducts();
        } catch (error) {
            console.error('Failed to toggle:', error);
        }
    };

    const activePromos = products.filter(p => p.promoActive);
    const inactiveProducts = products.filter(p => !p.promoActive);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Kelola Promo</h1>
                    <p className="text-gray-500 text-sm">{activePromos.length} promo aktif dari {products.length} produk</p>
                </div>
            </div>

            {/* Active Promos */}
            <div className="mb-12">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag size={20} className="text-green-500" />
                    Promo Aktif
                </h2>

                {activePromos.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {activePromos.map((product) => (
                            <PromoCard
                                key={product.id}
                                product={product}
                                onToggle={() => togglePromo(product.id, product.promoActive)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-200 p-8 text-center text-gray-500">
                        Belum ada promo aktif. Aktifkan promo dari daftar di bawah.
                    </div>
                )}
            </div>

            {/* All Products */}
            <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Produk Lainnya</h2>
                <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                    {inactiveProducts.map((product) => (
                        <div key={product.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden relative">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{product.name}</p>
                                    <p className="text-xs text-gray-500">{product.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Link
                                    href={`/admin/products/${product.id}`}
                                    className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                                >
                                    <Edit2 size={16} />
                                </Link>
                                <button
                                    onClick={() => togglePromo(product.id, product.promoActive)}
                                    className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-primary hover:text-white transition-colors text-sm font-medium"
                                >
                                    <ToggleLeft size={16} />
                                    Aktifkan Promo
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function PromoCard({ product, onToggle }: { product: Product; onToggle: () => void }) {
    return (
        <div className="bg-white rounded-2xl border border-green-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="relative h-32 bg-gradient-to-br from-green-50 to-white p-4 flex items-center justify-center">
                <Image
                    src={product.image}
                    alt={product.name}
                    width={120}
                    height={80}
                    className="object-contain"
                />
                <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-bold rounded-lg">
                        AKTIF
                    </span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{product.name}</h3>
                {product.promoBadgeText && (
                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg mb-2">
                        {product.promoBadgeText}
                    </span>
                )}
                {product.promoHighlights.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {product.promoHighlights.slice(0, 2).map((h, i) => (
                            <span key={i} className="text-xs text-gray-500">• {h}</span>
                        ))}
                    </div>
                )}
                <div className="flex gap-2">
                    <Link
                        href={`/admin/products/${product.id}`}
                        className="flex-1 py-2 text-center bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                    >
                        Edit Detail
                    </Link>
                    <button
                        onClick={onToggle}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                        title="Nonaktifkan Promo"
                    >
                        <ToggleRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
