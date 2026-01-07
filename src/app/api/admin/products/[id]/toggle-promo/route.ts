import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/admin/products/[id]/toggle-promo
export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const product = await prisma.product.update({
            where: { id },
            data: {
                promoActive: body.promoActive,
            },
        });

        return NextResponse.json(product);
    } catch (error) {
        console.error('Error toggling promo:', error);
        return NextResponse.json({ error: 'Failed to toggle promo' }, { status: 500 });
    }
}
