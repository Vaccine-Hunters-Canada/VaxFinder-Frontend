import React from "react";
import { rest } from "msw";
import { server } from "../../mocks/server";
import { render, screen, waitFor } from "../../testUtils";
import { Login } from "./Login";
import userEvent from "@testing-library/user-event";
import { SecurityLoginResponse } from "../../apiClient";

describe("Login", () => {
  test("Submit button should be disabled if username or password are blank", () => {
    render(<Login />);

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getAllByLabelText(/password/i)[0];

    userEvent.type(usernameInput, "");
    userEvent.type(passwordInput, "");

    const submitButton = screen.getAllByRole("button", { name: /login/i })[0];
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
    const passwordInput = screen.getAllByLabelText(/password/i)[0];

    userEvent.type(usernameInput, "Gamblepudding");
    userEvent.type(passwordInput, "gibberish");

    const submitButton = screen.getAllByRole("button", { name: /login/i })[0];
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
    const passwordInput = screen.getAllByLabelText(/password/i)[0];

    userEvent.type(usernameInput, "Gamblepudding");
    userEvent.type(passwordInput, "gibberish");

    const submitButton = screen.getAllByRole("button", { name: /login/i })[0];
    userEvent.click(submitButton);

    const error = await screen.findByText(/an error has occurred/i);
    expect(error).toBeInTheDocument();
  });

  test("Successful pharmacy login should redirect to external key", async () => {
    const { history } = render(<Login />);

    const passwordInput = screen.getAllByLabelText(/password/i)[0];

    userEvent.type(passwordInput, "password");

    const submitButton = screen.getAllByRole("button", { name: /login/i })[0];
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe("/admin/externalKey");
    });
  });

  test("Successful staff login should redirect to popup", async () => {
    const { history } = render(<Login />);

    const usernameInput = screen.getByRole("textbox", { name: /username/i });
    const passwordInput = screen.getAllByLabelText(/password/i)[1];

    userEvent.type(usernameInput, "Gamblepudding");
    userEvent.type(passwordInput, "password");

    const submitButton = screen.getAllByRole("button", { name: /login/i })[1];
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(history.location.pathname).toBe("/admin/popup");
    });
  });
});
