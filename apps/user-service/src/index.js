// @ts-nocheck
import fastify from "fastify";
import healthCheckRoutes from "./routes/healthcheck.js";
import userRoutes from "./routes/user.js";
import { databaseService } from "@blog-manager/fastify-modules";
import fp from "fastify-plugin";
import * as Types from "./types.js";
import { userServiceSingleton } from "./services/user-service.js";
import { PrismaClient } from "../generated/client/index.js";

/**
 * @type {Types.App}
 */
const app = fastify({
  logger: true,
});

app.register(fp((app, options) => databaseService(app, options, PrismaClient)));
app.register(fp(userServiceSingleton));
app.register(healthCheckRoutes);
app.register(userRoutes);

app.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
