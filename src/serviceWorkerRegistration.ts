export const serviceWorkerRegistrar = {
  register: () => {
    if (!("serviceWorker" in navigator)) {
      return Promise.reject(new Error("Service worker not supported"));
    }

    const swUrl = "/service-worker.js";
    return navigator.serviceWorker.register(swUrl);
  },
};
