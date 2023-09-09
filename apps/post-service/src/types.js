/**
 * @typedef {import("fastify/types/instance").FastifyInstance} Fastify
 * @typedef {import("../generated/client").PrismaClient} Prisma
 * @typedef {{db: Prisma, postService: import('./services/post-service.js').PostService}} Modules
 * @typedef {Fastify & Modules} App
 */

export {};
