import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen } from "../../testUtils";
import { SearchCard } from "./SearchCard";

describe("Search card", () => {
  test("Search card should not show error when valid postal code entered", async () => {
    render(<SearchCard />);
    const text = await screen.findByRole("textbox");
    const submit = await screen.findByRole("button", { name: /Submit/ });
    userEvent.type(text, "K2T 0E5");
    userEvent.click(submit);
    expect(
      screen.queryByText(/You have entered an invalid postal code/),
    ).not.toBeInTheDocument();
  });

  test("Search card should show error when invalid postal code entered", async () => {
    render(<SearchCard />);
    const text = await screen.findByRole("textbox");
    const submit = await screen.findByRole("button", { name: /Submit/ });
    userEvent.type(text, "TEST");
    userEvent.click(submit);
    expect(
      screen.getByText(/You have entered an invalid postal code/),
    ).toBeInTheDocument();
  });
});
