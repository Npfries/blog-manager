import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
async function routes(app, options) {
  app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    app.signupService.signup(name, email, password);
  });
}

export default routes;
