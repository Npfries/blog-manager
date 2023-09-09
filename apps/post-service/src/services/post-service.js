import { PrismaClient } from "../../generated/client/index.js";
import * as Types from "../types.js";

class PostService {
  db;
  /**
   * @param {PrismaClient} db
   */
  constructor(db) {
    this.db = db;
  }

  async create() {
    return this.db.post.create({
      data: {
        title: "",
        uuid: "",
        content: "",
        author: "",
        authorUuid: "",
      },
    });
  }
}

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const postServiceSingleton = async (app, options) => {
  const service = new PostService(app.db);
  app.decorate("postService", service);
};

export { postServiceSingleton, PostService };
