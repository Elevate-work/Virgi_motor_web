'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Eye,
    TrendingUp,
    Calendar,
    BarChart3
} from 'lucide-react';

type PageViewStats = {
    path: string;
    totalViews: number;
    todayViews: number;
};

type DailyStats = {
    date: string;
    count: number;
};

export default function AnalyticsPage() {
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [pageStats, setPageStats] = useState<PageViewStats[]>([]);
    const [dailyStats, setDailyStats] = useState<DailyStats[]>([]);
    const [totalViews, setTotalViews] = useState(0);
    const [todayViews, setTodayViews] = useState(0);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch('/api/admin/analytics');
            const data = await res.json();
            setPageStats(data.pageStats || []);
            setDailyStats(data.dailyStats || []);
            setTotalViews(data.totalViews || 0);
            setTodayViews(data.todayViews || 0);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    const getPageLabel = (path: string) => {
        const labels: Record<string, string> = {
            '/': 'Homepage',
            '/katalog': 'Katalog Motor',
            '/tentang-kami': 'Tentang Kami',
        };
        return labels[path] || path;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
                    <p className="text-gray-500 text-sm">Statistik pengunjung website</p>
                </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Total Views</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{totalViews.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Eye className="text-white" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Hari Ini</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">{todayViews.toLocaleString()}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <TrendingUp className="text-white" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Halaman Terpopuler</p>
                            <p className="text-xl font-bold text-gray-900 mt-1">
                                {pageStats[0] ? getPageLabel(pageStats[0].path) : '-'}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <BarChart3 className="text-white" size={24} />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">7 Hari Terakhir</p>
                            <p className="text-3xl font-bold text-gray-900 mt-1">
                                {dailyStats.slice(0, 7).reduce((sum, d) => sum + d.count, 0).toLocaleString()}
                            </p>
                        </div>
                        <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                            <Calendar className="text-white" size={24} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Page Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Views per Halaman</h2>
                    <div className="space-y-4">
                        {pageStats.length > 0 ? pageStats.map((stat) => {
                            const maxViews = Math.max(...pageStats.map(s => s.totalViews));
                            const percentage = (stat.totalViews / maxViews) * 100;

                            return (
                                <div key={stat.path}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-700">{getPageLabel(stat.path)}</span>
                                        <span className="text-sm text-gray-500">{stat.totalViews.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className="bg-primary h-2 rounded-full transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        }) : (
                            <p className="text-gray-500 text-sm text-center py-8">
                                Belum ada data. Pengunjung akan tercatat secara otomatis.
                            </p>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Trend 7 Hari Terakhir</h2>
                    <div className="space-y-3">
                        {dailyStats.slice(0, 7).length > 0 ? dailyStats.slice(0, 7).map((stat) => {
                            const maxCount = Math.max(...dailyStats.slice(0, 7).map(s => s.count), 1);
                            const percentage = (stat.count / maxCount) * 100;
                            const dateObj = new Date(stat.date);
                            const dayName = dateObj.toLocaleDateString('id-ID', { weekday: 'short' });
                            const dateStr = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

                            return (
                                <div key={stat.date} className="flex items-center gap-4">
                                    <span className="text-sm text-gray-500 w-24">{dayName}, {dateStr}</span>
                                    <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden">
                                        <div
                                            className="bg-primary/80 h-full rounded-full flex items-center justify-end pr-2 transition-all duration-500"
                                            style={{ width: `${Math.max(percentage, 10)}%` }}
                                        >
                                            <span className="text-xs text-white font-bold">{stat.count}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : (
                            <p className="text-gray-500 text-sm text-center py-8">
                                Belum ada data trend.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Info */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="font-bold text-blue-900 mb-2">📊 Tentang Analytics</h3>
                <p className="text-blue-700 text-sm">
                    Analytics ini mencatat page views secara otomatis setiap kali halaman dikunjungi.
                    Data disimpan di database dan tidak menggunakan cookies pihak ketiga.
                </p>
            </div>
        </div>
    );
}
