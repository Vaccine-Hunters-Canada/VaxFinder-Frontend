import {
  postalCodeIsValid,
  postalCodeToApiFormat,
  postalCodeToBrowserFormat,
  postalCodeToHumanFormat,
} from "./postalCode";

describe("Postal Code", () => {
  test("Should accept valid postal codes", () => {
    // 6 character postal codes
    expect(postalCodeIsValid("K7L 3K3")).toBe(true);
    expect(postalCodeIsValid("K7L3K3")).toBe(true);
    expect(postalCodeIsValid("A1A 1A1")).toBe(true);
    expect(postalCodeIsValid("A1A1A1")).toBe(true);
    expect(postalCodeIsValid("H0H0H0")).toBe(true); // we accept Santa Claus postal code
    // Lowercase
    expect(postalCodeIsValid("k7l 3k3")).toBe(true);
    expect(postalCodeIsValid("k7l3k3")).toBe(true);

    // 3 character postal codes
    expect(postalCodeIsValid("K7L")).toBe(true);
    expect(postalCodeIsValid("A1A")).toBe(true);
    expect(postalCodeIsValid("H0H")).toBe(true); // we accept Santa Claus postal code
    expect(postalCodeIsValid("k7l")).toBe(true); // lowercase
  });
});

describe("Postal Code", () => {
  test("Should reject invalid postal codes", () => {
    expect(postalCodeIsValid("99999")).toBe(false); // US zip code
    expect(postalCodeIsValid("99999-9999")).toBe(false); // US zip code
    expect(postalCodeIsValid("")).toBe(false);
    expect(postalCodeIsValid(" ")).toBe(false);
    expect(postalCodeIsValid("TEST")).toBe(false);
    expect(postalCodeIsValid("HOHOHO")).toBe(false);
    expect(postalCodeIsValid("SW1W 0NY")).toBe(false); // UK postal code
  });
});

describe("Postal Code", () => {
  test("Test postalCodeToApiFormat", () => {
    expect(postalCodeToApiFormat("M4S")).toBe("m4s");
    expect(postalCodeToApiFormat("m4s")).toBe("m4s");
    expect(postalCodeToApiFormat("A1A 1A1")).toBe("a1a");
    expect(postalCodeToApiFormat("a1a 1a1")).toBe("a1a");
    expect(postalCodeToApiFormat("A1A1A1")).toBe("a1a");
    expect(postalCodeToApiFormat("a1a1a1")).toBe("a1a");
  });
});

describe("Postal Code", () => {
  test("Test postalCodeToBrowserFormat", () => {
    expect(postalCodeToBrowserFormat("A1A 1A1")).toBe("a1a1a1");
    expect(postalCodeToBrowserFormat("A1A1A1")).toBe("a1a1a1");
    expect(postalCodeToBrowserFormat("a1a1a1")).toBe("a1a1a1");
  });
});

describe("Postal Code", () => {
  test("Test postalCodeToHumanFormat", () => {
    expect(postalCodeToHumanFormat("A1A 1A1")).toBe("A1A 1A1");
    expect(postalCodeToHumanFormat("A1A1A1")).toBe("A1A 1A1");
    expect(postalCodeToHumanFormat("a1a1a1")).toBe("A1A 1A1");
  });
});
