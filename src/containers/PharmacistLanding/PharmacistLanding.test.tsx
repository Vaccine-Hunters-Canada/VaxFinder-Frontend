import React from "react";
import { render, screen } from "../../testUtils";
import { PharmacistLanding } from "./PharmacistLanding";

describe("Pharmacist Landing", () => {
  test("Pharmacist Landing should render", async () => {
    render(<PharmacistLanding />);
    await screen.findByText(/Remove appointments/);
  });
});
