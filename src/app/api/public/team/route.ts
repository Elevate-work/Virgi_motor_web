import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ============================================================
// 👥 PUBLIC TEAM API
// ============================================================
// GET /api/public/team - Ambil semua anggota tim yang aktif
// ============================================================

export async function GET() {
    try {
        const members = await prisma.teamMember.findMany({
            where: { isActive: true },
            orderBy: { order: 'asc' },
            select: {
                id: true,
                name: true,
                role: true,
                photo: true,
                whatsapp: true,
            },
        });

        return NextResponse.json(members);
    } catch (error) {
        console.error('Error fetching team:', error);
        return NextResponse.json(
            { error: 'Failed to fetch team' },
            { status: 500 }
        );
    }
}
