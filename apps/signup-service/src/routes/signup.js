import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const routes = async (app, options) => {
  app.post("/signup", (req, res) => {
    const { name, email, handle, password } = req.body;
    const result = app.signupService.signup(name, email, handle, password);
    res.send(result);
  });
};

export default routes;
