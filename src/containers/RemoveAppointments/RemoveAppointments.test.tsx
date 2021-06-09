import { rest } from "msw";
import React from "react";
import { server } from "../../mocks/server";
import { render, screen } from "../../testUtils";
import { RemoveAppointments } from "./RemoveAppointments";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({ search: "externalKey=100-K2T0E5-1&organizationId=1" }),
}));

describe("Remove appointments", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should show error if location could not be found", async () => {
    // Return a 404, which means no location could be found, and we present the long form
    // so the user can record location details
    server.use(
      rest.get(
        `${process.env
          .REACT_APP_API_URL!}/api/v1/locations/external/:external_key`,
        async (req, res, ctx) => res(ctx.status(404)),
      ),
    );
    render(<RemoveAppointments />);

    expect(
      await screen.findByText(/could not find the location specified/i),
    ).toBeInTheDocument();
  });

  test("should show general error if location endpoint throws error", async () => {
    server.use(
      rest.get(
        `${process.env
          .REACT_APP_API_URL!}/api/v1/locations/external/:external_key`,
        async (req, res, ctx) => res(ctx.status(500)),
      ),
    );
    render(<RemoveAppointments />);

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });

  test("should show general error if vaccine availabilities endpoint throws error", async () => {
    server.use(
      rest.get(
        `${process.env
          .REACT_APP_API_URL!}/api/v1/vaccine-availability/location/`,
        async (req, res, ctx) => res(ctx.status(500)),
      ),
    );
    render(<RemoveAppointments />);

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });

  test("should show general error if update availabilities endpoint throws error", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_API_URL!}/api/v1/vaccine-availability/:id`,
        async (req, res, ctx) => res(ctx.status(500)),
      ),
    );
    render(<RemoveAppointments />);

    expect(
      await screen.findByText(/an error has occurred/i),
    ).toBeInTheDocument();
  });
});
