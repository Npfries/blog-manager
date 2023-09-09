// @ts-nocheck
import fastify from "fastify";
import healthCheckRoutes from "./routes/healthcheck.js";
import blogpostRoutes from "./routes/blogpost.js";
import fp from "fastify-plugin";
import { databaseService } from "@blog-manager/fastify-modules";
import { blogpostServiceSingleton } from "./services/blogpost-service.js";
import { eventServiceSingleton } from "./services/event-service.js";
import { PrismaClient } from "../generated/client/index.js";
import * as Types from "./types.js";
import jwt from "jsonwebtoken";
import cors from "@fastify/cors";

/**
 * @type {Types.App}
 */
const app = fastify({
  logger: true,
});

app.addHook("onRequest", (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    req.jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (e) {
    next();
  }
});

app.decorate("authenticate", async function (req, res) {
  if (!req.jwtPayload) {
    res.status(401);
    res.send({});
  }
});

app.register(cors);
app.register(fp((app, options) => databaseService(app, options, PrismaClient)));
app.register(fp(blogpostServiceSingleton));
app.register(fp(eventServiceSingleton));
app.register(healthCheckRoutes);
app.register(blogpostRoutes);

app.listen({ port: 3000, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
