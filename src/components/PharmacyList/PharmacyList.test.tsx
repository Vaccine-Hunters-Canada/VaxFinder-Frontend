import { rest } from "msw";
import React from "react";
import { VaccineAvailabilityExpandedResponse } from "../../apiClient";
import { server } from "../../mocks/server";
import { render, screen } from "../../testUtils";
import { PharmacyList } from "./PharmacyList";

describe("PharmacyList", () => {
  test("Should show returned pharmacy details with available appointments", async () => {
    render(<PharmacyList />);

    await screen.findByRole("heading", { name: /stittsville ida/i });
    await screen.findByText(/appointments available/i);
    await screen.findByText(
      /250 stittsville main st stittsville ontario k2s 1s9/i,
    );
    await screen.findByText(/\(613\) 555-5555/i);
    await screen.findByRole("link", { name: /https:\/\/idapharmacy\.com\//i });
  });

  test("Should show returned pharmacy details with no available appointments", async () => {
    const response: VaccineAvailabilityExpandedResponse[] = [
      {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        numberAvailable: 0,
        numberTotal: 0,
        date: "2021-05-01",
        vaccine: 1,
        inputType: 1,
        tags: "high-risk",
        created_at: "2021-05-01T21:07:28.232Z",
        location: {
          id: 0,
          name: "Stittsville IDA",
          phone: "(613) 555-5555",
          notes: "",
          active: 1,
          postcode: "K2K 2N6",
          url: "https://idapharmacy.com/",
          tags: "IDA",
          created_at: "2021-05-01T21:07:28.232Z",
          organization: 0,
          address: {
            id: 123456,
            line1: "250 Stittsville Main St",
            line2: "",
            city: "Stittsville",
            province: "Ontario",
            postcode: "K2S 1S9",
            created_at: "2021-05-01T21:07:28.232Z",
          },
        },
      },
    ];

    server.use(
      rest.get(
        `${process.env.REACT_APP_API_URL!}/api/v1/vaccine-availability`,
        async (req, res, ctx) => res(ctx.json(response)),
      ),
    );

    render(<PharmacyList />);

    await screen.findByRole("heading", { name: /stittsville ida/i });
    await screen.findByText(/appointments not available/i);
    await screen.findByText(
      /250 stittsville main st stittsville ontario k2s 1s9/i,
    );
    await screen.findByText(/\(613\) 555-5555/i);
    await screen.findByRole("link", { name: /https:\/\/idapharmacy\.com\//i });
  });

  test("Should show error if pharmacy request fails", async () => {
    server.use(
      rest.get(
        `${process.env.REACT_APP_API_URL!}/api/v1/vaccine-availability`,
        async (req, res, ctx) => res(ctx.status(500)),
      ),
    );

    render(<PharmacyList />);
    await screen.findByText(
      /could not load pharmacy data, please try again later/i,
    );
  });
});
