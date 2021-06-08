import { rest } from "msw";
import { LocationExpandedResponse } from "../../apiClient";

export const locationHandlers = [
  rest.get(
    `${process.env.REACT_APP_API_URL}/api/v1/locations/external/:external_key`,
    async (req, res, ctx) => {
      const response: LocationExpandedResponse = {
        name: "My clinic",
        phone: "6135555555",
        notes: "",
        active: 1,
        postcode: "K2T0E5",
        url: "http://www.url.com",
        tags: "",
        externalKey: "1-k2t0e5-1",
        id: 1,
        organization: {
          fullName: "Verto",
          shortName: "Verto",
          description: "Toronto Hospitals",
          url: "https://vaccineto.ca/api/slots",
          id: 1,
          createdAt: "2021-05-02T03:20:59.077000+00:00",
        },
        address: {
          line1: "Clinic",
          line2: "",
          city: "Ottawa",
          province: "ON",
          postcode: "K2T0E5",
          id: 2105,
          createdAt: "2021-06-06T17:46:18.693000+00:00",
        },
        createdAt: "2021-06-06T17:46:18.697000+00:00",
      };
      return res(ctx.json(response));
    },
  ),
];
