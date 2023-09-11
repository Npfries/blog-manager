import { PrismaClient } from "../../generated/client/index.js";
import * as Types from "../types.js";
import * as fs from "fs";
import renderHtml from "../utils/renderHtml.js";
import { slug } from "@blog-manager/utils";

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

  /**
   *
   * @param {string} handleSlug
   * @param {*} post
   */
  savePost(handleSlug, post) {
    const titleSlug = slug.slugify(post.title);

    const dir = `/tmp/static-posts/${handleSlug}/${titleSlug}`;
    fs.mkdirSync(dir, { recursive: true });
    const html = renderHtml(`${handleSlug}_${titleSlug}`, post);
    fs.writeFileSync(`${dir}/index.html`, html, {
      encoding: "utf-8",
    });
  }

  /**
   *
   * @param {string} uuid
   */
  async syncPosts(uuid, handleSlug) {
    const postsResponse = await fetch(`http://post-service:3000/posts/user/${uuid}`);
    /**
     * @type {unknown[]}
     */
    const posts = await postsResponse.json();

    if (!handleSlug) return;
    fs.rmSync(`/tmp/static-posts/${handleSlug}`, { recursive: true, force: true });

    // this system is inefficient
    // it could be improved by storing an "originalTitle" for renamed posts to retain the url
    // the dir would still need to be traversed to perform a diff on posts
    posts.forEach((post) => {
      this.savePost(handleSlug, post);
    });
  }

  async createOrUpdateBlogpost(postUuid, authorUuid) {
    const userResponse = await fetch(`http://user-service:3000/user/${authorUuid}`);
    const author = await userResponse.json();

    const postResponse = await fetch(`http://post-service:3000/post/${postUuid}`);
    const post = await postResponse.json();

    const handleSlug = slug.slugify(author.handle);

    if (!post) {
      await this.syncPosts(author.uuid, handleSlug);
      return;
    }

    this.savePost(handleSlug, post);
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
