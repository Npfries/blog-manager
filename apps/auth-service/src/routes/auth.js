import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
async function routes(app, options) {
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const isValid = await app.authService.validate(email, password);
    if (isValid) {
      return app.jwtService.sign(email);
    } else {
      res.status(401);
      return res.send("Authentication Failed.");
    }
  });

  app.post("/test", async (req, res) => {
    const { jwt } = req.body;
    return app.jwtService.verify(jwt);
  });

  app.get("/logout", (req, res) => {});
}

export default routes;
