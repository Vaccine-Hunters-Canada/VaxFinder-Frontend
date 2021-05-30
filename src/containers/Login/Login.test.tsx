import React from "react";
import { rest } from "msw";
import { server } from "../../mocks/server";
import { render, screen } from "../../testUtils";
import { Login } from "./Login";
import userEvent from "@testing-library/user-event";
import { SecurityLoginResponse } from "../../apiClient";

describe("Login", () => {
  test("Submit button should be disabled if username or password are blank", () => {
    render(<Login />);

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.type(usernameInput, "");
    userEvent.type(passwordInput, "");

    const submitButton = screen.getByRole("button", { name: /login/i });
    expect(submitButton).toBeDisabled();
  });

  test("Should show invalid credentials error if invalid credentials are supplied", async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API_URL!}/api/v1/security/login`,
        (req, res, ctx) => {
          const response: SecurityLoginResponse = {
            result: 0,
            key: undefined,
          };
          return res(ctx.status(200), ctx.json(response));
        },
      ),
    );

    render(<Login />);

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.type(usernameInput, "Gamblepudding");
    userEvent.type(passwordInput, "gibberish");

    const submitButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(submitButton);

    const error = await screen.findByText(
      /you have supplied invalid credentials, please try again\./i,
    );
    expect(error).toBeInTheDocument();
  });

  test("Should show general error if api throws error", async () => {
    server.use(
      rest.post(
        `${process.env.REACT_APP_API_URL!}/api/v1/security/login`,
        (req, res, ctx) => res.networkError("Error"),
      ),
    );

    render(<Login />);

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getByLabelText(/password/i);

    userEvent.type(usernameInput, "Gamblepudding");
    userEvent.type(passwordInput, "gibberish");

    const submitButton = screen.getByRole("button", { name: /login/i });
    userEvent.click(submitButton);

    const error = await screen.findByText(/an error has occurred/i);
    expect(error).toBeInTheDocument();
  });
});
