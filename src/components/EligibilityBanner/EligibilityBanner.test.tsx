import React from "react";
import { render, screen } from "../../testUtils";
import { EligibilityBanner } from "./EligibilityBanner";

describe("Eligibility Banner", () => {
  test("Eligibility Banner should render", async () => {
    render(
      <EligibilityBanner
        onDismiss={() => {
          // Do nothing
        }}
      />,
    );
    await screen.findByText(/Eligibility/);
  });
});
