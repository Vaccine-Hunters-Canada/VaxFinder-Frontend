import { rest } from "msw";
import { GetApiV1WebPushPublicKeyResponse } from "../../apiClient";

export const webPushHandlers = [
  rest.get(
    `${process.env.REACT_APP_API_URL}/api/v1/webPush/publicKey/`,
    async (req, res, ctx) => {
      const response: GetApiV1WebPushPublicKeyResponse = {
        key:
          "BINtQFAiY8vFuf9wo5751h0a_UCiVt4sibTv2yXD03oOsb8BZFKCKiMYGrWGrjtF-lLlMeH2NgU6n-Ap1hAhC08",
      };
      return res(ctx.json(response));
    },
  ),

  rest.post(
    `${process.env.REACT_APP_API_URL}/api/v1/webPush/subscription`,
    async (req, res, ctx) => {
      return res(ctx.status(201));
    },
  ),
];
