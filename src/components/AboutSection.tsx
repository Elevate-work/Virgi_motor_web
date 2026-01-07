'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BadgeCheck, Clock, HeartHandshake, ShieldCheck, MapPin, Users, Phone, MessageCircle, Award, Star, CheckCircle2, Building2, Calendar } from 'lucide-react';

// ============================================================
// PLACEHOLDER IMAGES - Ganti dengan foto asli dealer Anda
// ============================================================
const GALLERY_IMAGES = [
    { src: "https://placehold.co/800x600/E8E8E8/666?text=FOTO+SHOWROOM+DEPAN", alt: "Tampak Depan Showroom", label: "Showroom" },
    { src: "https://placehold.co/800x600/E8E8E8/666?text=FOTO+SHOWROOM+DALAM", alt: "Interior Showroom", label: "Interior" },
    { src: "https://placehold.co/800x600/E8E8E8/666?text=FOTO+DISPLAY+MOTOR", alt: "Area Display Motor", label: "Display" },
    { src: "https://placehold.co/800x600/E8E8E8/666?text=FOTO+AREA+SERVICE", alt: "Area Service", label: "Service" },
    { src: "https://placehold.co/800x600/E8E8E8/666?text=FOTO+SERAH+TERIMA+1", alt: "Serah Terima Unit", label: "Serah Terima" },
    { src: "https://placehold.co/800x600/E8E8E8/666?text=FOTO+SERAH+TERIMA+2", alt: "Customer Happy", label: "Customer" },
    { src: "https://placehold.co/800x600/E8E8E8/666?text=FOTO+STAFF+KERJA", alt: "Staff Bekerja", label: "Tim Kami" },
    { src: "https://placehold.co/800x600/E8E8E8/666?text=FOTO+CUSTOMER+PUAS", alt: "Pelanggan Puas", label: "Testimoni" },
];

const TEAM_MEMBERS = [
    {
        name: "Bpk. Virgi",
        role: "Sales Consultant / Supervisor",
        image: "https://placehold.co/400x400/DA0000/FFF?text=FOTO+BPK+VIRGI",
        phone: "0812-3456-7890", // Ganti dengan nomor asli
        whatsapp: "6281234567890", // Ganti dengan nomor asli
    },
    {
        name: "Staff 1",
        role: "Sales Executive",
        image: "https://placehold.co/400x400/333/FFF?text=FOTO+STAFF+1",
        phone: "-",
        whatsapp: "",
    },
    {
        name: "Staff 2",
        role: "Admin",
        image: "https://placehold.co/400x400/333/FFF?text=FOTO+STAFF+2",
        phone: "-",
        whatsapp: "",
    },
];

export default function AboutSection() {
    return (
        <div className="bg-white">
            {/* ============================================================ */}
            {/* SECTION 1: HERO BANNER - "POS RESMI" Identity */}
            {/* ============================================================ */}
            <section className="relative bg-gradient-to-br from-[#DA0000] to-[#8C0E12] pt-32 pb-24 sm:pb-32 overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                {/* Texture */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
                    <svg width="100%" height="100%"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.65" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#noise)" /></svg>
                </div>

                <div className="max-w-[1200px] mx-auto px-6 md:px-12 text-center relative z-10">
                    {/* Official Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/20 rounded-full mb-8 backdrop-blur-md"
                    >
                        <BadgeCheck className="w-5 h-5 text-white" />
                        <span className="text-white font-bold text-sm uppercase tracking-widest">Dealer Resmi Honda</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[0.95] mb-6"
                    >
                        Pos Resmi<br />
                        <span className="text-red-200">Virgi Motor</span> Cikarang
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg sm:text-xl text-red-100 max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        Kami adalah <strong className="text-white">titik penjualan resmi</strong> yang beroperasi di bawah naungan Dealer Honda Virgi Motor.
                        Unit 100% baru, garansi penuh AHM, dengan pelayanan personal terbaik.
                    </motion.p>

                    {/* CTA */}
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
            {/* SECTION 2: ABOUT POS RESMI - Explanation */}
            {/* ============================================================ */}
            <section className="py-20 sm:py-28 bg-gray-50">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Text */}
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

                        {/* Right: Image Placeholder */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="relative rounded-[32px] overflow-hidden aspect-[4/3] shadow-2xl">
                                <Image
                                    src="https://placehold.co/800x600/DA0000/FFF?text=FOTO+DEALER+VIRGI+MOTOR"
                                    alt="Dealer Virgi Motor"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Floating Badge */}
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
            {/* SECTION 3: PHOTO GALLERY */}
            {/* ============================================================ */}
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

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {GALLERY_IMAGES.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden group cursor-pointer"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                                    <span className="text-white font-bold text-sm">{img.label}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 4: OUR TEAM */}
            {/* ============================================================ */}
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

                    {/* Team Grid */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {TEAM_MEMBERS.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="bg-white rounded-[24px] overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                            >
                                {/* Photo */}
                                <div className="relative aspect-square bg-gray-100">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                {/* Info */}
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
                </div>
            </section>

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
                        {/* Left: Info */}
                        <div>
                            <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Lokasi & Kontak</span>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-8">
                                Kunjungi <span className="text-primary">Kami</span>
                            </h2>

                            <div className="space-y-6">
                                {/* Address */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Alamat</h4>
                                        <p className="text-gray-400">Jl. Cikarang Baru No. 88, Cikarang Utara, Bekasi, Jawa Barat 17530</p>
                                        <p className="text-gray-500 text-sm mt-1">(Ganti dengan alamat asli)</p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">Telepon</h4>
                                        <p className="text-gray-400">(021) 8900-8888</p>
                                        <p className="text-gray-500 text-sm mt-1">(Ganti dengan nomor asli)</p>
                                    </div>
                                </div>

                                {/* WhatsApp */}
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <MessageCircle className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">WhatsApp</h4>
                                        <a href="https://wa.me/6281234567890" target="_blank" className="text-[#25D366] hover:underline">0812-3456-7890</a>
                                        <p className="text-gray-500 text-sm mt-1">(Ganti dengan nomor asli)</p>
                                    </div>
                                </div>

                                {/* Operating Hours */}
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

                        {/* Right: Map Placeholder */}
                        <div className="relative rounded-[32px] overflow-hidden aspect-[4/3] lg:aspect-auto bg-gray-800">
                            <Image
                                src="https://placehold.co/800x600/333/FFF?text=GOOGLE+MAPS+EMBED"
                                alt="Lokasi Dealer"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <div className="text-center">
                                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                                    <p className="text-white font-bold">Embed Google Maps di sini</p>
                                    <p className="text-gray-400 text-sm mt-1">(atau ganti dengan foto lokasi)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
