// TODO: Implement auth API call to verify access token
export const authAccessToken = (token: string) =>
  token === "password" ? "bearerToken" : null;
