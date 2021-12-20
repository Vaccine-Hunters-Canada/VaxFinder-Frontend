import React from "react";
import { render } from "../../testUtils";
import { Footer } from "./Footer";

describe("Footer", () => {
  test("Should render the default", async () => {
    const { getByText } = render(<Footer />);
    expect(getByText(/Get more resources/)).toBeInTheDocument();
    expect(getByText(/on our DIY pages/)).toHaveAttribute(
      "href",
      "https://vaccinehunters.ca/diy"
    );
  });

  test.each([
    [
      "T0X0X0",
      /Get more Alberta resources/,
      "https://vaccinehunters.ca/alberta",
    ],
    [
      "M0X0X0",
      /Get more Ontario resources/,
      "https://vaccinehunters.ca/ontario",
    ],
  ])(
    "Should render the appropriate text and link for postal code",
    async (postalCode, expectedText, expectedLink) => {
      const { getByText } = render(<Footer postalCode={postalCode} />);
      expect(getByText(expectedText)).toBeInTheDocument();
      expect(getByText(/on our DIY pages/)).toHaveAttribute(
        "href",
        expectedLink
      );
    }
  );
});
