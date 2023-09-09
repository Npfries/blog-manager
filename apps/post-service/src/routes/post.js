import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
async function routes(app, options) {
  app.get("/posts", async (req, res) => {
    return app.db.post.findMany();
  });

  app.get("/post/:id", (req, res) => {});

  app.post("/post", (req, res) => {
    return app.postService.create();
  });
}

export default routes;
