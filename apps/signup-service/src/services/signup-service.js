import * as Types from "../types.js";
import { v4 as uuidv4 } from "uuid";
import { salt, hash } from "@blog-manager/crypto";

class SignupService {
  async signup(name, email, password) {
    const uuid = uuidv4();
    const userSalt = salt();
    const hashed = hash(password, userSalt);
    const signupEvent = {
      uuid,
      name,
      email,
      userSalt,
      hashed,
    };
  }
}

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const signupServiceSingleton = async (app, options) => {
  const service = new SignupService();
  app.decorate("signupService", service);
};

export { signupServiceSingleton, SignupService };
