function sumarLento( numero ){
  return new Promise( function( resolve, reject ){
    setTimeout( function(){
      resolve( numero +1 );
      // reject( 'SUMAR LENTO FALLÓ' );
    }, 800 )
  });
}

let sumarRapido = (numero) => {
  return new Promise( (resolve, reject) => {
    setTimeout( () => resolve( numero + 1 ), 300 );
  });
}

function retornaTrue(){
  return true;
}

let cosas = [ sumarLento(5), sumarRapido(10), true, 'hola mundo', retornaTrue() ];

Promise.all( cosas )
       .then( respuestas => {
         console.log(respuestas);
       })
       .catch( console.log );
