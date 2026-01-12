'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, MapPin, MessageCircle, FileCheck2, Wrench } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative w-full bg-white overflow-hidden min-h-screen flex flex-col pt-24 md:pt-28">

            <div className="container mx-auto px-4 sm:px-6 md:px-12 flex-grow flex flex-col md:flex-row items-center">

                {/* === LEFT CONTENT (COPYWRITING MANUSIA) === */}
                <div className="w-full md:w-1/2 z-10 flex flex-col items-center md:items-start text-center md:text-left pt-10 md:pt-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Contextual Pill */}
                        <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full border border-gray-200 bg-gray-50 text-gray-600 text-xs font-bold tracking-wide uppercase mb-8">
                            <MapPin size={14} className="text-[#DA0000]" />
                            <span>Pilihan Warga Cikarang & Kab. Bekasi</span>
                        </div>

                        {/* HEADLINE: Solusi Nyata */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-tesla-black leading-[1.1] mb-6 tracking-tight">
                            Beli Motor Honda, <br />
                            <span className="text-[#DA0000] italic">Tanpa Ribet</span> di Virgi Motor.
                        </h1>

                        {/* DESCRIPTION: Story & Trust */}
                        <p className="text-gray-600 text-lg font-medium leading-relaxed max-w-lg mb-8 mx-auto md:mx-0">
                            Kami paham kesibukan Anda. Sejak 2010, kami telah membantu <strong className="text-tesla-black">5.000+ warga Cikarang</strong> mendapatkan motor impian. KTP daerah dibantu, STNK diantar ke rumah.
                        </p>

                        {/* CTA BERTINGKAT: Action & Exploration */}
                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                            {/* Primary: Chat WA */}
                            <a
                                href="https://wa.me/6281234567890?text=Halo%20Virgi%20Motor,%20saya%20mau%20tanya%20promo%20terbaru"
                                target="_blank"
                                className="group w-full sm:w-auto bg-[#DA0000] text-white hover:bg-black rounded-full px-8 py-4 font-bold text-base shadow-lg shadow-red-600/20 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1"
                            >
                                <MessageCircle size={20} />
                                Chat Sales (Respon Cepat)
                            </a>

                            {/* Secondary: Lihat Katalog */}
                            <a
                                href="/katalog"
                                className="group w-full sm:w-auto bg-white border-2 border-gray-200 text-gray-700 hover:border-[#DA0000] hover:text-[#DA0000] rounded-full px-8 py-4 font-bold text-base flex items-center justify-center gap-3 transition-all"
                            >
                                Lihat Katalog
                                <ArrowRight size={18} className="text-gray-400 group-hover:text-[#DA0000] transition-colors" />
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
                                alt="Motor Honda Terbaru di Virgi Motor Cikarang"
                                fill
                                className="object-contain object-center scale-110 md:scale-125"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* === BOTTOM STATS BAR: Real Value Props === */}
            <div className="w-full border-t border-gray-100 bg-white z-20 mt-auto">
                <div className="container mx-auto px-4 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100">
                        {/* Value 1: Lokasi & Admin */}
                        <div className="py-6 px-4 flex items-center gap-4 group hover:bg-gray-50 transition-colors">
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-[#DA0000] shrink-0">
                                <FileCheck2 size={24} />
                            </div>
                            <div>
                                <h4 className="font-serif font-bold text-lg text-tesla-black leading-tight">Plat B Cikarang</h4>
                                <p className="text-sm text-gray-500">Urus STNK & BPKB Tanpa Calo</p>
                            </div>
                        </div>

                        {/* Value 2: Kemudahan Kredit */}
                        <div className="py-6 px-4 flex items-center gap-4 group hover:bg-gray-50 transition-colors">
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-[#DA0000] shrink-0">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h4 className="font-serif font-bold text-lg text-tesla-black leading-tight">Lokasi Strategis</h4>
                                <p className="text-sm text-gray-500">Jl. Cikarang Baru No. 88 (Dekat SGC)</p>
                            </div>
                        </div>

                        {/* Value 3: Aftersales */}
                        <div className="py-6 px-4 flex items-center gap-4 group hover:bg-gray-50 transition-colors">
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-[#DA0000] shrink-0">
                                <Wrench size={24} />
                            </div>
                            <div>
                                <h4 className="font-serif font-bold text-lg text-tesla-black leading-tight">Bengkel Resmi AHASS</h4>
                                <p className="text-sm text-gray-500">Service Mudah, Sparepart Asli</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
