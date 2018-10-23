

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js')
              .then( reg => {

                // setTimeout( () => {
                //   reg.sync.register('posteo-gatitos');
                //   console.log('se enviaron fotos al server');
                // }, 3000);

                Notification.requestPermission().then( resultado => {
                  console.log(resultado);
                  reg.showNotification('Hola Mundo!');
                });
              });
}


// if ( window.SyncManager ) {
//
// }


// fetch('https://reqres.in/api/users')
//   .then( resp => resp.text() )
//   .then( console.log );
