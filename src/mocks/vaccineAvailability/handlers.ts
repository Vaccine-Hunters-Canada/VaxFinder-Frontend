import { rest } from "msw";
import { VaccineAvailabilityExpandedResponse } from "../../apiClient";

export const vaccineAvailabilityHandlers = [
  rest.get(
    `${process.env.REACT_APP_API_URL}/api/v1/vaccine-availability`,
    (req, res, ctx) => {
      const response: VaccineAvailabilityExpandedResponse[] = [
        {
          id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          numberAvailable: 4,
          numberTotal: 10,
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

      return res(ctx.status(200), ctx.json(response));
    },
  ),
];
