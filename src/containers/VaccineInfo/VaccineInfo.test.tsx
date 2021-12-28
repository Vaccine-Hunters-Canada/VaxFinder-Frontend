import React from "react";
import { render, screen } from "../../testUtils";
import { VaccineInfo } from "./VaccineInfo";

describe("Vaccine Info", () => {
  test("Vaccine Info should render", async () => {
    render(<VaccineInfo />);
    await screen.findByText(/Vaccine Information/);
  });
});
