'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Star, CheckCircle2 } from 'lucide-react';

type HeroSlide = {
    id: string;
    image: string;
    title: string | null;
};

export default function Hero() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    // Fetch slides from database
    useEffect(() => {
        async function fetchSlides() {
            try {
                const res = await fetch('/api/public/hero-slides');
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    setSlides(data);
                }
            } catch (error) {
                console.error('Failed to fetch slides:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchSlides();
    }, []);

    // Auto-slide timer
    useEffect(() => {
        if (slides.length === 0) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    // Show placeholder if no slides
    const hasSlides = slides.length > 0;
    const currentImage = hasSlides ? slides[currentSlide]?.image : '/hero_placeholder.jpg';

    return (
        <section className="relative w-full bg-white overflow-hidden min-h-screen font-sans">

            {/* === SLIDER BACKGROUND === */}
            <div
                className="absolute top-0 right-0 h-full w-[85%] md:w-[60%] z-0 overflow-hidden"
                style={{
                    clipPath: "polygon(25% 0, 100% 0, 100% 100%, 0% 100%)"
                }}
            >
                {hasSlides ? (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={currentImage}
                                alt={slides[currentSlide]?.title || 'Hero Slide'}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-red-600 to-red-800">
                        <div className="absolute inset-0 bg-black/30" />
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Slide Indicators */}
            {hasSlides && slides.length > 1 && (
                <div className="absolute bottom-32 md:bottom-40 right-8 md:right-12 z-30 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === currentSlide
                                ? 'bg-white scale-125'
                                : 'bg-white/50 hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>
            )}

            {/* Decorative Line */}
            <div
                className="absolute top-0 right-[60%] h-full w-[2px] bg-red-500/20 z-0 hidden md:block"
                style={{ transform: "skewX(-15deg)" }}
            />

            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 relative z-10 w-full h-full flex flex-col md:flex-row items-start md:items-center pt-20 sm:pt-24 md:pt-28">

                {/* === LEFT CONTENT === */}
                <div className="w-full md:w-[45%] lg:w-[40%] z-20 flex flex-col items-center md:items-start text-center md:text-left pt-36 sm:pt-10 md:pt-0">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Tagline Pill */}
                        <div className="w-full md:w-fit flex justify-center md:justify-start">
                            <span className="inline-block py-2 px-5 rounded-full bg-white/80 backdrop-blur-sm md:bg-gray-100 text-[#DA0000] text-xs font-bold tracking-widest mb-6 md:mb-8 border border-gray-200 shadow-sm">
                                VIRGI MOTOR DEALER RESMI HONDA
                            </span>
                        </div>

                        {/* HEADLINE */}
                        <div className="flex flex-col mb-6 md:mb-8 relative space-y-1 md:space-y-0">
                            <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-[4.5rem] font-sans font-black tracking-tighter leading-tight md:leading-[0.85] z-10 transition-all text-tesla-black md:text-transparent md:italic"
                                style={{
                                    WebkitTextStroke: "1.5px #222",
                                    color: "var(--text-color, #222)"
                                }}>
                                <span className="md:hidden text-tesla-black not-italic">PROMO SPESIAL</span>
                                <span className="hidden md:block" style={{ color: 'transparent' }}>PROMO SPESIAL</span>
                            </h1>

                            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-[5.5rem] font-sans font-black tracking-tighter text-[#DA0000] leading-none md:leading-[0.85] z-20 md:-mt-2 md:italic">
                                DISKON BESAR
                            </h1>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-sans font-black tracking-tighter leading-tight md:leading-[0.85] z-10 md:-mt-2 md:-ml-1 transition-all text-tesla-black md:text-transparent md:italic"
                                style={{
                                    WebkitTextStroke: "1.5px #222",
                                }}>
                                <span className="md:hidden text-tesla-black not-italic">& CICILAN RINGAN!</span>
                                <span className="hidden md:block" style={{ color: 'transparent' }}>& CICILAN RINGAN!</span>
                            </h1>
                        </div>

                        {/* Description */}
                        <div className="bg-white/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none rounded-xl p-4 md:p-0 mb-8 md:mb-10 shadow-lg md:shadow-none">
                            <p className="text-gray-600 md:text-gray-500 text-base md:text-xl font-medium max-w-lg leading-relaxed mx-auto md:mx-0">
                                Dapatkan potongan harga hingga jutaan rupiah, DP mulai 5%, dan bunga rendah. <span className="text-[#DA0000] font-bold">Hanya bulan ini!</span>
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="flex justify-center md:justify-start">
                            <a href="#promo-section" className="group bg-[#DA0000] text-white hover:bg-black rounded-full px-8 py-4 md:px-10 md:py-5 font-bold text-base md:text-lg shadow-xl shadow-red-600/20 flex items-center gap-3 md:gap-4 transition-all transform hover:-translate-y-1 tracking-wide">
                                CEK PROMO SEKARANG
                                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* === DOCKED WIDGET LEFT === */}
            <div className="absolute bottom-0 left-0 z-20 hidden md:block">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className="bg-white rounded-tr-[40px] p-2 pr-2 pt-2 shadow-[10px_-10px_30px_rgba(0,0,0,0.1)]"
                >
                    <div className="bg-[#F8F9FA] rounded-tr-[32px] py-6 px-10 flex items-center gap-6 relative overflow-hidden group min-w-[320px] h-[100px]">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-tesla-black border border-gray-200">
                            <Star size={24} strokeWidth={1.5} />
                        </div>
                        <div>
                            <h4 className="text-3xl font-extrabold text-tesla-black leading-none tracking-tight font-sans">15+</h4>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1 block font-sans">Tahun Pengalaman</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* === DOCKED WIDGET RIGHT === */}
            <div className="absolute bottom-0 right-0 z-20 hidden md:block">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="bg-white rounded-tl-[40px] p-2 pl-2 pt-2 shadow-[-10px_-10px_30px_rgba(0,0,0,0.1)]"
                >
                    <div className="bg-[#F8F9FA] rounded-tl-[32px] py-6 px-10 flex items-center gap-6 relative overflow-hidden group min-w-[320px] h-[100px] justify-end text-right">
                        <div>
                            <h4 className="text-3xl font-extrabold text-tesla-black leading-none tracking-tight font-sans">500+</h4>
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1 block font-sans">Unit Terjual</span>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-200">
                            <CheckCircle2 size={24} strokeWidth={2} />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
