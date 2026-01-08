import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// ============================================================
// 📦 PRISMA CLIENT WITH NEON ADAPTER
// ============================================================
// Menggunakan Neon serverless adapter untuk connection pooling
// yang lebih baik di serverless environment (Vercel).
// ============================================================

// Setup WebSocket for Neon
neonConfig.webSocketConstructor = ws;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

function createPrismaClient() {
    // Use Neon adapter for production
    if (process.env.NODE_ENV === 'production') {
        const pool = new Pool({ connectionString: process.env.DATABASE_URL });
        const adapter = new PrismaNeon(pool);
        return new PrismaClient({ adapter });
    }

    // Use regular client for development
    return new PrismaClient({
        log: ['query', 'error', 'warn'],
    });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;
