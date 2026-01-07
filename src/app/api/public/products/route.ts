import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ============================================================
// 🏍️ PUBLIC PRODUCTS API
// ============================================================
// GET /api/public/products - Semua produk untuk katalog
// GET /api/public/products?promo=1 - Produk dengan promo aktif
// GET /api/public/products?category=Matic - Filter by kategori
// ============================================================

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const promoOnly = searchParams.get('promo') === '1';
        const category = searchParams.get('category');

        const where: Record<string, unknown> = {};

        if (promoOnly) {
            where.promoActive = true;
        }

        if (category && category !== 'All') {
            where.category = category;
        }

        const products = await prisma.product.findMany({
            where,
            orderBy: { order: 'asc' },
        });

        // Transform ke format yang sesuai dengan frontend
        const formattedProducts = products.map(p => ({
            id: p.slug, // Gunakan slug sebagai id untuk compatibility
            name: p.name,
            category: p.category,
            price: p.price,
            image: p.image,
            features: p.features,
            cc: p.cc,
            dp_min: p.dpMin,
            promo: p.promoActive ? {
                isActive: true,
                badgeText: p.promoBadgeText,
                highlights: p.promoHighlights,
                cardBgColor: p.promoCardBgColor,
                cardTextColor: p.promoCardTextColor,
            } : undefined,
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}
