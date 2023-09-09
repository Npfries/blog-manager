import crypto from "node:crypto";

const hash = (string, salt) => {
  return crypto.pbkdf2Sync(string, salt, 1000, 64, "sha512").toString("hex");
};

const salt = () => {
  return crypto.randomBytes(16).toString("hex");
};

export { hash, salt };
