import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/admin/analytics
export async function GET() {
    try {
        const today = new Date().toISOString().split('T')[0];

        // Get all page views
        const allViews = await prisma.pageView.findMany();

        // Calculate page stats
        const pageStatsMap = new Map<string, { totalViews: number; todayViews: number }>();

        allViews.forEach(view => {
            const existing = pageStatsMap.get(view.path) || { totalViews: 0, todayViews: 0 };
            existing.totalViews += view.count;
            if (view.date === today) {
                existing.todayViews += view.count;
            }
            pageStatsMap.set(view.path, existing);
        });

        const pageStats = Array.from(pageStatsMap.entries())
            .map(([path, stats]) => ({ path, ...stats }))
            .sort((a, b) => b.totalViews - a.totalViews);

        // Calculate daily stats (last 30 days)
        const dailyStatsMap = new Map<string, number>();
        allViews.forEach(view => {
            const existing = dailyStatsMap.get(view.date) || 0;
            dailyStatsMap.set(view.date, existing + view.count);
        });

        const dailyStats = Array.from(dailyStatsMap.entries())
            .map(([date, count]) => ({ date, count }))
            .sort((a, b) => b.date.localeCompare(a.date));

        // Calculate totals
        const totalViews = allViews.reduce((sum, v) => sum + v.count, 0);
        const todayViews = allViews
            .filter(v => v.date === today)
            .reduce((sum, v) => sum + v.count, 0);

        return NextResponse.json({
            pageStats,
            dailyStats,
            totalViews,
            todayViews,
        });
    } catch (error) {
        console.error('Error fetching analytics:', error);
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
