/* =====================================================================
   FUNCIONAMIENTO DEL SITIO (normalmente no necesitas tocar este archivo)
   ===================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  pintarTrayectoria();
  iniciarCarrusel();
  pintarComunicados();
  iniciarMenu();
  iniciarContadores();
  iniciarAnimaciones();
  iniciarFormulario();
  document.getElementById("anio").textContent = new Date().getFullYear();
});

/* Evita que un texto con < o > rompa la página */
function limpiar(texto) {
  const div = document.createElement("div");
  div.textContent = texto ?? "";
  return div.innerHTML;
}

/* ---------- MENÚ ---------- */
function iniciarMenu() {
  const boton = document.getElementById("menuBoton");
  const menu = document.getElementById("menu");
  const encabezado = document.getElementById("encabezado");

  boton.addEventListener("click", () => {
    const abierto = menu.classList.toggle("abierto");
    boton.classList.toggle("abierto", abierto);
    boton.setAttribute("aria-expanded", abierto);
  });
  // Cerrar el menú al tocar un enlace (en celular)
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
    menu.classList.remove("abierto");
    boton.classList.remove("abierto");
    boton.setAttribute("aria-expanded", false);
  }));

  // Sombra del encabezado y enlace activo según la sección visible
  const secciones = [...document.querySelectorAll("main section[id]")];
  const enlaces = [...menu.querySelectorAll("a")];
  window.addEventListener("scroll", () => {
    encabezado.classList.toggle("con-sombra", window.scrollY > 10);
    let actual = "";
    secciones.forEach(s => { if (window.scrollY >= s.offsetTop - 120) actual = s.id; });
    enlaces.forEach(a => a.classList.toggle("activo", a.getAttribute("href") === "#" + actual));
  });
}

/* ---------- TRAYECTORIA ---------- */
function pintarTrayectoria() {
  const lista = document.getElementById("lineaTiempo");
  lista.innerHTML = TRAYECTORIA.map(h => `
    <li class="hito aparecer">
      <div class="hito__anio">${limpiar(h.anio)}</div>
      <div class="hito__caja">
        <h3>${limpiar(h.titulo)}</h3>
        <p>${limpiar(h.texto)}</p>
      </div>
    </li>`).join("");
}

/* ---------- CARRUSEL ---------- */
function iniciarCarrusel() {
  const pista = document.getElementById("carruselPista");
  const puntos = document.getElementById("carruselPuntos");
  const carrusel = document.getElementById("carrusel");
  if (!FOTOS.length) { carrusel.style.display = "none"; return; }

  pista.innerHTML = FOTOS.map((f, i) => `
    <figure class="diapositiva">
      <img src="${limpiar(f.archivo)}" alt="${limpiar(f.descripcion)}" ${i > 0 ? 'loading="lazy"' : ""}>
      <figcaption>${limpiar(f.descripcion)}</figcaption>
    </figure>`).join("");

  puntos.innerHTML = FOTOS.map((_, i) =>
    `<button aria-label="Ir a la foto ${i + 1}" data-i="${i}"></button>`).join("");

  let actual = 0;
  let temporizador;

  function ir(i) {
    actual = (i + FOTOS.length) % FOTOS.length;
    pista.style.transform = `translateX(-${actual * 100}%)`;
    puntos.querySelectorAll("button").forEach((b, j) => b.classList.toggle("activo", j === actual));
  }
  function automatico() {
    clearInterval(temporizador);
    temporizador = setInterval(() => ir(actual + 1), 5000);
  }

  document.getElementById("carruselAnterior").onclick = () => { ir(actual - 1); automatico(); };
  document.getElementById("carruselSiguiente").onclick = () => { ir(actual + 1); automatico(); };
  puntos.addEventListener("click", e => {
    if (e.target.dataset.i !== undefined) { ir(Number(e.target.dataset.i)); automatico(); }
  });

  // Pausa cuando el mouse está encima
  carrusel.addEventListener("mouseenter", () => clearInterval(temporizador));
  carrusel.addEventListener("mouseleave", automatico);

  // Deslizar con el dedo en celular
  let inicioX = null;
  carrusel.addEventListener("touchstart", e => { inicioX = e.touches[0].clientX; }, { passive: true });
  carrusel.addEventListener("touchend", e => {
    if (inicioX === null) return;
    const dx = e.changedTouches[0].clientX - inicioX;
    if (Math.abs(dx) > 40) { ir(actual + (dx < 0 ? 1 : -1)); automatico(); }
    inicioX = null;
  });

  ir(0);
  automatico();
}

/* ---------- COMUNICADOS ---------- */
function formatearFecha(iso) {
  const [a, m, d] = iso.split("-").map(Number);
  return new Date(a, m - 1, d).toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });
}

function pintarComunicados() {
  const lista = document.getElementById("listaComunicados");
  const filtros = document.getElementById("filtros");
  const categorias = ["Todos", ...new Set(COMUNICADOS.map(c => c.categoria))];

  filtros.innerHTML = categorias.map((c, i) =>
    `<button class="${i === 0 ? "activo" : ""}" data-cat="${limpiar(c)}">${limpiar(c)}</button>`).join("");

  function mostrar(cat) {
    const visibles = COMUNICADOS
      .map((c, i) => ({ ...c, i }))
      .filter(c => cat === "Todos" || c.categoria === cat);
    lista.innerHTML = visibles.map(c => `
      <article class="comunicado">
        <div class="comunicado__meta">
          <span>${formatearFecha(c.fecha)}</span>
          <span class="comunicado__categoria">${limpiar(c.categoria)}</span>
        </div>
        <h3>${limpiar(c.titulo)}</h3>
        <p>${limpiar(c.resumen)}</p>
        <button class="comunicado__leer" data-i="${c.i}">Leer comunicado →</button>
      </article>`).join("");
  }

  filtros.addEventListener("click", e => {
    const cat = e.target.dataset.cat;
    if (!cat) return;
    filtros.querySelectorAll("button").forEach(b => b.classList.toggle("activo", b === e.target));
    mostrar(cat);
  });
  lista.addEventListener("click", e => {
    if (e.target.dataset.i !== undefined) abrirModal(COMUNICADOS[Number(e.target.dataset.i)]);
  });

  mostrar("Todos");
  iniciarModal();
}

function abrirModal(c) {
  document.getElementById("modalFecha").textContent = formatearFecha(c.fecha) + " · " + c.categoria;
  document.getElementById("modalTitulo").textContent = c.titulo;
  document.getElementById("modalCuerpo").innerHTML = c.contenido.map(p => `<p>${limpiar(p)}</p>`).join("");
  const pdf = document.getElementById("modalPdf");
  if (c.pdf) { pdf.href = c.pdf; pdf.style.display = "inline-block"; }
  else { pdf.style.display = "none"; }
  const modal = document.getElementById("modal");
  modal.classList.add("abierto");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function iniciarModal() {
  const modal = document.getElementById("modal");
  const cerrar = () => {
    modal.classList.remove("abierto");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };
  document.getElementById("modalCerrar").onclick = cerrar;
  modal.addEventListener("click", e => { if (e.target === modal) cerrar(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") cerrar(); });
}

/* ---------- CONTADORES DE CIFRAS ---------- */
function iniciarContadores() {
  const numeros = document.querySelectorAll("[data-contar]");
  const obs = new IntersectionObserver(entradas => {
    entradas.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, meta = Number(el.dataset.contar);
      const desde = meta > 1000 ? meta - 30 : 0;   // los años arrancan cerca del valor final
      const inicio = performance.now(), dur = 1400;
      (function paso(t) {
        const p = Math.min((t - inicio) / dur, 1);
        el.textContent = Math.round(desde + (meta - desde) * p);
        if (p < 1) requestAnimationFrame(paso);
      })(inicio);
      obs.unobserve(el);
    });
  }, { threshold: .6 });
  numeros.forEach(n => obs.observe(n));
}

/* ---------- APARICIÓN SUAVE AL HACER SCROLL ---------- */
function iniciarAnimaciones() {
  document.querySelectorAll(".tarjeta, .eje, .comunicado, .carrusel").forEach(el => el.classList.add("aparecer"));
  const obs = new IntersectionObserver(entradas => {
    entradas.forEach(en => { if (en.isIntersecting) { en.target.classList.add("visible"); obs.unobserve(en.target); } });
  }, { threshold: .15 });
  document.querySelectorAll(".aparecer").forEach(el => obs.observe(el));
}

/* ---------- FORMULARIO (abre el correo con el mensaje listo) ---------- */
function iniciarFormulario() {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const d = new FormData(form);
    const destino = form.closest("section").querySelector('a[href^="mailto:"]').getAttribute("href").replace("mailto:", "");
    const asunto = encodeURIComponent("Quiero unirme al movimiento - " + d.get("nombre"));
    const cuerpo = encodeURIComponent(
      `Nombre: ${d.get("nombre")}\nPrograma: ${d.get("programa")}\nCorreo: ${d.get("correo")}\n\n${d.get("mensaje")}`);
    window.location.href = `mailto:${destino}?subject=${asunto}&body=${cuerpo}`;
  });
}
