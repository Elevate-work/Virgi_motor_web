'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    LayoutDashboard,
    Bike,
    Users,
    Image as ImageIcon,
    Settings,
    LogOut,
    Menu,
    X,
    Tag,
    ExternalLink,
    SlidersHorizontal,
    Star,
    BarChart3
} from 'lucide-react';

const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/products', label: 'Produk Motor', icon: Bike },
    { href: '/admin/promo', label: 'Kelola Promo', icon: Tag },
    { href: '/admin/testimonials', label: 'Testimoni', icon: Star },
    { href: '/admin/team', label: 'Tim Sales', icon: Users },
    { href: '/admin/gallery', label: 'Galeri Foto', icon: ImageIcon },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/settings', label: 'Pengaturan', icon: Settings },
];

type Stats = {
    totalProducts: number;
    activePromos: number;
    teamMembers: number;
    galleryImages: number;
};

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [stats, setStats] = useState<Stats>({
        totalProducts: 0,
        activePromos: 0,
        teamMembers: 0,
        galleryImages: 0,
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    // Fetch stats from database
    useEffect(() => {
        async function fetchStats() {
            try {
                const [productsRes, teamRes, galleryRes] = await Promise.all([
                    fetch('/api/admin/products'),
                    fetch('/api/admin/team'),
                    fetch('/api/admin/gallery'),
                ]);

                const products = await productsRes.json();
                const team = await teamRes.json();
                const gallery = await galleryRes.json();

                setStats({
                    totalProducts: products.length,
                    activePromos: products.filter((p: { promoActive: boolean }) => p.promoActive).length,
                    teamMembers: team.length,
                    galleryImages: gallery.length,
                });
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            }
        }

        if (status === 'authenticated') {
            fetchStats();
        }
    }, [status]);

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-xl font-bold text-gray-900">Admin CMS</h1>
                        <p className="text-xs text-gray-500 mt-1">Pos Resmi Virgi Motor</p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-xl transition-colors font-medium"
                            >
                                <item.icon size={20} />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* User Info & Logout */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                                {session.user?.name?.charAt(0) || 'A'}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                                <p className="text-xs text-gray-500">{session.user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => signOut({ callbackUrl: '/admin/login' })}
                            className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                        >
                            <LogOut size={18} />
                            Keluar
                        </button>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-8">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-500 mt-1">Selamat datang di Admin Panel</p>
                        </div>
                        <a
                            href="/"
                            target="_blank"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                        >
                            <ExternalLink size={16} />
                            Lihat Website
                        </a>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Produk"
                            value={stats.totalProducts.toString()}
                            icon={Bike}
                            color="bg-blue-500"
                        />
                        <StatCard
                            title="Promo Aktif"
                            value={stats.activePromos.toString()}
                            icon={Tag}
                            color="bg-green-500"
                        />
                        <StatCard
                            title="Anggota Tim"
                            value={stats.teamMembers.toString()}
                            icon={Users}
                            color="bg-purple-500"
                        />
                        <StatCard
                            title="Foto Galeri"
                            value={stats.galleryImages.toString()}
                            icon={ImageIcon}
                            color="bg-orange-500"
                        />
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Aksi Cepat</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <QuickAction
                                href="/admin/products/new"
                                title="Tambah Produk Baru"
                                description="Tambahkan motor baru ke katalog"
                                icon={Bike}
                            />
                            <QuickAction
                                href="/admin/promo"
                                title="Kelola Promo"
                                description="Atur promo yang sedang berjalan"
                                icon={Tag}
                            />
                            <QuickAction
                                href="/admin/settings"
                                title="Update Kontak"
                                description="Edit nomor WA & alamat"
                                icon={Settings}
                            />
                        </div>
                    </div>

                    {/* Success Box */}
                    <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6">
                        <h3 className="font-bold text-green-900 mb-2">✅ CMS Terhubung ke Database</h3>
                        <p className="text-green-700 text-sm">
                            Semua data sekarang tersimpan di database PostgreSQL. Perubahan yang Anda buat di CMS akan langsung tampil di website publik.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: React.ElementType; color: string }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500 font-medium">{title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
                </div>
                <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center`}>
                    <Icon className="text-white" size={24} />
                </div>
            </div>
        </div>
    );
}

function QuickAction({ href, title, description, icon: Icon }: { href: string; title: string; description: string; icon: React.ElementType }) {
    return (
        <Link
            href={href}
            className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow transition-shadow">
                    <Icon size={20} className="text-gray-600" />
                </div>
                <div>
                    <p className="font-bold text-gray-900">{title}</p>
                    <p className="text-xs text-gray-500">{description}</p>
                </div>
            </div>
        </Link>
    );
}
