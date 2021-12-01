/**
 * Ensures browsers support our web push notification feature by checking for the
 * Web Push and Notification apis
 *
 * @returns True if the browser supports necessary apis, otherwise false
 */
export const checkIsWebPushSupported = () => {
  return "Notification" in window && "PushManager" in window;
};
