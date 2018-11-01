// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();
const push = require('./push');

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

    const suscripcion = req.body;

    push.addSubscription( suscripcion );

    res.json('subscribe');
});

// OBTENER KEY PUBLICO
router.get('/key', (req, res) => {

  const key = push.getKey();

  res.send(key);
});

// ENVIAR NOTIFICACION PUSH A QUIEN YO QUIERA
// es algo que se controla de lado del server
router.post('/push', (req, res) => {
  res.json('notificacion push');
});


module.exports = router;
