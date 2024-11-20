const formulario = document.querySelector('.formulario');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  window.location.assign("votacion");
});