(() => { // Inicializamos una función anónima autoejecutable
  /**
   * Definimos la constante candidatos y le asignamos el valor de la variable window.candidatos o un array vacío
   */
  const candidatos = window.candidatos || [];
  // Definimos un array de números para simular los votos de cada candidato
  const dataset = [180, 220, 256, 172, 185, 200];
  // Calculamos el total de votos
  const total = dataset.reduce((acc, value) => acc + value, 0);
  // Obtenemos el elemento SVG del DOM
  const svg = document.getElementById('bar-js');

  // obtenemos el viewport del documento
  const { width: viewportWidth } = document.documentElement.getBoundingClientRect();
  // si el ancho del viewport es menor a 600px
  const isMobile = viewportWidth < 768;

  const renderBars = (isMobile) => {
    // Definimos las dimensiones del SVG y el espacio entre las barras
    const svgWidth = 600, svgHeight = 400, barPadding = 8;
    // Calculamos el ancho de las barras
    const barWidth = (svgWidth / dataset.length);
    // Limpiamos el contenido del SVG
    svg.innerHTML = '';
    if (isMobile) {
      // Establecemos el ancho del SVG
      svg.setAttribute("width", viewportWidth - 94);
      // Establecemos el alto del SVG
      svg.setAttribute("height", 600);
      // Definimos las dimensiones del SVG y el espacio entre las barras
      const barWidth = (svgHeight / dataset.length);
      // Iteramos sobre el dataset para crear las barras
      for (let i = 0; i < dataset.length; i++) {
        // Calculamos el porcentaje de votos
        const porcentaje = (dataset[i] / total) * 100;
        // Obtenemos el candidato correspondiente o un objeto vacío
        const candidato = candidatos[i] || {};
        // Creamos un rectángulo para representar la barra
        const rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        // Creamos una imagen para representar la foto del candidato
        const image = document.createElementNS("http://www.w3.org/2000/svg", 'image');
        image.setAttribute("x", svgHeight - dataset[i] - barWidth - barPadding)
        image.setAttribute("y", barWidth * i)
        image.setAttribute("width", barWidth - barPadding)
        image.setAttribute("height", barWidth - barPadding)
        image.setAttribute("href", `../recursos/imagenes/candidatos/${candidato.foto}` || 'https://via.placeholder.com/50')
        // Agregamos la imagen al SVG
        svg.appendChild(image)
        rect.setAttribute("x", svgHeight - dataset[i])
        rect.setAttribute("width", dataset[i])
        rect.setAttribute("height", barWidth - barPadding)
        const translate = [0, barWidth * i]
        rect.setAttribute("transform", "translate(" + translate + ")")
        svg.appendChild(rect)
        // Agregamos un texto con el porcentaje de votos
        const text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.setAttribute("x", svgHeight - dataset[i] + 40)
        text.setAttribute("y", barWidth * i + barWidth / 2)
        text.setAttribute("fill", "black")
        text.setAttribute("text-anchor", "middle")
        text.textContent = `${porcentaje.toFixed(2)}%`
        svg.appendChild(text)
      }
    } else {
      // Establecemos el ancho del SVG
      svg.setAttribute("width", svgWidth);
      // Establecemos el alto del SVG
      svg.setAttribute("height", svgHeight);
      // Calculamos el ancho de las barras
      const barWidth = (svgWidth / dataset.length);
      // Iteramos sobre el dataset para crear las barras
      for (let i = 0; i < dataset.length; i++) {
        // Calculamos el porcentaje de votos
        const porcentaje = (dataset[i] / total) * 100;
        // Obtenemos el candidato correspondiente o un objeto vacío
        const candidato = candidatos[i] || {};
        // Creamos un rectángulo para representar la barra
        const rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        // Creamos una imagen para representar la foto del candidato
        const image = document.createElementNS("http://www.w3.org/2000/svg", 'image');
        image.setAttribute("x", barWidth * i)
        image.setAttribute("y", svgHeight - dataset[i] - barWidth - barPadding)
        image.setAttribute("width", barWidth - barPadding)
        image.setAttribute("height", barWidth - barPadding)
        image.setAttribute("href", `../recursos/imagenes/candidatos/${candidato.foto}` || 'https://via.placeholder.com/50')
        // Agregamos la imagen al SVG
        svg.appendChild(image)
        rect.setAttribute("y", svgHeight - dataset[i])
        rect.setAttribute("height", dataset[i])
        rect.setAttribute("width", barWidth - barPadding)
        const translate = [barWidth * i, 0]
        rect.setAttribute("transform", "translate(" + translate + ")")
        svg.appendChild(rect)
        // Agregamos un texto con el porcentaje de votos
        const text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
        text.setAttribute("x", barWidth * i + barWidth / 2)
        text.setAttribute("y", svgHeight - dataset[i] + 20)
        text.setAttribute("fill", "black")
        text.setAttribute("text-anchor", "middle")
        text.textContent = `${porcentaje.toFixed(2)}%`
        svg.appendChild(text)
      }
    }
  }
  // Llamamos a la función renderBars
  renderBars(isMobile)
  // Escuchamos el evento resize
  window.addEventListener('resize', () => {
    // obtenemos el viewport del documento
    const { width: viewportWidth } = document.documentElement.getBoundingClientRect();
    // si el ancho del viewport es menor a 600px
    const isMobile = viewportWidth < 768;
    // Llamamos a la función renderBars
    renderBars(isMobile)
  })

})();