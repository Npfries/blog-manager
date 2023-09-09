import { PrismaClient } from "../../generated/client/index.js";
import * as Types from "../types.js";
import { v4 as uuidv4 } from "uuid";

class PostService {
  db;
  /**
   * @param {PrismaClient} db
   */
  constructor(db) {
    this.db = db;
  }

  async create(title, content, author, authorUuid) {
    const uuid = uuidv4();
    return this.db.post.create({
      data: {
        title,
        uuid,
        content,
        author,
        authorUuid,
      },
    });
  }

  async update(id, authorUuid, title, content) {
    if (typeof id === "string") id = parseInt(id);
    return this.db.post.update({
      where: {
        id,
        authorUuid,
      },
      data: {
        title,
        content,
      },
    });
  }

  /**
   * @param {string} uuid uuid of the author
   * @returns
   */
  async findUserPosts(uuid) {
    return this.db.post.findMany({
      where: {
        authorUuid: uuid,
      },
    });
  }

  async findPost(id) {
    if (typeof id === "string") id = parseInt(id);
    return this.db.post.findUnique({
      where: { id },
    });
  }

  async deletePost(id, authorUuid) {
    if (typeof id === "string") id = parseInt(id);
    return this.db.post.delete({
      where: {
        id,
        authorUuid,
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
