// ============================================================
// 📱 SITE CONFIGURATION
// ============================================================
// Konfigurasi umum website yang digunakan di berbagai komponen.
// Edit nilai-nilai di sini untuk mengubah seluruh website.
// ============================================================

export const siteConfig = {
    // Nomor WhatsApp Sales (format: 62xxxxxxxxxx)
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890',

    // Nama dealer
    dealerName: 'Pos Resmi Virgi Motor Cikarang',

    // Alamat
    address: 'Jl. Cikarang Baru No. 88, Cikarang Utara, Bekasi',

    // Telepon kantor
    phoneNumber: '(021) 8900-8888',
};

// Helper function untuk generate link WA
export function getWhatsAppLink(message?: string): string {
    const baseUrl = `https://wa.me/${siteConfig.whatsappNumber}`;
    if (message) {
        return `${baseUrl}?text=${encodeURIComponent(message)}`;
    }
    return baseUrl;
}

// Helper untuk format display nomor WA
export function getWhatsAppDisplayNumber(): string {
    const num = siteConfig.whatsappNumber;
    // Format: 0812-3456-7890
    if (num.startsWith('62')) {
        const local = '0' + num.slice(2);
        return local.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3');
    }
    return num;
}
