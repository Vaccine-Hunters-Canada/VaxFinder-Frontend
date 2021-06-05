import { rest } from "msw";
import { OrganizationResponse } from "../../apiClient";

export const organizationHandlers = [
  rest.get(
    `${process.env.REACT_APP_API_URL}/api/v1/organizations`,
    (req, res, ctx) => {
      const response: OrganizationResponse[] = [
        {
          fullName: "Verto",
          shortName: "Verto",
          description: "Toronto Hospitals",
          url: "https://vaccineto.ca/api/slots",
          id: 1,
          createdAt: "2021-05-02T03:20:59.077000+00:00",
        },
        {
          fullName: "Rexall",
          shortName: "Rexall",
          description: undefined,
          url: undefined,
          id: 2,
          createdAt: "2021-05-03T03:34:49.913000+00:00",
        },
        {
          fullName: "Shoppers Drug Mart",
          shortName: "Shoppers Drug Mart",
          description: undefined,
          url: undefined,
          id: 3,
          createdAt: "2021-05-03T03:38:12.253000+00:00",
        },
        {
          fullName: "Pharmachoice",
          shortName: "Pharmachoice",
          description: undefined,
          url: undefined,
          id: 4,
          createdAt: "2021-05-03T03:38:12.590000+00:00",
        },
        {
          fullName: "Unknown",
          shortName: "Unknown",
          description: undefined,
          url: undefined,
          id: 5,
          createdAt: "2021-05-03T03:38:12.913000+00:00",
        },
        {
          fullName: "Costco",
          shortName: "Costco",
          description: undefined,
          url: undefined,
          id: 6,
          createdAt: "2021-05-03T03:38:13.277000+00:00",
        },
        {
          fullName: "Food Basics",
          shortName: "Food Basics",
          description: undefined,
          url: undefined,
          id: 7,
          createdAt: "2021-05-03T03:38:13.617000+00:00",
        },
        {
          fullName: "Loblaw",
          shortName: "Loblaw",
          description: undefined,
          url: undefined,
          id: 8,
          createdAt: "2021-05-03T03:38:14.363000+00:00",
        },
        {
          fullName: "Sobeys",
          shortName: "Sobeys",
          description: undefined,
          url: undefined,
          id: 9,
          createdAt: "2021-05-03T03:38:16.997000+00:00",
        },
      ];
      return res(ctx.json(response));
    },
  ),
];
