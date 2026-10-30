/* Lets Tasks open like an app and work offline.
   Always tries the network first so updates arrive straight away; falls back to the saved copy offline.
   GitHub API calls (task sync) are never touched. */
const CACHE = 'tasks-v2';
const SHELL = ['./', 'index.html', 'sortable.min.js', 'manifest.webmanifest', 'icon.svg', 'icon-180.png', 'icon-192.png', 'icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

/* Morning push from the tasks-data repo: set the overdue badge and show a short note.
   iPhone requires every push to show a notification, so one is always shown. */
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch {}
  const n = Number(d.overdue) || 0;
  const nav = self.navigator;
  const badge = n > 0 && nav.setAppBadge ? nav.setAppBadge(n) : nav.clearAppBadge ? nav.clearAppBadge() : null;
  const note = self.registration.showNotification(d.title || 'Tasks', {
    body: d.body || '',
    tag: 'overdue',
    renotify: false,
    icon: 'icon-192.png',
    data: { url: './' }
  });
  e.waitUntil(Promise.all([badge, note].map((p) => Promise.resolve(p).catch(() => {}))));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((list) => {
      for (const c of list) if ('focus' in c) return c.focus();
      return self.clients.openWindow('./');
    })
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req, { ignoreSearch: true }).then((r) => r || caches.match('./')))
  );
});
