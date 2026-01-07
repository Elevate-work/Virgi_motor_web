import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/products - Get all products for admin
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}

// POST /api/admin/products - Create new product
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Generate slug from name
        const slug = body.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        const product = await prisma.product.create({
            data: {
                name: body.name,
                slug: slug,
                category: body.category,
                price: parseInt(body.price),
                dpMin: parseInt(body.dpMin),
                cc: body.cc,
                image: body.image || '/all_bike/placeholder.webp',
                features: body.features || [],
                order: body.order || 0,
                promoActive: body.promoActive || false,
                promoBadgeText: body.promoBadgeText || null,
                promoHighlights: body.promoHighlights || [],
                promoCardBgColor: body.promoCardBgColor || null,
                promoCardTextColor: body.promoCardTextColor || null,
            },
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
    }
}
