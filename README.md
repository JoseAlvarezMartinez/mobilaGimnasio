# Mobila · Landing page

Sitio estático (HTML + CSS + JavaScript, sin dependencias ni paso de build).
Para verlo: abrí `index.html` en el navegador. Para publicarlo: subí la carpeta
completa a cualquier hosting estático (Vercel, Netlify, GitHub Pages, etc.).

## Estructura

```
index.html              Estructura de la página y textos fijos (hero, títulos)
css/styles.css          Estilos. Colores y tipografías en :root (arriba de todo)
js/main.js              Lógica (grilla, filtros, formulario). No tiene datos
js/data/config.js       Contacto, redes y sedes (direcciones y mapas)
js/data/profesores.js   Staff: nombres, récords, fotos
js/data/cronograma.js   Disciplinas y horarios de cada sede
js/data/planes.js       Planes mensuales, precios y alias de pago
assets/                 Logo e imágenes
```

## Tareas frecuentes

**Cambiar datos de contacto o direcciones** → `js/data/config.js`.
Todo lo marcado con `← REEMPLAZAR` es de ejemplo.

**Poner las fotos de los profesores** → guardá cada foto en
`assets/profesores/` (vertical 4:5, mínimo 800 × 1000 px) y completá el campo
`foto` en `js/data/profesores.js`, por ejemplo `foto: "assets/profesores/fabian.jpg"`.
Mientras esté vacío se muestra un placeholder con las iniciales.

**Actualizar récords o bios** → `js/data/profesores.js` (`destacado`,
`destacadoInfo`, `bio`).

**Asignar profesores a las clases** → `js/data/cronograma.js`:

- Por disciplina: cambiá `profesor` en `MOBILA.disciplinas` y se actualizan
  todas las clases de esa disciplina.
- Por clase puntual: agregá `profesor: "id"` en la línea de esa clase.

**Agregar, mover o quitar una clase** → sumá o borrá una línea en el día y la
sede que corresponda dentro de `MOBILA.cronograma`. La grilla, los filtros y
los contadores del hero se recalculan solos.

**Actualizar precios o planes** → `js/data/planes.js`. Los precios van sin
puntos (`45000`); el sitio les da formato. En el mismo archivo están el alias
y el titular para transferencias: si dejás `alias: ""`, esa tarjeta se oculta.

**Agregar un profesor** → copiá un bloque en `js/data/profesores.js` con un
`id` nuevo. La tarjeta aparece automáticamente.

**Foto o video de fondo en el hero** → en `index.html`, dentro de
`<div class="hero__bg">`, hay dos líneas comentadas listas para usar.
