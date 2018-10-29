

// Entrenamiento PouchDB

// 1- Crear la base de datos
// Nombre:  mensajes
var db = new PouchDB('mensajes');
var remoteCouch = false;

// db.changes({
//   since: 'now',
//   live: true
// }).on('change', showMsg);

// Objeto a grabar en base de datos
let mensaje = {
    _id: new Date().toISOString(),
    user: 'spiderman',
    mensaje: 'Mi tía hizo unos panqueques muy buenos',
    sincronizado: false
};


// 2- Insertar en la base de datos
// db.put(mensaje).then( console.log('guardado') ).catch( console.log() );


// 3- Leer todos los mensajes offline
  // db.allDocs({include_docs: true, descending: true})
  //   .then( doc => {
  //     console.log(doc.rows);
  //   });


// 4- Cambiar el valor 'sincronizado' de todos los objetos
//  en la BD a TRUE
// db.allDocs({include_docs: true, descending: true})
//   .then( doc => {
//     doc.rows.forEach( row => {
//       let doc = row.doc;
//
//       doc.sincronizado = true;
//
//       //con esto se actualiza el registro
//       db.put(doc);
//     });
//   });


// 5- Borrar todos los registros, uno por uno, evaluando
// cuales estan sincronizados
// deberá de comentar todo el código que actualiza
// el campo de la sincronización

db.allDocs({ include_docs: true }).then( docs => {
  docs.rows.forEach( row => {
    let doc = row.doc;

    if (doc.sincronizado) {
      let id = doc._id;
      db.remove( doc );
      console.log('eliminado', id);
    }
  });
});
