/**
 * @typedef {import("fastify/types/instance").FastifyInstance} Fastify
 * @typedef {import("../generated/client").PrismaClient} Prisma
 * @typedef {{db: Prisma, postService: import('./services/post-service.js').PostService, eventService: import('./services/event-service.js').EventService}} Modules
 * @typedef {Fastify & Modules} App
 */

export {};
