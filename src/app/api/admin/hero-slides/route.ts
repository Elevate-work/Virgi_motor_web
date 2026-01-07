import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/hero-slides
export async function GET() {
    try {
        const slides = await prisma.heroSlide.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(slides);
    } catch (error) {
        console.error('Error fetching slides:', error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

// POST /api/admin/hero-slides
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const slide = await prisma.heroSlide.create({
            data: {
                image: body.image,
                title: body.title || null,
                isActive: true,
                order: 0,
            },
        });

        return NextResponse.json(slide, { status: 201 });
    } catch (error) {
        console.error('Error creating slide:', error);
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}
