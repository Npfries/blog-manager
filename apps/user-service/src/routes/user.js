import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
async function routes(app, options) {
  app.get("/users", async (req, res) => {
    return app.db.user.findMany();
  });

  app.get("/user/:id", (req, res) => {});

  app.post("/user", (req, res) => {
    return app.userService.create();
  });
}

export default routes;
