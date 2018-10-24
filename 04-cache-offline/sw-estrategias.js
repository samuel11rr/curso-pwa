// const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME = 'static-v1';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';


self.addEventListener( 'install', e => {

  const cacheProm = caches.open( CACHE_STATIC_NAME ).then( cache => {

    // APP SELL
    return cache.addAll([
      '/',
      '/index.html',
      '/css/style.css',
      '/img/main.jpg',
      '/js/app.js'
    ]);

  });

  // CACHE INMUTABLE (NUNCA CAMBIA)
  const cacheInmutable = caches.open( CACHE_INMUTABLE_NAME )
        .then( cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'));

  // e.waitUntil( cacheProm );
  // esperamos a que terminen las promesas
  e.waitUntil( Promise.all([cacheProm, cacheInmutable]) );

  self.addEventListener('fetch', e => {

    // ESTRATEGIA 1: CACHE ONLY
    // e.respondWith( caches.match( e.request ) );



    // ESTRATEGIA 2: CACHE WITH NETWORK FALLBACK
    const respuesta = caches.match( e.request ).then( res => {
      if ( res ) return res;

      //no existe el archivo, vamos a la web
      console.error('NO EXISTE', e.request.url);

      // vamos a internet a conseguir el request
      return fetch( e.request ).then( newResp => {
            // cuando encontramos el recurso lo guardamos en cache
            caches.open( CACHE_DYNAMIC_NAME ).then( cache => {
              console.info('TRAEMOS DESDE WEB', e.request.url);
              cache.put( e.request, newResp );
            });

            // clonamos la respuesta para evitar error debido a que usamos newResp dos veces
            return newResp.clone();
      });
    });

    e.respondWith( respuesta );

  });

});
