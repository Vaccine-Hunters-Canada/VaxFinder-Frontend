import { rest } from "msw";
import React from "react";
import { server } from "../../mocks/server";
import { render, screen, within } from "../../testUtils";
import { PharmacyList } from "./PharmacyList";
import { format } from "date-fns-tz";

const formattedDate = format(
  new Date("2021-05-01T21:07:28.232Z"),
  "MMM d y, h:mm a z",
);

describe("PharmacyList", () => {
  test("Should show all returned pharmacy details with appointment details", async () => {
    render(<PharmacyList postalCode="k2s 1s9" />);

    await screen.findByRole("heading", {
      name: /location1 with availability/i,
    });
    await screen.findByRole("heading", {
      name: /location2 with availability/i,
    });
    await screen.findByRole("heading", {
      name: /location1 with no availability/i,
    });
    await screen.findByRole("heading", {
      name: /location2 with no availability/i,
    });

    const available = await screen.findAllByText(/appointments available/i);
    expect(available.length).toBe(2);

    const unavailable = await screen.findAllByText(
      /appointments not available/i,
    );
    expect(unavailable.length).toBe(2);

    const dates = await screen.findAllByText(`as of ${formattedDate}`);
    expect(dates.length).toBe(4);

    const addresses = await screen.findAllByText(
      /250 stittsville main st stittsville ontario k2s 1s9/i,
    );
    expect(addresses.length).toBe(4);

    const phones = await screen.findAllByText(/\(613\) 555-5555/i);
    expect(phones.length).toBe(4);

    // const links = await screen.findAllByRole("link", {
    //   name: /https:\/\/idapharmacy\.com\//i,
    // });
    // expect(links.length).toBe(4);
  });

  test("Should show pharmacies with available appointments first", async () => {
    render(<PharmacyList postalCode="k2s 1s9" />);
    const pharmacyList = await screen.findByLabelText(/pharmacy-list/i);

    // pharmacyList.childNodes[0] is the eligibility notice

    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    await within(pharmacyList.childNodes[1]).findByText(
      /appointments available/i,
    );
    await within(pharmacyList.childNodes[2]).findByText(
      /appointments available/i,
    );
    await within(pharmacyList.childNodes[3]).findByText(
      /appointments not available/i,
    );
    await within(pharmacyList.childNodes[4]).findByText(
      /appointments not available/i,
    );
    /* eslint-enable @typescript-eslint/no-unsafe-member-access */
    /* eslint-enable @typescript-eslint/no-unsafe-call */
  });

  test("Should show error if pharmacy request fails", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_API_URL!}/api/v1/vaccine-availability`,
        async (req, res, ctx) => res(ctx.status(500)),
      ),
    );

    render(<PharmacyList postalCode="k2s 1s9" />);
    await screen.findByText(
      /could not load pharmacy data, please try again later/i,
    );
  });
});
