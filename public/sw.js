// Service Worker simple pour Usemy PWA
const CACHE_NAME = 'usemy-pwa-v2';

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installation...');
  self.skipWaiting();
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activation...');
  event.waitUntil(self.clients.claim());
});

// Interception des requêtes - VERSION SIMPLIFIÉE
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Ignorer complètement les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorer complètement les requêtes d'extensions
  if (request.url.includes('chrome-extension:') || 
      request.url.includes('moz-extension:') || 
      request.url.includes('safari-extension:') ||
      request.url.includes('edge-extension:')) {
    return;
  }

  // Ignorer les requêtes vers des domaines externes
  try {
    const url = new URL(request.url);
    if (url.origin !== location.origin) {
      return;
    }
  } catch (e) {
    return;
  }

  // Pour toutes les autres requêtes, utiliser network first
  event.respondWith(
    fetch(request)
      .then(response => {
        // Mettre en cache seulement si c'est une requête réussie
        if (response.ok) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(request, responseClone);
            })
            .catch(err => {
              console.log('Cache error (ignored):', err);
            });
        }
        return response;
      })
      .catch(() => {
        // En cas d'erreur réseau, essayer le cache
        return caches.match(request)
          .then(response => {
            if (response) {
              return response;
            }
            // Si pas de cache, retourner une page d'erreur
            return new Response('Hors ligne', { status: 503 });
          });
      })
  );
});

console.log('🎉 Service Worker Usemy v2 chargé !');