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
    Phone,
    User
} from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';

type TeamMember = {
    id: string;
    name: string;
    role: string;
    photo: string | null;
    whatsapp: string | null;
    isActive: boolean;
};

export default function TeamPage() {
    const { status } = useSession();
    const router = useRouter();
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editMember, setEditMember] = useState<TeamMember | null>(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/admin/login');
        }
    }, [status, router]);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch('/api/admin/team');
            const data = await res.json();
            setMembers(data);
        } catch (error) {
            console.error('Failed to fetch:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Yakin ingin menghapus anggota tim ini?')) return;

        try {
            await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
            fetchMembers();
        } catch (error) {
            console.error('Failed to delete:', error);
        }
    };

    const openAddModal = () => {
        setEditMember(null);
        setShowModal(true);
    };

    const openEditModal = (member: TeamMember) => {
        setEditMember(member);
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
        <div className="p-6 lg:p-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link href="/admin" className="p-2 hover:bg-gray-100 rounded-lg">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Tim Sales</h1>
                        <p className="text-gray-500 text-sm">{members.length} anggota tim</p>
                    </div>
                </div>
                <button
                    onClick={openAddModal}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
                >
                    <Plus size={18} />
                    Tambah Anggota
                </button>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                        {/* Photo */}
                        <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center">
                            {member.photo ? (
                                <Image
                                    src={member.photo}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                                    <User size={48} className="text-gray-400" />
                                </div>
                            )}
                            {!member.isActive && (
                                <div className="absolute top-3 right-3 px-2 py-1 bg-gray-800 text-white text-xs font-medium rounded-lg">
                                    Nonaktif
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-gray-900">{member.name}</h3>
                            <p className="text-gray-500 text-sm mb-4">{member.role}</p>

                            {member.whatsapp && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                                    <Phone size={14} />
                                    <span>{member.whatsapp}</span>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <button
                                    onClick={() => openEditModal(member)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                                >
                                    <Edit2 size={16} />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(member.id)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {members.length === 0 && (
                    <div className="col-span-full text-center py-16 text-gray-500">
                        <User size={48} className="mx-auto mb-4 text-gray-300" />
                        <p>Belum ada anggota tim</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <TeamModal
                    member={editMember}
                    onClose={() => setShowModal(false)}
                    onSave={() => {
                        setShowModal(false);
                        fetchMembers();
                    }}
                />
            )}
        </div>
    );
}

// Modal Component
function TeamModal({
    member,
    onClose,
    onSave
}: {
    member: TeamMember | null;
    onClose: () => void;
    onSave: () => void;
}) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: member?.name || '',
        role: member?.role || 'Sales Consultant',
        photo: member?.photo || '',
        whatsapp: member?.whatsapp || '',
        isActive: member?.isActive ?? true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = member ? `/api/admin/team/${member.id}` : '/api/admin/team';
            const method = member ? 'PUT' : 'POST';

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
            <div className="relative bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    {member ? 'Edit Anggota' : 'Tambah Anggota Baru'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nama *</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Jabatan *</label>
                        <input
                            type="text"
                            value={form.role}
                            onChange={(e) => setForm({ ...form, role: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Foto</label>
                        <ImageUploader
                            value={form.photo}
                            onChange={(url) => setForm({ ...form, photo: url })}
                            folder="virgimotor/team"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp</label>
                        <input
                            type="text"
                            value={form.whatsapp}
                            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                            placeholder="6281234567890"
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
                        <label htmlFor="isActive" className="text-sm text-gray-700">Aktif (tampil di website)</label>
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
