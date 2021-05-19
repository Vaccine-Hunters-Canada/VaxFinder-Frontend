import { rest } from "msw";
import { VaccineLocationExpandedResponse } from "../../apiClient";
import { vaccineLocationResponses } from "../mockData";

export const vaccineLocationHandlers = [
  rest.get(
    `${process.env.REACT_APP_API_URL}/api/v1/vaccine-locations`,
    (req, res, ctx) => {
      const response: VaccineLocationExpandedResponse[] = vaccineLocationResponses;
      return res(ctx.status(200), ctx.json(response));
    },
  ),
];
