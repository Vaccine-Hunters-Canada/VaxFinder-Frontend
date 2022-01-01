import React from "react";
import { render, screen } from "../../testUtils";
import { PrivacyPolicy } from "./PrivacyPolicy";

describe("Privacy policy", () => {
  test("Privacy policy should render", async () => {
    render(<PrivacyPolicy />);
    await screen.findByText(/Our Privacy Policy/);
  });
});
