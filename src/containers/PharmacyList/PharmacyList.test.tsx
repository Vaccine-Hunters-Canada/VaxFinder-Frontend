/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { rest } from "msw";
import React from "react";
import { server } from "../../mocks/server";
import { render, screen, within } from "../../testUtils";
import { PharmacyList } from "./PharmacyList";
import { vaccineLocationResponses } from "../../mocks/mockData";
import { postalCodeToHumanFormat } from "../../utils/postalCode";

describe("PharmacyList", () => {
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
        return (
          vaccineLocation.vaccineAvailabilities.filter(
            (vaccineAvailability) => {
              return vaccineAvailability.numberAvailable > 0;
            },
          ).length > 0
        );
      },
    );

    for (let i = 0; i < locationsWithAvailability.length; i += 1) {
      const pharmacyCard = within(pharmacyCards[i]);
      pharmacyCard.getByText(/appointments available/i);
    }

    for (
      let i = locationsWithAvailability.length;
      i < vaccineLocationResponses.length;
      i += 1
    ) {
      const pharmacyCard = within(pharmacyCards[i]);
      pharmacyCard.getAllByText(/appointments not available/i);
    }
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
