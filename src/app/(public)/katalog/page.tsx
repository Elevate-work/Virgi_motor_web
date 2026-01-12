'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, Bike, Zap, Settings, Filter, Loader2 } from 'lucide-react';
import { siteConfig } from '@/lib/config';

// Type untuk product dari API
type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    features: string[];
    cc: string;
    dp_min: number;
    promo?: {
        isActive: boolean;
        badgeText: string | null;
        highlights: string[];
        cardBgColor: string | null;
        cardTextColor: string | null;
    };
};

const categories = [
    { id: 'All', label: 'Semua', icon: <Bike size={16} /> },
    { id: 'Matic', label: 'Matic', icon: <Zap size={16} /> },
    { id: 'Sport', label: 'Sport', icon: <Settings size={16} /> },
    { id: 'Cub', label: 'Bebek', icon: <Bike size={16} /> },
];

export default function Catalog() {
    const [filter, setFilter] = useState<'All' | 'Matic' | 'Sport' | 'Cub' | 'EV'>('All');
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch products dari database
    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await fetch('/api/public/products');
                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product => {
        const matchesCategory = filter === 'All' || product.category === filter;
        const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const productCount = filteredProducts.length;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-24">

            {/* === COMPACT HERO / HEADER SECTION === */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 pt-16 pb-12">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

                        {/* Title & SEO Text */}
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-red-50 border border-red-100 rounded-full">
                                <span className="w-2 h-2 rounded-full bg-[#DA0000] animate-pulse" />
                                <span className="text-xs font-bold text-[#DA0000] uppercase tracking-wider">Harga OTR Cikarang & Bekasi</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-tesla-black leading-tight mb-4 tracking-tight">
                                Katalog Motor <span className="text-[#DA0000]">Honda</span>
                            </h1>
                            <p className="text-gray-500 text-lg">
                                Temukan spesifikasi lengkap, fitur unggulan, dan simulasi kredit termurah untuk motor impian Anda di Virgi Motor.
                            </p>
                        </div>

                        {/* Search Bar - Integrated in Hero */}
                        <div className="w-full md:w-auto relative group z-10">
                            <input
                                type="text"
                                className="w-full md:w-80 pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-full text-base font-medium text-tesla-black focus:outline-none focus:ring-2 focus:ring-[#DA0000]/20 focus:border-[#DA0000] transition-all"
                                placeholder="Cari tipe motor..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#DA0000] transition-colors" size={20} />
                        </div>
                    </div>
                </div>
            </div>

            {/* === STICKY FILTER BAR === */}
            <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">

                    {/* Category Tabs */}
                    <div className="flex gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id as any)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${filter === cat.id
                                    ? 'bg-tesla-black text-white border-tesla-black'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                {/* Icon color logic */}
                                <span className={filter === cat.id ? 'text-white' : 'text-gray-400'}>
                                    {cat.icon}
                                </span>
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* Count */}
                    <div className="text-sm text-gray-500 font-medium whitespace-nowrap hidden sm:block">
                        Menampilkan <strong className="text-tesla-black">{productCount}</strong> varian
                    </div>
                </div>
            </div>

            {/* === PRODUCT GRID === */}
            <div className="flex-grow max-w-[1400px] mx-auto px-6 md:px-12 py-12 w-full">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 size={40} className="animate-spin text-[#DA0000] mb-4" />
                        <p className="text-gray-500">Memuat katalog...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                            {filteredProducts.map((product, i) => (
                                <ProductCard key={product.id} product={product} index={i} />
                            ))}
                        </div>

                        {filteredProducts.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-32 text-center opacity-60">
                                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <Bike size={40} className="text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-tesla-black mb-2">Tidak Ditemukan</h3>
                                <p className="text-gray-500 max-w-md">Coba gunakan kata kunci lain atau ubah filter kategori Anda.</p>
                            </div>
                        )}
                    </>
                )}
            </div>

        </div>
    );
}

// === PRODUCT CARD COMPONENT ===
function ProductCard({ product, index }: { product: Product; index: number }) {
    const hasPromo = product.promo?.isActive === true;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col"
        >
            {/* Image Container */}
            <div className="relative aspect-[4/3] bg-gray-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center p-4">
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
                    {hasPromo && (
                        <span className="px-2 py-1 bg-[#DA0000] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                            Promo
                        </span>
                    )}
                    <span className="px-2 py-1 bg-white/90 backdrop-blur text-tesla-black border border-gray-200 text-[10px] font-bold uppercase tracking-wider rounded">
                        {product.category}
                    </span>
                </div>

                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-tesla-black leading-tight mb-1">
                    {product.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4">{product.cc} CC • Matic</p>

                {/* Promo Highlights */}
                {hasPromo && product.promo?.highlights && (
                    <div className="mb-4 space-y-1">
                        {product.promo.highlights.slice(0, 2).map((h, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                                <span className="text-green-500 mt-0.5">✓</span> {h}
                            </div>
                        ))}
                    </div>
                )}

                {/* Price Section */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-[10px] text-gray-400 uppercase font-bold">Harga OTR</p>
                            <p className="font-bold text-tesla-black">Rp {product.price.toLocaleString('id-ID')}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] text-gray-400 uppercase font-bold">DP Mulai</p>
                            <p className="font-bold text-[#DA0000]">Rp {Math.round(product.dp_min / 1000).toLocaleString('id-ID')}rb</p>
                        </div>
                    </div>

                    <a
                        href={`https://wa.me/${siteConfig.whatsappNumber}?text=Halo,+saya+tertarik+dengan+${encodeURIComponent(product.name)}`}
                        target="_blank"
                        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-tesla-black text-white text-sm font-bold hover:bg-[#DA0000] transition-colors"
                    >
                        Lihat Cicilan <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
