import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const routes = async (app, options) => {
  app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const uuid = await app.authService.validate(email, password);
    if (uuid) {
      const jwt = await app.jwtService.sign(uuid);

      return {
        jwt,
      };
    } else {
      res.status(401);
      return {};
    }
  });

  app.post("/test", async (req, res) => {
    const { jwt } = req.body;
    return app.jwtService.verify(jwt);
  });

  app.get("/logout", (req, res) => {});
};

export default routes;
