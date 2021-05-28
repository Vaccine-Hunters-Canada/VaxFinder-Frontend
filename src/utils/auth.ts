// TODO: Implement auth API call to verify access token
export const getAuthAccessToken = (token: string) =>
  token === "password" ? "bearerToken" : null;
