/**
 * @typedef {import("fastify/types/instance").FastifyInstance} Fastify
 * @typedef {import("../generated/client").PrismaClient} Prisma
 * @typedef {{db: Prisma, commentService: import('./services/comment-service.js').CommentService}} Modules
 * @typedef {Fastify & Modules} App
 */

export {};
