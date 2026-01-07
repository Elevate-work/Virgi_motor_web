'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Clock, ThumbsUp, Wallet } from 'lucide-react';

const features = [
    {
        icon: <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
        title: 'Dealer Resmi Terpercaya',
        description: 'Unit dijamin 100% baru dan orisinil dari pabrik Astra Honda Motor.',
    },
    {
        icon: <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
        title: 'Proses Cepat & Mudah',
        description: 'Data dijemput, proses 1 hari kerja, motor langsung kirim ke rumah.',
    },
    {
        icon: <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
        title: 'DP Ringan & Diskon',
        description: 'Dapatkan promo potongan DP jutaan rupiah dan angsuran terjangkau.',
    },
    {
        icon: <ThumbsUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />,
        title: 'Garansi Mesin 5 Tahun',
        description: 'Layanan purna jual terbaik dengan garansi resmi di seluruh AHASS.',
    },
];

export default function Features() {
    return (
        <section className="pt-8 sm:pt-12 md:pt-16 pb-16 sm:pb-20 bg-white">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12">
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-tesla-black mb-3 sm:mb-4">
                        Mengapa Memilih <span className="text-primary">Virgi Motor?</span>
                    </h2>
                    <p className="text-tesla-grey max-w-2xl mx-auto text-sm sm:text-base px-4">
                        Kami memberikan pelayanan standar bintang 5 untuk kepuasan Anda. Bebas ribet, aman, dan transparan.
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group p-4 sm:p-6 md:p-8 rounded-2xl bg-off-white hover:bg-white border border-transparent hover:border-gray-200 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-primary rounded-xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-sm sm:text-base md:text-xl font-bold text-tesla-black mb-2 sm:mb-3 leading-tight">{feature.title}</h3>
                            <p className="text-xs sm:text-sm text-tesla-grey leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
