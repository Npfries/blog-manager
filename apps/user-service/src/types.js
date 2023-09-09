/**
 * @typedef {import("fastify/types/instance").FastifyInstance} Fastify
 * @typedef {import("../generated/client").PrismaClient} Prisma
 * @typedef {{db: Prisma, userService: import('./services/user-service.js').UserService}} Modules
 * @typedef {Fastify & Modules} App
 */

export {};
