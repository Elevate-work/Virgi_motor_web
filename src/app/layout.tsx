import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// ============================================================
// 📱 VIEWPORT - Pengaturan responsif (wajib terpisah di Next.js 14+)
// ============================================================
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#DA0000",
};

// ============================================================
// 🔍 SEO METADATA - Edit bagian ini sesuai kebutuhan Anda
// ============================================================
export const metadata: Metadata = {

  // --- METADATA BASE (Wajib untuk OG Images) ---
  metadataBase: new URL("https://www.virgimotor.com"), // Ganti dengan domain asli Anda

  // --- TITLE TEMPLATE ---
  title: {
    default: "Pos Resmi Virgi Motor Cikarang | Dealer Motor Honda Resmi",
    template: "%s | Pos Resmi Virgi Motor Cikarang",
  },

  // --- DESCRIPTION (Deskripsi Halaman) ---
  description: "Beli motor Honda kredit murah di Cikarang. DP ringan mulai 500rb, proses ACC cepat 1 hari, unit ready stock. Hubungi Pos Resmi Virgi Motor sekarang!",

  // --- KEYWORDS (Kata Kunci) ---
  keywords: [
    "dealer honda cikarang",
    "kredit motor honda cikarang",
    "beli motor cikarang",
    "motor honda murah bekasi",
    "dp motor honda ringan",
    "beli motor honda cikarang utara",
    "pos resmi honda virgi motor cikarang",
    "cicilan motor honda",
    "dealer resmi honda bekasi",
    "harga motor honda cikarang",
    "promo motor honda",
  ],

  // --- AUTHOR (Penulis/Pemilik Website) ---
  authors: [{ name: "Pos Resmi Virgi Motor Cikarang" }],
  creator: "Pos Resmi Virgi Motor Cikarang",
  publisher: "Pos Resmi Virgi Motor Cikarang",

  // --- ROBOTS (Instruksi untuk Google Bot) ---
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // --- VERIFICATION (untuk Google Search Console) ---
  // verification: {
  //   google: "your-google-verification-code",
  // },

  // ============================================================
  // 📱 OPEN GRAPH - Untuk tampilan saat di-share di Facebook/LinkedIn
  // ============================================================
  openGraph: {
    title: "Pos Resmi Virgi Motor Cikarang | Dealer Motor Honda Resmi",
    description: "Beli motor Honda dengan kredit mudah! DP mulai 500rb, proses cepat 1 hari. Kunjungi dealer kami di Cikarang.",
    url: "https://www.virgimotor.com",
    siteName: "Pos Resmi Virgi Motor Cikarang",
    images: [
      {
        url: "/og-image.png", // Buat gambar 1200x630px di folder public/
        width: 1200,
        height: 630,
        alt: "Dealer Motor Honda Pos Resmi Virgi Motor Cikarang",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // ============================================================
  // 🐦 TWITTER CARD
  // ============================================================
  twitter: {
    card: "summary_large_image",
    title: "Pos Resmi Virgi Motor Cikarang | Dealer Motor Honda Resmi",
    description: "Beli motor Honda dengan kredit mudah! DP mulai 500rb, proses cepat 1 hari.",
    images: ["/og-image.png"],
  },

  // ============================================================
  // 🔧 TECHNICAL SEO
  // ============================================================
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/honda-logo.png", type: "image/png" },
    ],
    apple: "/honda-logo.png",
  },

  // Canonical URL - mencegah konten duplikat
  alternates: {
    canonical: "https://www.virgimotor.com",
  },

  // Category
  category: "automotive",
};

// ============================================================
// 🏢 STRUCTURED DATA - JSON-LD untuk Local Business
// ============================================================
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "Pos Resmi Virgi Motor Cikarang",
  description: "Dealer resmi motor Honda di Cikarang. Jual motor Honda baru dengan kredit mudah, DP ringan, dan proses cepat.",
  url: "https://www.virgimotor.com",
  telephone: "+62-812-3456-7890", // Ganti dengan nomor asli
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Cikarang Baru No. 88", // Ganti dengan alamat asli
    addressLocality: "Cikarang Utara",
    addressRegion: "Jawa Barat",
    postalCode: "17530",
    addressCountry: "ID",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -6.2088, // Ganti dengan koordinat asli
    longitude: 107.0896,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "17:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "08:00",
      closes: "14:00",
    },
  ],
  sameAs: [
    // Tambahkan link social media
    // "https://www.facebook.com/virgimotor",
    // "https://www.instagram.com/virgimotor",
  ],
  priceRange: "Rp 15.000.000 - Rp 50.000.000",
  image: "https://www.virgimotor.com/og-image.png",
  brand: {
    "@type": "Brand",
    name: "Honda",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${outfit.variable} antialiased bg-base-white text-tesla-black overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
