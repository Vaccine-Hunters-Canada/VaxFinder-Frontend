import userEvent from "@testing-library/user-event";
import { ResponseResolver, rest } from "msw";
import React from "react";
import { server } from "../../mocks/server";
import { render, screen, waitFor } from "../../testUtils";
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

  // We have 4 availabilties in our mock data, but only 3 are inputted via the web and are therefore
  // subject to being updated so their vaccines can be removed
  test("should  ensure the 3 availabilities are updated to remove vaccine numbers", async () => {
    const handler: ResponseResolver = async (req, res, ctx) => {
      return res(ctx.status(200));
    };

    const mockHandler = jest.fn(handler);
    server.use(
      rest.put(
        `${process.env
          .REACT_APP_API_URL!}/api/v1/vaccine-availability/:vaccine_availability_id`,
        mockHandler,
      ),
    );

    const { history } = render(<RemoveAppointments />);
    const button = await screen.findByRole("button", { name: /remove/i });
    userEvent.click(button);

    const NUMBER_OF_AVAILABILITIES_TO_UPDATE = 3;
    await waitFor(() => {
      expect(history.location.pathname).toBe("/admin/pharmacistLanding");
      expect(history.location.search).toBe(
        "?externalKey=100-K2T0E5-1&organizationId=1&saveSuccess=true",
      );
      expect(mockHandler).toHaveBeenCalledTimes(
        NUMBER_OF_AVAILABILITIES_TO_UPDATE,
      );
    });
  });
});
