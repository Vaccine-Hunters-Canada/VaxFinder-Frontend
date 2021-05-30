import { rest } from "msw";
import { SecurityLoginResponse } from "../../apiClient";

export const securityHandlers = [
  rest.post(
    `${process.env.REACT_APP_API_URL}/api/v1/security/login`,
    (req, res, ctx) => {
      const response: SecurityLoginResponse = {
        result: 1,
        key: "9c3aaa46-6a99-4b51-88b3-f32789d100d6",
      };
      return res(ctx.status(200), ctx.json(response));
    },
  ),
];
