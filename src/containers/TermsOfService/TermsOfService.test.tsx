import React from "react";
import { render, screen } from "../../testUtils";
import { TermsOfService } from "./TermsOfService";

describe("Terms Of Service", () => {
  test("Terms Of Service should render", async () => {
    render(<TermsOfService />);
    await screen.findByText(/Vaccine Hunters Canada Terms of Service/);
  });
});
