import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

// Precache static assets
precacheAndRoute(self.__WB_MANIFEST);

// Cache API responses
registerRoute(
  ({ url }) => url.pathname.startsWith('/api'),
  new NetworkFirst({
    cacheName: 'api-cache',
  })
);

// Cache static assets
registerRoute(
  ({ request }) => request.destination === 'image' ||
                   request.destination === 'style' ||
                   request.destination === 'script',
  new CacheFirst({
    cacheName: 'static-assets',
  })
);

// Cache translations
registerRoute(
  ({ url }) => url.pathname.includes('/locales/'),
  new StaleWhileRevalidate({
    cacheName: 'translations',
  })
);