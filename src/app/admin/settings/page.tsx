'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

type Settings = {
    [key: string]: string;
};

export default function SettingsPage() {
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [settings, setSettings] = useState<Settings>({
        whatsapp_number: '',
        phone: '',
        address: '',
        operating_hours_weekday: '',
        operating_hours_weekend: '',
        instagram_url: '',
        facebook_url: '',
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/admin/settings');
            const data = await res.json();
            const settingsObj: Settings = {};
            data.forEach((item: { key: string; value: string }) => {
                settingsObj[item.key] = item.value;
            });
            setSettings(settingsObj);
        } catch (error) {
            console.error('Failed to fetch settings:', error);
        } finally {
            setFetching(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (res.ok) {
                alert('Pengaturan berhasil disimpan!');
            } else {
                alert('Gagal menyimpan pengaturan');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
                    <p className="text-gray-500 text-sm">Kelola informasi kontak & sosial media</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Info */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi Kontak</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp</label>
                            <input
                                type="text"
                                value={settings.whatsapp_number}
                                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="6281234567890"
                            />
                            <p className="text-xs text-gray-500 mt-1">Format: 62xxxxx (tanpa + atau 0 di depan)</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                            <input
                                type="text"
                                value={settings.phone}
                                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="(021) 8900-8888"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                            <textarea
                                value={settings.address}
                                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                                placeholder="Jl. Cikarang Baru No. 88..."
                            />
                        </div>
                    </div>
                </div>

                {/* Operating Hours */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Jam Operasional</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Senin - Sabtu</label>
                            <input
                                type="text"
                                value={settings.operating_hours_weekday}
                                onChange={(e) => setSettings({ ...settings, operating_hours_weekday: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="08:00 - 17:00 WIB"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Minggu</label>
                            <input
                                type="text"
                                value={settings.operating_hours_weekend}
                                onChange={(e) => setSettings({ ...settings, operating_hours_weekend: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="08:00 - 14:00 WIB"
                            />
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Sosial Media</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram URL</label>
                            <input
                                type="text"
                                value={settings.instagram_url}
                                onChange={(e) => setSettings({ ...settings, instagram_url: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="https://instagram.com/virgimotor"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                            <input
                                type="text"
                                value={settings.facebook_url}
                                onChange={(e) => setSettings({ ...settings, facebook_url: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="https://facebook.com/virgimotor"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-red-700 disabled:opacity-50"
                    >
                        <Save size={18} />
                        {loading ? 'Menyimpan...' : 'Simpan Pengaturan'}
                    </button>
                </div>
            </form>
        </div>
    );
}
