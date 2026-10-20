/* ==========================================================
   p1-portada.js  ·  PERSONA 1
   Menú, tema, contadores, calculadora IMC y extras
   ========================================================== */

// [P1-1] Menú móvil y cambio de tema claro/oscuro
(function () {
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");

  if (burger && menu) {
    // Abre y cierra el menú en celulares
    burger.addEventListener("click", function () {
      var abierto = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", abierto);
    });
    // Al tocar un enlace, el menú se cierra
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Tema claro / oscuro (se recuerda en localStorage)
  var btnTema = document.getElementById("themeBtn");
  var raiz = document.documentElement;
  if (btnTema) {
    btnTema.addEventListener("click", function () {
      var nuevo = raiz.getAttribute("data-theme") === "light" ? "dark" : "light";
      raiz.setAttribute("data-theme", nuevo);
      try { localStorage.setItem("titan-tema", nuevo); } catch (e) {}
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", nuevo === "light" ? "#fbfaf6" : "#0a0a0a");
    });
  }
})();
// [/P1-1]

// [P1-2] Contadores animados de la portada
(function () {
  var numeros = document.querySelectorAll("[data-count]");
  if (!numeros.length || !("IntersectionObserver" in window)) return;

  // Si la persona prefiere menos movimiento, se deja el número final
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  function animar(el) {
    var fin = +el.dataset.count;
    var prefijo = el.dataset.prefix || "";
    var sufijo = el.dataset.suffix || "";
    var duracion = 1600;
    var inicio = null;

    function paso(t) {
      if (inicio === null) inicio = t;
      var p = Math.min((t - inicio) / duracion, 1);
      var suave = 1 - Math.pow(1 - p, 3); // empieza rápido y frena al final
      el.textContent = prefijo + Math.round(fin * suave).toLocaleString("en-US") + sufijo;
      if (p < 1) requestAnimationFrame(paso);
    }
    requestAnimationFrame(paso);
  }

  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { animar(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.6 });

  numeros.forEach(function (n) { io.observe(n); });
})();
// [/P1-2]

// [P1-3] Calculadora de IMC
(function () {
  var form = document.getElementById("imcForm");
  if (!form) return;

  var peso = document.getElementById("imcPeso");
  var alt = document.getElementById("imcAlt");
  var err = document.getElementById("imcErr");
  var out = document.getElementById("imcOut");
  var num = document.getElementById("imcNum");
  var cat = document.getElementById("imcCat");
  var tip = document.getElementById("imcTip");
  var pin = document.getElementById("imcPin");

  // Categorías de la OMS para adultos
  var NIVELES = [
    { max: 18.5, nombre: "Bajo peso",
      tip: "Podemos ayudarte a ganar masa muscular con entrenamiento de fuerza y una buena alimentación. Pide tu evaluación física." },
    { max: 25, nombre: "Peso normal",
      tip: "Vas bien. Mantén tu constancia y trabaja fuerza, resistencia y rendimiento con nuestras clases." },
    { max: 30, nombre: "Sobrepeso",
      tip: "Combinar pesas y cardio funciona muy bien. El Pase Trimestral incluye evaluación física y plan nutricional básico." },
    { max: Infinity, nombre: "Obesidad",
      tip: "Empieza de a poco, con acompañamiento de un entrenador. Si tienes alguna condición de salud, consulta antes con tu médico." }
  ];

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var kg = parseFloat(peso.value);
    var cm = parseFloat(alt.value);

    // Validación de datos razonables
    if (!(kg >= 30 && kg <= 300) || !(cm >= 100 && cm <= 250)) {
      err.textContent = "Revisa los datos: peso entre 30 y 300 kg, estatura entre 100 y 250 cm.";
      out.hidden = true;
      return;
    }
    err.textContent = "";

    var imc = kg / Math.pow(cm / 100, 2); // IMC = peso / estatura² (en metros)
    var nivel = NIVELES.find(function (n) { return imc < n.max; });

    num.textContent = imc.toFixed(1);
    cat.textContent = nivel.nombre;
    tip.textContent = nivel.tip;

    // Posición del indicador en la barra (escala de 15 a 40)
    var pct = Math.min(Math.max((imc - 15) / 25, 0), 1) * 100;
    pin.style.left = "0%";
    out.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { pin.style.left = pct + "%"; });
    });
  });
})();
// [/P1-3]

// [P1-4] Barra de progreso, botón volver arriba, animación al scroll y menú activo
(function () {
  // --- Barra de progreso y botón "volver arriba" ---
  var barra = document.getElementById("progress");
  var subir = document.getElementById("backtop");
  var esperando = false;

  function actualizar() {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var y = window.pageYOffset;
    if (barra) barra.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";
    if (subir) subir.classList.toggle("show", y > 600);
    esperando = false;
  }
  window.addEventListener("scroll", function () {
    if (!esperando) { esperando = true; requestAnimationFrame(actualizar); }
  }, { passive: true });
  actualizar();

  if (subir) {
    subir.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();

(function () {
  // --- Animación de aparición (clase .rv) ---
  var items = document.querySelectorAll(".rv");

  function mostrar(el) {
    el.classList.add("in");
    // Cuando termina la animación se quita .rv, así no estorba a los efectos hover
    setTimeout(function () {
      el.classList.remove("rv", "in");
      el.style.removeProperty("--d");
    }, 1400);
  }

  if (!("IntersectionObserver" in window)) { items.forEach(mostrar); return; }

  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      if (e.isIntersecting) { mostrar(e.target); io.unobserve(e.target); }
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) {
    // Retraso escalonado según la posición entre sus hermanos
    var pos = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty("--d", (pos % 4) * 0.12 + "s");
    io.observe(el);
  });
})();

(function () {
  // --- Resalta en el menú la sección que se está viendo ---
  if (!("IntersectionObserver" in window)) return;
  var enlaces = {};
  document.querySelectorAll('#menu a[href^="#"]:not(.btn)').forEach(function (a) {
    enlaces[a.getAttribute("href").slice(1)] = a;
  });

  var io = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (e) {
      var a = enlaces[e.target.id];
      if (!a || !e.isIntersecting) return;
      Object.keys(enlaces).forEach(function (k) { enlaces[k].classList.remove("active"); });
      a.classList.add("active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  Object.keys(enlaces).forEach(function (id) {
    var seccion = document.getElementById(id);
    if (seccion) io.observe(seccion);
  });
})();
// [/P1-4]
