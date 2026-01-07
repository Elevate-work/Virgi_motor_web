import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// ============================================================
// ⚙️ PUBLIC SETTINGS API
// ============================================================
// GET /api/public/settings - Ambil semua settings
// ============================================================

export async function GET() {
    try {
        const settings = await prisma.setting.findMany();

        // Convert ke object key-value
        const settingsObj: Record<string, string> = {};
        settings.forEach(s => {
            settingsObj[s.key] = s.value;
        });

        return NextResponse.json(settingsObj);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json(
            { error: 'Failed to fetch settings' },
            { status: 500 }
        );
    }
}
