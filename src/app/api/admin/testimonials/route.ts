import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/testimonials
export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(testimonials);
    } catch (error) {
        console.error('Error fetching testimonials:', error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

// POST /api/admin/testimonials
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const testimonial = await prisma.testimonial.create({
            data: {
                name: body.name,
                photo: body.photo || null,
                motor: body.motor || null,
                rating: body.rating || 5,
                message: body.message,
                isActive: body.isActive ?? true,
                order: 0,
            },
        });

        return NextResponse.json(testimonial, { status: 201 });
    } catch (error) {
        console.error('Error creating testimonial:', error);
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}
