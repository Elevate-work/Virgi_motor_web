import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/team - Get all team members
export async function GET() {
    try {
        const members = await prisma.teamMember.findMany({
            orderBy: { order: 'asc' },
        });
        return NextResponse.json(members);
    } catch (error) {
        console.error('Error fetching team:', error);
        return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
    }
}

// POST /api/admin/team - Create new team member
export async function POST(request: Request) {
    try {
        const body = await request.json();

        const member = await prisma.teamMember.create({
            data: {
                name: body.name,
                role: body.role,
                photo: body.photo || null,
                whatsapp: body.whatsapp || null,
                isActive: body.isActive ?? true,
                order: body.order || 0,
            },
        });

        return NextResponse.json(member, { status: 201 });
    } catch (error) {
        console.error('Error creating team member:', error);
        return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
    }
}
