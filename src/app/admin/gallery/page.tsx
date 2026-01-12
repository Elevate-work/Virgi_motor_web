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
    Check,
    MapPin,
    User
} from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

type GalleryImage = {
    id: string;
    image: string;
    label: string | null;
    category: string | null;
    isActive: boolean;
};

// Kategori gallery
const GALLERY_SECTIONS = [
    {
        id: 'semua',
        label: 'Semua',
        description: 'Semua foto di galeri',
        icon: ImageIcon
    },
    {
        id: 'tentang-kami',
        label: 'Tentang Kami',
        description: 'Foto aktivitas dealer untuk halaman Tentang Kami',
        icon: MapPin
    },
    {
        id: 'konsultan-personal',
        label: 'Konsultan Personal',
        description: 'Foto untuk section Tim Sales di Homepage',
        icon: User
    },
];

export default function GalleryPage() {
    const { status } = useSession();
    const router = useRouter();
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [selectMode, setSelectMode] = useState(false);
    const [activeTab, setActiveTab] = useState('semua');

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
            if (Array.isArray(data)) {
                setImages(data);
            }
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

    // Filter images by category (or show all)
    const filteredImages = activeTab === 'semua'
        ? images
        : images.filter(img => img.category === activeTab);

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
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Galeri Foto</h1>
                        <p className="text-gray-500 text-sm">Kelola foto untuk website</p>
                    </div>
                </div>

                {/* Action Buttons - Mobile Friendly */}
                <div className="flex gap-2">
                    {selectMode ? (
                        <>
                            <button
                                onClick={() => { setSelectMode(false); setSelectedImages([]); }}
                                className="flex-1 sm:flex-none px-4 py-3 sm:py-2 border border-gray-200 text-gray-700 rounded-xl font-medium"
                            >
                                Batal
                            </button>
                            {selectedImages.length > 0 && (
                                <button
                                    onClick={handleBulkDelete}
                                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-red-500 text-white rounded-xl font-medium"
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
                                className="flex-1 sm:flex-none px-4 py-3 sm:py-2 border border-gray-200 text-gray-700 rounded-xl font-medium"
                            >
                                Pilih & Hapus
                            </button>
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 sm:py-2 bg-primary text-white rounded-xl font-medium"
                            >
                                <Plus size={18} />
                                Tambah Foto
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {GALLERY_SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const count = images.filter(img => img.category === section.id).length;
                    return (
                        <button
                            key={section.id}
                            onClick={() => setActiveTab(section.id)}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium whitespace-nowrap transition-all ${activeTab === section.id
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <Icon size={18} />
                            {section.label}
                            <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === section.id
                                ? 'bg-white/20 text-white'
                                : 'bg-gray-200 text-gray-600'
                                }`}>
                                {count}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Section Description */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600">
                    {GALLERY_SECTIONS.find(s => s.id === activeTab)?.description}
                </p>
            </div>

            {/* Gallery Grid - Mobile Optimized */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredImages.map((img) => (
                    <div
                        key={img.id}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectMode && selectedImages.includes(img.id)
                            ? 'border-primary ring-2 ring-primary/30'
                            : 'border-gray-200'
                            }`}
                        onClick={() => selectMode && toggleSelect(img.id)}
                    >
                        <Image
                            src={img.image}
                            alt={img.label || 'Gallery image'}
                            fill
                            className="object-cover"
                        />

                        {/* Label overlay - Always visible */}
                        {img.label && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                                <p className="text-white text-xs sm:text-sm font-medium truncate">{img.label}</p>
                            </div>
                        )}

                        {/* Delete button - Always visible on mobile, hover on desktop */}
                        {!selectMode && (
                            <button
                                onClick={(e) => { e.stopPropagation(); handleDelete(img.id); }}
                                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg shadow-lg active:scale-95 transition-transform"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}

                        {/* Selection Indicator */}
                        {selectMode && (
                            <div className={`absolute top-2 left-2 w-7 h-7 rounded-full border-2 flex items-center justify-center ${selectedImages.includes(img.id)
                                ? 'bg-primary border-primary text-white'
                                : 'bg-white/90 border-gray-300'
                                }`}>
                                {selectedImages.includes(img.id) && <Check size={16} />}
                            </div>
                        )}
                    </div>
                ))}

                {filteredImages.length === 0 && (
                    <div className="col-span-full text-center py-16 text-gray-500">
                        <ImageIcon size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className="mb-2">Belum ada foto di kategori ini</p>
                        <button
                            onClick={() => setShowModal(true)}
                            className="text-primary font-medium hover:underline"
                        >
                            + Tambah Foto Pertama
                        </button>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <AddImageModal
                    defaultCategory={activeTab === 'semua' ? 'tentang-kami' : activeTab}
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

// Add Image Modal - Mobile Optimized
function AddImageModal({
    defaultCategory,
    onClose,
    onSave
}: {
    defaultCategory: string;
    onClose: () => void;
    onSave: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        image: '',
        label: '',
        category: defaultCategory,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.image) {
            alert('Pilih gambar terlebih dahulu');
            return;
        }
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
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Tambah Foto</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gambar *</label>
                        <ImageUploader
                            value={form.image}
                            onChange={(url) => setForm({ ...form, image: url })}
                            folder="virgimotor/gallery"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tampilkan di</label>
                        <div className="grid grid-cols-1 gap-3">
                            {GALLERY_SECTIONS.filter(s => s.id !== 'semua').map((section) => {
                                const Icon = section.icon;
                                return (
                                    <button
                                        key={section.id}
                                        type="button"
                                        onClick={() => setForm({ ...form, category: section.id })}
                                        className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${form.category === section.id
                                            ? 'border-primary bg-red-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${form.category === section.id
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            <Icon size={20} />
                                        </div>
                                        <div>
                                            <p className={`font-medium ${form.category === section.id ? 'text-primary' : 'text-gray-900'}`}>
                                                {section.label}
                                            </p>
                                            <p className="text-xs text-gray-500">{section.description}</p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Caption (opsional)</label>
                        <input
                            type="text"
                            value={form.label}
                            onChange={(e) => setForm({ ...form, label: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Contoh: Serah Terima Honda PCX"
                        />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 border border-gray-200 text-gray-700 rounded-xl font-medium"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !form.image}
                            className="flex-1 py-4 bg-primary text-white rounded-xl font-medium disabled:opacity-50"
                        >
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
