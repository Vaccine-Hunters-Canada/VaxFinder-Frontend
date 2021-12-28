import React from "react";
import { render, screen } from "../../testUtils";
import { Home } from "./Home";
import userEvent from "@testing-library/user-event";

describe("Home", () => {
  test("Should allow user to enter and submit valid postal code", async () => {
    const { history } = render(<Home />);

    const input = await screen.findByRole("textbox", {
      name: /please enter your postal code/i,
    });
    userEvent.type(input, "K2T0E5");
    expect((input as HTMLInputElement).value).toBe("K2T0E5");

    const submit = screen.getByRole("button", { name: /Submit/i });
    userEvent.click(submit);

    expect(history.location.pathname).toBe("/search/k2t0e5");
  });

  test("Should prevent user from entering invalid postal code", async () => {
    const { history } = render(<Home />);

    const input = await screen.findByRole("textbox", {
      name: /please enter your postal code/i,
    });
    userEvent.type(input, "78701");
    expect((input as HTMLInputElement).value).toBe("78701");

    const submit = screen.getByRole("button", { name: /Submit/i });
    userEvent.click(submit);

    await screen.findByText(/you have entered an invalid postal code/i);
    expect(history.location.pathname).toBe("/");
  });
});
