(() => { // Inicializamos una función anónima autoejecutable
  /**
   * Definimos la constante formulario y le asignamos el valor del elemento con la clase .formulario
   * @type {HTMLElement}
   */
  const formulario = document.querySelector('.formulario');

  /**
   * Añadimos un evento al formulario para que cuando se envíe, se ejecute una función
   * @param {Event} e Evento de envío del formulario
   * @listens formulario:submit
   * @returns {void}
   */
  formulario.addEventListener('submit', (e) => {
    // Prevenimos el comportamiento por defecto del formulario
    e.preventDefault();
    // Creamos un objeto FormData con los datos del formulario
    const formData = new FormData(formulario);
    // Convertimos el objeto FormData a un objeto de JavaScript
    const data = Object.fromEntries(formData);
    // Extraemos el email del objeto data
    const email = data.email;
    // Si el email existe y contiene un @, lo guardamos en el localStorage
    if (email && email.includes('@')) {
      localStorage.setItem('email', email);
    }
    // Redireccionamos a la página de votación
    window.location.assign("votacion");
  });

  /**
   * Añadimos un evento al cargar la ventana para que se ejecute una función
   * @listens window:load
   * @returns {void}
   */
  window.onload = () => {
    // Extraemos el email del localStorage
    const email = localStorage.getItem('email');
    // Si el email existe, lo añadimos al campo de email del formulario
    if (email) {
      // Seleccionamos el campo de email y le asignamos el valor del email
      document.querySelector('input[name="email"]').value = email;
    }
  }
})();