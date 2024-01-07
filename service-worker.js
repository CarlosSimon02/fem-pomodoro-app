importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js"
);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg|ico)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "images",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
    /\.(?:mp3)$/,
    new workbox.strategies.CacheFirst({
      cacheName: "audios",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 60,
        }),
      ],
    })
  );

workbox.routing.registerRoute(
  /\.(?:html|css|js)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "static-resources",
  })
);

workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://fonts.googleapis.com",
  new workbox.strategies.CacheFirst({
    cacheName: "google-fonts-stylesheets",
  })
);

workbox.routing.registerRoute(
  ({ url }) => url.origin === "https://fonts.gstatic.com",
  new workbox.strategies.CacheFirst({
    cacheName: "google-fonts-webfonts",
  })
);