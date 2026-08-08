import { describe, it, expect } from "vitest";
import { resolveInitialLanguage } from "@/contexts/LanguageContext";

describe("resolveInitialLanguage", () => {
  it("defaults to Portuguese for Portuguese browser locales", () => {
    expect(resolveInitialLanguage("pt-BR")).toBe("pt");
    expect(resolveInitialLanguage("pt-PT")).toBe("pt");
  });

  it("defaults to English for non-Portuguese browser locales", () => {
    expect(resolveInitialLanguage("en-US")).toBe("en");
    expect(resolveInitialLanguage("es-ES")).toBe("en");
  });
});
