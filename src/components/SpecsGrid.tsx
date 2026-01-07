'use client';

import { motion } from 'framer-motion';

export default function SpecsGrid() {
    const specs = [
        { label: 'Kapasitas Mesin', value: '160cc' },
        { label: 'Tenaga Maksimum', value: '15.4 PS' },
        { label: 'Konsumsi BBM', value: '46.9 km/L' },
        { label: 'Tipe Mesin', value: 'eSP+ 4 Valve' },
    ];

    return (
        <section id="specs" className="bg-base-white text-tesla-black py-32 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-center">
                    {specs.map((spec, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="flex flex-col items-center"
                        >
                            <div className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">{spec.value}</div>
                            <div className="text-xs md:text-sm text-tesla-grey font-medium tracking-widest uppercase">{spec.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
