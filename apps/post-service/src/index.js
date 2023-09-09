// @ts-nocheck
import fastify from "fastify";
import healthCheckRoutes from "./routes/healthcheck.js";
import postRoutes from "./routes/post.js";
import fp from "fastify-plugin";
import { databaseService } from "@blog-manager/fastify-modules";
import { postServiceSingleton } from "./services/post-service.js";
import { PrismaClient } from "../generated/client/index.js";
import * as Types from "./types.js";
import cors from "@fastify/cors";

/**
 * @type {Types.App}
 */
const app = fastify({
  logger: true,
});

app.register(cors);
app.register(fp((app, options) => databaseService(app, options, PrismaClient)));
app.register(fp(postServiceSingleton));
app.register(healthCheckRoutes);
app.register(postRoutes);

app.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
