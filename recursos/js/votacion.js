(() => { // Inicializamos una función anónima autoejecutable
  /**
   * Definimos la constante candidatos y le asignamos el valor de la variable window.candidatos o un array vacío
   */
  const candidatos = window.candidatos || [];
  /**
   * Definimos la constante tarjetasCandidatos y le asignamos un array con los elementos que tienen la clase .js-candidato
   * @type {Array<HTMLElement>}
   */
  const tarjetasCandidatos = Array.from(document.querySelectorAll('.js-candidato'));
  /**
   * Definimos la constante resumenCandidato y le asignamos el valor del elemento con la clase .js-resumen
   * @type {HTMLElement}
   */
  const resumenCandidato = document.querySelector('.js-resumen');
  /**
   * Definimos la constante cerrarResumen y le asignamos el valor del elemento con la clase .js-resumen__cerrar
   * @type {HTMLElement}
   */
  const botonCerrarResumen = document.querySelector('.js-resumen__cerrar');
  /**
   * Definimos la función clickTarjeta que recibe el evento de click en una tarjeta de candidato
   * @param {Event} evento Evento de click en una tarjeta de candidato
   * @listens tarjetasCandidatos:click
   * @returns {void}
   */
  const clickTarjeta = (evento) => {
    // Prevenimos el comportamiento por defecto del evento
    evento.preventDefault();
    // Definimos la constante tarjeta y le asignamos el valor del elemento que disparó el evento
    const tarjeta = evento.currentTarget;
    // Definimos la constante index y le asignamos el valor del atributo data-index de la tarjeta
    const index = tarjeta.dataset.index;
    // Definimos la constante candidato y le asignamos el valor del candidato en la posición index del array de candidatos
    const candidato = candidatos[index];
    // Definimos la constante retrasarCarga y le asignamos el valor inicial false
    let retrasarCarga = false;

    // Verificamos si el resumenCandidato tiene la clase abierto
    if (resumenCandidato.classList.contains('abierto')) {
      // Ejecutamos la función cerrarResumen
      cerrarResumen();
      // Asignamos el valor true a retrasarCarga
      retrasarCarga = true
    }

    // Si retrasarCarga es true, esperamos 300ms para cargar el candidato
    if (retrasarCarga) {
      setTimeout(() => {
        // Llamamos a la función cargarCandidato con el candidato
        cargarCandidato(candidato);
        // Agregamos la clase abierto al resumenCandidato
        resumenCandidato.classList.add('abierto');
      }, 300);
      // Retornamos para salir de la función
      return;
    }
    // Llamamos a la función cargarCandidato con el candidato
    cargarCandidato(candidato);
    // Agregamos la clase abierto al resumenCandidato
    resumenCandidato.classList.add('abierto');
  }
  /**
   * Definimos la función cerrarResumen que remueve la clase abierto del resumenCandidato
   * @returns {void}
   */
  const cerrarResumen = () => {
    resumenCandidato.classList.remove('abierto');
  }
  /**
   * Definimos la función cerrarResumenClick que recibe el evento de click en el botón de cerrar resumen
   * @param {Event} evento Evento de click en el botón de cerrar resumen
   * @listens cerrarResumen:click
   * @returns {void}
   */
  const cerrarResumenClick = (evento) => {
    // Prevenimos el comportamiento por defecto del evento
    evento.preventDefault();
    // Ejecutamos la función cerrarResumen
    cerrarResumen();
  }
  /**
   * Definimos la función cargarCandidato que recibe un candidato y carga su información en el resumenCandidato
   * @param {Object} candidato Objeto con información del candidato
   * @returns {void}
   */
  const cargarCandidato = (candidato) => {
    // Extraemos las propiedades nombre, descripcion, edad y foto del candidato
    const { nombre, descripcion, edad, foto } = candidato;
    // Creamos un elemento imagen
    const imagen = new Image();
    // Asignamos la ruta de la imagen al atributo src
    imagen.src = `../recursos/imagenes/candidatos/${foto}`;
    // Asignamos el nombre del candidato al atributo alt
    imagen.alt = nombre;

    // Asignamos el nombre y la edad del candidato al texto del elemento con la clase .js-candidato__nombre
    resumenCandidato.querySelector('.js-candidato__nombre').textContent = `${nombre}, ${edad} años`;
    // Asignamos la descripción del candidato al texto del elemento con la clase .js-candidato__descripcion
    resumenCandidato.querySelector('.js-candidato__descripcion').textContent = descripcion;
    // Vaciamos el contenido del elemento con la clase .js-candidato__imagen
    resumenCandidato.querySelector('.js-candidato__imagen').innerHTML = '';
    // Agregamos la imagen creada al elemento con la clase .js-candidato__imagen
    resumenCandidato.querySelector('.js-candidato__imagen').appendChild(imagen);
    // Vaciamos el contenido del elemento con la clase .js-candidato__propuestas
    resumenCandidato.querySelector('.js-candidato__propuestas').innerHTML = '';
    // Recorremos las propuestas del candidato y las agregamos como elementos de lista al elemento con la clase .js-candidato__propuestas
    candidato.propuestas.forEach((propuesta) => {
      // Creamos un elemento de lista
      const li = document.createElement('li');
      // Asignamos el texto de la propuesta al elemento de lista
      li.textContent = propuesta;
      // Agregamos el elemento de lista al elemento con la clase .js-candidato__propuestas
      resumenCandidato.querySelector('.js-candidato__propuestas').appendChild(li);
    });
  }

  // Recorremos las tarjetas de candidatos y añadimos un evento de click a cada una
  tarjetasCandidatos.forEach((tarjeta) => {
    // Añadimos un evento de click a la tarjeta que ejecuta la función clickTarjeta
    tarjeta.addEventListener('click', clickTarjeta);
  });

  // Añadimos un evento de click al botón de cerrar resumen que ejecuta la función cerrarResumenClick
  botonCerrarResumen.addEventListener('click', cerrarResumenClick);
})();
