function sumaruno( num, callback ){
  setTimeout( function() {
    // return num +1;
    callback(num+1);
  }, 800 );
}

sumaruno(5, function(nuevo){
  // console.log(nuevo);
  sumaruno( nuevo, function( masNuevo ){
    console.log(masNuevo);
  } )
});
