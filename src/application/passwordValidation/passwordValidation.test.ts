import { describe, it, expect } from "vitest";
import { passwordValidation } from "./passwordValidation";

describe("password validation", () => {
  it("should return valid for a strong password", () => {
    const result = passwordValidation("StrongPass123") as {
      valid: boolean;
      message: string;
    };
    expect(result.valid).toBe(true);
    expect(result.message).toBe("");
  });
});
