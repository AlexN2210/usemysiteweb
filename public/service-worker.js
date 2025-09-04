// Service Worker ultra-simple pour Usemy PWA
console.log('🎉 Service Worker Usemy v3 chargé !');

// Installation
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installation...');
  self.skipWaiting();
});

// Activation
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activation...');
  event.waitUntil(self.clients.claim());
});

// Fetch - VERSION ULTRA-SIMPLE
self.addEventListener('fetch', (event) => {
  // Ignorer complètement les requêtes d'extensions
  if (event.request.url.includes('chrome-extension:') || 
      event.request.url.includes('moz-extension:') || 
      event.request.url.includes('safari-extension:')) {
    return;
  }
  
  // Pour toutes les autres requêtes, laisser passer
  // Pas de cache, pas de gestion complexe
});
