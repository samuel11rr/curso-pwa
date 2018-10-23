// validacion soporte sw
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

// validacion soporte cache
if( window.caches ){
  caches.open('prueba-1');
  caches.open('prueba-2');

  // caches.has('prueba-2').then( console.log );

  // caches.delete('prueba-1').then( console.log );

  caches.open('cache-v1.1').then( cache => {

    // cache.add('/index.html');

    // grabamos cache
    cache.addAll([
      '/index.html',
      '/css/style.css',
      '/img/main.jpg'
    ])
    // al terminar el guardado en cache hacemos algo
    .then( () => {
      // cache.delete('/css/style.css');

      cache.put('index.html', new Response('Hola Mundo'));
    });

    // leemos algo que esté en cache
    // cache.match('/index.html')
    //     .then( resp => {
    //       resp.text().then( console.log );
    //     });

  });

//retorna todos los caches
caches.keys().then( console.log )

};
