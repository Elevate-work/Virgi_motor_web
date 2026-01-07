import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT /api/admin/testimonials/[id]
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: {
                name: body.name,
                photo: body.photo || null,
                motor: body.motor || null,
                rating: body.rating,
                message: body.message,
                isActive: body.isActive,
            },
        });

        return NextResponse.json(testimonial);
    } catch (error) {
        console.error('Error updating testimonial:', error);
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

// DELETE /api/admin/testimonials/[id]
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.testimonial.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting testimonial:', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
