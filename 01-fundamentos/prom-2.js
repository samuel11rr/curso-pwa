function sumarUno( num ){
  var promesa = new Promise( function( resolve, reject ){

    console.log(num);

    if ( num >= 7 ) {
      reject('el numero es muy alto');
    }

    setTimeout( function() {

      resolve( num+1 );

    }, 800 );

  });

  return promesa;
}


// sumarUno(5).then( nuevoNumero => {
//   console.log(nuevoNumero);
//   return sumarUno( nuevoNumero );
// })
// .then( nuevoNumero => {
//   console.log(nuevoNumero);
//   return sumarUno( nuevoNumero );
// })
// .then( nuevoNumero => {
//   console.log(nuevoNumero);
// });

sumarUno( 5 )
  .then( sumarUno )
  .then( sumarUno )
  .then( sumarUno )
  .then( nuevoNumero => {
    console.log( nuevoNumero );
  })
  .catch( error => {
    console.log('ERROR EN PROMESA');
    console.log(error);
  });
