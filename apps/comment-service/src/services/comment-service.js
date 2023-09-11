import { PrismaClient } from "../../generated/client/index.js";
import * as Types from "../types.js";

class CommentService {
  db;
  /**
   * @param {PrismaClient} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {string} postId
   */
  async findComments(postId) {
    return this.db.comments.findMany({
      where: {
        postId,
      },
    });
  }

  async addComment(postId, parentId, author, content) {
    return this.db.comments.create({
      data: {
        postId,
        parentId,
        author,
        content,
      },
    });
  }

  async updateComment(id, content) {
    if (typeof id === "string") id = parseInt(id);
    return this.db.comments.update({
      where: {
        id,
      },
      data: {
        content,
      },
    });
  }

  /**
   *
   * @param {number} id
   * @returns
   */
  async anonymizeComment(id) {
    return this.db.comments.update({
      where: {
        id,
      },
      data: {
        content: "",
        author: "",
      },
    });
  }

  async deleteComment(id) {
    if (typeof id === "string") id = parseInt(id);

    // alternate implementation that allows posts without children to be deleted
    // looks weird in the UI when sometimes comments are deleted and other times not

    // const child = await this.db.comments.findFirst({
    //   where: {
    //     parentId: id,
    //   },
    // });

    // const hasChildren = child !== null;

    return this.anonymizeComment(id);

    // return this.db.comments.delete({
    //   where: {
    //     id,
    //   },
    // });
  }
}

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const commentServiceSingleton = async (app, options) => {
  const service = new CommentService(app.db);
  app.decorate("commentService", service);
};

export { commentServiceSingleton, CommentService };
