import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = 'https://www.virgimotor.com'; // Ganti dengan domain asli nanti

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Jangan index halaman admin, privasi
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
