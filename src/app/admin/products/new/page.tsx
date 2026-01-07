'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

const categories = ['Matic', 'Sport', 'Cub', 'EV'];
const bgColorOptions = [
    { value: 'bg-gray-900', label: 'Hitam' },
    { value: 'bg-red-50', label: 'Merah Muda' },
    { value: 'bg-blue-900', label: 'Biru Tua' },
    { value: 'bg-emerald-700', label: 'Hijau' },
    { value: 'bg-gray-100', label: 'Abu-abu' },
];

export default function NewProductPage() {
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [features, setFeatures] = useState<string[]>(['']);
    const [promoHighlights, setPromoHighlights] = useState<string[]>(['']);

    const [form, setForm] = useState({
        name: '',
        category: 'Matic',
        price: '',
        dpMin: '',
        cc: '',
        image: '',
        promoActive: false,
        promoBadgeText: '',
        promoCardBgColor: 'bg-gray-100',
        promoCardTextColor: 'text-tesla-black',
    });

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    features: features.filter(f => f.trim() !== ''),
                    promoHighlights: promoHighlights.filter(h => h.trim() !== ''),
                }),
            });

            if (res.ok) {
                router.push('/admin/products');
            } else {
                alert('Gagal menyimpan produk');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    const addFeature = () => setFeatures([...features, '']);
    const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = value;
        setFeatures(newFeatures);
    };

    const addHighlight = () => setPromoHighlights([...promoHighlights, '']);
    const removeHighlight = (index: number) => setPromoHighlights(promoHighlights.filter((_, i) => i !== index));
    const updateHighlight = (index: number, value: string) => {
        const newHighlights = [...promoHighlights];
        newHighlights[index] = value;
        setPromoHighlights(newHighlights);
    };

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/products" className="p-2 hover:bg-gray-100 rounded-lg">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tambah Produk Baru</h1>
                    <p className="text-gray-500 text-sm">Isi form di bawah untuk menambahkan motor baru</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Informasi Dasar</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Motor *</label>
                            <input
                                type="text"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="Contoh: All New BeAT CBS"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kategori *</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Kapasitas Mesin *</label>
                            <input
                                type="text"
                                value={form.cc}
                                onChange={(e) => setForm({ ...form, cc: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="Contoh: 110cc"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Harga OTR (Rp) *</label>
                            <input
                                type="number"
                                value={form.price}
                                onChange={(e) => setForm({ ...form, price: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="Contoh: 19075000"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">DP Minimum (Rp) *</label>
                            <input
                                type="number"
                                value={form.dpMin}
                                onChange={(e) => setForm({ ...form, dpMin: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                placeholder="Contoh: 2000000"
                                required
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Motor</label>
                            <ImageUploader
                                value={form.image}
                                onChange={(url) => setForm({ ...form, image: url })}
                                folder="virgimotor/products"
                            />
                        </div>
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Fitur Motor</h2>
                    <div className="space-y-3">
                        {features.map((feature, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => updateFeature(index, e.target.value)}
                                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Contoh: LED Headlight"
                                />
                                {features.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                                    >
                                        <X size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addFeature}
                            className="flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                        >
                            <Plus size={16} /> Tambah Fitur
                        </button>
                    </div>
                </div>

                {/* Promo Section */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-gray-900">Pengaturan Promo</h2>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <span className="text-sm text-gray-600">Aktifkan Promo</span>
                            <input
                                type="checkbox"
                                checked={form.promoActive}
                                onChange={(e) => setForm({ ...form, promoActive: e.target.checked })}
                                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                            />
                        </label>
                    </div>

                    {form.promoActive && (
                        <div className="space-y-4 pt-4 border-t border-gray-100">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Judul Badge Promo</label>
                                <input
                                    type="text"
                                    value={form.promoBadgeText}
                                    onChange={(e) => setForm({ ...form, promoBadgeText: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    placeholder="Contoh: Hemat 1.5 Jt"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Highlight Promo</label>
                                <div className="space-y-3">
                                    {promoHighlights.map((highlight, index) => (
                                        <div key={index} className="flex gap-2">
                                            <input
                                                type="text"
                                                value={highlight}
                                                onChange={(e) => updateHighlight(index, e.target.value)}
                                                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                                placeholder="Contoh: DP 500rb"
                                            />
                                            {promoHighlights.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeHighlight(index)}
                                                    className="p-3 text-red-500 hover:bg-red-50 rounded-xl"
                                                >
                                                    <X size={18} />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addHighlight}
                                        className="flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                                    >
                                        <Plus size={16} /> Tambah Highlight
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Warna Background Card</label>
                                    <select
                                        value={form.promoCardBgColor}
                                        onChange={(e) => setForm({ ...form, promoCardBgColor: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        {bgColorOptions.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Warna Teks Card</label>
                                    <select
                                        value={form.promoCardTextColor}
                                        onChange={(e) => setForm({ ...form, promoCardTextColor: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option value="text-white">Putih</option>
                                        <option value="text-tesla-black">Hitam</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-4">
                    <Link
                        href="/admin/products"
                        className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-red-700 disabled:opacity-50"
                    >
                        <Save size={18} />
                        {loading ? 'Menyimpan...' : 'Simpan Produk'}
                    </button>
                </div>
            </form>
        </div>
    );
}
