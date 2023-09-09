/**
 *
 * @param {*} app
 * @param {*} options
 * @param {typeof import('prisma/prisma-client').PrismaClient} PrismaClient
 */
const databaseService = async (app, options, PrismaClient) => {
  const prisma = new PrismaClient();

  await prisma.$connect();

  app.decorate("db", prisma);

  app.addHook("onClose", async (app) => {
    // @ts-ignore
    await app.db.$disconnect();
  });
};

export default databaseService;
