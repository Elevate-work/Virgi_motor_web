import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/public/hero-slides - Get active hero slides
export async function GET() {
    try {
        const slides = await prisma.heroSlide.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
            select: {
                id: true,
                image: true,
                title: true,
            },
        });

        return NextResponse.json(slides);
    } catch (error) {
        console.error('Error fetching hero slides:', error);
        return NextResponse.json([], { status: 200 }); // Return empty array on error
    }
}
