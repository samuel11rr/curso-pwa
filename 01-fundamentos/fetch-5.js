// fetch('https://reqres.in/api/users/1')
//   .then( res => {
//     res.clone().json().then( usuario => {
//       console.log(usuario.data);
//     });
//
//     res.clone().json().then( usuario => {
//       console.log(usuario.data);
//     });
//
//     res.json().then( usuario => {
//       console.log(usuario.data);
//     });
//   })
// .catch( error => {
//   console.log('error en la peticion');
//   console.log(error);
// });

  fetch('https://reqres.in/api/users/1000')
    .then( res => {
      if ( res.ok ) {
        return res.json();
      }else{
        throw new Error('No existe el usuario 1000');
      }
    })
  .catch( error => {
    console.log('error en la peticion');
    console.log(error);
  });
