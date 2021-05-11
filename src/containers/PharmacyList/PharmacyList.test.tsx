/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { rest } from "msw";
import React from "react";
import { server } from "../../mocks/server";
import { render, screen, within } from "../../testUtils";
import { PharmacyList } from "./PharmacyList";
import { format } from "date-fns-tz";
import {
  vaccineLocationOneAvailability,
  vaccineLocationMultipleAvailabilities,
  vaccineLocationNoAvailabilities,
  vaccineLocationsZeroValueAvailability,
  vaccineLocationsMixedAvailabilities,
  vaccineLocationResponses,
} from "../../utils/mock";
import { postalCodeToHumanFormat } from "../../utils/postalCode";

const formattedDate = format(
  new Date("2021-05-02T03:20:59.077000"),
  "MMM d, y",
);

describe.only("PharmacyList", () => {
  test("Should show all returned pharmacy locations", async () => {
    render(<PharmacyList postalCode="k2s 1s9" />);

    for (const vaccineLocation of vaccineLocationResponses) {
      await screen.findByRole("heading", {
        name: vaccineLocation.name,
      });

      const address = [];
      if (vaccineLocation.address.line1) {
        address.push(vaccineLocation.address.line1);
      }
      if (vaccineLocation.address.line2) {
        address.push(vaccineLocation.address.line2);
      }
      if (vaccineLocation.address.city) {
        address.push(vaccineLocation.address.city);
      }
      address.push(vaccineLocation.address.province);
      address.push(postalCodeToHumanFormat(vaccineLocation.address.postcode));
      await screen.findByText(address.join(" "));

      await screen.findByText(vaccineLocation.phone);
    }
  });

  test("Should show pharmacies with available appointments first", async () => {
    render(<PharmacyList postalCode="k2s 1s9" />);
    const pharmacyCards = await screen.findAllByTestId(/pharmacy-card/i);

    const locationsWithAvailability = vaccineLocationResponses.filter(
      (vaccineLocation) => {
        return vaccineLocation.vaccineAvailabilities.filter(
          (vaccineAvailability) => {
            return vaccineAvailability.numberAvailable > 0;
          },
        );
      },
    );

    console.log("locationsWithAvailability", locationsWithAvailability.length);

    for (let i = 0; i < locationsWithAvailability.length; i++) {
      const pharmacyCard = within(pharmacyCards[i]);
      pharmacyCard.getByText(/appointments available/i);
    }

    for (
      let i = locationsWithAvailability.length;
      vaccineLocationResponses.length;
      i++
    ) {
      const pharmacyCard = within(pharmacyCards[i]);
      pharmacyCard.getAllByText(/appointments not available/i);
    }
  });
});

describe("PharmacyListOld", () => {
  test("Should show all returned pharmacy details with appointment details", async () => {
    const available = await screen.findAllByText(/appointments available/i);
    expect(available.length).toBe(2);

    const unavailable = await screen.findAllByText(
      /appointments not available/i,
    );
    expect(unavailable.length).toBe(1);

    const dates = await screen.findAllByText(`as of ${formattedDate}`);
    expect(dates.length).toBe(3);

    // Find three addresses
    await screen.findByText(/40 oak street toronto ontario m5a 2c6/i);

    await screen.findByText(/495 sherbourne street toronto ontario m4x 1k7/i);

    await screen.findByText(/288 church street toronto ontario m5b 1z5/i);

    // Find three phone numbers
    await screen.findByText(/1 888 385 1910/i);
    await screen.findByText(/1 888 385 1911/i);
    await screen.findByText(/1 888 385 1912/i);
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

/* eslint-enable no-await-in-loop */
/* eslint-enable no-restricted-syntax */
/* eslint-enable @typescript-eslint/no-unused-vars */
