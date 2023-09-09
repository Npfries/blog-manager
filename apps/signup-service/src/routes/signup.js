import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
async function routes(app, options) {
  app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    const result = app.signupService.signup(name, email, password);
    res.send(result);
  });
}

export default routes;
