'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BadgeCheck, Clock, HeartHandshake, ShieldCheck, MapPin, Phone, MessageCircle, Award, Calendar, ImageIcon, User } from 'lucide-react';

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
            {/* SECTION 1: HERO BANNER */}
            {/* ============================================================ */}
            <section className="relative bg-linear-to-br from-[#DA0000] to-[#8C0E12] pt-32 pb-24 sm:pb-32 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/20 rounded-full mb-8 backdrop-blur-md"
                    >
                        <BadgeCheck className="w-5 h-5 text-white" />
                        <span className="text-white font-bold text-sm uppercase tracking-widest">Dealer Resmi Honda</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6"
                    >
                        Pos Resmi<br />
                        <span className="text-red-200">Virgi Motor</span> Cikarang
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg sm:text-xl text-red-100 max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        Kami adalah <strong className="text-white">titik penjualan resmi</strong> yang beroperasi di bawah naungan Dealer Honda Virgi Motor.
                        Unit 100% baru, garansi penuh AHM, dengan pelayanan personal terbaik.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <a href="https://wa.me/6281234567890" target="_blank" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#DA0000] font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                            <MessageCircle size={20} />
                            Hubungi Kami
                        </a>
                        <a href="/katalog" className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-[#DA0000] transition-all">
                            Lihat Katalog Motor
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 2: ABOUT POS RESMI */}
            {/* ============================================================ */}
            <section className="py-20 sm:py-28 bg-gray-50">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Apa itu Pos Resmi?</span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-tesla-black leading-tight mb-6">
                                Titik Penjualan<br />
                                <span className="text-primary">Resmi & Terpercaya</span>
                            </h2>
                            <div className="space-y-4 text-gray-600 leading-relaxed">
                                <p>
                                    <strong className="text-tesla-black">Pos Resmi</strong> adalah perpanjangan tangan dari Dealer Honda Virgi Motor yang berlokasi di wilayah Cikarang dan sekitarnya. Kami hadir untuk memberikan kemudahan akses bagi masyarakat yang ingin membeli motor Honda.
                                </p>
                                <p>
                                    Semua unit motor yang kami jual adalah <strong className="text-tesla-black">100% baru dan orisinil</strong> langsung dari Astra Honda Motor (AHM), dengan garansi resmi 5 tahun untuk mesin dan layanan purna jual di seluruh bengkel resmi AHASS.
                                </p>
                                <p>
                                    Dengan pengalaman <strong className="text-primary">belasan tahun</strong> di industri otomotif, kami berkomitmen memberikan pelayanan yang ramah, transparan, dan proses yang cepat.
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
                            <div className="relative rounded-[32px] overflow-hidden aspect-4/3 shadow-2xl bg-gray-200">
                                {gallery.length > 0 ? (
                                    <Image
                                        src={gallery[0].image}
                                        alt="Dealer Virgi Motor"
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <div className="text-center text-gray-400">
                                            <ImageIcon size={48} className="mx-auto mb-2" />
                                            <p className="text-sm">Upload foto via Admin Gallery</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 flex items-center gap-4">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                                    <Award className="w-7 h-7 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-2xl font-black text-tesla-black">15+</h4>
                                    <p className="text-sm text-gray-500">Tahun Pengalaman</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 3: PHOTO GALLERY (FROM DATABASE) */}
            {/* ============================================================ */}
            {(loadingGallery || gallery.length > 0) && (
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

                        {loadingGallery ? (
                            <div className="flex justify-center py-16">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {gallery.map((img, i) => (
                                    <motion.div
                                        key={img.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        className="relative aspect-4/3 rounded-2xl overflow-hidden group cursor-pointer bg-gray-100"
                                    >
                                        <Image
                                            src={img.image}
                                            alt={img.label || 'Gallery'}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
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
            )}

            {/* ============================================================ */}
            {/* SECTION 4: OUR TEAM (FROM DATABASE) */}
            {/* ============================================================ */}
            {(loadingTeam || team.length > 0) && (
                <section className="py-20 sm:py-28 bg-gray-50">
                    <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                        <div className="text-center mb-16">
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Tim Kami</span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-tesla-black">
                                Kenali <span className="text-primary">Sales Kami</span>
                            </h2>
                            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                                Tim profesional yang siap membantu Anda memiliki motor Honda impian dengan proses mudah dan cepat.
                            </p>
                        </div>

                        {loadingTeam ? (
                            <div className="flex justify-center py-16">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-3 gap-8">
                                {team.map((member, i) => (
                                    <motion.div
                                        key={member.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, duration: 0.5 }}
                                        viewport={{ once: true }}
                                        className="bg-white rounded-[24px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        <div className="relative aspect-square bg-gray-100 flex items-center justify-center">
                                            {member.photo ? (
                                                <Image
                                                    src={member.photo}
                                                    alt={member.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <User size={64} className="text-gray-300" />
                                            )}
                                        </div>
                                        <div className="p-6 text-center">
                                            <h3 className="text-xl font-bold text-tesla-black mb-1">{member.name}</h3>
                                            <p className="text-gray-500 text-sm mb-4">{member.role}</p>
                                            {member.whatsapp && (
                                                <a
                                                    href={`https://wa.me/${member.whatsapp}`}
                                                    target="_blank"
                                                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-bold rounded-full hover:bg-[#20bd5a] transition-colors text-sm"
                                                >
                                                    <MessageCircle size={16} />
                                                    Chat WhatsApp
                                                </a>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* ============================================================ */}
            {/* SECTION 5: TRUST BADGES */}
            {/* ============================================================ */}
            <section className="py-20 sm:py-28 bg-white">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="text-center mb-16">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Mengapa Memilih Kami</span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-tesla-black">
                            Keunggulan <span className="text-primary">Pos Resmi</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: <ShieldCheck size={32} />, title: "Dealer Resmi", desc: "Unit 100% baru & orisinil dari AHM", color: "bg-green-50 text-green-600" },
                            { icon: <Award size={32} />, title: "Garansi 5 Tahun", desc: "Garansi resmi mesin di seluruh AHASS", color: "bg-blue-50 text-blue-600" },
                            { icon: <Clock size={32} />, title: "Proses Cepat", desc: "ACC kredit 1 hari kerja, motor siap kirim", color: "bg-yellow-50 text-yellow-600" },
                            { icon: <HeartHandshake size={32} />, title: "Pelayanan Ramah", desc: "Tim berpengalaman, siap jemput data", color: "bg-red-50 text-red-600" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-[24px] p-8 text-center hover:shadow-lg transition-shadow"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${item.color} flex items-center justify-center mx-auto mb-6`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-tesla-black mb-2">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: "500+", label: "Unit Terjual" },
                            { value: "15+", label: "Tahun Pengalaman" },
                            { value: "100%", label: "Customer Puas" },
                            { value: "1 Hari", label: "Proses ACC" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="text-center py-8 border border-gray-100 rounded-2xl"
                            >
                                <h4 className="text-3xl sm:text-4xl font-black text-primary mb-1">{stat.value}</h4>
                                <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 6: LOCATION & CONTACT */}
            {/* ============================================================ */}
            <section id="contact" className="py-20 sm:py-28 bg-tesla-black text-white">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Lokasi & Kontak</span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-8">
                                Kunjungi <span className="text-primary">Kami</span>
                            </h2>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Alamat</h4>
                                        <p className="text-gray-400">Jl. Cikarang Baru No. 88, Cikarang Utara, Bekasi, Jawa Barat 17530</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Telepon</h4>
                                        <p className="text-gray-400">(021) 8900-8888</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <MessageCircle className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">WhatsApp</h4>
                                        <a href="https://wa.me/6281234567890" target="_blank" className="text-[#25D366] hover:underline">0812-3456-7890</a>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <Calendar className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Jam Operasional</h4>
                                        <p className="text-gray-400">Senin - Sabtu: 08:00 - 17:00 WIB</p>
                                        <p className="text-gray-400">Minggu: 08:00 - 14:00 WIB</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative rounded-[32px] overflow-hidden aspect-4/3 lg:aspect-auto bg-gray-800">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.5!2d107.1!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMTgnMDAuMCJTIDEwN8KwMDYnMDAuMCJF!5e0!3m2!1sen!2sid!4v1"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '300px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
