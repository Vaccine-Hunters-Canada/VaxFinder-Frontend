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
    .then(function() {
      try {
        const parsed = JSON.parse(event.data.text());
        self.registration.showNotification(parsed.title, {
          body: parsed.body,
          data: {
            url: parsed.url,
          }
        });
      }
      catch(err) {
        console.error(err);
      }
    })
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});