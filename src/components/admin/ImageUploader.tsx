'use client';

import { CldUploadWidget, CloudinaryUploadWidgetResults } from 'next-cloudinary';
import { useState } from 'react';
import Image from 'next/image';
import { Upload, X, ImageIcon } from 'lucide-react';

type ImageUploaderProps = {
    value: string;
    onChange: (url: string) => void;
    folder?: string;
};

export default function ImageUploader({ value, onChange, folder = 'virgimotor' }: ImageUploaderProps) {
    const [isLoading, setIsLoading] = useState(false);

    const handleSuccess = (result: CloudinaryUploadWidgetResults) => {
        if (result.info && typeof result.info === 'object' && 'secure_url' in result.info) {
            onChange(result.info.secure_url as string);
        }
        setIsLoading(false);
    };

    const handleClear = () => {
        onChange('');
    };

    return (
        <div className="space-y-3">
            {/* Preview */}
            {value ? (
                <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                    <Image
                        src={value}
                        alt="Preview"
                        fill
                        className="object-contain"
                    />
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="w-full h-48 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                    <ImageIcon size={40} className="mb-2" />
                    <p className="text-sm">Belum ada gambar</p>
                </div>
            )}

            {/* Upload Button */}
            <CldUploadWidget
                uploadPreset="virgimotor"
                options={{
                    folder: folder,
                    maxFiles: 1,
                    resourceType: 'image',
                    sources: ['local', 'camera'],
                    multiple: false,
                    cropping: false,
                }}
                onSuccess={handleSuccess}
                onOpen={() => setIsLoading(true)}
                onClose={() => setIsLoading(false)}
            >
                {({ open }) => (
                    <button
                        type="button"
                        onClick={() => open()}
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                        <Upload size={18} />
                        {isLoading ? 'Memproses...' : 'Pilih Gambar'}
                    </button>
                )}
            </CldUploadWidget>

            {/* Or manual URL */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white text-gray-400">atau masukkan URL</span>
                </div>
            </div>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                placeholder="/all_bike/motor.webp atau https://..."
            />
        </div>
    );
}
