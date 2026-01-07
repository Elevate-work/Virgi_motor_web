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
    X,
    Check
} from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

type GalleryImage = {
    id: string;
    image: string;
    label: string | null;
    category: string | null;
    isActive: boolean;
};

const categories = ['Showroom', 'Serah Terima', 'Tim', 'Event', 'Lainnya'];

export default function GalleryPage() {
    const { status } = useSession();
    const router = useRouter();
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectMode, setSelectMode] = useState(false);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch('/api/admin/gallery');
            const data = await res.json();
            setImages(data);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus gambar ini?')) return;

        try {
            await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
            fetchImages();
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const handleBulkDelete = async () => {
        if (!confirm(`Yakin ingin menghapus ${selectedImages.length} gambar?`)) return;

        try {
            await Promise.all(
                selectedImages.map(id =>
                    fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
                )
            );
            setSelectedImages([]);
            setSelectMode(false);
            fetchImages();
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const toggleSelect = (id: string) => {
        setSelectedImages(prev =>
            prev.includes(id)
                ? prev.filter(i => i !== id)
                : [...prev, id]
        );
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Galeri</h1>
                        <p className="text-gray-500 text-sm">{images.length} gambar</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    {selectMode ? (
                        <>
                            <button
                                onClick={() => { setSelectMode(false); setSelectedImages([]); }}
                                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            {selectedImages.length > 0 && (
                                <button
                                    onClick={handleBulkDelete}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600"
                                >
                                    <Trash2 size={18} />
                                    Hapus ({selectedImages.length})
                                </button>
                            )}
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setSelectMode(true)}
                                className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50"
                            >
                                Pilih
                            </button>
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-red-700"
                            >
                                <Plus size={18} />
                                Tambah Gambar
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {images.map((img) => (
                    <div
                        key={img.id}
                        className={`group relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${selectMode && selectedImages.includes(img.id)
                            ? 'border-primary ring-2 ring-primary/30'
                            : 'border-transparent hover:border-gray-200'
                            }`}
                        onClick={() => selectMode && toggleSelect(img.id)}
                    >
                        <Image
                            src={img.image}
                            alt={img.label || 'Gallery image'}
                            fill
                            className="object-cover"
                        />

                        {/* Overlay */}
                        <div className={`absolute inset-0 bg-black/50 transition-opacity ${selectMode ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
                            }`}>
                            <div className="absolute bottom-0 left-0 right-0 p-3">
                                {img.label && (
                                    <p className="text-white text-sm font-medium truncate">{img.label}</p>
                                )}
                                {img.category && (
                                    <p className="text-white/70 text-xs">{img.category}</p>
                                )}
                            </div>
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(img.id); }}
                                className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>

                        {/* Selection Indicator */}
                        {selectMode && (
                            <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedImages.includes(img.id)
                                ? 'bg-primary border-primary text-white'
                                : 'bg-white/80 border-gray-300'
                                }`}>
                                {selectedImages.includes(img.id) && <Check size={14} />}
                            </div>
                        )}
                    </div>
                ))}

                {images.length === 0 && (
                    <div className="col-span-full text-center py-16 text-gray-500">
                        <ImageIcon size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Belum ada gambar di galeri</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <AddImageModal
                    onClose={() => setShowModal(false)}
                    onSave={() => {
                        setShowModal(false);
                        fetchImages();
                    }}
                />
            )}
        </div>
    );
}

// Add Image Modal
function AddImageModal({
    onClose,
    onSave
}: {
    onClose: () => void;
    onSave: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        image: '',
        label: '',
        category: 'Showroom',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/admin/gallery', {
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
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Tambah Gambar</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gambar *</label>
                        <ImageUploader
                            value={form.image}
                            onChange={(url) => setForm({ ...form, image: url })}
                            folder="virgimotor/gallery"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Label/Caption</label>
                        <input
                            type="text"
                            value={form.label}
                            onChange={(e) => setForm({ ...form, label: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Serah Terima Honda PCX"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
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
