import userEvent from "@testing-library/user-event";
import React from "react";
import { render, screen } from "../../testUtils";
import { ExternalKeyInput } from "./ExternalKeyInput";

describe("ExternalKeyInput", () => {
  test("Should post correct external key to rapid assessment form", async () => {
    const { history } = render(<ExternalKeyInput />);
    const postalInput = await screen.findByRole("textbox", {
      name: /enter clinic postal code/i,
    });
    const streetInput = await screen.findByRole("spinbutton", {
      name: /enter your street number\./i,
    });
    const orgButton = await screen.findByText(/please select an organization/i);
    userEvent.type(postalInput, "K2T-0E5");
    userEvent.type(streetInput, "100");
    userEvent.click(orgButton);

    const organization = await screen.findByText(/verto/i);
    userEvent.click(organization);

    const submitButton = await screen.findByRole("button", { name: /submit/i });
    userEvent.click(submitButton);

    expect(history.location.search).toBe(
      "externalKey=100-K2T0E5-1&organizationId=1",
    );
  });
});
