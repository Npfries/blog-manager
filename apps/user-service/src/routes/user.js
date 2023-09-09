import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
async function routes(app, options) {
  // app.get("/user/:uuid", { onRequest: [app.authenticate] }, (req, res) => {
  //   console.log(req.params.uuid === req.jwtPayload.uuid) {

  //   }
  //   res.send(req.jwtPayload);
  // });

  app.get("/me", { onRequest: [app.authenticate] }, async (req, res) => {
    const uuid = req.jwtPayload.uuid;
    console.log(uuid);
    const result = await app.userService.find(uuid);
    console.log(result);
    res.send(result);
  });

  app.post("/user", (req, res) => {
    return app.userService.create();
  });
}

export default routes;
