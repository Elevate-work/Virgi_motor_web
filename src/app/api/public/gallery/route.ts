import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/public/gallery - Get active gallery images
// Optional query param: ?category=konsultan-personal
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');

        const images = await prisma.galleryImage.findMany({
            where: {
                isActive: true,
                ...(category && { category: category }),
            },
            orderBy: { order: 'asc' },
            select: {
                id: true,
                image: true,
                label: true,
                category: true,
            },
        });

        return NextResponse.json(images);
    } catch (error) {
        console.error('Error fetching gallery:', error);
        return NextResponse.json([], { status: 200 });
    }
}
