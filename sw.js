// sw.js - Service Worker para PWA - VERSÃO CORRIGIDA
const CACHE_NAME = 'portfolio-v4.0';
const CACHE_FILES = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/app.js',
  './js/router.js',
  './js/components.js',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Cache aberto:', CACHE_NAME);
        return cache.addAll(CACHE_FILES);
      })
      .then(() => {
        console.log('✅ Todos os recursos em cache');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.log('❌ Erro ao adicionar ao cache:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('🔄 Service Worker ativado');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Remove caches antigos com nomes diferentes
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('✅ Limpeza de cache concluída');
      return self.clients.claim();
    })
  );
});

// Interceptação de requisições - VERSÃO SIMPLIFICADA
self.addEventListener('fetch', (event) => {
  // Ignorar requisições que não são GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Se encontrou no cache, retorna
        if (cachedResponse) {
          console.log('📁 Retornando do cache:', event.request.url);
          return cachedResponse;
        }

        // Busca da rede
        return fetch(event.request)
          .then((networkResponse) => {
            // Verifica se é uma resposta válida
            if (!networkResponse || networkResponse.status !== 200) {
              return networkResponse;
            }

            // Clona a resposta para armazenar no cache
            const responseToCache = networkResponse.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
                console.log('💾 Armazenado no cache:', event.request.url);
              });

            return networkResponse;
          })
          .catch((error) => {
            console.log('🌐 Offline - Erro na requisição:', error);
            
            // Fallback para página offline
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('./index.html');
            }
            
            // Fallback para imagens
            if (event.request.headers.get('accept').includes('image/')) {
              // Retorna uma imagem placeholder se necessário
              return new Response(
                '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f0f0f0"/><text x="50%" y="50%" font-family="Arial" font-size="16" fill="#666" text-anchor="middle" dominant-baseline="middle">Imagem offline</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }
            
            // Fallback genérico
            return new Response(
              '<h3>Você está offline</h3><p>Conecte-se à internet para acessar este conteúdo.</p>',
              { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
            );
          });
      })
  );
});

// Mensagens push (opcional - pode comentar se não for usar)
self.addEventListener('push', (event) => {
  console.log('📨 Push message received');
  
  const data = event.data ? event.data.json() : {
    title: 'Márcio Maker',
    body: 'Nova atualização disponível!'
  };

  const options = {
    body: data.body || 'Nova notificação do portfólio',
    icon: './icons/icon-192x192.png',
    badge: './icons/icon-192x192.png',
    tag: 'portfolio-notification',
    renotify: true,
    actions: [
      {
        action: 'open',
        title: 'Abrir'
      },
      {
        action: 'close',
        title: 'Fechar'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Márcio Maker', options)
  );
});

self.addEventListener('notificationclick', (event) => {
  console.log('🔔 Notificação clicada:', event.action);
  event.notification.close();

  if (event.action === 'open' || event.action === '') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('./');
        }
      })
    );
  }
});

// Sincronização em background (opcional - pode comentar se não for usar)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-messages') {
    console.log('🔄 Sincronização em background:', event.tag);
    event.waitUntil(syncMessages());
  }
});

async function syncMessages() {
  console.log('📤 Sincronizando mensagens...');
  // Implementar sincronização de mensagens aqui
  // Por exemplo: enviar mensagens offline salvas no IndexedDB
  return Promise.resolve();
}

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});