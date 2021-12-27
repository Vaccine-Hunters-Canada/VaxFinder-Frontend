import { postalCodeIsValid } from "./postalCode";

describe("Postal Code", () => {
  test("Should accept valid postal codes", () => {
    expect(postalCodeIsValid("K7L 3K3")).toBe(true);
    expect(postalCodeIsValid("K7L3K3")).toBe(true);
    expect(postalCodeIsValid("A1A1A1")).toBe(true);
  });
});

describe("Postal Code", () => {
  test("Should reject invalid postal codes", () => {
    expect(postalCodeIsValid("99999")).toBe(false);
    expect(postalCodeIsValid("")).toBe(false);
    expect(postalCodeIsValid(" ")).toBe(false);
    expect(postalCodeIsValid("TEST")).toBe(false);
  });
});
