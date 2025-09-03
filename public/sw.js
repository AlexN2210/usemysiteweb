const CACHE_NAME = 'usemy-v1.0.1';
const STATIC_CACHE = 'usemy-static-v1.0.1';
const DYNAMIC_CACHE = 'usemy-dynamic-v1.0.1';

// Fichiers à mettre en cache statiquement
const STATIC_FILES = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html'
];

// URLs de l'API à mettre en cache dynamiquement
const API_CACHE_PATTERNS = [
  /\/api\/users/,
  /\/api\/posts/,
  /\/api\/auth/
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installation en cours...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Service Worker: Mise en cache des fichiers statiques');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker: Installation terminée');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Erreur lors de l\'installation', error);
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
              console.log('🗑️ Service Worker: Suppression de l\'ancien cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Activation terminée');
        return self.clients.claim();
      })
  );
});

// Interception des requêtes
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorer les requêtes chrome-extension et autres protocoles non supportés
  if (request.url.startsWith('chrome-extension:') || 
      request.url.startsWith('moz-extension:') || 
      request.url.startsWith('safari-extension:')) {
    return;
  }

  // Stratégie pour les fichiers statiques
  if (isStaticFile(request.url)) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Stratégie pour l'API
  if (isApiRequest(request.url)) {
    event.respondWith(networkFirst(request));
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
    // Ignorer les requêtes chrome-extension et autres protocoles non supportés
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
      cache.put(request, networkResponse.clone());
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
    // Ignorer les requêtes chrome-extension et autres protocoles non supportés
    if (request.url.startsWith('chrome-extension:') || 
        request.url.startsWith('moz-extension:') || 
        request.url.startsWith('safari-extension:')) {
      return fetch(request);
    }

    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('🌐 Network First: Tentative de récupération depuis le cache');
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Retourner une page offline pour les requêtes HTML
    if (request.headers.get('accept').includes('text/html')) {
      return caches.match('/offline.html');
    }

    return new Response('Données non disponibles hors ligne', { 
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Vérifier si c'est un fichier statique
function isStaticFile(url) {
  return url.includes('/static/') || 
         url.includes('.js') || 
         url.includes('.css') || 
         url.includes('.png') || 
         url.includes('.jpg') || 
         url.includes('.svg') ||
         url.includes('manifest.json');
}

// Vérifier si c'est une requête API
function isApiRequest(url) {
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

// Vérifier si c'est une requête d'image
function isImageRequest(url) {
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
}

// Gestion des notifications push
self.addEventListener('push', (event) => {
  console.log('📱 Service Worker: Notification push reçue');
  
  const options = {
    body: event.data ? event.data.text() : 'Nouvelle notification Usemy',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Voir',
        icon: '/icons/action-view.png'
      },
      {
        action: 'close',
        title: 'Fermer',
        icon: '/icons/action-close.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Usemy', options)
  );
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Service Worker: Clic sur notification');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Fermer la notification
    return;
  } else {
    // Clic sur le corps de la notification
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Synchronisation en arrière-plan');
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Synchroniser les données en attente
    console.log('🔄 Synchronisation des données...');
    // Ici vous pouvez ajouter la logique de synchronisation
  } catch (error) {
    console.error('❌ Erreur de synchronisation:', error);
  }
}
