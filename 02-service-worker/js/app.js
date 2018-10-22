// confirmacion de uso de service worker
if (navigator.serviceWorker) {
  // console.log('SW habilitado');
  navigator.serviceWorker.register('/sw.js');
}
