'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Star, CheckCircle2, ThumbsUp } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative w-full bg-white overflow-hidden min-h-screen flex flex-col pt-24 md:pt-28">

            <div className="container mx-auto px-4 sm:px-6 md:px-12 flex-grow flex flex-col md:flex-row items-center">

                {/* === LEFT CONTENT (TYPOGRAPHY) === */}
                <div className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left pt-10 md:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Tagline Pill */}
                        <div className="inline-block py-2 px-6 rounded-full border border-gray-300 bg-white text-gray-500 text-xs font-bold tracking-widest uppercase mb-8">
                            Virgi Motor Dealer Resmi Honda
                        </div>

                        {/* HEADLINE */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-tesla-black leading-tight mb-2 tracking-tight">
                            Promo Spesial:
                        </h1>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#DA0000] leading-tight mb-6 tracking-tight">
                            Diskon Besar
                        </h1>

                        {/* Description */}
                        <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-lg mb-10 mx-auto md:mx-0">
                            Dapatkan potongan harga hingga jutaan rupiah, DP mulai 5%, dan bunga rendah. <span className="text-tesla-black font-bold">Hanya bulan ini!</span>
                        </p>

                        {/* CTA Button */}
                        <div className="flex justify-center md:justify-start">
                            <a
                                href="#promo-section"
                                className="group bg-[#DA0000] text-white hover:bg-black rounded-full px-10 py-4 font-bold text-base md:text-lg shadow-lg shadow-red-600/20 flex items-center gap-3 transition-all transform hover:-translate-y-1"
                            >
                                CEK PROMO SEKARANG
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* === RIGHT CONTENT (IMAGE) === */}
                <div className="w-full md:w-1/2 relative z-0 mt-12 md:mt-0 flex justify-center md:justify-end">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative w-[110%] md:w-[130%] max-w-none md:-mr-32"
                    >
                        {/* Main Motor Image */}
                        <div className="relative aspect-[4/3] md:aspect-square">
                            <Image
                                src="/for_hero.png" // Menggunakan gambar yang sudah ada
                                alt="Honda CBR 250RR"
                                fill
                                className="object-contain object-center scale-110 md:scale-125"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* === BOTTOM STATS BAR === */}
            <div className="w-full border-t border-gray-200 bg-white z-20 mt-auto">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
                        {/* Stat 1 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="py-8 flex flex-col items-center justify-center text-center group hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Star className="w-6 h-6 text-tesla-black fill-current" />
                                <span className="text-4xl font-serif font-bold text-tesla-black">15+</span>
                            </div>
                            <span className="text-sm text-gray-500 font-bold tracking-widest uppercase">Tahun Pengalaman</span>
                        </motion.div>

                        {/* Stat 2 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="py-8 flex flex-col items-center justify-center text-center group hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <CheckCircle2 className="w-6 h-6 text-tesla-black fill-current" />
                                <span className="text-4xl font-serif font-bold text-tesla-black">500+</span>
                            </div>
                            <span className="text-sm text-gray-500 font-bold tracking-widest uppercase">Unit Terjual</span>
                        </motion.div>

                        {/* Stat 3 */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="py-8 flex flex-col items-center justify-center text-center group hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <ThumbsUp className="w-6 h-6 text-tesla-black fill-current" />
                                <span className="text-4xl font-serif font-bold text-tesla-black">98%</span>
                            </div>
                            <span className="text-sm text-gray-500 font-bold tracking-widest uppercase">Pelanggan Puas</span>
                        </motion.div>
                    </div>
                </div>
            </div>

        </section>
    );
}
