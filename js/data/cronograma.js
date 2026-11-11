/* ==========================================================================
   MOBILA · Disciplinas y cronograma
   --------------------------------------------------------------------------
   CÓMO ASIGNAR PROFESORES
   1) Por disciplina (lo más rápido): cada disciplina tiene un `profesor`
      por defecto. Cambiarlo acá actualiza TODAS las clases de esa disciplina.
   2) Por clase puntual: agregá  profesor: "id"  en la línea de esa clase
      y pisa al profesor por defecto. Ejemplo:
        { hora: "19:00", clase: "Boxeo", disciplina: "boxeo", profesor: "fabian" },

   Los ids de profesores están en profesores.js (fabian, nahuel, valentino, dante).
   ========================================================================== */

window.MOBILA = window.MOBILA || {};

MOBILA.disciplinas = {
  boxeo:     { nombre: "Boxeo",                   color: "#d4d4d8", profesor: "nahuel" },
  kick:      { nombre: "Kick Boxing / Muay Thai", color: "#ff7a45", profesor: "valentino" },
  mma:       { nombre: "MMA",                     color: "#ef4444", profesor: "fabian" },
  jiujitsu:  { nombre: "Jiu Jitsu",               color: "#5b9dff", profesor: "dante" },
  taekwondo: { nombre: "Taekwondo",               color: "#4ade80", profesor: "valentino" },  // provisorio
  derribos:  { nombre: "Derribos",                color: "#b78cff", profesor: "dante" },      // provisorio
  openmat:   { nombre: "Open Mat",                color: "#2dd4bf", profesor: "dante" },      // provisorio
};

/* --------------------------------------------------------------------------
   CRONOGRAMA
   Cada clase:  { hora, clase, disciplina, [nota], [tag], [profesor] }
     - hora:       "HH:MM" en formato 24 hs.
     - clase:      nombre que se muestra.
     - disciplina: una de las claves de MOBILA.disciplinas (define color,
                   filtro y profesor por defecto).
     - nota:       aclaración opcional (nivel, modalidad).
     - tag:        etiqueta opcional: "Kids" o "Juvenil".
     - profesor:   opcional, pisa al profesor por defecto de la disciplina.
   Días válidos: lunes, martes, miercoles, jueves, viernes, sabado, domingo.
   -------------------------------------------------------------------------- */

MOBILA.cronograma = {
  /* ======================= SEDE SAN FERNANDO / TIGRE ======================= */
  "san-fernando": {
    lunes: [
      { hora: "07:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "08:00", clase: "Jiu Jitsu No-Gi", disciplina: "jiujitsu" },
      { hora: "09:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "09:00", clase: "Taekwondo", disciplina: "taekwondo", nota: "Adultos" },
      { hora: "17:00", clase: "Boxeo", disciplina: "boxeo", nota: "Adultos" },
      { hora: "17:30", clase: "Taekwondo", disciplina: "taekwondo", tag: "Kids" },
      { hora: "18:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "18:00", clase: "MMA", disciplina: "mma" },
      { hora: "19:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "19:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "20:00", clase: "Boxeo Inicial", disciplina: "boxeo" },
      { hora: "20:00", clase: "Jiu Jitsu", disciplina: "jiujitsu", nota: "Todos los niveles" },
      { hora: "21:00", clase: "Boxeo", disciplina: "boxeo" },
    ],
    martes: [
      { hora: "08:00", clase: "Boxeo Inicial", disciplina: "boxeo" },
      { hora: "10:00", clase: "Boxeo Inicial", disciplina: "boxeo" },
      { hora: "10:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "13:30", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "17:00", clase: "Derribos", disciplina: "derribos", nota: "Wrestling" },
      { hora: "17:30", clase: "Boxeo / Kick Boxing", disciplina: "kick", tag: "Kids" },
      { hora: "18:00", clase: "Boxeo", disciplina: "boxeo", tag: "Juvenil" },
      { hora: "18:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "19:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "19:00", clase: "Jiu Jitsu Inicial", disciplina: "jiujitsu" },
      { hora: "20:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "20:00", clase: "Kick Boxing / Muay Thai Inicial", disciplina: "kick" },
      { hora: "21:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
    ],
    miercoles: [
      { hora: "07:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "08:00", clase: "Jiu Jitsu No-Gi", disciplina: "jiujitsu" },
      { hora: "09:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "09:00", clase: "Taekwondo", disciplina: "taekwondo", nota: "Adultos" },
      { hora: "17:00", clase: "Boxeo", disciplina: "boxeo", nota: "Adultos" },
      { hora: "17:30", clase: "Taekwondo", disciplina: "taekwondo", tag: "Kids" },
      { hora: "18:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "18:00", clase: "MMA", disciplina: "mma" },
      { hora: "19:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "19:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "20:00", clase: "Boxeo Inicial", disciplina: "boxeo" },
      { hora: "20:00", clase: "MMA", disciplina: "mma" },
      { hora: "20:00", clase: "Jiu Jitsu", disciplina: "jiujitsu", nota: "Todos los niveles" },
      { hora: "21:00", clase: "Boxeo", disciplina: "boxeo" },
    ],
    jueves: [
      { hora: "08:00", clase: "Boxeo Inicial", disciplina: "boxeo" },
      { hora: "10:00", clase: "Boxeo Inicial", disciplina: "boxeo" },
      { hora: "10:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "13:30", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "17:00", clase: "Derribos", disciplina: "derribos", nota: "Judo" },
      { hora: "17:30", clase: "Boxeo / Kick Boxing", disciplina: "kick", tag: "Kids" },
      { hora: "18:00", clase: "Boxeo", disciplina: "boxeo", tag: "Juvenil" },
      { hora: "18:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "19:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "19:00", clase: "Jiu Jitsu Inicial", disciplina: "jiujitsu" },
      { hora: "20:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "20:00", clase: "Kick Boxing / Muay Thai Inicial", disciplina: "kick" },
      { hora: "21:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
    ],
    viernes: [
      { hora: "08:00", clase: "Jiu Jitsu No-Gi", disciplina: "jiujitsu", nota: "Drills + Sparring" },
      { hora: "09:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "17:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "18:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "18:00", clase: "MMA", disciplina: "mma" },
      { hora: "19:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "19:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "20:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "20:00", clase: "MMA", disciplina: "mma" },
    ],
    sabado: [
      { hora: "09:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "09:00", clase: "Sparring MMA", disciplina: "mma", nota: "Iniciantes" },
      { hora: "10:00", clase: "Open Mat Jiu Jitsu", disciplina: "jiujitsu" },
      { hora: "10:00", clase: "Sparring Boxeo", disciplina: "boxeo" },
      { hora: "11:00", clase: "Sparring Kick / Thai", disciplina: "kick" },
      { hora: "12:00", clase: "Sparring MMA", disciplina: "mma", nota: "Competición" },
    ],
  },

  /* ====================== SEDE SAN ISIDRO / MARTÍNEZ ======================= */
  "san-isidro": {
    lunes: [
      { hora: "17:00", clase: "MMA", disciplina: "mma" },
      { hora: "18:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "19:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "20:00", clase: "Jiu Jitsu", disciplina: "jiujitsu", nota: "Todos los niveles" },
    ],
    martes: [
      { hora: "07:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "08:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "17:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "18:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "19:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "20:00", clase: "MMA", disciplina: "mma" },
    ],
    miercoles: [
      { hora: "10:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "11:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "17:00", clase: "MMA", disciplina: "mma" },
      { hora: "18:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "19:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "20:00", clase: "Jiu Jitsu", disciplina: "jiujitsu", nota: "Todos los niveles" },
    ],
    jueves: [
      { hora: "07:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "08:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "17:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "18:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "19:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "20:00", clase: "MMA", disciplina: "mma" },
    ],
    viernes: [
      { hora: "10:00", clase: "Boxeo", disciplina: "boxeo" },
      { hora: "11:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "18:00", clase: "Boxeo", disciplina: "boxeo", nota: "Adultos" },
      { hora: "18:00", clase: "Kick Boxing", disciplina: "kick", tag: "Kids" },
      { hora: "19:00", clase: "Kick Boxing / Muay Thai", disciplina: "kick" },
      { hora: "20:00", clase: "Open Mat", disciplina: "openmat", nota: "Boxeo sparring · Jiu Jitsu drills" },
    ],
  },
};
