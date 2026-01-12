# 📂 STRUKTUR FILE & PENJELASAN

Dokumentasi ini menjelaskan kegunaan setiap file/folder agar tim developer tidak bingung.

---

## 📁 src/app/(public)/ - Halaman Website Publik

| File/Folder | Kegunaan |
|-------------|----------|
| `page.tsx` | Homepage utama website |
| `katalog/page.tsx` | Halaman katalog motor + filter |
| `tentang-kami/page.tsx` | Halaman "Tentang Kami" |
| `layout.tsx` | Layout untuk semua halaman publik (navbar, footer) |

---

## 📁 src/app/admin/ - CMS Admin Panel

| File/Folder | Kegunaan |
|-------------|----------|
| `page.tsx` | Dashboard utama admin |
| `login/page.tsx` | Halaman login admin |
| `products/page.tsx` | Kelola produk motor |
| `products/[id]/page.tsx` | Edit detail produk tertentu |
| `promo/page.tsx` | Kelola promo (aktifkan/nonaktifkan) |
| `testimonials/page.tsx` | Kelola testimoni pelanggan |
| `team/page.tsx` | Kelola tim sales |
| `gallery/page.tsx` | Kelola galeri foto (2 kategori) |
| `analytics/page.tsx` | Statistik pengunjung |
| `settings/page.tsx` | Pengaturan website |

---

## 📁 src/components/ - Komponen UI

### Komponen Homepage (Public)
| File | Kegunaan | Lokasi Tampil |
|------|----------|---------------|
| `Hero.tsx` | Banner utama dengan CTA | Homepage |
| `Features.tsx` | Fitur keunggulan dealer | Homepage |
| `PromoSection.tsx` | Produk yang sedang promo | Homepage |
| `CreditSimulation.tsx` | FAQ & Info Kredit | Homepage |
| `TeamSection.tsx` | Profile & Gallery sales | Homepage |
| `TestimonialsSection.tsx` | Testimoni pelanggan | Homepage |

### Komponen Tentang Kami
| File | Kegunaan |
|------|----------|
| `AboutSection.tsx` | Seluruh konten halaman Tentang Kami |

### Komponen Shared
| File | Kegunaan |
|------|----------|
| `Navbar.tsx` | Navigasi website |
| `PageTracker.tsx` | Tracking pengunjung |

### Komponen Admin
| File | Kegunaan |
|------|----------|
| `admin/ImageUploader.tsx` | Upload gambar ke Cloudinary |

---

## 📁 src/lib/ - Library & Konfigurasi

| File | Kegunaan |
|------|----------|
| `prisma.ts` | Koneksi database (Neon PostgreSQL) |
| `config.ts` | Konfigurasi website (nomor WA, nama dealer, dll) |

---

## 📁 src/app/api/ - API Endpoints

### API Publik (Tanpa Auth)
| Endpoint | Method | Kegunaan |
|----------|--------|----------|
| `/api/public/products` | GET | Ambil semua produk |
| `/api/public/gallery` | GET | Ambil galeri aktif |
| `/api/public/testimonials` | GET | Ambil testimoni |
| `/api/public/team` | GET | Ambil tim sales |
| `/api/public/track` | POST | Tracking page view |

### API Admin (Butuh Auth)
| Endpoint | Method | Kegunaan |
|----------|--------|----------|
| `/api/admin/products` | GET, POST | Kelola produk |
| `/api/admin/products/[id]` | PUT, DELETE | Edit/hapus produk |
| `/api/admin/gallery` | GET, POST | Kelola gallery |
| `/api/admin/gallery/[id]` | DELETE | Hapus gambar |
| `/api/admin/testimonials` | GET, POST | Kelola testimoni |
| `/api/admin/testimonials/[id]` | PUT, DELETE | Edit/hapus testimoni |
| `/api/admin/team` | GET, POST | Kelola tim |
| `/api/admin/team/[id]` | PUT, DELETE | Edit/hapus tim |
| `/api/admin/analytics` | GET | Ambil statistik |

---

## 📁 prisma/ - Database Schema

| File | Kegunaan |
|------|----------|
| `schema.prisma` | Definisi tabel database |

---

## 🔧 Environment Variables (.env.local)

```env
DATABASE_URL=xxx                    # URL database Neon
NEXTAUTH_SECRET=xxx                 # Secret untuk NextAuth
NEXTAUTH_URL=xxx                    # URL website
NEXT_PUBLIC_WHATSAPP_NUMBER=xxx     # Nomor WA sales
CLOUDINARY_CLOUD_NAME=xxx           # Untuk upload gambar
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

---

## 🎨 Kategori Galeri

Galeri memiliki 2 kategori:
1. **tentang-kami** - Foto aktivitas dealer → Tampil di halaman Tentang Kami
2. **konsultan-personal** - Foto sales/dokumentasi → Tampil di section Tim Sales (Homepage)

---

## 📞 Mengubah Nomor WhatsApp

1. Edit `.env.local`
2. Ubah `NEXT_PUBLIC_WHATSAPP_NUMBER=62xxxxxxxxxx`
3. Restart server

Nomor akan otomatis berubah di seluruh website.

---

## 🚀 Development Commands

```bash
npm run dev      # Jalankan development server
npm run build    # Build untuk production
npm run start    # Jalankan production build
```

---

Dibuat: 12 Januari 2026
Versi: 1.0
