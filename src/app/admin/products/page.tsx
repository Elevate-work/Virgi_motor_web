'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft,
    Plus,
    Search,
    Edit2,
    Trash2,
    Tag,
    Bike
} from 'lucide-react';

type Product = {
    id: string;
    name: string;
    slug: string;
    category: string;
    price: number;
    dpMin: number;
    cc: string;
    image: string;
    promoActive: boolean;
    promoBadgeText: string | null;
};

export default function ProductsPage() {
    const { status } = useSession();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

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
            if (Array.isArray(data)) {
                setProducts(data);
            }
        } catch (error) {
            console.error('Failed to fetch products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus produk ini?')) return;

        try {
            await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
            fetchProducts();
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (status === 'loading' || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Produk Motor</h1>
                        <p className="text-gray-500 text-sm">{products.length} total produk</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <Link
                        href="/admin/products/new"
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-primary text-white rounded-xl font-medium"
                    >
                        <Plus size={18} />
                        Tambah Produk
                    </Link>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    placeholder="Cari produk..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
            </div>

            {/* Products Grid - Mobile Friendly Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                        {/* Product Image */}
                        <div className="relative h-40 bg-gray-50">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain p-4"
                            />
                            {product.promoActive && (
                                <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                                    <Tag size={10} />
                                    {product.promoBadgeText || 'PROMO'}
                                </span>
                            )}
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                            <div className="flex items-start justify-between gap-2 mb-2">
                                <div>
                                    <h3 className="font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                                    <p className="text-xs text-gray-500">{product.cc} • {product.category}</p>
                                </div>
                            </div>

                            <div className="flex items-end justify-between mb-4">
                                <div>
                                    <p className="text-xs text-gray-400">Harga OTR</p>
                                    <p className="font-bold text-gray-900">Rp {product.price.toLocaleString('id-ID')}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-gray-400">DP Min</p>
                                    <p className="font-medium text-primary">Rp {product.dpMin.toLocaleString('id-ID')}</p>
                                </div>
                            </div>

                            {/* Action Buttons - Always Visible */}
                            <div className="flex gap-2">
                                <Link
                                    href={`/admin/products/${product.id}`}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium active:scale-95 transition-transform"
                                >
                                    <Edit2 size={16} />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="px-4 py-3 bg-red-50 text-red-600 rounded-lg active:scale-95 transition-transform"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="text-center py-16 text-gray-500">
                    <Bike size={48} className="mx-auto mb-4 text-gray-300" />
                    <p className="mb-2">Tidak ada produk ditemukan</p>
                    <Link href="/admin/products/new" className="text-primary font-medium hover:underline">
                        + Tambah Produk Pertama
                    </Link>
                </div>
            )}
        </div>
    );
}
