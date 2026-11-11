/* ==========================================================================
   MOBILA · Lógica del sitio
   --------------------------------------------------------------------------
   Este archivo NO contiene datos: todo el contenido editable vive en
   js/data/ (config.js, profesores.js, cronograma.js).
   ========================================================================== */

(function () {
  "use strict";

  const M = window.MOBILA;
  if (!M) return;
  const { config, sedes, profesores, disciplinas, cronograma } = M;

  /* ------------------------------------------------------------------ utils */
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const DIAS = [
    { id: "lunes", nombre: "Lunes", corto: "Lun" },
    { id: "martes", nombre: "Martes", corto: "Mar" },
    { id: "miercoles", nombre: "Miércoles", corto: "Mié" },
    { id: "jueves", nombre: "Jueves", corto: "Jue" },
    { id: "viernes", nombre: "Viernes", corto: "Vie" },
    { id: "sabado", nombre: "Sábado", corto: "Sáb" },
    { id: "domingo", nombre: "Domingo", corto: "Dom" },
  ];
  const HOY = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"][new Date().getDay()];

  const ICON = {
    user: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    pin: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.800 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    chat: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.400L3 20.5l1.700-5A8.5 8.5 0 1 1 21 11.5z"/></svg>',
    camera: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.2 6.800h.01"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="M4 7.5l8 6 8-6"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  };

  const profePorId = Object.fromEntries(profesores.map((p) => [p.id, p]));
  const sedePorId = Object.fromEntries(sedes.map((s) => [s.id, s]));
  const diaPorId = Object.fromEntries(DIAS.map((d) => [d.id, d]));
  const porHora = (a, b) => a.hora.localeCompare(b.hora);

  /* Lista plana de clases de una sede, con disciplina y profesor resueltos. */
  const cache = {};
  function clasesDe(sedeId) {
    if (cache[sedeId]) return cache[sedeId];
    const porDia = cronograma[sedeId] || {};
    const lista = [];
    DIAS.forEach((d) => {
      (porDia[d.id] || []).slice().sort(porHora).forEach((c) => {
        const disc = disciplinas[c.disciplina] || { nombre: c.disciplina, color: "#a1a1aa" };
        lista.push({
          ...c,
          dia: d.id,
          disc,
          profe: profePorId[c.profesor || disc.profesor] || null,
          idx: lista.length,
        });
      });
    });
    return (cache[sedeId] = lista);
  }

  const turno = (hora) => {
    const h = parseInt(hora, 10);
    return h < 12 ? "Mañana" : h < 16 ? "Mediodía" : "Tarde y noche";
  };

  /* -------------------------------------------------------------------- nav */
  function initNav() {
    const nav = $("#nav");
    const toggle = $(".nav__toggle", nav);
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    };
    toggle.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    $$(".nav__links a", nav).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => e.key === "Escape" && setOpen(false));
    window.matchMedia("(min-width: 900px)").addEventListener("change", () => setOpen(false));

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // Resalta en el menú la sección visible
    const links = $$(".nav__links a", nav);
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const target = $(l.getAttribute("href"));
      if (target) spy.observe(target);
    });
  }

  /* --------------------------------------------------------- hero y cinta */
  function renderHero() {
    const total = sedes.reduce((n, s) => n + clasesDe(s.id).length, 0);
    const nDisc = Object.keys(disciplinas).filter((k) => k !== "openmat").length;
    const stats = [
      [sedes.length, "Sedes en Zona Norte"],
      [nDisc, "Disciplinas"],
      [total, "Clases por semana"],
    ];
    $("#stats").innerHTML = stats.map(([n, t]) => `<div><dt>${esc(t)}</dt><dd>${esc(n)}</dd></div>`).join("");

    const items = (config.cinta || []).map((t) => `<span>${esc(t)}</span>`).join("");
    $("#cinta").innerHTML = items + items + items + items; // repetido para el loop infinito
  }

  /* ------------------------------------------------------------- cronograma */
  const state = {
    sede: sedes[0].id,
    filtro: "todas",
    dia: HOY,
    vista: "dia", // "dia" | "semana" (la semana solo se ofrece en escritorio)
  };

  const pasaFiltro = (c) => state.filtro === "todas" || c.disciplina === state.filtro;

  /* Una clase = una fila: nombre (+ etiqueta y nota) a la izquierda, profesor a la derecha. */
  function tarjetaClase(c) {
    const profe = c.profe ? c.profe.nombre : "Profesor a confirmar";
    const tag = c.tag
      ? `<span class="clase__tag${c.tag.toLowerCase() === "juvenil" ? " clase__tag--juvenil" : ""}">${esc(c.tag)}</span>`
      : "";
    const aria = `${diaPorId[c.dia].nombre} ${c.hora}, ${c.clase}${c.tag ? " " + c.tag : ""}, con ${profe}. Reservar clase de prueba`;
    return `
      <button type="button" class="clase" style="--c:${esc(c.disc.color)}" data-clase="${c.idx}" aria-label="${esc(aria)}">
        <span class="clase__hora">${esc(c.hora)}</span>
        <span class="clase__main"><strong class="clase__nombre">${esc(c.clase)}</strong>${tag}${c.nota ? `<span class="clase__nota">${esc(c.nota)}</span>` : ""}</span>
        <span class="clase__profe">${ICON.user}${esc(profe)}</span>
      </button>`;
  }

  function renderSedeTabs() {
    $("#sede-tabs").innerHTML = sedes
      .map(
        (s, i) => `
        <button type="button" class="sede-tab" role="tab" data-sede="${esc(s.id)}" aria-selected="${s.id === state.sede}" tabindex="${s.id === state.sede ? 0 : -1}">
          <small>Sede ${String(i + 1).padStart(2, "0")}</small>
          <strong>${esc(s.nombre)}</strong>
        </button>`
      )
      .join("");
  }

  function renderChips(clases) {
    const presentes = Object.keys(disciplinas).filter((k) => clases.some((c) => c.disciplina === k));
    if (state.filtro !== "todas" && !presentes.includes(state.filtro)) state.filtro = "todas";
    const chip = (id, nombre, color) =>
      `<button type="button" class="chip" data-filtro="${esc(id)}" aria-pressed="${state.filtro === id}"${color ? ` style="--c:${esc(color)}"` : ""}>${color ? "<i></i>" : ""}${esc(nombre)}</button>`;
    $("#chips").innerHTML =
      chip("todas", "Todas") + presentes.map((k) => chip(k, disciplinas[k].nombre, disciplinas[k].color)).join("");
  }

  function renderDayTabs(clases, dias) {
    const el = $("#day-tabs");
    el.style.setProperty("--n", dias.length);
    el.innerHTML = dias
      .map((d) => {
        const n = clases.filter((c) => c.dia === d.id && pasaFiltro(c)).length;
        const on = d.id === state.dia;
        return `
        <button type="button" class="day-tab${n ? "" : " is-empty"}" role="tab" data-dia="${d.id}" aria-selected="${on}" tabindex="${on ? 0 : -1}" aria-label="${d.nombre}, ${n} clases">
          <strong><span class="d-corto">${d.corto}</span><span class="d-full">${d.nombre}</span></strong><small>${n}</small>
        </button>`;
      })
      .join("");
  }

  /* Vista por día: franjas horarias en una columna (móvil) o dos (escritorio). */
  function renderDayView(clases) {
    const lista = clases.filter((c) => c.dia === state.dia && pasaFiltro(c));
    if (!lista.length) {
      $("#day-view").innerHTML = `<p class="empty">No hay clases de ${esc(disciplinas[state.filtro]?.nombre || "esa disciplina")} el ${diaPorId[state.dia].nombre.toLowerCase()}. Probá con otro día.</p>`;
      return;
    }
    const franjas = [...new Set(lista.map((c) => c.hora))].sort().map((h) => ({ hora: h, clases: lista.filter((c) => c.hora === h) }));

    // Reparte las franjas en dos columnas con una cantidad pareja de clases.
    let columnas = [franjas];
    if (lista.length >= 6) {
      let acumulado = 0;
      let corte = franjas.length;
      for (let i = 0; i < franjas.length; i++) {
        acumulado += franjas[i].clases.length;
        if (acumulado >= lista.length / 2) { corte = i + 1; break; }
      }
      columnas = [franjas.slice(0, corte), franjas.slice(corte)].filter((col) => col.length);
    }

    let turnoPrevio = "";
    const html = columnas
      .map((col, i) => {
        let t = "";
        let out = '<ol class="board__col">';
        col.forEach((f) => {
          if (turno(f.hora) !== t) {
            t = turno(f.hora);
            out += `<li class="turno${i > 0 && t === turnoPrevio ? " turno--cont" : ""}">${t}</li>`;
          }
          out += `<li class="slot"><time>${f.hora}</time><div class="slot__rows">${f.clases.map(tarjetaClase).join("")}</div></li>`;
        });
        turnoPrevio = t;
        return out + "</ol>";
      })
      .join("");
    $("#day-view").innerHTML = `<div class="board${columnas.length > 1 ? " board--2" : ""}">${html}</div>`;
  }

  /* Vista semana: una columna por día con sus clases en orden, sin huecos. */
  function renderWeekView(clases, dias) {
    const cols = dias
      .map((d) => {
        const lista = clases.filter((c) => c.dia === d.id && pasaFiltro(c));
        let previa = null;
        const items = lista
          .map((c) => {
            const corte = previa !== null && turno(c.hora) !== turno(previa);
            previa = c.hora;
            return `<li${corte ? ' class="is-break"' : ""}>${tarjetaClase(c)}</li>`;
          })
          .join("");
        return `
        <div class="week__col${d.id === HOY ? " is-today" : ""}">
          <div class="week__head">${d.nombre}<small>${lista.length}</small></div>
          ${lista.length ? `<ol class="week__list">${items}</ol>` : '<p class="week__empty">Sin clases</p>'}
        </div>`;
      })
      .join("");
    $("#week-view").innerHTML = `<div class="week" style="--cols:${dias.length}">${cols}</div>`;
  }

  function renderSchedule() {
    const clases = clasesDe(state.sede);
    const dias = DIAS.filter((d) => clases.some((c) => c.dia === d.id));
    if (!dias.some((d) => d.id === state.dia)) state.dia = dias[0]?.id;

    const root = $("#schedule");
    root.dataset.vista = state.vista;
    $$(".vista button", root).forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.vista === state.vista)));
    $$("#sede-tabs .sede-tab").forEach((b) => {
      const on = b.dataset.sede === state.sede;
      b.setAttribute("aria-selected", String(on));
      b.tabIndex = on ? 0 : -1;
    });
    renderChips(clases);
    renderDayTabs(clases, dias);
    renderDayView(clases);
    renderWeekView(clases, dias);
  }

  function setSede(id) {
    if (!sedePorId[id]) return;
    state.sede = id;
    renderSchedule();
  }

  function initSchedule() {
    renderSedeTabs();
    renderSchedule();

    const root = $("#schedule");
    root.addEventListener("click", (e) => {
      const sede = e.target.closest("[data-sede]");
      const chip = e.target.closest("[data-filtro]");
      const dia = e.target.closest("[data-dia]");
      const vista = e.target.closest("button[data-vista]");
      const clase = e.target.closest("[data-clase]");
      if (sede) return setSede(sede.dataset.sede);
      if (chip) { state.filtro = chip.dataset.filtro; return renderSchedule(); }
      if (vista) { state.vista = vista.dataset.vista; return renderSchedule(); }
      if (dia) { state.dia = dia.dataset.dia; renderSchedule(); return $(`[data-dia="${state.dia}"]`, root)?.focus(); }
      if (clase) {
        const c = clasesDe(state.sede)[Number(clase.dataset.clase)];
        if (!c) return;
        irAlFormulario({
          sede: state.sede,
          disciplina: c.disciplina,
          mensaje: `Quiero probar ${c.clase}${c.tag ? " " + c.tag : ""}: ${diaPorId[c.dia].nombre.toLowerCase()} ${c.hora} hs.`,
          aviso: "Clase elegida. Completá tus datos y enviá.",
        });
      }
    });

    // Flechas ← → para moverse entre pestañas (sede y día)
    root.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      const tab = e.target.closest('[role="tab"]');
      if (!tab) return;
      const tabs = $$('[role="tab"]', tab.parentElement);
      const next = tabs[(tabs.indexOf(tab) + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
      const attr = next.dataset.sede ? "sede" : "dia";
      next.click();
      $(`[data-${attr}="${next.dataset[attr]}"]`, root)?.focus();
    });
  }

  /* ------------------------------------------------------------- profesores */
  function renderCoaches() {
    const iniciales = (n) => n.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
    $("#coaches").innerHTML = profesores
      .map(
        (p, i) => `
        <div class="reveal" style="--i:${i}">
          <article class="coach">
            <div class="coach__photo">
              ${p.foto
            ? `<img src="${esc(p.foto)}" alt="${esc(p.nombre)}" loading="lazy">`
            : `<div class="coach__ph" role="img" aria-label="Foto de ${esc(p.nombre)} próximamente"><span>${esc(iniciales(p.nombre))}</span><small>Foto próximamente</small></div>`
          }
              ${p.etiqueta ? `<span class="coach__badge">${esc(p.etiqueta)}</span>` : ""}
            </div>
            <div class="coach__body">
              <p class="coach__rol">${esc(p.rol)}</p>
              <h3 class="coach__nombre">${esc(p.nombre)}</h3>
              <div class="coach__record"><strong>${esc(p.destacado)}</strong><span>${esc(p.destacadoInfo)}</span></div>
              <p class="coach__bio">${esc(p.bio)}</p>
            </div>
          </article>
        </div>`
      )
      .join("");
  }

  /* ----------------------------------------------------------------- planes */
  function renderPlans() {
    const planes = M.planes || [];
    const pagos = M.pagos || {};
    const precio = (n) => "$" + new Intl.NumberFormat("es-AR").format(n);
    const check = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

    $("#plans").innerHTML = planes
      .map(
        (p, i) => `
        <article class="plan">
          <h3 class="plan__nombre">${esc(p.nombre)}</h3>
          <ul class="plan__incluye">${p.incluye.map((t) => `<li>${check}<span>${esc(t)}</span></li>`).join("")}</ul>
          <dl class="plan__precios">
            <div class="is-main"><dt>Efectivo</dt><dd>${precio(p.efectivo)}</dd></div>
            <div><dt>Transferencia</dt><dd>${precio(p.transferencia)}</dd></div>
          </dl>
          <button type="button" class="btn btn--ghost btn--sm" data-plan="${i}">Lo quiero ${ICON.arrow}</button>
        </article>`
      )
      .join("");

    $("#plans").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-plan]");
      const plan = btn && planes[Number(btn.dataset.plan)];
      if (plan) irAlFormulario({ mensaje: `Me interesa el plan ${plan.nombre}.`, aviso: "Plan elegido. Completá tus datos y enviá." });
    });

    // Tarjeta de pago por transferencia (solo si hay alias cargado)
    const nota = $("#pago-note");
    if (!pagos.alias) return;
    nota.hidden = false;
    $('[data-pago="alias"]', nota).textContent = pagos.alias;
    $('[data-pago="titular"]', nota).textContent = pagos.titular || "";
    $('[data-pago="instagram"]', nota).textContent = config.instagram?.usuario || "nuestro perfil";

    const copiar = $("#copiar-alias");
    copiar.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pagos.alias);
      } catch {
        // Respaldo para cuando el navegador no permite el portapapeles (ej: archivo local)
        const t = document.createElement("textarea");
        t.value = pagos.alias;
        document.body.appendChild(t);
        t.select();
        document.execCommand("copy");
        t.remove();
      }
      copiar.textContent = "¡Copiado!";
      setTimeout(() => (copiar.textContent = "Copiar"), 1800);
    });
  }

  /* ------------------------------------------------------ contacto y sedes */
  const waUrl = (texto) => `https://wa.me/${String(config.whatsapp).replace(/\D/g, "")}?text=${encodeURIComponent(texto)}`;

  function renderContact() {
    const items = [
      config.whatsapp && { icon: ICON.chat, label: "WhatsApp", valor: config.telefonoVisible, href: waUrl("¡Hola Mobila! Quiero más info sobre las clases.") },
      config.instagram?.url && { icon: ICON.camera, label: "Instagram", valor: config.instagram.usuario, href: config.instagram.url },
      config.email && { icon: ICON.mail, label: "Email", valor: config.email, href: "mailto:" + config.email },
    ].filter(Boolean);
    $("#contact-list").innerHTML = items
      .map(
        (it) => `
        <li><a href="${esc(it.href)}"${it.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>
          ${it.icon}<span><small>${esc(it.label)}</small><strong>${esc(it.valor)}</strong></span>
        </a></li>`
      )
      .join("");
  }

  function renderLocations() {
    $("#locations").innerHTML = sedes
      .map((s, i) => {
        const clases = clasesDe(s.id);
        const dias = DIAS.filter((d) => clases.some((c) => c.dia === d.id));
        const horas = clases.map((c) => c.hora).sort();
        const q = encodeURIComponent(s.mapa);
        const horario = dias.length
          ? `${dias[0].nombre} a ${dias[dias.length - 1].nombre.toLowerCase()} · primera clase ${horas[0]} hs, última ${horas[horas.length - 1]} hs`
          : "Horarios a confirmar";
        return `
        <div class="reveal" style="--i:${i}">
          <article class="sede">
            <div class="sede__map">
              <iframe title="Mapa de la sede ${esc(s.nombre)}" src="https://www.google.com/maps?q=${q}&z=14&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <div class="sede__body">
              <p class="eyebrow"><span>Sede ${String(i + 1).padStart(2, "0")}</span></p>
              <h3>${esc(s.nombre)}</h3>
              <ul class="sede__data">
                <li>${ICON.pin}<span>${esc(s.direccion)}</span></li>
                <li>${ICON.clock}<span>${esc(horario)}</span></li>
              </ul>
              <div class="sede__actions">
                <a class="btn btn--primary btn--sm" href="https://www.google.com/maps/search/?api=1&query=${q}" target="_blank" rel="noopener">Cómo llegar ${ICON.arrow}</a>
                <a class="btn btn--ghost btn--sm" href="#horarios" data-ver-sede="${esc(s.id)}">Ver horarios</a>
              </div>
            </div>
          </article>
        </div>`;
      })
      .join("");

    $("#locations").addEventListener("click", (e) => {
      const link = e.target.closest("[data-ver-sede]");
      if (link) setSede(link.dataset.verSede);
    });
  }

  /* Precarga el formulario (desde una clase o un plan) y baja hasta él. */
  function irAlFormulario({ sede, disciplina, mensaje, aviso }) {
    const form = $("#contacto-form");
    if (sede) form.sede.value = sede;
    if (disciplina) form.disciplina.value = disciplina;
    if (mensaje) form.mensaje.value = mensaje;
    form.scrollIntoView({ behavior: "smooth", block: "center" });
    form.nombre.focus({ preventScroll: true });
    const status = $("#form-status");
    status.className = "form__status is-ok";
    status.textContent = aviso || "";
  }

  function initForm() {
    const form = $("#contacto-form");
    const status = $("#form-status");

    form.sede.innerHTML = sedes.map((s) => `<option value="${esc(s.id)}">${esc(s.nombre)}</option>`).join("");
    form.disciplina.innerHTML =
      '<option value="">Todavía no sé</option>' +
      Object.entries(disciplinas).map(([k, d]) => `<option value="${esc(k)}">${esc(d.nombre)}</option>`).join("");

    form.addEventListener("input", (e) => e.target.closest(".field")?.classList.remove("is-invalid"));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const requeridos = [form.nombre, form.telefono];
      requeridos.forEach((f) => f.closest(".field").classList.toggle("is-invalid", !f.value.trim()));
      const primero = requeridos.find((f) => !f.value.trim());
      if (primero) {
        status.className = "form__status is-error";
        status.textContent = "Completá tu nombre y tu teléfono para continuar.";
        return primero.focus();
      }

      const lineas = [
        "¡Hola Mobila! Quiero reservar una clase de prueba.",
        "",
        `Nombre: ${form.nombre.value.trim()}`,
        `Teléfono: ${form.telefono.value.trim()}`,
        `Sede: ${sedePorId[form.sede.value]?.nombre || "-"}`,
        `Disciplina: ${disciplinas[form.disciplina.value]?.nombre || "A definir"}`,
      ];
      if (form.mensaje.value.trim()) lineas.push(`Mensaje: ${form.mensaje.value.trim()}`);
      const texto = lineas.join("\n");

      if (config.whatsapp) {
        window.open(waUrl(texto), "_blank", "noopener");
        status.textContent = "Te abrimos WhatsApp con el mensaje listo. Solo falta que lo envíes.";
      } else {
        window.location.href = `mailto:${config.email}?subject=${encodeURIComponent("Clase de prueba")}&body=${encodeURIComponent(texto)}`;
        status.textContent = "Te abrimos tu correo con el mensaje listo. Solo falta que lo envíes.";
      }
      status.className = "form__status is-ok";
    });
  }

  /* --------------------------------------------------- animaciones scroll */
  function initReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("is-visible"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("is-visible");
          io.unobserve(en.target);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ------------------------------------------------------------------ init */
  initNav();
  renderHero();
  initSchedule();
  renderCoaches();
  renderPlans();
  renderContact();
  renderLocations();
  initForm();
  initReveal(); // siempre al final: observa también lo que se generó arriba
  $("#year").textContent = new Date().getFullYear();
})();
