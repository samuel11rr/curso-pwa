
// indexedDB: Reforzamiento

let request = window.indexedDB.open('mi-database', 1);

// se actualiza cuando se crea o se sube de version de la DB
request.onupgradeneeded = event => {
  console.log('actualizacion de la DB');

  let db = event.target.result;

  db.createObjectStore('heroes', {
    keyPath :'id'
  });
};


// Manejo de errores
request.onerror = event => {
  console.log('BD error: ', event.target.error);
};

// insertar datos
request.onsuccess = event => {

  let db = event.target.result;

  let heroesData = [
    { id: '1111', heroe: 'Spiderman', mensaje: 'Aqui su amigo Spiderman' },
    { id: '2222', heroe: 'Ironman', mensaje: 'Aqui en mi nuevo Mark 50' }
  ];

  let heroesTransaction = db.transaction('heroes', 'readwrite');

  heroesTransaction.onerror = event => {
    console.log('Error al guardar', event.target.error);
  };

  // informa sobre el exito de la transaccion
  heroesTransaction.oncomplete = event => {
    console.log('transaccion hecha', event);
  };

  let heroesStore = heroesTransaction.objectStore('heroes');

  for ( let heroe of heroesData ) {
    heroesStore.add( heroe );
  }

  heroesStore.onsuccess = event => {
    console.log('item agregado a la db');
  };

};
