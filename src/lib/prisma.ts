import { PrismaClient } from '@prisma/client';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import ws from 'ws';

// ============================================================
// 📦 PRISMA CLIENT WITH NEON ADAPTER
// ============================================================
// Menggunakan Neon serverless adapter untuk connection pooling
// yang lebih stabil di serverless environment (Vercel & Local Dev).
// ============================================================

// Setup WebSocket for Neon (required for serverless)
neonConfig.webSocketConstructor = ws;

// Prevent multiple Prisma instances in development
const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
    pool: Pool | undefined;
};

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error('DATABASE_URL is not defined in environment variables');
    }

    // Check if using Neon (cloud PostgreSQL)
    const isNeonDatabase = connectionString.includes('neon.tech');

    if (isNeonDatabase) {
        // Use Neon adapter for better connection handling
        // Reuse pool if already exists to prevent connection exhaustion
        if (!globalForPrisma.pool) {
            globalForPrisma.pool = new Pool({
                connectionString,
                max: 10, // Limit max connections
            });
        }

        const adapter = new PrismaNeon(globalForPrisma.pool);
        return new PrismaClient({
            adapter,
            log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
        });
    }

    // Use regular client for local PostgreSQL
    return new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;
