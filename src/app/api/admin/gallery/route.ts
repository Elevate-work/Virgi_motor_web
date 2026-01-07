import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/gallery
export async function GET() {
    try {
        const images = await prisma.galleryImage.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(images);
    } catch (error) {
        console.error('Error fetching gallery:', error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

// POST /api/admin/gallery
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const image = await prisma.galleryImage.create({
            data: {
                image: body.image,
                label: body.label || null,
                category: body.category || null,
                isActive: true,
                order: body.order || 0,
            },
        });

        return NextResponse.json(image, { status: 201 });
    } catch (error) {
        console.error('Error creating gallery image:', error);
        return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
    }
}
