import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import React from "react";
import { server } from "../../mocks/server";
import { render, screen, waitFor } from "../../testUtils";
import { RapidAppointment } from "./RapidAppointment";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({ search: "externalKey=100-K2T0E5-1&organizationId=1" }),
}));

describe("Rapid appointment form", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("Should not show location-related controls if location details are successfully retrieved from api", () => {
    // A valid location will be served to the form via MSW
    render(<RapidAppointment />);

    expect(
      screen.queryByRole("textbox", {
        name: /enter clinic name/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("textbox", {
        name: /enter address/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("textbox", {
        name: /enter city/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("textbox", {
        name: /enter province/i,
      }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("textbox", {
        name: /enter postal code/i,
      }),
    ).not.toBeInTheDocument();
  });

  test("Long form should show validation errors if form values are invalid", async () => {
    // Return a 404, which means no location could be found, and we present the long form
    // so the user can record location details
    server.use(
      rest.get(
        `${process.env
          .REACT_APP_API_URL!}/api/v1/locations/external/:external_key`,
        async (req, res, ctx) => res(ctx.status(404)),
      ),
    );

    render(<RapidAppointment />);

    const button = await screen.findByRole("button", {
      name: /submit/i,
    });
    userEvent.click(button);

    expect(
      await screen.findByText(/name must not be empty/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/address must not be empty/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/city must not be empty/i),
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/province must not be empty/i),
    ).toBeInTheDocument();
    expect(await screen.findByText(/invalid postal code/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/url must not be empty/i),
    ).toBeInTheDocument();
    const bookingErrors = await screen.findAllByText(
      /at least one booking method must be checked/i,
    );
    expect(bookingErrors.length).toBe(4);
  });

  test("Form should show success message if form values are submitted", async () => {
    const { history } = render(<RapidAppointment />);

    // Required booking type
    userEvent.click(await screen.findByText(/call ahead/i));

    // Required reason
    userEvent.click(await screen.findByText(/cancellations/i));

    // Required dose category
    userEvent.click(screen.getByText(/1st dose/i));

    const button = await screen.findByRole("button", {
      name: /submit/i,
    });
    userEvent.click(button);

    await waitFor(() => {
      expect(history.location.pathname).toBe("/admin/pharmacistLanding");
      expect(history.location.search).toBe(
        "?externalKey=100-K2T0E5-1&organizationId=1&saveSuccess=true",
      );
    });
  });
});
