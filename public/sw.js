// Service Worker pour Usemy PWA
const CACHE_NAME = 'usemy-pwa-v1';
const STATIC_CACHE = 'usemy-static-v1';
const DYNAMIC_CACHE = 'usemy-dynamic-v1';

// Fichiers statiques à mettre en cache
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/install-guide.html'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installation en cours...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Cache statique ouvert');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker installé avec succès');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Erreur lors de l\'installation:', error);
      })
  );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activation en cours...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Suppression de l\'ancien cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activé');
        return self.clients.claim();
      })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  
  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorer les requêtes chrome-extension et autres protocoles non supportés
  if (request.url.startsWith('chrome-extension:') || 
      request.url.startsWith('moz-extension:') || 
      request.url.startsWith('safari-extension:') ||
      request.url.startsWith('edge-extension:')) {
    return;
  }

  // Ignorer les requêtes vers des domaines externes (sauf notre domaine)
  try {
    const url = new URL(request.url);
    if (url.origin !== location.origin && !url.hostname.includes('vercel.app')) {
      return;
    }
  } catch (e) {
    return;
  }

  // Stratégie pour les fichiers statiques
  if (isStaticFile(request.url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Stratégie pour les images
  if (isImageRequest(request.url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Stratégie pour les pages HTML (PWA)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Stratégie par défaut : Network First
  event.respondWith(networkFirst(request));
});

// Stratégie Cache First (pour les fichiers statiques)
async function cacheFirst(request) {
  try {
    // Double vérification pour les extensions
    if (request.url.startsWith('chrome-extension:') || 
        request.url.startsWith('moz-extension:') || 
        request.url.startsWith('safari-extension:')) {
      return fetch(request);
    }

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('❌ Cache First Error:', error);
    return new Response('Ressource non disponible hors ligne', { status: 503 });
  }
}

// Stratégie Network First (pour l'API)
async function networkFirst(request) {
  try {
    // Double vérification pour les extensions
    if (request.url.startsWith('chrome-extension:') || 
        request.url.startsWith('moz-extension:') || 
        request.url.startsWith('safari-extension:')) {
      return fetch(request);
    }

    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      await cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('🌐 Network First: Tentative de récupération depuis le cache');
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Retourner une page offline pour les requêtes HTML
    if (request.headers.get('accept')?.includes('text/html')) {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }

    return new Response('Données non disponibles hors ligne', { 
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

// Fonctions utilitaires
function isStaticFile(url) {
  return url.includes('.js') || 
         url.includes('.css') || 
         url.includes('.png') || 
         url.includes('.jpg') || 
         url.includes('.jpeg') || 
         url.includes('.gif') || 
         url.includes('.svg') || 
         url.includes('.woff') || 
         url.includes('.woff2') || 
         url.includes('.ttf') || 
         url.includes('.eot') ||
         url.includes('.ico');
}

function isImageRequest(url) {
  return url.includes('.png') || 
         url.includes('.jpg') || 
         url.includes('.jpeg') || 
         url.includes('.gif') || 
         url.includes('.svg') || 
         url.includes('.webp');
}

// Gestion des messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('🎉 Service Worker Usemy chargé avec succès !');