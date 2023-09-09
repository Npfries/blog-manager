import jwt from "jsonwebtoken";
import * as Types from "../types.js";

class JwtService {
  /**
   * @private
   */
  secret;

  constructor() {
    this.secret = process.env.JWT_SECRET ?? "";
  }

  sign(uuid) {
    return jwt.sign({ uuid }, this.secret, {
      expiresIn: "1d",
    });
  }

  verify(token) {
    return jwt.verify(token, this.secret);
  }
}

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const jwtServiceSingleton = async (app, options) => {
  const service = new JwtService();
  app.decorate("jwtService", service);
};

export { jwtServiceSingleton, JwtService };
