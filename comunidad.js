/* ==========================================================
   p3-comunidad.js  ·  PERSONA 3
   FAQ, reserva de clase de prueba, "abierto ahora" y footer
   ========================================================== */

// [P3-1] Preguntas frecuentes: solo una abierta a la vez
(function () {
  var items = document.querySelectorAll(".faq details");
  items.forEach(function (d) {
    d.addEventListener("toggle", function () {
      if (!d.open) return;
      items.forEach(function (otro) { if (otro !== d) otro.open = false; });
    });
  });
})();
// [/P3-1]

// [P3-2] Reserva de clase de prueba por WhatsApp
(function () {
  var form = document.getElementById("reservaForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nombre = document.getElementById("rNombre").value.trim();
    var clase = document.getElementById("rClase").value;
    var dia = document.getElementById("rDia").value;
    var objetivo = document.getElementById("rObj").value;
    if (!nombre) return;

    var cuando = dia === "Cualquier día" ? "cualquier día" : "el " + dia.toLowerCase();
    var msg = "Hola, soy " + nombre + ". Quiero reservar una clase de prueba de " + clase +
              " para " + cuando + ". Mi objetivo es " + objetivo.toLowerCase() + ".";
    window.open(TITAN.wa(msg), "_blank", "noopener");
  });
})();
// [/P3-2]

// [P3-3] Estado "abierto ahora" según la hora de Perú
(function () {
  var estado = document.getElementById("abierto");
  var filas = document.querySelectorAll(".hours tr[data-days]");
  if (!estado) return;

  // Horario en minutos desde la medianoche: [abre, cierra]   (0 = domingo ... 6 = sábado)
  var H = {
    0: [8 * 60, 13 * 60],
    1: [6 * 60, 22 * 60], 2: [6 * 60, 22 * 60], 3: [6 * 60, 22 * 60],
    4: [6 * 60, 22 * 60], 5: [6 * 60, 22 * 60],
    6: [7 * 60, 20 * 60]
  };
  var DIAS_EN = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  // Hora actual en Lima, sin importar dónde esté la persona que visita la web
  function ahoraLima() {
    var d = {};
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Lima", weekday: "short",
      hour: "2-digit", minute: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date()).forEach(function (p) { d[p.type] = p.value; });
    return { dia: DIAS_EN[d.weekday], min: (+d.hour % 24) * 60 + (+d.minute) };
  }

  // 390 -> "6:30 a.m."
  function formato(m) {
    var h = Math.floor(m / 60), mi = m % 60;
    return (h % 12 || 12) + ":" + (mi < 10 ? "0" : "") + mi + " " + (h >= 12 ? "p.m." : "a.m.");
  }

  function actualizar() {
    var a = ahoraLima();
    var hoy = H[a.dia];
    var abierto = a.min >= hoy[0] && a.min < hoy[1];

    estado.className = "status " + (abierto ? "open" : "closed");
    if (abierto) {
      estado.textContent = "Abierto ahora · cierra a las " + formato(hoy[1]);
    } else if (a.min < hoy[0]) {
      estado.textContent = "Cerrado ahora · abre hoy a las " + formato(hoy[0]);
    } else {
      estado.textContent = "Cerrado ahora · abre mañana a las " + formato(H[(a.dia + 1) % 7][0]);
    }

    // Resalta la fila del día de hoy en la tabla
    filas.forEach(function (tr) {
      var dias = tr.dataset.days.split(",");
      tr.classList.toggle("today", dias.indexOf(String(a.dia)) > -1);
    });
  }

  actualizar();
  setInterval(actualizar, 60000); // se refresca cada minuto
})();
// [/P3-3]

// [P3-4] Botón flotante de WhatsApp y año del footer
(function () {
  var wa = document.getElementById("waFloat");
  if (wa) wa.href = TITAN.wa("Hola, quiero información sobre las membresías del gimnasio");

  var anio = document.getElementById("year");
  if (anio) anio.textContent = new Date().getFullYear();
})();
// [/P3-4]
