import React from "react";
import { userService } from "../../services/userService";
import { render, screen } from "../../testUtils";
import { PrivateRoute } from "./PrivateRoute";

jest.mock("../../services/userService");

const redirectMock = (args: { to: { pathname: string } }) => (
  <div>{args.to.pathname}</div>
);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Redirect: redirectMock,
}));

describe("Private route", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Private route should render children if user is authenticated", () => {
    const isAuthenticatedMock = jest.fn(() => true);
    userService.checkIsAuthenticated = isAuthenticatedMock;
    render(<PrivateRoute render={() => <div>Protected content</div>} />);
    expect(screen.getByText(/Protected content/i)).toBeInTheDocument();
  });

  test("Private route should redirect if user is not authenticated", () => {
    const isAuthenticatedMock = jest.fn(() => false);
    userService.checkIsAuthenticated = isAuthenticatedMock;
    render(<PrivateRoute render={() => <div>Protected content</div>} />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});
