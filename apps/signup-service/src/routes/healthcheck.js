import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const routes = async (app, options) => {
  app.get("/ping", async (request, reply) => {
    return "pong";
  });
};

export default routes;
