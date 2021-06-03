import React from "react";
import { render, screen } from "../../testUtils";
import { PharmacyCard } from "./PharmacyCard";

describe("PharmacyCar", () => {
  test("Should show popup warning if card shows a popup availability", () => {
    const POPUP_ORG_ID = 25;
    render(
      <PharmacyCard
        address=""
        booking
        id="1"
        lastUpdated="2021-06-02"
        organizationId={POPUP_ORG_ID}
        pharmacyName="Awesome Pharmacy"
        phone="555555555"
        vaccineAvailabilities={{}}
        website="http://www.someuri.com"
        key="unique"
      />,
    );
    expect(screen.getByText(/This is a pop-up clinic/)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Please visit the website to confirm you are eligible for this location/gi,
      ),
    ).toBeInTheDocument();
  });
});
