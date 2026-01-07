import { hash } from 'bcryptjs';
import prisma from '../src/lib/prisma';

// ============================================================
// 🌱 DATABASE SEED SCRIPT
// ============================================================
// Jalankan dengan: npx ts-node prisma/seed.ts
// Atau: npx prisma db seed
// ============================================================

async function main() {
    console.log('🌱 Starting database seed...');

    // --- CREATE ADMIN USER ---
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@virgimotor.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const hashedPassword = await hash(adminPassword, 12);

    const existingUser = await prisma.user.findUnique({
        where: { email: adminEmail },
    });

    if (!existingUser) {
        await prisma.user.create({
            data: {
                email: adminEmail,
                password: hashedPassword,
                name: 'Admin Virgi Motor',
                role: 'super_admin',
            },
        });
        console.log(`✅ Admin user created: ${adminEmail}`);
    } else {
        console.log(`ℹ️ Admin user already exists: ${adminEmail}`);
    }

    // --- CREATE SAMPLE PRODUCTS ---
    const existingProducts = await prisma.product.count();

    if (existingProducts === 0) {
        const sampleProducts = [
            {
                name: 'All New BeAT CBS',
                slug: 'beat-cbs',
                category: 'Matic',
                price: 19075000,
                dpMin: 2000000,
                cc: '110cc',
                image: '/all_bike/Beat.webp',
                features: ['Econo Power', 'Secure Key Shutter', 'Combined Digital Panel Meter'],
                order: 1,
                promoActive: true,
                promoBadgeText: 'DP 500rb',
                promoHighlights: ['Angsuran 800rb-an/bulan', 'Gratis Helm SNI', 'Potongan Tenor 1x'],
                promoCardBgColor: 'bg-blue-900',
                promoCardTextColor: 'text-white',
            },
            {
                name: 'All New BeAT Street',
                slug: 'beat-street',
                category: 'Matic',
                price: 20200000,
                dpMin: 2100000,
                cc: '110cc',
                image: '/all_bike/beat_street.webp',
                features: ['Naked Handlebar', 'Digital Panel Meter', 'Wavy Disc Brake'],
                order: 2,
                promoActive: true,
                promoBadgeText: 'DP 900rb',
                promoHighlights: ['Angsuran 800rb-an', 'Helm Sporty', 'Service Gratis 4x'],
                promoCardBgColor: 'bg-emerald-700',
                promoCardTextColor: 'text-white',
            },
            {
                name: 'Genio CBS',
                slug: 'genio-cbs',
                category: 'Matic',
                price: 20375000,
                dpMin: 2100000,
                cc: '110cc',
                image: '/all_bike/genio_cbs.webp',
                features: ['Casual Design', 'Mobile Charger', 'LED Headlight'],
                order: 3,
                promoActive: true,
                promoBadgeText: 'Potongan 3 Bulan',
                promoHighlights: ['DP Mulai 500rb', 'Gratis Oli 2x', 'Cashback 200rb'],
                promoCardBgColor: 'bg-red-50',
                promoCardTextColor: 'text-tesla-black',
            },
            {
                name: 'Vario 160 ABS',
                slug: 'vario-160-abs',
                category: 'Matic',
                price: 31300000,
                dpMin: 3200000,
                cc: '160cc',
                image: '/all_bike/vario_160_abs.webp',
                features: ['ABS Brake', 'Rear Disc Brake', 'Premium Emblem'],
                order: 4,
                promoActive: true,
                promoBadgeText: 'Cashback 1.2 Jt',
                promoHighlights: ['Diskon Khusus Pelajar', 'Jaket Eksklusif', 'DP Ringan'],
                promoCardBgColor: 'bg-gray-100',
                promoCardTextColor: 'text-tesla-black',
            },
            {
                name: 'All New PCX 160 ABS',
                slug: 'pcx-160-abs',
                category: 'Matic',
                price: 37075000,
                dpMin: 3800000,
                cc: '160cc',
                image: '/all_bike/pcx_160_abs.webp',
                features: ['HSTC Control', 'ABS', 'Gold Emblem'],
                order: 5,
                promoActive: true,
                promoBadgeText: 'Hemat 1.5 Jt',
                promoHighlights: ['DP Mulai 2 Jutaan', 'Potongan Tenor 1x', 'Gratis Apparel'],
                promoCardBgColor: 'bg-gray-900',
                promoCardTextColor: 'text-white',
            },
            {
                name: 'New Scoopy Prestige',
                slug: 'scoopy-prestige',
                category: 'Matic',
                price: 24050000,
                dpMin: 2500000,
                cc: '110cc',
                image: '/all_bike/scoopy_prestige.webp',
                features: ['Smart Key System', 'Premium Colors', 'Light Alloys'],
                order: 6,
                promoActive: false,
            },
            {
                name: 'CRF 150 L',
                slug: 'crf-150l',
                category: 'Sport',
                price: 37125000,
                dpMin: 4600000,
                cc: '150cc',
                image: '/all_bike/crf_150l.webp',
                features: ['On-Off Road', 'Long Travel Suspension', 'Aluminium Rims'],
                order: 7,
                promoActive: false,
            },
        ];

        await prisma.product.createMany({
            data: sampleProducts,
        });
        console.log(`✅ Created ${sampleProducts.length} sample products`);
    } else {
        console.log(`ℹ️ Products already exist (${existingProducts} items)`);
    }

    // --- CREATE DEFAULT SETTINGS ---
    const defaultSettings = [
        { key: 'whatsapp_number', value: '6281234567890', type: 'text' },
        { key: 'phone', value: '(021) 8900-8888', type: 'text' },
        { key: 'address', value: 'Jl. Cikarang Baru No. 88, Cikarang Utara, Bekasi, Jawa Barat 17530', type: 'textarea' },
        { key: 'operating_hours_weekday', value: 'Senin - Sabtu: 08:00 - 17:00 WIB', type: 'text' },
        { key: 'operating_hours_weekend', value: 'Minggu: 08:00 - 14:00 WIB', type: 'text' },
        { key: 'instagram_url', value: '', type: 'text' },
        { key: 'facebook_url', value: '', type: 'text' },
    ];

    for (const setting of defaultSettings) {
        await prisma.setting.upsert({
            where: { key: setting.key },
            update: {},
            create: setting,
        });
    }
    console.log(`✅ Default settings created/verified`);

    console.log('🎉 Database seed completed!');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
