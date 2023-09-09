import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
async function routes(app, options) {
  app.get("/user/:uuid", async (req, res) => {
    const user = await app.userService.find(req.params.uuid);
    if (!user) {
      res.status(404);
      return null;
    }
    const { uuid, handle, name } = user;

    return {
      uuid,
      handle,
      name,
    };
  });

  app.get("/me", { onRequest: [app.authenticate] }, async (req, res) => {
    const uuid = req.jwtPayload.uuid;
    const result = await app.userService.find(uuid);
    res.send(result);
  });
}

export default routes;
