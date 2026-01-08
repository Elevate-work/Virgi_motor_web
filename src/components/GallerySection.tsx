'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

type GalleryImage = {
    id: string;
    image: string;
    label: string | null;
    category: string | null;
};

export default function GallerySection() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchGallery() {
            try {
                const res = await fetch('/api/public/gallery');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setImages(data);
                }
            } catch (error) {
                console.error('Failed to fetch gallery:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchGallery();
    }, []);

    // Don't render if no images
    if (!loading && images.length === 0) {
        return null;
    }

    return (
        <section className="py-20 sm:py-28 bg-white">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Galeri Foto</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-tesla-black">
                        Lihat Kondisi <span className="text-primary">Dealer Kami</span>
                    </h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                        Foto-foto showroom, area display, aktivitas serah terima unit, dan pelayanan kami kepada pelanggan.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-16">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((img, i) => (
                            <motion.div
                                key={img.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="relative aspect-4/3 rounded-2xl overflow-hidden group cursor-pointer bg-gray-100"
                            >
                                {img.image ? (
                                    <Image
                                        src={img.image}
                                        alt={img.label || 'Gallery'}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon size={32} className="text-gray-400" />
                                    </div>
                                )}
                                {img.label && (
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                        <span className="text-white font-bold text-sm">{img.label}</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
