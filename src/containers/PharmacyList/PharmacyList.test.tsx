import { rest } from "msw";
import React from "react";
import { server } from "../../mocks/server";
import { render, screen, within } from "../../testUtils";
import { PharmacyList } from "./PharmacyList";
import { format } from "date-fns-tz";

const formattedDate = format(
  new Date("2021-05-02T03:20:59.077000"),
  "MMM d y, h:mm a z",
);

describe("PharmacyList", () => {
  test("Should show all returned pharmacy details with appointment details", async () => {
    render(<PharmacyList postalCode="k2s 1s9" />);

    await screen.findByRole("heading", {
      name: /Regent Park 40 Oaks/i,
    });
    await screen.findByRole("heading", {
      name: /st\. james town wellesley community centre \(wcc\)/i,
    });
    await screen.findByRole("heading", {
      name: /ryerson university/i,
    });

    const available = await screen.findAllByText(/appointments available/i);
    expect(available.length).toBe(2);

    const unavailable = await screen.findAllByText(
      /appointments not available/i,
    );
    expect(unavailable.length).toBe(1);

    const dates = await screen.findAllByText(`as of ${formattedDate}`);
    expect(dates.length).toBe(3);

    // Find three addresses
    await screen.findByText(/40 oak street toronto ontario m5a2c6/i);

    await screen.findByText(/495 sherbourne street toronto ontario m4x1k7/i);

    await screen.findByText(/288 church street toronto ontario m5b1z5/i);

    // Find three phone numbers
    await screen.findByText(/1 888 385 1910/i);
    await screen.findByText(/1 888 385 1911/i);
    await screen.findByText(/1 888 385 1912/i);
  });

  test("Should show pharmacies with available appointments first", async () => {
    render(<PharmacyList postalCode="k2s 1s9" />);
    const pharmacyCards = await screen.findAllByTestId(/pharmacy-card/i);

    let utils = within(pharmacyCards[0]);
    utils.getByText(/appointments available/i);

    utils = within(pharmacyCards[1]);
    utils.getAllByText(/appointments available/i);

    utils = within(pharmacyCards[2]);
    utils.getAllByText(/appointments not available/i);
  });

  test("Should show error if pharmacy request fails", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_API_URL!}/api/v1/vaccine-locations`,
        async (req, res, ctx) => res(ctx.status(500)),
      ),
    );

    render(<PharmacyList postalCode="k2s 1s9" />);
    await screen.findByText(
      /could not load pharmacy data, please try again later/i,
    );
  });
});
