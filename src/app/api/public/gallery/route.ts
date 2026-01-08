import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/public/gallery - Get active gallery images
export async function GET() {
    try {
        const images = await prisma.galleryImage.findMany({
            where: { isActive: true },
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
