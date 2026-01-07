'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft,
    Plus,
    Trash2,
    Image as ImageIcon,
    GripVertical,
    Eye,
    EyeOff
} from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

type HeroSlide = {
    id: string;
    image: string;
    title: string | null;
    isActive: boolean;
    order: number;
};

export default function HeroSlidesPage() {
    const { status } = useSession();
    const router = useRouter();
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        try {
            const res = await fetch('/api/admin/hero-slides');
            const data = await res.json();
            setSlides(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch:', error);
            setSlides([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus slide ini?')) return;

        try {
            await fetch(`/api/admin/hero-slides/${id}`, { method: 'DELETE' });
            fetchSlides();
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const handleToggle = async (id: string, isActive: boolean) => {
        try {
            await fetch(`/api/admin/hero-slides/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isActive: !isActive })
            });
            fetchSlides();
        } catch (error) {
            console.error('Failed to toggle:', error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-8 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Hero Slider</h1>
                        <p className="text-gray-500 text-sm">{slides.length} slide(s)</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-red-700"
                >
                    <Plus size={18} />
                    Tambah Slide
                </button>
            </div>

            {/* Slides List */}
            <div className="space-y-4">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`bg-white rounded-2xl border overflow-hidden ${slide.isActive ? 'border-green-200' : 'border-gray-200 opacity-60'}`}
                    >
                        <div className="flex items-center gap-4 p-4">
                            <div className="text-gray-400 cursor-grab">
                                <GripVertical size={20} />
                            </div>
                            <div className="w-32 h-20 bg-gray-100 rounded-xl overflow-hidden relative shrink-0">
                                {slide.image ? (
                                    <Image
                                        src={slide.image}
                                        alt={slide.title || 'Slide'}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon size={24} className="text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                    {slide.title || `Slide ${index + 1}`}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {slide.isActive ? '✅ Aktif' : '⏸️ Nonaktif'}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleToggle(slide.id, slide.isActive)}
                                    className={`p-2 rounded-lg transition-colors ${slide.isActive ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                                    title={slide.isActive ? 'Nonaktifkan' : 'Aktifkan'}
                                >
                                    {slide.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                                <button
                                    onClick={() => handleDelete(slide.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {slides.length === 0 && (
                    <div className="text-center py-16 text-gray-500">
                        <ImageIcon size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Belum ada slide</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <AddSlideModal
                    onClose={() => setShowModal(false)}
                    onSave={() => {
                        setShowModal(false);
                        fetchSlides();
                    }}
                />
            )}
        </div>
    );
}

function AddSlideModal({ onClose, onSave }: { onClose: () => void; onSave: () => void }) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        image: '',
        title: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.image) {
            alert('Pilih gambar terlebih dahulu');
            return;
        }
        setLoading(true);

        try {
            const res = await fetch('/api/admin/hero-slides', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                onSave();
            } else {
                alert('Gagal menyimpan');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Tambah Slide Baru</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gambar Slide *</label>
                        <ImageUploader
                            value={form.image}
                            onChange={(url) => setForm({ ...form, image: url })}
                            folder="virgimotor/hero"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Judul/Caption (Opsional)</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Promo Spesial Januari"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 bg-primary text-white rounded-xl font-medium hover:bg-red-700 disabled:opacity-50"
                        >
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
