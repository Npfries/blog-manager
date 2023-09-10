import { AuthService } from "./auth-service";
import { hash } from "@blog-manager/crypto";

const mockPrismaClient = {
  user: {
    findUnique: () => ({
      password: hash("supersecure", "asdf"),
      salt: "asdf",
      uuid: "1234",
    }),
  },
};

describe("auth-service", () => {
  describe("validate method", () => {
    describe("should return null for", () => {
      it("users with correct email but incorrect password", async () => {
        // @ts-ignore
        const authService = new AuthService(mockPrismaClient);
        const result = await authService.validate("testemail", "otherpassword");

        expect(result).toBeNull();
      });
    });
    describe("should return a uuid for", () => {
      it("users with correct email and password", async () => {
        // @ts-ignore
        const authService = new AuthService(mockPrismaClient);
        const result = await authService.validate("testemail", "supersecure");

        expect(result).toEqual("1234");
      });
    });
  });
});
