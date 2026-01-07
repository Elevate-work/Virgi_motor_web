import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// DELETE /api/admin/gallery/[id]
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.galleryImage.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting gallery image:', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
