'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, HelpCircle, FileText, Clock, MapPin } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/config';

const FAQS = [
    {
        question: "Berapa lama proses persetujuan kredit (ACC)?",
        answer: "Proses survei hingga persetujuan (ACC) sangat cepat, biasanya hanya memakan waktu 1x24 jam setelah data lengkap diterima. Tim kami akan mengawal data Anda agar prosesnya lancar."
    },
    {
        question: "Apakah KTP luar daerah (daerah lain) bisa pengajuan?",
        answer: "Bisa banget! Kami melayani pembelian unit untuk KTP seluruh Indonesia asalkan Anda berdomisili atau bekerja di area Cikarang, Bekasi, dan sekitarnya. Kami bantu proses domisilinya."
    },
    {
        question: "Syarat dokumen apa saja yang diperlukan?",
        answer: "Cukup siapkan E-KTP (Suami & Istri jika menikah) dan Kartu Keluarga (KK). Untuk dokumen pendukung lain seperti slip gaji atau rekening listrik, tim kami akan bantu arahkan jika diperlukan."
    },
    {
        question: "Rumah masih ngontrak, apakah bisa kredit?",
        answer: "Tentu bisa. Status rumah ngontrak bukan halangan untuk memiliki motor impian. Kami memiliki tim analis yang siap membantu mencarikan solusi terbaik agar pengajuan Anda disetujui."
    }
];

export default function CreditSimulation() {
    // We keep the component name 'CreditSimulation' to avoid breaking imports in page.tsx
    // but the content is now FAQ & Credit Info Section

    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="simulation" className="py-20 sm:py-28 bg-[#0F0F0F] relative overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

            {/* Glow Orbs */}
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                    {/* LEFT COLUMN: Why Choose & Requirements */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-white/80 text-xs font-bold uppercase tracking-widest mb-6">
                                <FileText size={14} /> Informasi Kredit
                            </span>

                            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
                                Kredit Motor <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-500">Gak Pake Ribet.</span>
                            </h2>

                            <p className="text-gray-400 text-lg leading-relaxed mb-10 border-l-4 border-primary pl-6">
                                Jangan biarkan administrasi menghalangi impianmu. Di Pos Resmi Virgi Motor, kami bantu prosesnya sampai motor parkir di rumah.
                            </p>

                            {/* Checklist */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-green-500 shrink-0">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Jaminan ACC Tinggi</h4>
                                        <p className="text-gray-500 text-sm mt-1">Data dibantu sales senior berpengalaman sampai disetujui leasing.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">KTP Daerah Aman</h4>
                                        <p className="text-gray-500 text-sm mt-1">Bebas beli motor dengan KTP domisili mana saja, tanpa biaya tambahan.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-yellow-500 shrink-0">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-lg">Proses 1 Hari Selesai</h4>
                                        <p className="text-gray-500 text-sm mt-1">Pagi survei, Sore hasil keluar. Besok motor langsung dikirim.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: FAQ Accordion */}
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30">
                                <HelpCircle size={20} />
                            </div>
                            <h3 className="text-2xl font-bold text-white">Pertanyaan Umum (FAQ)</h3>
                        </div>

                        <div className="space-y-4">
                            {FAQS.map((faq, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    onClick={() => setOpenIndex(process => process === idx ? null : idx)}
                                    className={`cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden ${openIndex === idx
                                        ? 'bg-white/10 border-primary/50'
                                        : 'bg-white/5 border-white/5 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="p-6 flex justify-between items-center gap-4">
                                        <h4 className={`font-bold text-base sm:text-lg ${openIndex === idx ? 'text-primary' : 'text-gray-200'}`}>
                                            {faq.question}
                                        </h4>
                                        <ChevronDown
                                            className={`text-gray-400 transition-transform duration-300 shrink-0 ${openIndex === idx ? 'rotate-180 text-primary' : ''}`}
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {openIndex === idx && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-6 pb-6 text-gray-400 text-base leading-relaxed border-t border-white/5 pt-4">
                                                    {faq.answer}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Info */}
                        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <p className="text-gray-400 text-sm">Masih ada pertanyaan lain?</p>
                                <p className="text-white font-bold text-lg">Hubungi Sales Senior Kami</p>
                            </div>
                            <a
                                href={getWhatsAppLink('Halo Pak, saya mau tanya persyaratan dan simulasi kredit motor Honda.')}
                                className="px-6 py-3 bg-primary hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary/20 whitespace-nowrap"
                            >
                                Tanya via WhatsApp
                            </a>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
