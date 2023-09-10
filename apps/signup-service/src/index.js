// @ts-nocheck
import fastify from "fastify";
import healthCheckRoutes from "./routes/healthcheck.js";
import signupRoutes from "./routes/signup.js";
import fp from "fastify-plugin";
import { signupServiceSingleton } from "./services/signup-service.js";
import { eventServiceSingleton } from "./services/event-service.js";
import * as Types from "./types.js";
import cors from "@fastify/cors";

/**
 * @type {Types.App}
 */
const app = fastify({
  logger: true,
});

app.register(cors);
app.register(fp(eventServiceSingleton));
app.register(fp(signupServiceSingleton));
app.register(healthCheckRoutes);
app.register(signupRoutes);

app.listen({ port: 3000, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
