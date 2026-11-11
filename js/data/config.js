/* ==========================================================================
   MOBILA · Configuración general del sitio
   --------------------------------------------------------------------------
   Todo lo que está marcado con  ← REEMPLAZAR  es un dato de ejemplo.
   ========================================================================== */

window.MOBILA = window.MOBILA || {};

MOBILA.config = {
  /* Contacto ------------------------------------------------------------- */
  // Número de WhatsApp al que llega el formulario. Formato internacional,
  // solo dígitos (54 + 9 + código de área + número).
  whatsapp: "5491100000000",                    // ← REEMPLAZAR
  telefonoVisible: "+54 9 11 0000-0000",        // ← REEMPLAZAR
  email: "hola@tudominio.com",                  // ← REEMPLAZAR
  instagram: {
    usuario: "@centro.mobila",
    url: "https://www.instagram.com/centro.mobila/",
  },

  /* Cinta animada debajo del hero ---------------------------------------- */
  cinta: ["MMA", "Jiu Jitsu", "Kick Boxing", "Muay Thai", "Boxeo", "Taekwondo", "Derribos"],
};

/* ==========================================================================
   SEDES
   --------------------------------------------------------------------------
   - id:        se usa para vincular la sede con su cronograma (cronograma.js).
   - direccion: texto que se muestra en la tarjeta.
   - mapa:      lo que buscarías en Google Maps (dirección exacta o nombre
                del lugar). Con eso se arma el mapa y el botón "Cómo llegar".
   ========================================================================== */

MOBILA.sedes = [
  {
    id: "san-fernando",
    nombre: "San Fernando / Tigre",
    direccion: "Dirección a confirmar · San Fernando, Buenos Aires",   // ← REEMPLAZAR
    mapa: "San Fernando, Buenos Aires, Argentina",                     // ← REEMPLAZAR
  },
  {
    id: "san-isidro",
    nombre: "San Isidro / Martínez",
    direccion: "Dirección a confirmar · Martínez, Buenos Aires",       // ← REEMPLAZAR
    mapa: "Martínez, San Isidro, Buenos Aires, Argentina",             // ← REEMPLAZAR
  },
];
