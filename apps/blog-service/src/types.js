/**
 * @typedef {import("fastify/types/instance").FastifyInstance} Fastify
 * @typedef {import("../generated/client").PrismaClient} Prisma
 * @typedef {{db: Prisma, blogpostService: import('./services/blogpost-service.js').BlogpostService}} Modules
 * @typedef {Fastify & Modules} App
 */

export {};
