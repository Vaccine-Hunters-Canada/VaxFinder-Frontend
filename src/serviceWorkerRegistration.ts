/**
 * Registers service worker
 *
 * Provides a convenient spot to shim in a mock in tests as service workers
 * are not available outside a browser env
 */
export const serviceWorkerRegistrar = {
  register: () => {
    if (!("serviceWorker" in navigator)) {
      return Promise.reject(new Error("Service worker not supported"));
    }

    const swUrl = "/service-worker.js";
    return navigator.serviceWorker.register(swUrl);
  },
};
