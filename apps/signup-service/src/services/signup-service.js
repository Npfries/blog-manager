import * as Types from "../types.js";
import { v4 as uuidv4 } from "uuid";
import { salt, hash } from "@blog-manager/crypto";

class SignupService {
  app;

  /**
   *
   * @param {Types.App} app
   */
  constructor(app) {
    this.app = app;
  }
  signup(name, email, handle, password) {
    const uuid = uuidv4();
    const userSalt = salt();
    const hashed = hash(password, userSalt);
    const signupEvent = {
      uuid,
      name,
      email,
      handle,
      salt: userSalt,
      hash: hashed,
    };
    this.app.eventService.sendUserCreatedEvent(signupEvent);
    return {
      uuid,
      name,
      handle,
      email,
    };
  }
}

/**
 * @param {Types.App} app
 * @param {Object} options
 */
const signupServiceSingleton = async (app, options) => {
  const service = new SignupService(app);
  app.decorate("signupService", service);
};

export { signupServiceSingleton, SignupService };
