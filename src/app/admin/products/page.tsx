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
    MoreVertical
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
    const { data: session, status } = useSession();
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
            setProducts(data);
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
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Produk Motor</h1>
                        <p className="text-gray-500 text-sm">{products.length} total produk</p>
                    </div>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                    <Plus size={18} />
                    Tambah Produk
                </Link>
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

            {/* Products Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Produk</th>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Kategori</th>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Harga</th>
                            <th className="text-left px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Promo</th>
                            <th className="text-right px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden relative shrink-0">
                                            <Image
                                                src={product.image}
                                                alt={product.name}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-xs text-gray-500">{product.cc}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 hidden md:table-cell">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 hidden lg:table-cell">
                                    <p className="font-medium">Rp {product.price.toLocaleString('id-ID')}</p>
                                    <p className="text-xs text-gray-500">DP: Rp {product.dpMin.toLocaleString('id-ID')}</p>
                                </td>
                                <td className="px-6 py-4">
                                    {product.promoActive ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-lg">
                                            <Tag size={12} />
                                            {product.promoBadgeText || 'Aktif'}
                                        </span>
                                    ) : (
                                        <span className="text-gray-400 text-xs">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/products/${product.id}`}
                                            className="p-2 hover:bg-gray-100 rounded-lg text-gray-600"
                                        >
                                            <Edit2 size={16} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 hover:bg-red-50 rounded-lg text-red-600"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        Tidak ada produk ditemukan
                    </div>
                )}
            </div>
        </div>
    );
}
