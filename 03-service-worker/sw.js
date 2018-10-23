
// Ciclo de vida del SW

self.addEventListener( 'install', event => {

  // descargar assets
  // crear cache
  console.log('SW Instalando...');

  const instalacion = new Promise( (resolve, reject) => {

    setTimeout( () => {

      console.log('SW instalaciones terminadas!');
      self.skipWaiting();
      resolve();

    }, 1);

  });

  // esperamos hasta que la promesa instalacion se resuelva
  event.waitUntil( instalacion );

});


// cuando el SW toma control de la aplicaciónote
self.addEventListener( 'activate', event => {

  // borrar cache viejo
  console.log('SW2 activo y listo para controlar la app');

});


// FETCH: manejo de peticiones HTTP
self.addEventListener('fetch', event => {
  // Aplicar estrategias del cache
  // console.log( 'SW: ', event.request.url );
  //
  // if ( event.request.url.includes('https://reqres.in/') ) {
  //   const resp = new Response(`{ok: false, mensaje: 'jajaja'}`);
  //   event.respondWith(resp);
  // }
});


// SYNC: Recuperamos conexion a internet
self.addEventListener('sync', event => {

  console.log('tenemos conexion!!');
  console.log(event);
  console.log(event.tag);

});



//PUSH: Manejar las push notifications
self.addEventListener('push', event => {

  console.log('notificacion recibida');

});
