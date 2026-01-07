import type { Metadata } from "next";
import AboutSection from "@/components/AboutSection";

export const metadata: Metadata = {
    title: "Tentang Kami",
    description: "Pos Resmi Virgi Motor Cikarang adalah titik penjualan resmi motor Honda. Unit 100% baru, garansi AHM 5 tahun, proses kredit cepat. Kunjungi dealer kami.",
    keywords: ["tentang virgi motor", "dealer honda cikarang", "pos resmi honda", "profil dealer honda"],
    openGraph: {
        title: "Tentang Kami | Pos Resmi Virgi Motor Cikarang",
        description: "Kenali lebih dekat Pos Resmi Virgi Motor - dealer resmi Honda di Cikarang dengan pelayanan terbaik.",
    },
};

export default function TentangKami() {
    return (
        <div className="min-h-screen bg-white">
            <AboutSection />
        </div>
    );
}
