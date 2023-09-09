/**
 * @typedef {import("fastify/types/instance").FastifyInstance} Fastify
 * @typedef {import("../generated/client").PrismaClient} Prisma
 * @typedef {{db: Prisma, authService: import('./services/auth-service.js').AuthService, jwtService: import('./services/jwt-service.js').JwtService}} Modules
 * @typedef {Fastify & Modules} App
 */

export {};
