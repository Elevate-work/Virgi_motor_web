'use client';

import { motion } from 'framer-motion';
import { Phone, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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

// Helper functions
function formatPrice(price: number): string {
    return `Rp ${price.toLocaleString('id-ID')}`;
}

function generateWhatsAppLink(product: Product): string {
    const phone = '6281234567890'; // TODO: Ambil dari settings
    const message = product.promo?.isActive
        ? `Halo, saya tertarik dengan PROMO ${product.name} (${product.promo.badgeText}). Mohon info lebih lanjut.`
        : `Halo, saya tertarik dengan ${product.name}. Mohon info harga dan kredit.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function PromoSection() {
    const [promoProducts, setPromoProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPromos() {
            try {
                const res = await fetch('/api/public/products?promo=1');
                const data = await res.json();
                setPromoProducts(data);
            } catch (error) {
                console.error('Failed to fetch promos:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchPromos();
    }, []);

    // Jika loading atau tidak ada promo aktif, sembunyikan section
    if (loading) return null;
    if (promoProducts.length === 0) return null;

    return (
        <section id="promo-section" className="py-16 sm:py-20 md:py-24 bg-white scroll-mt-24">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 gap-4">
                    <div className="text-center md:text-left w-full md:w-auto">
                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-tesla-black mb-2">
                            Promo Spesial <span className="text-primary">Bulan Ini</span>
                        </h2>
                        <p className="text-tesla-grey text-sm sm:text-base md:text-lg mb-6">
                            Geser untuk melihat penawaran terbaik dari Virgi Motor.
                        </p>

                        {/* Professional Note */}
                        <div className="inline-flex items-center gap-3 px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                                <Phone size={16} className="text-green-600" />
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-gray-900 uppercase tracking-wide">Butuh Hitungan Kredit?</p>
                                <p className="text-xs text-gray-500">Konsultasi gratis via WhatsApp untuk detail angsuran.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Promo Cards - Horizontal Scroll Container */}
                <div className="flex overflow-x-auto pb-8 gap-4 sm:gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
                    {promoProducts.map((product, i) => (
                        <PromoCard key={product.id} product={product} index={i} />
                    ))}

                    {/* "See More" Card at the end */}
                    <div className="flex-none w-[150px] sm:w-[200px] flex items-center justify-center snap-center">
                        <a href="/katalog" className="group flex flex-col items-center gap-4 text-gray-400 hover:text-primary transition-colors cursor-pointer">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-dashed border-gray-300 group-hover:border-primary flex items-center justify-center">
                                <span className="text-2xl font-bold">&rarr;</span>
                            </div>
                            <span className="font-bold text-sm sm:text-base">Lihat Semua</span>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}

// --- PROMO CARD COMPONENT ---
function PromoCard({ product, index }: { product: Product; index: number }) {
    const promo = product.promo!;

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className={`flex-none w-[280px] sm:w-[350px] md:w-[400px] snap-center relative rounded-[32px] overflow-hidden group border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 ${promo.cardBgColor || 'bg-gray-100'}`}
        >
            <div className="flex flex-col h-full min-h-[450px]">

                {/* Top Content */}
                <div className={`p-6 md:p-8 z-20 ${promo.cardTextColor || 'text-tesla-black'}`}>
                    <h3 className="text-2xl md:text-3xl font-black mb-1 leading-tight">{product.name}</h3>
                    <p className="opacity-80 font-medium mb-4">{formatPrice(product.price)}</p>

                    {/* Badge */}
                    <span className="inline-block px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full mb-4 shadow-lg shadow-red-500/30">
                        {promo.badgeText}
                    </span>

                    {/* Detail Highlights */}
                    <div className="flex flex-wrap gap-2">
                        {promo.highlights.map((highlight, idx) => (
                            <span key={idx} className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] md:text-xs font-bold border border-white/30">
                                <CheckCircle2 size={12} className={promo.cardTextColor === 'text-white' ? 'text-white' : 'text-primary'} />
                                {highlight}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Image Area */}
                <div className="relative flex-1 flex items-center justify-center p-4">
                    <div className="relative w-full h-[200px] md:h-[250px] group-hover:scale-110 transition-transform duration-500 ease-in-out">
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>

                {/* Bottom Action - WhatsApp Button */}
                <div className="p-6 md:p-8 mt-auto z-20 relative">
                    <a
                        href={generateWhatsAppLink(product)}
                        target="_blank"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-[#25D366] text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-500/30"
                    >
                        <Phone size={18} fill="white" />
                        Tanya Promo Ini
                    </a>
                    <p className="text-center text-[10px] md:text-xs opacity-60 mt-3">
                        *Syarat & ketentuan berlaku
                    </p>
                </div>

                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[100px] z-0 pointer-events-none" />
            </div>
        </motion.div>
    );
}
