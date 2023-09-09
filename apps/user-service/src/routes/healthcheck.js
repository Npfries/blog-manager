import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
async function routes(app, options) {
  app.get("/ping", async (request, reply) => {
    return "pong";
  });
}

export default routes;
