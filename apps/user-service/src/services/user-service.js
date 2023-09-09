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

  async create() {
    return this.db.user.create({
      data: {
        email: "test@test.com",
        name: "testuser",
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
