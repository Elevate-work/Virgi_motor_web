'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Award, Clock, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// Placeholder images for documentation gallery
// Replace these URLs with real photos of your father with customers
const GALLERY_IMAGES = [
    "https://placehold.co/600x800/png?text=FOTO+PROFIL+BAPAK", // Foto Utama (Profil)
    "https://placehold.co/600x800/png?text=SERAH+TERIMA+1+PCX", // Dokumentasi 1
    "https://placehold.co/600x800/png?text=CUSTOMER+VARIO+HAPPY", // Dokumentasi 2
    "https://placehold.co/600x800/png?text=AKTIVITAS+DEALER", // Dokumentasi 3
];

export default function TeamSection() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-slide effect
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
        }, 5000); // Change every 5 seconds
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % GALLERY_IMAGES.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
    };

    return (
        <section id="team" className="py-20 sm:py-28 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gray-200/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
                <div className="bg-white rounded-[32px] sm:rounded-[48px] shadow-2xl shadow-gray-200/50 border border-white overflow-hidden">
                    <div className="grid md:grid-cols-2 lg:grid-cols-12 items-stretch min-h-[500px] sm:min-h-[600px]">

                        {/* LEFT: Documentation Slideshow */}
                        <div className="lg:col-span-5 relative bg-gray-100 group overflow-hidden h-[400px] md:h-auto">

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 1.1 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.8 }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image
                                        src={GALLERY_IMAGES[currentIndex]}
                                        alt={`Dokumentasi ${currentIndex + 1}`}
                                        fill
                                        className="object-cover object-center"
                                        priority={currentIndex === 0}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/5" />

                            {/* Slideshow Controls */}
                            <div className="absolute bottom-6 left-0 right-0 px-6 flex justify-between items-end">
                                {/* Text Info (Optional, e.g. "Dokumentasi") */}
                                <div className="text-white md:hidden">
                                    <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Galeri & Dokumentasi</p>
                                    <h3 className="text-xl font-bold">Bpk. Virgi</h3>
                                </div>

                                {/* Navigation Arrows */}
                                <div className="hidden md:flex gap-2 mb-2">
                                    <button
                                        onClick={prevSlide}
                                        className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/50 transition-all border border-white/20"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md text-white flex items-center justify-center hover:bg-black/50 transition-all border border-white/20"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Dots Indicator */}
                            <div className="absolute bottom-6 right-6 md:left-6 md:right-auto flex gap-1.5 z-20">
                                {GALLERY_IMAGES.map((_, idx) => (
                                    <div
                                        key={idx}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'}`}
                                    />
                                ))}
                            </div>

                        </div>

                        {/* RIGHT: Content Section */}
                        <div className="lg:col-span-7 p-6 sm:p-10 md:p-16 flex flex-col justify-center">

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block px-4 py-1.5 bg-primary/10 rounded-full text-primary text-xs font-bold uppercase tracking-wider mb-6">
                                    Konsultasi Personal
                                </span>

                                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-tesla-black mb-6 leading-[1.15]">
                                    Beli Motor Honda? <br />
                                    <span className="text-primary">Langsung Dengan Ahlinya.</span>
                                </h2>

                                <p className="text-gray-500 text-lg leading-relaxed mb-8">
                                    "Halo, saya Bpk. Virgi. Lihat berbagai dokumentasi serah terima unit kami di samping. Dengan pengalaman belasan tahun, saya pastikan motor impian Anda sampai di rumah dengan aman dan cepat."
                                </p>

                                {/* Trust Points */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-10">
                                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 shrink-0">
                                            <ThumbsUp size={16} />
                                        </div>
                                        Ratusan Customer Puas
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                            <Award size={16} />
                                        </div>
                                        Terpercaya & Amanah
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 shrink-0">
                                            <Clock size={16} />
                                        </div>
                                        Proses Cepat 1 Hari
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                                        <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-600 shrink-0">
                                            <MessageCircle size={16} />
                                        </div>
                                        Fast Response Chat
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://wa.me/6281234567890" // Ganti dengan nomor asli ayah
                                        target="_blank"
                                        className="flex-1 flex items-center justify-center gap-3 py-4 rounded-xl bg-[#25D366] text-white font-bold text-lg hover:bg-[#20bd5a] transition-all shadow-lg shadow-green-500/20 transform hover:-translate-y-1 hover:shadow-green-500/40"
                                    >
                                        <MessageCircle className="w-6 h-6" />
                                        Chat WhatsApp
                                    </a>
                                    <a
                                        href="tel:6281234567890" // Ganti dengan nomor asli
                                        className="sm:w-auto px-8 flex items-center justify-center gap-3 py-4 rounded-xl border-2 border-gray-100 text-gray-700 font-bold text-lg hover:border-gray-200 hover:bg-gray-50 transition-all"
                                    >
                                        <Phone className="w-6 h-6" />
                                        <span className="sm:hidden">Telepon</span>
                                    </a>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
