import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/public/testimonials - Get active testimonials
export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
            select: {
                id: true,
                name: true,
                photo: true,
                motor: true,
                rating: true,
                message: true,
            },
        });

        return NextResponse.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return NextResponse.json([], { status: 200 });
    }
}
