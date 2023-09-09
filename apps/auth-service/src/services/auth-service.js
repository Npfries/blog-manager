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
   * Creates a new user
   * @param {string} email
   * @param {string} password
   */
  async create(email, password) {
    const userSalt = salt();
    const hashed = hash(password, userSalt);
    await this.db.user.create({
      data: {
        email: email,
        password: hashed,
        salt: userSalt,
      },
    });
  }

  async validate(email, password) {
    if (!email || !password) return false;

    const user = await this.db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return false;

    if (user.password === hash(password, user.salt)) return true;

    return false;
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
