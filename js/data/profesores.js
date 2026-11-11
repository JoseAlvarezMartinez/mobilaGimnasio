/* ==========================================================================
   MOBILA · Profesores
   --------------------------------------------------------------------------
   - id:           identificador interno. Es el que se usa en cronograma.js
                   para asignar el profesor a una disciplina o a una clase.
   - foto:         ruta de la imagen (ej: "assets/profesores/fabian.jpg").
                   Si queda vacío ("") se muestra un placeholder con iniciales.
                   Recomendado: vertical 4:5, mínimo 800 × 1000 px.
   - destacado:    el dato grande de la tarjeta (récord, graduación, etc.).
   - destacadoInfo: la leyenda chica que acompaña a ese dato.
   ========================================================================== */

window.MOBILA = window.MOBILA || {};

MOBILA.profesores = [
  {
    id: "fabian",
    nombre: "Fabián Vallejos",
    rol: "Head Coach de MMA",
    etiqueta: "MMA",
    destacado: "18-3",
    destacadoInfo: "Récord profesional · 10 KOs",
    bio: "Especialista en Striking.",
    foto: "",
  },
  {
    id: "nahuel",
    nombre: "Nahuel Biondo",
    rol: "Entrenador de Boxeo",
    etiqueta: "Boxeo",
    destacado: "22-1",
    destacadoInfo: "Récord profesional",
    bio: "Ex campeón regional, enfocado en técnica y potencia.",
    foto: "",
  },
  {
    id: "valentino",
    nombre: "Valentino Ceruti",
    rol: "Instructor de Muay Thai",
    etiqueta: "Muay Thai",
    destacado: "34-5",
    destacadoInfo: "Récord profesional",
    bio: "Múltiple campeón nacional, experto en el “Arte de las 8 extremidades”.",
    foto: "",
  },
  {
    id: "dante",
    nombre: "Dante Romero",
    rol: "Profesor de Jiu Jitsu Brasileño (BJJ)",
    etiqueta: "BJJ",
    destacado: "2º Dan",
    destacadoInfo: "Cinturón negro",
    bio: "Especialista en lucha de suelo y sumisiones.",
    foto: "",
  },
];
