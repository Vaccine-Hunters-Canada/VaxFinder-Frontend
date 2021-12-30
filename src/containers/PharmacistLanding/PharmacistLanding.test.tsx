import userEvent from "@testing-library/user-event";
import React from "react";
import { render, screen } from "../../testUtils";
import { PharmacistLanding } from "./PharmacistLanding";

describe("Pharmacist Landing", () => {
  test("Pharmacist Landing should render", async () => {
    render(<PharmacistLanding />);
    await screen.findByText(/Remove appointments/);
  });

  test("Go to remove appointment screen should be clickable", async () => {
    render(<PharmacistLanding />);
    const button = await screen.findByRole("button", {
      name: /Go to remove appointment screen/i,
    });
    userEvent.click(button);
  });

  test("Go to add appointment screen should be clickable", async () => {
    render(<PharmacistLanding />);
    const button = await screen.findByRole("button", {
      name: /Go to add appointment screen/i,
    });
    userEvent.click(button);
  });
});
