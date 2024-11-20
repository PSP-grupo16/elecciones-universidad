const candidatos = [
  {
    nombre: 'Juan David Ramírez',
    edad: 25,
    descripcion: 'Estudiante de Ingeniería de Sistemas, comprometido con la innovación tecnológica y la transparencia en los procesos estudiantiles.',
    foto: '1.jpg',
    propuestas: [
      'Crear una plataforma digital para seguimiento de proyectos estudiantiles.',
      'Implementar cursos gratuitos de programación y tecnología.',
      'Facilitar acceso a herramientas tecnológicas como software y equipos.',
    ],
  },
  {
    nombre: "Laura González",
    edad: 24,
    descripcion: "Representante actual del consejo estudiantil, enfocada en la defensa de los derechos de los estudiantes y la inclusión social.",
    foto: "3.jpg",
    propuestas: [
      'Garantizar espacios seguros e inclusivos para todos los estudiantes.',
      'Promover talleres de liderazgo y empoderamiento estudiantil.',
      'Representar los intereses de los estudiantes en las decisiones administrativas.',
    ],
  },
  {
    nombre: "Carlos Pérez",
    edad: 23,
    descripcion: "Candidato por la facultad de Ciencias Administrativas, propone mejoras en los recursos académicos y un mayor acceso a becas.",
    foto: "2.jpg",
    propuestas: [
      'Mejorar los procesos de asignación de becas y ayudas económicas.',
      'Gestionar la modernización de bibliotecas y espacios de estudio.',
      'Promover convenios con empresas para prácticas laborales.',
    ],
  },
  {
    nombre: "María Fernanda Gómez",
    edad: 22,
    descripcion: "Líder en actividades culturales, busca promover la integración estudiantil a través de eventos y programas extracurriculares.",
    foto: "4.jpg",
    propuestas: [
      'Crear un programa de actividades culturales y deportivas para estudiantes.',
      'Promover la participación en eventos artísticos y culturales.',
      'Fomentar la integración de estudiantes de diferentes facultades.',
    ],
  },
  {
    nombre: "Andrés Rodríguez",
    edad: 23,
    descripcion: "Miembro activo del equipo deportivo universitario, busca fomentar el deporte y actividades saludables para todos.",
    foto: "7.jpg",
    propuestas: [
      'Promover la creación de equipos deportivos y competencias interuniversitarias.',
      'Fomentar la participación en actividades físicas y saludables.',
      'Gestionar la creación de espacios deportivos y recreativos.',
    ],
  },
  {
    nombre: "Sara López",
    edad: 24,
    descripcion: "Defensora de los derechos estudiantiles, busca garantizar igualdad de oportunidades para todos los estudiantes.",
    foto: "6.jpg",
    propuestas: [
      'Promover la inclusión de estudiantes con discapacidad y de minorías.',
      'Defender los derechos de los estudiantes en situaciones de vulnerabilidad.',
      'Garantizar la igualdad de oportunidades en el acceso a recursos académicos.',
    ],
  }
]
const tarjetasCandidatos = Array.from(document.querySelectorAll('.js-candidato'));
const resumenCandidato = document.querySelector('.js-resumen');
const cerrarResumen = document.querySelector('.js-resumen__cerrar');
const clickTarjeta = (evento) => {
  evento.preventDefault();
  const tarjeta = evento.currentTarget;
  const index = tarjeta.dataset.index;
  const candidato = candidatos[index];
  let retrasarCarga = false;

  if (resumenCandidato.classList.contains('abierto')) {
    resumenCandidato.classList.remove('abierto');
    retrasarCarga = true
  }

  if (retrasarCarga) {
    setTimeout(() => {
      cargarCandidato(candidato);
      resumenCandidato.classList.add('abierto');
    }, 300);
    return;
  }
  cargarCandidato(candidato);
  resumenCandidato.classList.add('abierto');
}
const cerrarResumenClick = (evento) => {
  evento.preventDefault();
  resumenCandidato.classList.remove('abierto');
}
const cargarCandidato = (candidato) => {
  const { nombre, descripcion, edad, foto } = candidato;
  const imagen = new Image();
  imagen.src = `../recursos/imagenes/candidatos/${foto}`;
  imagen.alt = nombre;

  resumenCandidato.querySelector('.js-candidato__nombre').textContent = `${nombre}, ${edad} años`;
  resumenCandidato.querySelector('.js-candidato__descripcion').textContent = descripcion;
  resumenCandidato.querySelector('.js-candidato__imagen').innerHTML = '';
  resumenCandidato.querySelector('.js-candidato__imagen').appendChild(imagen);
  resumenCandidato.querySelector('.js-candidato__propuestas').innerHTML = '';
  candidato.propuestas.forEach((propuesta) => {
    const li = document.createElement('li');
    li.textContent = propuesta;
    resumenCandidato.querySelector('.js-candidato__propuestas').appendChild(li);
  });
}

tarjetasCandidatos.forEach((tarjeta) => {
  tarjeta.addEventListener('click', clickTarjeta);
});

cerrarResumen.addEventListener('click', cerrarResumenClick);
