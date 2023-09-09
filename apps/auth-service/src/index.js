// @ts-nocheck
import fastify from "fastify";
import healthCheckRoutes from "./routes/healthcheck.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import fp from "fastify-plugin";
import { databaseService } from "@blog-manager/fastify-modules";
import { authServiceSingleton } from "./services/auth-service.js";
import { jwtServiceSingleton } from "./services/jwt-service.js";
import { eventServiceSingleton } from "./services/event-service.js";
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
app.register(fp(authServiceSingleton));
app.register(fp(jwtServiceSingleton));
app.register(fp(eventServiceSingleton));
app.register(healthCheckRoutes);
app.register(authRoutes);
app.register(userRoutes);

app.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
