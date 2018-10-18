// PETICION POST
// https://reqres.in/api/users

let usuario = {
  nombre: 'Sam',
  edad: 26
};

fetch( 'https://reqres.in/api/users', {
  method: 'POST',
  body: JSON.stringify( usuario ),
  headers: {
    'Content-Type': 'application/json'
  }
})
.then( resp => resp.json() )
.then( console.log )
.catch( error => {
  console.error('Error en la peticion');
  console.log(error);
});
