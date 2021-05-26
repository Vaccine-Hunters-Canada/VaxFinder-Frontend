import React from "react";
import { render, screen } from "./testUtils";
import { AppFrame } from "./AppFrame";
import userEvent from "@testing-library/user-event";

describe("AppFrame", () => {
  test("Should switch to French", async () => {
    render(<AppFrame />);
    const francais = await screen.findByText("Français");
    userEvent.click(francais);
    await screen.findByText("Langue"); // Look for lowercase here, CSS is used to change text to uppercase
  });
});
