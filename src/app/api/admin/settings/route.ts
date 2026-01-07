import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/settings - Get all settings
export async function GET() {
    try {
        const settings = await prisma.setting.findMany();
        return NextResponse.json(settings);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

// PUT /api/admin/settings - Update settings
export async function PUT(request: Request) {
    try {
        const body = await request.json();

        // Update each setting
        for (const [key, value] of Object.entries(body)) {
            await prisma.setting.upsert({
                where: { key },
                update: { value: value as string },
                create: { key, value: value as string, type: 'text' },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
