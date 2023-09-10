import * as Types from "../types.js";

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const routes = async (app, options) => {
  app.get("/comments/:postId", async (req, res) => {
    return app.commentService.findComments(req.params.postId);
  });

  app.post("/comment", async (req, res) => {
    const { postId, parentId, author, content } = req.body;
    return app.commentService.addComment(postId, parentId, author, content);
  });

  app.delete("/comment/:id", async (req, res) => {
    return app.commentService.deleteComment(req.params.id);
  });
};

export default routes;
