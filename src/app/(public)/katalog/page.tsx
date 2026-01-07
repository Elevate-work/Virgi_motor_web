'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, ArrowRight, Bike, Zap, Settings, Filter, Loader2 } from 'lucide-react';

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
        <div className="min-h-screen bg-off-white">

            {/* === CATALOG HERO SECTION === */}
            <div className="relative bg-linear-to-br from-[#D9161C] to-[#8C0E12] pt-32 pb-32 sm:pb-48 rounded-b-[40px] sm:rounded-b-[60px] md:rounded-b-[80px] overflow-hidden">

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                {/* Texture Overlay */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
                    <svg width="100%" height="100%">
                        <filter id="noise">
                            <feTurbulence type="fractalNoise" baseFrequency="0.65" stitchTiles="stitch" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#noise)" />
                    </svg>
                </div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-20">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6 backdrop-blur-md shadow-lg">
                            <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                            Katalog Resmi 2024
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
                            Temukan Motor <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-200 to-white">Impianmu Disini.</span>
                        </h1>
                        <p className="text-red-50 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed opacity-90 mb-8">
                            Dapatkan penawaran terbaik untuk motor Honda favoritmu. Bandingkan spesifikasi, cek harga OTR, dan hitung cicilan dengan mudah.
                        </p>

                        {/* Stats / Badges (Optional Decoration) */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 border-t border-white/10 pt-8 mt-2">
                            <div>
                                <h4 className="text-2xl font-bold text-white">{products.length}+</h4>
                                <p className="text-xs text-red-100 uppercase tracking-wider">Pilihan Unit</p>
                            </div>
                            <div className="w-px h-10 bg-white/10" />
                            <div>
                                <h4 className="text-2xl font-bold text-white">100%</h4>
                                <p className="text-xs text-red-100 uppercase tracking-wider">Garansi Resmi</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hero Image (Card Style for Banner) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative z-10 w-full order-1 lg:order-2 perspective-1000"
                    >
                        {/* Card Wrapper with Glass Effect Border */}
                        <div className="relative rounded-[20px] p-2 bg-white/10 border border-white/20 shadow-2xl backdrop-blur-sm">
                            <div className="relative rounded-[16px] overflow-hidden bg-white/5 mx-auto">
                                <Image
                                    src="/catalog.png"
                                    alt="Honda Catalog Highlight"
                                    width={1000}
                                    height={600}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="w-full h-auto object-contain block"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Decorative Blob behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-red-600 rounded-full blur-[100px] -z-10 opacity-60" />
                    </motion.div>
                </div>
            </div>

            {/* === FLOATING FILTER BAR (MODERN) === */}
            <div className="sticky top-6 z-40 px-4 mb-12 -mt-10 sm:-mt-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-xl rounded-[24px] sm:rounded-full p-2 sm:p-3 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">

                        {/* Categories (Pill Selectors) */}
                        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 px-2 md:px-0 no-scrollbar items-center">
                            <span className="hidden md:flex items-center gap-2 text-xs font-bold text-gray-400 mr-2 uppercase tracking-wider">
                                <Filter size={14} /> Kategori:
                            </span>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilter(cat.id as 'All' | 'Matic' | 'Sport' | 'Cub' | 'EV')}
                                    className={`flex items-center gap-2 px-4 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${filter === cat.id
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-black'
                                        }`}
                                >
                                    {cat.icon}
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Modern Search Input */}
                        <div className="relative w-full md:w-80 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-4 py-2.5 sm:py-3 bg-gray-50/50 border-none rounded-xl sm:rounded-full text-sm font-medium text-tesla-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all hover:bg-white"
                                placeholder="Cari Vario, PCX, BeAT..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                    </div>
                </div>
            </div>

            {/* Results Info */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-8 flex items-center justify-between">
                <p className="text-tesla-grey/70 text-sm font-medium">
                    Menampilkan <span className="text-tesla-black font-bold">{productCount}</span> unit motor
                </p>
            </div>

            {/* Product Grid */}
            <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-24">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32">
                        <Loader2 size={40} className="animate-spin text-primary mb-4" />
                        <p className="text-gray-500">Memuat produk...</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
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

// Redesigned Card Component with Promo Support
function ProductCard({ product, index }: { product: Product; index: number }) {
    const hasPromo = product.promo?.isActive === true;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
            viewport={{ once: true }}
            className={`group relative bg-white rounded-[24px] overflow-hidden hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border transition-all duration-300 flex flex-col h-full ${hasPromo ? 'border-primary/30 ring-2 ring-primary/10' : 'border-gray-100'}`}
        >
            {/* Promo Banner - If Active */}
            {hasPromo && (
                <div className="bg-linear-to-r from-primary to-red-600 text-white text-center py-2 px-4">
                    <p className="text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        PROMO: {product.promo!.badgeText}
                    </p>
                </div>
            )}

            {/* Image Area */}
            <div className={`relative h-52 p-6 flex items-center justify-center overflow-hidden transition-colors duration-500 ${hasPromo ? 'bg-linear-to-br from-red-50/50 to-white' : 'bg-linear-to-br from-[#F5F5F7] to-white group-hover:from-red-50/50 group-hover:to-white'}`}>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2 z-20">
                    <span className="text-[10px] font-bold px-3 py-1 bg-white/80 backdrop-blur text-tesla-black border border-gray-200 rounded-full uppercase tracking-wider">
                        {product.category}
                    </span>
                </div>

                <div className="absolute top-4 right-4 z-20">
                    <span className="text-[10px] font-bold px-3 py-1 bg-tesla-black text-white rounded-full uppercase tracking-wider">
                        {product.cc}
                    </span>
                </div>

                <img
                    src={product.image}
                    alt={product.name}
                    className="object-contain w-full h-full relative z-10 group-hover:scale-110 group-hover:-rotate-2 transition-transform duration-500 ease-out drop-shadow-lg"
                />
            </div>

            {/* Content Area */}
            <div className="p-5 flex flex-col flex-grow">
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-tesla-black leading-snug group-hover:text-primary transition-colors line-clamp-2">
                        {product.name}
                    </h3>
                </div>

                {/* Promo Highlights - If Active */}
                {hasPromo && (
                    <div className="mb-4 flex flex-wrap gap-1.5">
                        {product.promo!.highlights.slice(0, 3).map((item, idx) => (
                            <span key={idx} className="inline-flex items-center gap-1 bg-red-50 text-primary px-2.5 py-1 rounded-lg text-[10px] font-bold border border-red-100">
                                ✓ {item}
                            </span>
                        ))}
                    </div>
                )}

                {/* Specs/Price Compact Box */}
                <div className="mt-auto space-y-3">
                    <div className="flex items-end justify-between border-t border-gray-50 pt-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Harga OTR</span>
                            <span className="text-base font-bold text-tesla-black">
                                Rp {product.price.toLocaleString('id-ID')}
                            </span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">DP Mulai</span>
                            <span className="text-base font-bold text-primary">
                                {Math.round(product.dp_min / 1000000)} Jt
                            </span>
                        </div>
                    </div>

                    {/* CTA Button - Different style for promo */}
                    <a
                        href={`https://wa.me/6281234567890?text=Halo,+saya+tertarik+dengan+${encodeURIComponent(product.name)}${hasPromo ? `+(Promo:+${encodeURIComponent(product.promo!.badgeText || '')})` : ''}`}
                        target="_blank"
                        className={`w-full flex items-center justify-center gap-2 py-3 font-bold rounded-xl transition-all text-sm group/btn ${hasPromo
                            ? 'bg-primary text-white hover:bg-red-700 shadow-lg shadow-red-500/20'
                            : 'bg-gray-50 text-tesla-black hover:bg-primary hover:text-white'
                            }`}
                    >
                        {hasPromo ? 'Klaim Promo Ini' : 'Detail & Promo'} <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
