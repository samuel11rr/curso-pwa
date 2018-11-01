// leemos el archivo json
const fs = require('fs');

const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid.json');
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:samuel11rr@gmail.com',
  vapid.publicKey,
  vapid.privateKey
);

let suscripciones = require('./subs-db.json');

module.exports.getKey = () => {
  return urlsafeBase64.decode( vapid.publicKey );
};



module.exports.addSubscription = ( suscripcion ) => {

    suscripciones.push( suscripcion );

    fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify( suscripciones ));

}



module.exports.sendPush = ( post ) => {

    console.log('Enviando push');

    const notificacionesEnviadas = [];

    suscripciones.forEach( (suscripcion, i) => {

        const pushProm = webpush.sendNotification( suscripcion, JSON.stringify( post ) )
            .then( console.log('notificacion enviada') )
            .catch( err => {

                console.log('notificacion fallo');
                if (err.statusCode === 410 ) {
                    //ya no existe
                    suscripciones[i].borrar = true;
                }

            });

            notificacionesEnviadas.puch( pushProm );

    });

    Promise.all( notificacionesEnviadas ).then( () => {

        suscripciones = suscripciones.filter( subs => !subs.borrar );

        fs.writeFileSync(`${ __dirname }/subs-db.json`, JSON.stringify( suscripciones ));
    });

}
