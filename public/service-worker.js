function getEndpoint() {
  return self.registration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.endpoint;
    }

    throw new Error('User not subscribed');
  });
}

// Register event listener for the 'push' event.
self.addEventListener('push', function(event) {
  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    getEndpoint()
    .then(function(endpoint) {
      self.registration.showNotification('Find Your Immunization', {
        body: event.data.text(),
      });
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow("https://appointments.vaccinehunters.ca/search/")
  );
});