import { PrismaClient } from "../../generated/client/index.js";
import * as Types from "../types.js";
import { v4 as uuidv4 } from "uuid";

class BlogpostService {
  db;
  /**
   * @param {PrismaClient} db
   */
  constructor(db) {
    this.db = db;
  }

  async getPost() {}

  async getAuthor() {}

  async createSlug(handle, title) {}

  async createOrUpdateBlogpost() {
    console.log("published!");
  }
}

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const blogpostServiceSingleton = async (app, options) => {
  const service = new BlogpostService(app.db);
  app.decorate("blogpostService", service);
};

export { blogpostServiceSingleton, BlogpostService };
