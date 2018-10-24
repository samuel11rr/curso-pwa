// const CACHE_NAME = 'cache-1';
const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DYNAMIC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';
const CACHE_DYNAMIC_LIMIT = 50;

function limpiarCache( cacheName, numeroItems ){

  caches.open( cacheName ).then( cache => {

    return cache.keys().then( keys => {

      if ( keys.length > numeroItems) {
        cache.delete( keys[0] ).then( limpiarCache( cacheName, numeroItems ) );
      }

    });

  });

}

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
    // e.respondWith( respuesta );


    // // ESTRATEGIA 2: CACHE WITH NETWORK FALLBACK
    // const respuesta = caches.match( e.request ).then( res => {
    //   if ( res ) return res;
    //
    //   //no existe el archivo, vamos a la web
    //   // console.error('NO EXISTE', e.request.url);
    //
    //   // vamos a internet a conseguir el request
    //   return fetch( e.request ).then( newResp => {
    //         // cuando encontramos el recurso lo guardamos en cache
    //         caches.open( CACHE_DYNAMIC_NAME ).then( cache => {
    //             // console.info('TRAEMOS DESDE WEB', e.request.url);
    //             cache.put( e.request, newResp );
    //             limpiarCache( CACHE_DYNAMIC_NAME, 50 );
    //         });
    //
    //         // clonamos la respuesta para evitar error debido a que usamos newResp dos veces
    //         return newResp.clone();
    //   });
    // });
    // e.respondWith( respuesta );


    // // ESTRATEGIA 3: NETWORK WITH CACHE FALLBACK
    // const respuesta = fetch( e.request ).then( res => {
    //
    //     // si no se encuentra en web (404) buscamos en cache si está guardado
    //     if( !res ) return caches.match( e.request );
    //
    //     caches.open( CACHE_DYNAMIC_NAME )
    //           .then( cache => {
    //               cache.put(e.request, res);
    //               limpiarCache( CACHE_DYNAMIC_NAME, CACHE_DYNAMIC_LIMIT );
    //           });
    //
    //     return res.clone();
    //
    // }).catch( err => {
    //     return caches.match( e.request );
    // });
    //
    // e.respondWith( respuesta );


    // ESTRATEGIA 4: CACHE WITH NETWORK UPDATE
    /*  buscará en la web los archivos mas recientes,
        pero mostrará al usuario lo que antes ya estaba en el caché,
        al mismo tiempo, en el background va a sustituir los archivos viejos por los nuevos
        para que cuando el usuario vuelva a entrar se le muestren los nuevos    */

    // excluimos bootstrap
    if ( e.request.url.includes('bootstrap') ) return e.respondWith( caches.match( e.request ) );

    const respuesta = caches.open( CACHE_STATIC_NAME ).then( cache => {

        fetch( e.request ).then( newRes => cache.put( e.request, newRes ));

        return cache.match( e.request );

    });

    e.respondWith( respuesta );

  });

});
