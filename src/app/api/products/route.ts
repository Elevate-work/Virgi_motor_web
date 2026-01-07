import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ============================================================
// 📦 PRODUCTS API
// ============================================================
// GET /api/products - Ambil semua produk
// GET /api/products?promo=1 - Ambil produk dengan promo aktif
// ============================================================

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const promoOnly = searchParams.get('promo') === '1';
        const category = searchParams.get('category');

        const where: any = {};

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

        // Transform to match frontend expected format
        const formattedProducts = products.map(p => ({
            id: p.id,
            name: p.name,
            slug: p.slug,
            category: p.category,
            price: p.price,
            dp_min: p.dpMin,
            cc: p.cc,
            image: p.image,
            features: p.features,
            promo: p.promoActive ? {
                isActive: p.promoActive,
                badgeText: p.promoBadgeText,
                highlights: p.promoHighlights,
                cardBgColor: p.promoCardBgColor,
                cardTextColor: p.promoCardTextColor,
                endDate: p.promoEndDate,
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
