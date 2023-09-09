import { PrismaClient } from "../../generated/client/index.js";
import * as Types from "../types.js";
import { salt, hash } from "@blog-manager/crypto";

class AuthService {
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
   * @param {string} salt
   * @param {string} hash
   */
  async create(uuid, email, salt, hash) {
    await this.db.user.create({
      data: {
        uuid,
        email,
        password: hash,
        salt: salt,
      },
    });
  }

  async validate(email, password) {
    if (!email || !password) return null;

    const user = await this.db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return null;

    if (user.password === hash(password, user.salt)) return user.uuid;

    return null;
  }
}

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const authServiceSingleton = async (app, options) => {
  const service = new AuthService(app.db);
  app.decorate("authService", service);
};

export { authServiceSingleton, AuthService };
