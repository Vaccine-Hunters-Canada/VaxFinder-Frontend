import React from "react";
import { render, screen, fireEvent } from "../../testUtils";
import { Home } from "./Home";

describe("Home", () => {
  test("Should allow user to enter and submit valid postal code", async () => {
    const { history } = render(<Home />);

    const input = await screen.findByRole("textbox", {
      name: /please enter your postal code/i,
    });
    fireEvent.change(input, { target: { value: "K2T0E5" } });
    expect(input.value).toBe("K2T0E5");

    const submit = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submit);

    expect(history.location.pathname).toBe("/search/K2T0E5");
  });

  test("Should prevent user from entering invalid postal code", async () => {
    const { history } = render(<Home />);

    const input = await screen.findByRole("textbox", {
      name: /please enter your postal code/i,
    });
    fireEvent.change(input, { target: { value: "78701" } });
    expect(input.value).toBe("78701");

    const submit = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submit);

    await screen.findByText(/you have entered an invalid postal code/i);
    expect(history.location.pathname).toBe("/");
  });
});
