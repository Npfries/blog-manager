import { PrismaClient } from "../../generated/client/index.js";
import * as Types from "../types.js";

class UserService {
  db;
  /**
   * @param {PrismaClient} db
   */
  constructor(db) {
    this.db = db;
  }

  /**
   *
   * @param {string} uuid
   * @param {string} email
   * @param {string} name
   */
  async create(uuid, email, handle, name) {
    return this.db.user.create({
      data: {
        uuid,
        email,
        handle,
        name,
      },
    });
  }

  /**
   *
   * @param {string} uuid
   */
  async find(uuid) {
    return this.db.user.findUnique({
      where: {
        uuid,
      },
    });
  }
}

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const userServiceSingleton = async (app, options) => {
  const service = new UserService(app.db);
  app.decorate("userService", service);
};

export { userServiceSingleton, UserService };
