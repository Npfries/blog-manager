import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
async function routes(app, options) {
  app.post("/user", async (req, res) => {
    const { email, password } = req.body;
    return app.authService.create(email, password);
  });
}

export default routes;
