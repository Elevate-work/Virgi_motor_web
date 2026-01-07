import { PrismaClient } from '@prisma/client';

// ============================================================
// 📦 PRISMA CLIENT SINGLETON
// ============================================================
// File ini mencegah multiple instance PrismaClient saat hot reload
// di development mode. Wajib untuk Next.js.
// ============================================================

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;
