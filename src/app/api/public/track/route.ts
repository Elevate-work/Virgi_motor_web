import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// POST /api/public/track - Track page view
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const path = body.path || '/';
        const today = new Date().toISOString().split('T')[0];

        // Upsert page view
        await prisma.pageView.upsert({
            where: {
                path_date: {
                    path,
                    date: today,
                },
            },
            update: {
                count: {
                    increment: 1,
                },
            },
            create: {
                path,
                date: today,
                count: 1,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error tracking view:', error);
        return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
    }
}
