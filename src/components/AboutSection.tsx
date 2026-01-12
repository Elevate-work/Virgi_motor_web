'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BadgeCheck, Clock, ShieldCheck, MapPin, Phone, MessageCircle, HeartHandshake, Award, ImageIcon, ArrowRight, User } from 'lucide-react';

type GalleryImage = {
    id: string;
    image: string;
    label: string | null;
};

type TeamMember = {
    id: string;
    name: string;
    role: string;
    photo: string | null;
    whatsapp: string | null;
};

export default function AboutSection() {
    const [gallery, setGallery] = useState<GalleryImage[]>([]);
    const [team, setTeam] = useState<TeamMember[]>([]);
    const [loadingGallery, setLoadingGallery] = useState(true);
    const [loadingTeam, setLoadingTeam] = useState(true);

    // Fetch gallery from database
    useEffect(() => {
        async function fetchGallery() {
            try {
                const res = await fetch('/api/public/gallery');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setGallery(data);
                }
            } catch (error) {
                console.error('Failed to fetch gallery:', error);
            } finally {
                setLoadingGallery(false);
            }
        }
        fetchGallery();
    }, []);

    // Fetch team from database
    useEffect(() => {
        async function fetchTeam() {
            try {
                const res = await fetch('/api/public/team');
                const data = await res.json();
                if (Array.isArray(data)) {
                    setTeam(data);
                }
            } catch (error) {
                console.error('Failed to fetch team:', error);
            } finally {
                setLoadingTeam(false);
            }
        }
        fetchTeam();
    }, []);

    return (
        <div className="bg-white">

            {/* ============================================================ */}
            {/* 1. HERO SECTION: BRAND STORY AWAL */}
            {/* ============================================================ */}
            <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden bg-white">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-2 px-5 rounded-full bg-red-50 text-[#DA0000] text-xs font-bold tracking-widest uppercase mb-6">
                            Tentang Kami
                        </span>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-tesla-black leading-tight mb-6">
                            Pos Resmi <br />
                            <span className="text-[#DA0000]">Virgi Motor</span> Cikarang
                        </h1>

                        <h2 className="text-lg sm:text-xl font-medium text-tesla-black max-w-3xl mx-auto mb-6">
                            Unit penjualan resmi di bawah naungan Dealer Honda Virgi Motor yang melayani pembelian motor Honda baru untuk wilayah Cikarang dan sekitarnya.
                        </h2>

                        <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                            Kami hadir sebagai perpanjangan tangan Virgi Motor untuk mendekatkan layanan pembelian motor Honda yang aman, transparan, dan sesuai standar AHM—baik melalui showroom maupun layanan penjualan mobile.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#DA0000] text-white font-bold rounded-full shadow-lg hover:bg-black hover:-translate-y-1 transition-all"
                            >
                                <MessageCircle size={20} />
                                Hubungi Sales Resmi
                            </a>
                            <a
                                href="/katalog"
                                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-bold rounded-full hover:border-[#DA0000] hover:text-[#DA0000] transition-all"
                            >
                                Lihat Katalog Motor
                                <ArrowRight size={18} />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* 2. WHY WE EXIST: DEALER RESMI */}
            {/* ============================================================ */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-tesla-black leading-tight mb-6 text-left">
                                Dealer Resmi yang Tumbuh Bersama <span className="text-[#DA0000] italic">Warga Cikarang</span>
                            </h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed text-left">
                                <p>
                                    Pos Resmi Virgi Motor Cikarang dibentuk untuk menjawab kebutuhan masyarakat akan pembelian motor Honda yang terpercaya tanpa harus selalu datang ke dealer utama.
                                </p>
                                <p>
                                    Dengan tim sales resmi dan sistem yang terintegrasi, kami memastikan setiap proses berjalan jelas, aman, dan nyaman dari awal hingga motor diterima pelanggan.
                                </p>
                                <p className="font-medium text-tesla-black border-l-4 border-[#DA0000] pl-4 italic">
                                    "Bagi kami, menjual motor bukan sekadar transaksi, tetapi membangun kepercayaan jangka panjang."
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Placeholder visual jika gallery kosong / visual statis */}
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl bg-white">
                                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                    <BadgeCheck size={80} className="text-gray-300 mb-4" />
                                </div>
                                {/* Gunakan gambar statis dealer jika ada, atau gambar dari gallery pertama */}
                                {gallery.length > 0 && (
                                    <Image
                                        src={gallery[0].image}
                                        alt="Aktivitas Dealer Virgi Motor"
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>

                            {/* Trust Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-6 flex items-center gap-4 border border-gray-100 max-w-xs">
                                <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-[#DA0000]" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-tesla-black">100% Resmi AHM</h4>
                                    <p className="text-sm text-gray-500">Unit baru & bergaransi</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* 3. TRUST VALIDATION: AKTIVITAS PELAYANAN (CMS GALLERY) */}
            {/* ============================================================ */}
            <section className="py-20 sm:py-28 bg-white">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-serif text-tesla-black mb-4">
                            Aktivitas Pelayanan di <span className="text-[#DA0000]">Pos Resmi Kami</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Dokumentasi asli pelayanan pelanggan kami, mulai dari konsultasi pembelian, proses administrasi, hingga serah terima unit motor Honda kepada pelanggan.
                        </p>
                    </div>

                    {(loadingGallery) ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#DA0000]"></div>
                        </div>
                    ) : gallery.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {gallery.map((img, i) => (
                                <motion.div
                                    key={img.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="relative aspect-square rounded-xl overflow-hidden group bg-gray-100 cursor-zoom-in"
                                >
                                    <Image
                                        src={img.image}
                                        alt={img.label || 'Aktivitas Dealer'}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {img.label && (
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                            <p className="text-white font-medium text-sm">{img.label}</p>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                            <ImageIcon className="mx-auto text-gray-300 mb-2" size={40} />
                            <p className="text-gray-500">Belum ada foto aktivitas yang diupload.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ============================================================ */}
            {/* 4. NARASI PENGALAMAN & SKALA */}
            {/* ============================================================ */}
            <section className="py-20 bg-tesla-black text-white">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        <div>
                            <h2 className="text-3xl sm:text-4xl font-serif text-white mb-8">
                                Pengalaman Lapangan adalah <span className="text-[#DA0000] italic">Fondasi Kami</span>
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                Angka bukan sekadar statistik, tapi bukti kepercayaan. Setiap unit yang keluar dari dealer kami mewakili satu cerita pelanggan yang puas dengan pelayanan kami.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="text-[#DA0000]">01.</span> 15+ Tahun Pengalaman
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Melayani pembeli motor Honda di wilayah Cikarang. Kami paham betul seluk-beluk kebutuhan warga lokal.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="text-[#DA0000]">02.</span> Ratusan Unit Terjual
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Setiap unit berasal dari jalur resmi dengan proses serah terima yang jelas, aman, dan terdokumentasi rapi.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="text-[#DA0000]">03.</span> Transparan
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Tanpa biaya tersembunyi. Seluruh informasi harga, promo, dan rincian angsuran dijelaskan terbuka sejak awal.
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="text-[#DA0000]">04.</span> Kredit Dibantu
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Tim kami mendampingi proses pengajuan kredit, pemberkasan, hingga unit siap dikirim ke garasi Anda.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* 5. KEUNGGULAN POS RESMI */}
            {/* ============================================================ */}
            <section className="py-20 sm:py-28 bg-white">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-serif text-tesla-black mb-4">
                            Standar Layanan <span className="text-[#DA0000]">Pos Resmi</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <ShieldCheck size={32} />, title: "Dealer Resmi", desc: "Unit 100% baru & orisinil dari jalur distribusi AHM." },
                            { icon: <Award size={32} />, title: "Garansi Resmi", desc: "Garansi mesin 3-5 tahun, servis gratis di seluruh AHASS." },
                            { icon: <Clock size={32} />, title: "Proses Cepat", desc: "Pengajuan kredit dibantu tim kami hingga proses ACC." },
                            { icon: <HeartHandshake size={32} />, title: "Pelayanan Ramah", desc: "Dilayani langsung oleh tim sales resmi yang berpengalaman." },
                        ].map((item, i) => (
                            <div key={i} className="bg-gray-50 rounded-2xl p-8 text-center group hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-6 text-[#DA0000] group-hover:bg-[#DA0000] group-hover:text-white transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-tesla-black mb-3">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* 6. LOKASI & KONTAK: VALIDASI BISNIS */}
            {/* ============================================================ */}
            <section id="contact" className="py-20 bg-gray-50 border-t border-gray-200">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-[#DA0000] font-bold tracking-widest uppercase text-xs mb-4 block">Lokasi & Kontak</span>
                            <h2 className="text-3xl sm:text-4xl font-serif text-tesla-black mb-8 leading-tight">
                                Kunjungi atau Hubungi <span className="text-[#DA0000]">Kami</span>
                            </h2>

                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0 text-tesla-black border border-gray-100">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-tesla-black mb-1">Alamat Pos Resmi</h4>
                                        <p className="text-gray-600 leading-relaxed max-w-sm">
                                            Jl. Cikarang Baru No. 88, Cikarang Utara, Bekasi, Jawa Barat 17530 (Dekat Sentra Grosir Cikarang)
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0 text-tesla-black border border-gray-100">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-tesla-black mb-1">Kontak Sales Resmi</h4>
                                        <p className="text-gray-600 mb-1">(021) 8900-8888 (Telepon Kantor)</p>
                                        <a href="https://wa.me/6281234567890" target="_blank" className="text-[#25D366] font-bold hover:underline flex items-center gap-2">
                                            0812-3456-7890 (WhatsApp Available)
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0 text-tesla-black border border-gray-100">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-tesla-black mb-1">Jam Operasional</h4>
                                        <p className="text-gray-600 text-sm">Senin - Sabtu: 08:00 - 17:00 WIB</p>
                                        <p className="text-gray-600 text-sm">Minggu: 09:00 - 14:00 WIB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map Visual / Maps Embed Mockup */}
                        <div className="relative h-[400px] bg-gray-200 rounded-3xl overflow-hidden shadow-lg border border-gray-300">
                            {/* Ganti iframe ini dengan Google Maps embed asli dari user nanti */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126907.08660340645!2d107.09172494335936!3d-6.284310549999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6984c172901309%3A0x6291e0a811c05d76!2sCikarang%2C%20Bekasi%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1709123456789!5m2!1sen!2sid"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm text-xs font-bold text-tesla-black border border-gray-200">
                                📍 Peta Lokasi Valid
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
