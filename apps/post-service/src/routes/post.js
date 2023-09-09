import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
async function routes(app, options) {
  app.get("/posts", { onRequest: [app.authenticate] }, async (req, res) => {
    return app.postService.findUserPosts(req.jwtPayload.uuid);
  });

  app.get("/post/:id", (req, res) => {
    return app.postService.findPost(req.params.id);
  });

  app.post("/post", { onRequest: [app.authenticate] }, async (req, res) => {
    const { title, content, author } = req.body;
    const authorUuid = req.jwtPayload.uuid;

    if (!(title && content && author && authorUuid)) {
      res.status(400);
      res.send("Missing fields");
    }
    return app.postService.create(title, content, author, authorUuid);
  });

  app.put("/post/:id", { onRequest: [app.authenticate] }, async (req, res) => {
    const { title, content } = req.body;
    const authorUuid = req.jwtPayload.uuid;

    if (!(title && content && authorUuid)) {
      res.status(400);
      res.send("Missing fields");
    }

    return app.postService.update(req.params.id, authorUuid, title, content);
  });

  app.delete("/post/:id", { onRequest: [app.authenticate] }, async (req, res) => {
    const authorUuid = req.jwtPayload.uuid;
    const id = req.params.id;
    return app.postService.deletePost(id, authorUuid);
  });
}

export default routes;
