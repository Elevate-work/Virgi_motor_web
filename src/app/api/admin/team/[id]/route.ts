import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/team/[id]
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const member = await prisma.teamMember.findUnique({
            where: { id },
        });

        if (!member) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(member);
    } catch (error) {
        console.error('Error fetching team member:', error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}

// PUT /api/admin/team/[id]
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const member = await prisma.teamMember.update({
            where: { id },
            data: {
                name: body.name,
                role: body.role,
                photo: body.photo || null,
                whatsapp: body.whatsapp || null,
                isActive: body.isActive ?? true,
            },
        });

        return NextResponse.json(member);
    } catch (error) {
        console.error('Error updating team member:', error);
        return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
    }
}

// DELETE /api/admin/team/[id]
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.teamMember.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting team member:', error);
        return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
}
