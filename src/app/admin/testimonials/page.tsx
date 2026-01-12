'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowLeft,
    Plus,
    Edit2,
    Trash2,
    Star,
    User,
    Quote
} from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

type Testimonial = {
    id: string;
    name: string;
    photo: string | null;
    motor: string | null;
    rating: number;
    message: string;
    isActive: boolean;
};

export default function TestimonialsPage() {
    const { status } = useSession();
    const router = useRouter();
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editItem, setEditItem] = useState<Testimonial | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('/api/admin/testimonials');
            const data = await res.json();
            setTestimonials(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Failed to fetch:', error);
            setTestimonials([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus testimoni ini?')) return;

        try {
            await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
            fetchTestimonials();
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const openAddModal = () => {
        setEditItem(null);
        setShowModal(true);
    };

    const openEditModal = (item: Testimonial) => {
        setEditItem(item);
        setShowModal(true);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Testimoni</h1>
                        <p className="text-gray-500 text-sm">{testimonials.length} review pelanggan</p>
                    </div>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-primary text-white rounded-xl font-medium sm:self-start"
                >
                    <Plus size={18} />
                    Tambah Testimoni
                </button>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((item) => (
                    <div
                        key={item.id}
                        className={`bg-white rounded-2xl border p-6 ${item.isActive ? 'border-gray-200' : 'border-gray-200 opacity-60'}`}
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="w-14 h-14 bg-gray-100 rounded-full overflow-hidden shrink-0 flex items-center justify-center">
                                {item.photo ? (
                                    <Image
                                        src={item.photo}
                                        alt={item.name}
                                        width={56}
                                        height={56}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <User size={24} className="text-gray-400" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900">{item.name}</h3>
                                {item.motor && (
                                    <p className="text-sm text-gray-500">{item.motor}</p>
                                )}
                                <div className="flex gap-0.5 mt-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={14}
                                            className={i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <Quote size={20} className="absolute -left-1 -top-1 text-gray-200" />
                            <p className="text-gray-600 text-sm pl-5 line-clamp-3">{item.message}</p>
                        </div>

                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                            <button
                                onClick={() => openEditModal(item)}
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium active:scale-95 transition-transform"
                            >
                                <Edit2 size={14} />
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="px-4 py-3 bg-red-50 text-red-500 rounded-xl active:scale-95 transition-transform"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                ))}

                {testimonials.length === 0 && (
                    <div className="col-span-full text-center py-16 text-gray-500">
                        <Quote size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Belum ada testimoni</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <TestimonialModal
                    item={editItem}
                    onClose={() => setShowModal(false)}
                    onSave={() => {
                        setShowModal(false);
                        fetchTestimonials();
                    }}
                />
            )}
        </div>
    );
}

function TestimonialModal({
    item,
    onClose,
    onSave
}: {
    item: Testimonial | null;
    onClose: () => void;
    onSave: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: item?.name || '',
        photo: item?.photo || '',
        motor: item?.motor || '',
        rating: item?.rating || 5,
        message: item?.message || '',
        isActive: item?.isActive ?? true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = item ? `/api/admin/testimonials/${item.id}` : '/api/admin/testimonials';
            const method = item ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
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
            <div className="relative bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {item ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pelanggan *</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Foto (Opsional)</label>
                        <ImageUploader
                            value={form.photo}
                            onChange={(url) => setForm({ ...form, photo: url })}
                            folder="virgimotor/testimonials"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Motor yang Dibeli</label>
                        <input
                            type="text"
                            value={form.motor}
                            onChange={(e) => setForm({ ...form, motor: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Honda PCX 160"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setForm({ ...form, rating: star })}
                                    className="p-1"
                                >
                                    <Star
                                        size={28}
                                        className={star <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Pesan Testimoni *</label>
                        <textarea
                            value={form.message}
                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            required
                            placeholder="Pelayanan sangat memuaskan..."
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={form.isActive}
                            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor="isActive" className="text-sm text-gray-700">Tampilkan di website</label>
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
