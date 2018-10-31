// UTILIDADES PARA GUARDAR CON POUCHDB

const db = new PouchDB('mensajes');


function guardarMensaje( mensaje ){

    mensaje._id = new Date().toISOString();

    // guardamos el mensaje en la db local
    return db.put( mensaje ).then( () => {

        // cuando hay un mensaje listo para ser posteado
        // lo hará cuando se conecte a internet
        self.registration.sync.register('nuevo-post');

        // respuesta al front
        const newResp = { ok: true, offline: true };

        return new Response( JSON.stringify( newResp ) );
    });

};


// POSTEAR MENSAJES AL API
function postearMensajes(){

    const posteos = [];

    return db.allDocs( { include_docs: true } ).then( docs => {

        docs.rows.forEach( row => {

            const doc = row.doc;

            const fetchProm = fetch('api', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify( doc )
            }).then( res => {

                return db.remove( doc );

            });

            posteos.push( fetchProm );

        }); // fin de forEach

        return Promise.all( posteos );

    });

};
