import { assert, expect, test } from "vitest";
import { VerificationDomain } from "../VerificationDomain";

// Edit an assertion and save to see HMR in action

test("VerificationDomain.test.ts 1", () => {
  expect(VerificationDomain("hoge@example.com", "example.com")).toBe(true);
});
test("VerificationDomain.test.ts 2", () => {
  expect(VerificationDomain("hoge@example.net", "example.com")).toBe(false);
});
