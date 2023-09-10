import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const routes = async (app, options) => {
  app.get("/posts", { onRequest: [app.authenticate] }, async (req, res) => {
    return app.postService.findUserPosts(req.jwtPayload.uuid);
  });

  app.get("/posts/user/:uuid", (req, res) => {
    return app.postService.findUserPosts(req.params.uuid);
  });

  app.get("/post/:uuid", (req, res) => {
    return app.postService.findPost(req.params.uuid);
  });

  app.post("/post", { onRequest: [app.authenticate] }, async (req, res) => {
    const { title, content, author } = req.body;
    const authorUuid = req.jwtPayload.uuid;

    if (!(title && content && author && authorUuid)) {
      res.status(400);
      res.send("Missing fields");
    }

    const record = await app.postService.create(title, content, author, authorUuid);
    app.eventService.sendPostModifiedEvent({ authorUuid, postUuid: record.uuid });
    return record;
  });

  app.put("/post/:uuid", { onRequest: [app.authenticate] }, async (req, res) => {
    const { title, content } = req.body;
    const authorUuid = req.jwtPayload.uuid;

    if (!(title && content && authorUuid)) {
      res.status(400);
      res.send("Missing fields");
    }

    const record = await app.postService.update(req.params.uuid, authorUuid, title, content);
    app.eventService.sendPostModifiedEvent({ authorUuid, postUuid: req.params.uuid });
    return record;
  });

  app.delete("/post/:uuid", { onRequest: [app.authenticate] }, async (req, res) => {
    const authorUuid = req.jwtPayload.uuid;
    const uuid = req.params.uuid;

    const record = await app.postService.deletePost(uuid, authorUuid);
    app.eventService.sendPostModifiedEvent({ authorUuid, postUuid: uuid });
    return record;
  });
};

export default routes;
