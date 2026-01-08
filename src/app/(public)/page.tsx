'use client';

import Features from "@/components/Features";
import PromoSection from "@/components/PromoSection";
import TeamSection from "@/components/TeamSection";
import CreditSimulation from "@/components/CreditSimulation";
import Hero from "@/components/Hero";
import TestimonialsSection from "@/components/TestimonialsSection";

export default function Home() {
  return (
    // Added pt-24 to push content down because Navbar is fixed
    <div className="flex flex-col w-full min-h-screen bg-base-white pt-24">

      <main>
        <Hero />
        <Features />
        <PromoSection />
        <TestimonialsSection />
        <CreditSimulation />
        <TeamSection />
      </main>

      <footer className="bg-tesla-black text-white py-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-2 text-white uppercase tracking-wider">Pos Resmi</h3>
            <h4 className="text-lg font-bold mb-6 text-primary">Virgi Motor Cikarang</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Titik penjualan resmi motor Honda di bawah naungan Dealer Virgi Motor. Unit 100% baru, garansi AHM, pelayanan terpercaya.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#E4405F] cursor-pointer transition-colors text-sm font-bold">
                IG
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#1877F2] cursor-pointer transition-colors text-sm font-bold">
                FB
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#25D366] cursor-pointer transition-colors text-sm font-bold">
                WA
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Menu Cepat</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="/" className="hover:text-primary transition-colors">Beranda</a></li>
              <li><a href="/katalog" className="hover:text-primary transition-colors">Katalog Motor</a></li>
              <li><a href="/tentang-kami" className="hover:text-primary transition-colors">Tentang Kami</a></li>
              <li><a href="/tentang-kami#contact" className="hover:text-primary transition-colors">Hubungi Kami</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Kategori Motor</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li><a href="/katalog" className="hover:text-primary transition-colors">Matic</a></li>
              <li><a href="/katalog" className="hover:text-primary transition-colors">Sport</a></li>
              <li><a href="/katalog" className="hover:text-primary transition-colors">Bebek (Cub)</a></li>
              <li><a href="/katalog" className="hover:text-primary transition-colors">Electric (EV)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Kontak</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex gap-3">
                <span>📍</span>
                <span>Jl. Cikarang Baru No. 88, Bekasi<br /><span className="text-gray-500 text-xs">(Ganti alamat asli)</span></span>
              </li>
              <li className="flex gap-3">
                <span>📞</span>
                <span>(021) 8900-8888</span>
              </li>
              <li className="flex gap-3">
                <span>💬</span>
                <a href="https://wa.me/6281234567890" target="_blank" className="text-[#25D366] hover:underline">0812-3456-7890 (WA)</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-gray-500 text-xs">
          &copy; 2024 Pos Resmi Virgi Motor Cikarang. All Rights Reserved. | Dealer Resmi Honda
        </div>
      </footer>
    </div>
  );
}
