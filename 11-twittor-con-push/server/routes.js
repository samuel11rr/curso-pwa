// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();


const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});


// Post mensaje
router.post('/', function (req, res) {

  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});



// ALMACENAR SUSCRIPCION
router.post('/subscribe', (req, res) => {
  res.json('subscribe');
});

// OBTENER KEY PUBLICO
router.get('/key', (req, res) => {
  res.json('key publico');
});

// ENVIAR NOTIFICACION PUSH A QUIEN YO QUIERA
// es algo que se controla de lado del server
router.post('/push', (req, res) => {
  res.json('notificacion push');
});


module.exports = router;
