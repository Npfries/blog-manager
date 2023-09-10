import { hash, salt } from ".";

("944de8a2eaac16622e8b0b5677ddfbf7");
("899d348fc71eecb25babf9797c1bd047");

describe("cypto module", () => {
  describe("hash", () => {
    it("should produce the same hash given the same password and same salt", () => {
      const testSaltA = "944de8a2eaac16622e8b0b5677ddfbf7";
      const testPasswordA = "supersecret";

      const testSaltB = "944de8a2eaac16622e8b0b5677ddfbf7";
      const testPasswordB = "supersecret";

      const testHashA = hash(testPasswordA, testSaltA);
      const testHashB = hash(testPasswordB, testSaltB);

      expect(testHashA).toEqual(testHashB);
    });

    it("should produce a different hash given the same password but different salt", () => {
      const testSaltA = "944de8a2eaac16622e8b0b5677ddfbf7";
      const testPasswordA = "supersecret";

      const testSaltB = "899d348fc71eecb25babf9797c1bd047";
      const testPasswordB = "supersecret";

      const testHashA = hash(testPasswordA, testSaltA);
      const testHashB = hash(testPasswordB, testSaltB);

      expect(testHashA).not.toEqual(testHashB);
    });

    it("should produce a different hash given the same salt but different password", () => {
      const testSaltA = "944de8a2eaac16622e8b0b5677ddfbf7";
      const testPasswordA = "supersecret";

      const testSaltB = "944de8a2eaac16622e8b0b5677ddfbf7";
      const testPasswordB = "otherpassword";

      const testHashA = hash(testPasswordA, testSaltA);
      const testHashB = hash(testPasswordB, testSaltB);

      expect(testHashA).not.toEqual(testHashB);
    });

    it("should produce a different hash given a different password and different salt", () => {
      const testSaltA = "944de8a2eaac16622e8b0b5677ddfbf7";
      const testPasswordA = "supersecret";

      const testSaltB = "899d348fc71eecb25babf9797c1bd047";
      const testPasswordB = "otherpassword";

      const testHashA = hash(testPasswordA, testSaltA);
      const testHashB = hash(testPasswordB, testSaltB);

      expect(testHashA).not.toEqual(testHashB);
    });
  });

  describe("salt", () => {
    it("should produce different salts for different users", () => {
      const saltA = salt();
      const saltB = salt();
      expect(saltA).not.toEqual(saltB);
    });
  });
});
