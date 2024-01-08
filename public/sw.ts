import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";
import { clientsClaim } from "workbox-core";

interface ServiceWorkerGlobalScopeWithEvents extends ServiceWorkerGlobalScope { }
interface NotificationData {
  title: string;
  body: string;
}

declare const self: ServiceWorkerGlobalScopeWithEvents;

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);
clientsClaim();

console.log("Custom Service Worker");

// Skip Waiting Listener for reloading the page when a new version is available
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting();
});

// Push Notification Listener
self.addEventListener("push", (event: PushEvent) => {
  console.log("Sansoldino:push", event);
  const data: NotificationData = event.data
    ? event.data.json()
    : { title: "", body: "" };

  const notificationOptions = {
    body: data.body,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, notificationOptions),
  );
});

self.addEventListener("notificationclick", (event: NotificationEvent) => {
  console.log("Sansoldino:click", event);

  // Close the notification.
  event.notification.close();

  // Extract the URL to navigate to from the event, or use a default.
  const targetUrl = event.notification.data?.url || "/";

  // Use self.clients.matchAll() to get all of our service worker's clients
  event.waitUntil(
    self.clients
      .matchAll({ type: "window", includeUncontrolled: true })
      .then((clientList: readonly WindowClient[]) => {
        // If a client matching the URL already exists, focus it.
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) {
            return client.focus();
          }
        }

        // If no matching clients exist, open a new one.
        if (self.clients.openWindow) {
          return self.clients.openWindow(targetUrl);
        }
      }),
  );
});

// Message Listener in the Service Worker
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SHOW_NOTIFICATION") {
    const { title, options } = event.data;
    self.registration.showNotification(title, options);
  }
});
