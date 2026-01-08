'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star, User, Quote } from 'lucide-react';

type Testimonial = {
    id: string;
    name: string;
    photo: string | null;
    motor: string | null;
    rating: number;
    message: string;
};

export default function TestimonialsSection() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTestimonials() {
            try {
                const res = await fetch('/api/public/testimonials');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setTestimonials(data);
                }
            } catch (error) {
                console.error('Failed to fetch testimonials:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTestimonials();
    }, []);

    // Don't render if no testimonials
    if (!loading && testimonials.length === 0) {
        return null;
    }

    return (
        <section className="py-20 sm:py-28 bg-gray-50">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Testimoni</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-tesla-black">
                        Apa Kata <span className="text-primary">Pelanggan Kami</span>
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        Cerita kepuasan dari pelanggan yang telah mempercayakan pembelian motor Honda kepada kami.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonials.map((item, i) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 relative"
                            >
                                {/* Quote Icon */}
                                <Quote size={40} className="absolute top-6 right-6 text-gray-100" />

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(5)].map((_, starIndex) => (
                                        <Star
                                            key={starIndex}
                                            size={18}
                                            className={starIndex < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                        />
                                    ))}
                                </div>

                                {/* Message */}
                                <p className="text-gray-600 leading-relaxed mb-6 line-clamp-4">
                                    "{item.message}"
                                </p>

                                {/* Author */}
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                                        {item.photo ? (
                                            <Image
                                                src={item.photo}
                                                alt={item.name}
                                                width={48}
                                                height={48}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <User size={20} className="text-gray-400" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="font-bold text-tesla-black">{item.name}</p>
                                        {item.motor && (
                                            <p className="text-sm text-gray-500">{item.motor}</p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
