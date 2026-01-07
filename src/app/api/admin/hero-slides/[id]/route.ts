import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// PUT /api/admin/hero-slides/[id]
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const slide = await prisma.heroSlide.update({
            where: { id },
            data: body,
        });

        return NextResponse.json(slide);
    } catch (error) {
        console.error('Error updating slide:', error);
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

// DELETE /api/admin/hero-slides/[id]
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.heroSlide.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting slide:', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
