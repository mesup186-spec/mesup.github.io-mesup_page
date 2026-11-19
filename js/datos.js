/* =====================================================================
   DATOS DEL SITIO
   ---------------------------------------------------------------------
   Este es el ÚNICO archivo que necesitas editar para actualizar:
   - la trayectoria (línea de tiempo)
   - las fotos del carrusel
   - los comunicados
   Copia un bloque { ... }, pégalo, cambia el texto y guarda.
   Cuida que cada bloque termine en coma y que las comillas cierren.
   ===================================================================== */


/* ---------- TRAYECTORIA (en orden cronológico) ---------- */
const TRAYECTORIA = [
  {
    anio: "2019",
    titulo: "Nace la semilla",
    texto: "Un grupo de estudiantes de distintas facultades se reúne para responder a los recortes de bienestar universitario y funda el movimiento."
  },
  {
    anio: "2020",
    titulo: "Solidaridad en pandemia",
    texto: "Organizamos ollas comunitarias, préstamo de equipos y redes de apoyo para que nadie abandonara sus estudios."
  },
  {
    anio: "2021",
    titulo: "Movilización nacional",
    texto: "Participamos en las asambleas y jornadas por la educación pública y la matrícula cero."
  },
  {
    anio: "2023",
    titulo: "Representación estudiantil",
    texto: "Por primera vez llegamos con voz propia a los consejos de facultad y al consejo académico."
  },
  {
    anio: "2025",
    titulo: "Escuela de formación",
    texto: "Lanzamos la Escuela Semilla: ciclos de formación política, ambiental y de género abiertos a toda la comunidad."
  }
];


/* ---------- FOTOS DEL CARRUSEL ----------
   1. Sube tus fotos a la carpeta img/fotos/
   2. Escribe aquí el nombre exacto del archivo (respeta mayúsculas y la extensión .jpg / .png)
*/
const FOTOS = [
  { archivo: "img/fotos/foto1.jpg", descripcion: "Asamblea general estudiantil" },
  { archivo: "img/fotos/foto2.jpg", descripcion: "Jornada de movilización por la educación pública" },
  { archivo: "img/fotos/foto3.jpg", descripcion: "Olla comunitaria en el campus" },
  { archivo: "img/fotos/foto4.jpg", descripcion: "Escuela de formación Semilla" },
  { archivo: "img/fotos/foto5.jpg", descripcion: "Encuentro con comunidades del territorio" },
  { archivo: "img/fotos/foto6.jpg", descripcion: "Jornada cultural y muralismo" }
];


/* ---------- COMUNICADOS (el más reciente PRIMERO) ----------
   - fecha: formato AAAA-MM-DD
   - categoria: la que quieras (se crean filtros automáticamente)
   - contenido: cada párrafo entre comillas, separados por comas
   - pdf: opcional. Sube el PDF a la carpeta comunicados/ y pon la ruta,
          o deja "" si no hay PDF.
*/
const COMUNICADOS = [
  {
    fecha: "2026-11-10",
    categoria: "Universidad",
    titulo: "Frente a la reforma del reglamento estudiantil",
    resumen: "Exigimos que cualquier cambio al reglamento se construya con participación real de los estamentos.",
    contenido: [
      "El Movimiento Estudiantil Semilla de Unidad Popular manifiesta a la comunidad universitaria su preocupación por la propuesta de reforma al reglamento estudiantil presentada sin consulta previa.",
      "Consideramos que las normas que regulan la vida académica deben construirse de manera participativa. Por ello convocamos a una asamblea abierta para discutir la propuesta y formular contrapropuestas.",
      "La universidad es de quienes la habitamos. ¡Sembramos unidad, cosechamos futuro!"
    ],
    pdf: ""
  },
  {
    fecha: "2026-09-22",
    categoria: "Bienestar",
    titulo: "Por un comedor universitario digno",
    resumen: "Respaldamos la solicitud de ampliar los cupos del apoyo alimentario y mejorar su calidad.",
    contenido: [
      "Durante el último semestre se ha registrado un aumento en la demanda del apoyo alimentario que no ha sido acompañado de más cupos ni de mayor presupuesto.",
      "Solicitamos a la dirección de bienestar abrir una mesa de trabajo con representantes estudiantiles y presentar un plan de ampliación para el próximo periodo."
    ],
    pdf: ""
  },
  {
    fecha: "2026-06-05",
    categoria: "Ambiente",
    titulo: "Día del Medio Ambiente: la universidad también es territorio",
    resumen: "Invitamos a la jornada de siembra y a la mesa de discusión sobre la política ambiental del campus.",
    contenido: [
      "En el Día Mundial del Medio Ambiente reafirmamos nuestro compromiso con el cuidado de la vida y de los territorios.",
      "Invitamos a toda la comunidad a la jornada de siembra en el campus y al conversatorio sobre la política ambiental universitaria."
    ],
    pdf: ""
  }
];
