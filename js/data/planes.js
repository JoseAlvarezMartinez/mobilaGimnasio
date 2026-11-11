/* ==========================================================================
   MOBILA · Planes mensuales y datos de pago
   --------------------------------------------------------------------------
   Precios en pesos, sin puntos ni símbolo (el sitio les da formato solo).
   Para sumar un plan, copiá un bloque. Para quitarlo, borralo.
   ========================================================================== */

window.MOBILA = window.MOBILA || {};

MOBILA.planes = [
  {
    nombre: "Pase Básico 8",
    incluye: ["Una actividad", "Hasta 8 clases mensuales"],
    efectivo: 45000,
    transferencia: 50000,
  },
  {
    nombre: "Pase Básico 12",
    incluye: ["Una actividad", "Hasta 12 clases mensuales"],
    efectivo: 55000,
    transferencia: 60000,
  },
  {
    nombre: "Pase Mix",
    incluye: ["Un turno por día de cualquier actividad, de lunes a sábados"],
    efectivo: 75000,
    transferencia: 80000,
  },
  {
    nombre: "Pase Premium",
    incluye: ["Artes marciales + planificación física", "Turnos libres por día"],
    efectivo: 85000,
    transferencia: 90000,
  },
  {
    nombre: "Multi Sede",
    incluye: ["Pase Mix en ambas sedes"],
    efectivo: 105000,
    transferencia: 115000,
  },
];

/* Datos para pagar por transferencia. Si dejás `alias` vacío (""), la tarjeta
   de pago no se muestra en el sitio. */
MOBILA.pagos = {
  alias: "mobila.central",
  titular: "Dante Adrian Romero",
};
