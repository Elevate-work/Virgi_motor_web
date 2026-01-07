// ============================================================
// 📦 MASTER DATA - Centralized Product & Promo Data
// ============================================================
// File ini adalah "Single Source of Truth" untuk semua data motor.
// Saat Anda membuat CMS nanti, file ini akan diganti dengan API fetch.
// Struktur Type di bawah ini siap digunakan sebagai schema database.
// ============================================================

// --- TYPE DEFINITIONS (CMS-Ready Schema) ---

/**
 * Promo Type - Field yang akan diisi oleh Admin di CMS
 * Jika promo ada dan isActive = true, motor akan muncul di Promo Section
 */
export type Promo = {
    isActive: boolean;              // Status promo (aktif/tidak)
    badgeText: string;              // Teks utama badge, e.g. "Hemat 1.5 Jt"
    highlights: string[];           // Poin-poin promo, e.g. ["DP 500rb", "Gratis Oli"]
    cardBgColor?: string;           // Warna latar card promo (Tailwind class), e.g. "bg-red-50"
    cardTextColor?: string;         // Warna teks card promo, e.g. "text-white"
    endDate?: string;               // Tanggal berakhir promo (ISO string), untuk countdown nanti
    customWhatsappMessage?: string; // Pesan WA kustom, jika tidak ada pakai default
};

/**
 * Product Type - Struktur Data Utama Motor
 * Ini adalah struktur yang akan di-mapping ke tabel/collection di CMS
 */
export type Product = {
    id: string;
    name: string;
    category: 'Matic' | 'Sport' | 'Cub' | 'EV';
    price: number;
    image: string;
    features: string[];
    cc: string;
    dp_min: number;

    // Optional Promo Field - Jika ada, motor ini sedang promo
    promo?: Promo;
};


// ============================================================
// 📊 PRODUCT DATA
// ============================================================
// Data di bawah ini adalah SIMULASI database.
// Nanti saat CMS jadi, data ini diambil dari API, bukan hardcode.
// ============================================================

export const products: Product[] = [
    // --- MATIC ---
    // BeAT Series
    {
        id: 'beat-cbs',
        name: 'All New BeAT CBS',
        category: 'Matic',
        price: 19075000,
        image: '/all_bike/Beat.webp',
        features: ['Econo Power', 'Secure Key Shutter', 'Combined Digital Panel Meter'],
        cc: '110cc',
        dp_min: 2000000,
        // ✅ PROMO AKTIF
        promo: {
            isActive: true,
            badgeText: 'DP 500rb',
            highlights: ['Angsuran 800rb-an/bulan', 'Gratis Helm SNI', 'Potongan Tenor 1x'],
            cardBgColor: 'bg-blue-900',
            cardTextColor: 'text-white',
        }
    },
    {
        id: 'beat-deluxe',
        name: 'All New BeAT Deluxe',
        category: 'Matic',
        price: 20100000,
        image: '/all_bike/beat_deluxe.webp',
        features: ['ISS', 'Premium Design', 'Power Charger'],
        cc: '110cc',
        dp_min: 2100000
    },
    {
        id: 'beat-smartkey',
        name: 'All New BeAT Smart Key',
        category: 'Matic',
        price: 20675000,
        image: '/all_bike/beat_smartkey.webp',
        features: ['Smart Key System', 'Seat Opener', 'ISS'],
        cc: '110cc',
        dp_min: 2100000
    },
    {
        id: 'beat-street',
        name: 'All New BeAT Street',
        category: 'Matic',
        price: 20200000,
        image: '/all_bike/beat_street.webp',
        features: ['Naked Handlebar', 'Digital Panel Meter', 'Wavy Disc Brake'],
        cc: '110cc',
        dp_min: 2100000,
        // ✅ PROMO AKTIF
        promo: {
            isActive: true,
            badgeText: 'DP 900rb',
            highlights: ['Angsuran 800rb-an', 'Helm Sporty', 'Service Gratis 4x'],
            cardBgColor: 'bg-emerald-700',
            cardTextColor: 'text-white',
        }
    },

    // Genio Series
    {
        id: 'genio-cbs',
        name: 'Genio CBS',
        category: 'Matic',
        price: 20375000,
        image: '/all_bike/genio_cbs.webp',
        features: ['Casual Design', 'Mobile Charger', 'LED Headlight'],
        cc: '110cc',
        dp_min: 2100000,
        // ✅ PROMO AKTIF
        promo: {
            isActive: true,
            badgeText: 'Potongan 3 Bulan',
            highlights: ['DP Mulai 500rb', 'Gratis Oli 2x', 'Cashback 200rb'],
            cardBgColor: 'bg-red-50',
            cardTextColor: 'text-tesla-black',
        }
    },
    {
        id: 'genio-cbs-iss',
        name: 'Genio CBS ISS',
        category: 'Matic',
        price: 20925000,
        image: '/all_bike/genio_cbs_iss.webp',
        features: ['Idling Stop System', 'Fabulous Design', 'Digital Panel'],
        cc: '110cc',
        dp_min: 2100000
    },

    // Scoopy Series
    {
        id: 'scoopy-energetic',
        name: 'New Scoopy Energetic & Fashion',
        category: 'Matic',
        price: 23250000,
        image: '/all_bike/scoopy_fashion.webp',
        features: ['Trendsetter Design', 'LED Projector', 'Combi Brake'],
        cc: '110cc',
        dp_min: 2400000
    },
    {
        id: 'scoopy-prestige',
        name: 'New Scoopy Prestige & Stylish',
        category: 'Matic',
        price: 24050000,
        image: '/all_bike/scoopy_prestige.webp',
        features: ['Smart Key System', 'Premium Colors', 'Light Alloys'],
        cc: '110cc',
        dp_min: 2500000
    },

    // Vario 125 Series
    {
        id: 'vario-125-cbs',
        name: 'New Vario 125 CBS',
        category: 'Matic',
        price: 24275000,
        image: '/all_bike/vario_125_cbs.webp',
        features: ['125cc eSP Engine', 'Full Digital Meter', 'Wide Track'],
        cc: '125cc',
        dp_min: 2500000
    },
    {
        id: 'vario-125-iss',
        name: 'New Vario 125 CBS ISS',
        category: 'Matic',
        price: 26100000,
        image: '/all_bike/vario_125_iss.webp',
        features: ['Idling Stop System', 'Smart Key', 'New Wheel Design'],
        cc: '125cc',
        dp_min: 2700000
    },

    // Stylo Series
    {
        id: 'stylo-160-cbs',
        name: 'Stylo 160 CBS',
        category: 'Matic',
        price: 29325000,
        image: '/all_bike/stylo_160_cbs.webp',
        features: ['Fashionable Design', '160cc eSP+', 'Digital Panel'],
        cc: '160cc',
        dp_min: 3000000
    },
    {
        id: 'stylo-160-abs',
        name: 'Stylo 160 ABS',
        category: 'Matic',
        price: 32300000,
        image: '/all_bike/stylo_160_abs.webp',
        features: ['Anti-lock Braking', 'Premium Leather Seat', 'Smart Key'],
        cc: '160cc',
        dp_min: 3300000
    },

    // Vario 160 Series
    {
        id: 'vario-160-cbs',
        name: 'Vario 160 CBS',
        category: 'Matic',
        price: 28275000,
        image: '/all_bike/vario_160_cbs.webp',
        features: ['Brand New 160cc eSP+', 'Bigger Tire', 'USB Charger'],
        cc: '160cc',
        dp_min: 2900000
    },
    {
        id: 'vario-160-abs',
        name: 'Vario 160 ABS',
        category: 'Matic',
        price: 31300000,
        image: '/all_bike/vario_160_abs.webp',
        features: ['ABS Brake', 'Rear Disc Brake', 'Premium Emblem'],
        cc: '160cc',
        dp_min: 3200000,
        // ✅ PROMO AKTIF
        promo: {
            isActive: true,
            badgeText: 'Cashback 1.2 Jt',
            highlights: ['Diskon Khusus Pelajar', 'Jaket Eksklusif', 'DP Ringan'],
            cardBgColor: 'bg-gray-100',
            cardTextColor: 'text-tesla-black',
        }
    },

    // PCX Series
    {
        id: 'pcx-160-cbs',
        name: 'All New PCX 160 CBS',
        category: 'Matic',
        price: 33550000,
        image: '/all_bike/pcx_160_cbs.webp',
        features: ['Luxury Design', 'Comfort Riding', 'Large Luggage'],
        cc: '160cc',
        dp_min: 3400000
    },
    {
        id: 'pcx-160-abs',
        name: 'All New PCX 160 ABS',
        category: 'Matic',
        price: 37075000,
        image: '/all_bike/pcx_160_abs.webp',
        features: ['HSTC Control', 'ABS', 'Gold Emblem'],
        cc: '160cc',
        dp_min: 3800000,
        // ✅ PROMO AKTIF
        promo: {
            isActive: true,
            badgeText: 'Hemat 1.5 Jt',
            highlights: ['DP Mulai 2 Jutaan', 'Potongan Tenor 1x', 'Gratis Apparel'],
            cardBgColor: 'bg-gray-900',
            cardTextColor: 'text-white',
        }
    },

    // ADV Series
    {
        id: 'adv-160-cbs',
        name: 'ADV 160 CBS',
        category: 'Matic',
        price: 36600000,
        image: '/all_bike/adv_160_cbs.webp',
        features: ['New Adventure Style', 'Two Step Windscreen', 'Full Digital Panel'],
        cc: '160cc',
        dp_min: 3700000
    },
    {
        id: 'adv-160-abs',
        name: 'ADV 160 ABS',
        category: 'Matic',
        price: 39450000,
        image: '/all_bike/adv_160_abs.webp',
        features: ['ESS', 'HSTC', 'Tough Appearance'],
        cc: '160cc',
        dp_min: 4200000
    },

    // --- CUB (BEBEK) ---
    {
        id: 'revo-fit',
        name: 'Revo Fit',
        category: 'Cub',
        price: 17925000,
        image: '/all_bike/revo.webp',
        features: ['Mesin Tangguh', 'Kunci Pengaman', 'Bagasi Fungsional'],
        cc: '110cc',
        dp_min: 1800000
    },
    {
        id: 'revo-x',
        name: 'Revo X',
        category: 'Cub',
        price: 19650000,
        image: '/all_bike/revo_x.webp',
        features: ['Sporty Stripe', 'Panel Meter Modern', 'Auto Secure Key'],
        cc: '110cc',
        dp_min: 2000000
    },
    {
        id: 'supra-x-125',
        name: 'Supra X 125 CW',
        category: 'Cub',
        price: 22250000,
        image: '/all_bike/supra_x_125.webp',
        features: ['Legendary Engine 125cc', 'Mobile Charger', 'Luxury Stripping'],
        cc: '125cc',
        dp_min: 2300000
    },
    {
        id: 'supra-gtr-150',
        name: 'Supra GTR 150 Sporty',
        category: 'Cub',
        price: 25950000,
        image: '/all_bike/supra_gtr_150.webp',
        features: ['6-Speed Engine', 'LED Headlight', 'Front & Rear Disc'],
        cc: '150cc',
        dp_min: 2700000
    },

    // --- SPORT ---
    {
        id: 'crf-150l',
        name: 'CRF 150 L',
        category: 'Sport',
        price: 37125000,
        image: '/all_bike/crf_150l.webp',
        features: ['On-Off Road', 'Long Travel Suspension', 'Aluminium Rims'],
        cc: '150cc',
        dp_min: 4600000
    }
];


// ============================================================
// 🔧 DATA ACCESS FUNCTIONS (API Simulation Layer)
// ============================================================
// Fungsi-fungsi ini adalah "jembatan" antara data dan tampilan.
// Saat CMS jadi, ubah isi fungsi ini menjadi fetch() ke API.
// Frontend tidak perlu diubah sama sekali!
// ============================================================

/**
 * Get all products
 * @returns All products from database
 */
export function getAllProducts(): Product[] {
    // TODO CMS: Ganti dengan fetch('/api/products')
    return products;
}

/**
 * Get products that have an active promo
 * @returns Products where promo.isActive === true
 */
export function getPromoProducts(): Product[] {
    // TODO CMS: Ganti dengan fetch('/api/products?promo=active')
    return products.filter(p => p.promo?.isActive === true);
}

/**
 * Get a single product by ID
 * @param id - Product ID
 * @returns Product or undefined
 */
export function getProductById(id: string): Product | undefined {
    // TODO CMS: Ganti dengan fetch(`/api/products/${id}`)
    return products.find(p => p.id === id);
}

/**
 * Get products by category
 * @param category - Category name
 * @returns Products in that category
 */
export function getProductsByCategory(category: Product['category']): Product[] {
    // TODO CMS: Ganti dengan fetch(`/api/products?category=${category}`)
    return products.filter(p => p.category === category);
}

/**
 * Helper to format price to Rupiah string
 * @param price - Number price
 * @returns Formatted string e.g. "Rp 19.075.000"
 */
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

/**
 * Generate WhatsApp link for a product
 * @param product - Product object
 * @returns WhatsApp URL with pre-filled message
 */
export function generateWhatsAppLink(product: Product): string {
    const phoneNumber = "6281234567890"; // Ganti dengan nomor asli
    const message = product.promo?.customWhatsappMessage
        || `Halo Virgi Motor, saya tertarik dengan ${product.name}. ${product.promo ? `Promo: ${product.promo.badgeText}.` : ''} Mohon info lebih lanjut.`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}
