/* ==========================================================
   p2-contenido.js  ·  PERSONA 2
   Horario de clases (pestañas) y ventana de inscripción a planes
   (Nosotros y Entrenadores no necesitan JavaScript: son HTML + CSS)
   ========================================================== */

// [P2-3] Horario de clases por día
(function () {
  var tabs = document.getElementById("diasTabs");
  var panel = document.getElementById("clasesPanel");
  if (!tabs || !panel) return;

  // Número de día: 0 = domingo, 1 = lunes ... 6 = sábado (igual que Date.getDay())
  var NOMBRES = { 0: "Domingo", 1: "Lunes", 2: "Martes", 3: "Miércoles", 4: "Jueves", 5: "Viernes", 6: "Sábado" };

  // [hora, clase, nivel, instructor]  ← datos de ejemplo, cámbialos por los reales
  var HORARIO = {
    1: [["6:30 a.m.", "Funcional", "Todos los niveles", "María V."],
        ["6:00 p.m.", "Spinning", "Intermedio", "Lucía R."],
        ["7:30 p.m.", "Boxeo", "Todos los niveles", "Diego A."]],
    2: [["7:00 a.m.", "Zumba", "Todos los niveles", "Lucía R."],
        ["6:00 p.m.", "Funcional", "Intermedio", "María V."],
        ["7:30 p.m.", "Spinning", "Avanzado", "Lucía R."]],
    3: [["6:30 a.m.", "Boxeo", "Todos los niveles", "Diego A."],
        ["6:00 p.m.", "Zumba", "Todos los niveles", "Lucía R."],
        ["7:30 p.m.", "Funcional", "Avanzado", "Carlos Q."]],
    4: [["7:00 a.m.", "Spinning", "Intermedio", "Lucía R."],
        ["6:00 p.m.", "Boxeo", "Intermedio", "Diego A."],
        ["7:30 p.m.", "Funcional", "Todos los niveles", "María V."]],
    5: [["6:30 a.m.", "Funcional", "Todos los niveles", "María V."],
        ["6:00 p.m.", "Zumba", "Todos los niveles", "Lucía R."],
        ["7:30 p.m.", "Boxeo", "Avanzado", "Diego A."]],
    6: [["8:00 a.m.", "Spinning", "Todos los niveles", "Lucía R."],
        ["9:30 a.m.", "Funcional", "Intermedio", "Carlos Q."],
        ["11:00 a.m.", "Zumba", "Todos los niveles", "Lucía R."],
        ["5:00 p.m.", "Boxeo", "Todos los niveles", "Diego A."]],
    0: [["9:00 a.m.", "Funcional", "Todos los niveles", "María V."],
        ["10:30 a.m.", "Zumba", "Todos los niveles", "Lucía R."]]
  };

  // Crea un elemento con clase y texto (textContent es seguro, no interpreta HTML)
  function el(tag, clase, texto) {
    var e = document.createElement(tag);
    if (clase) e.className = clase;
    if (texto) e.textContent = texto;
    return e;
  }

  function mostrar(dia) {
    // Marca la pestaña activa
    tabs.querySelectorAll(".tab").forEach(function (b) {
      var activa = +b.dataset.dia === dia;
      b.setAttribute("aria-selected", activa);
      b.tabIndex = activa ? 0 : -1;
    });

    // Dibuja las clases del día
    panel.textContent = "";
    panel.setAttribute("aria-label", "Clases del " + NOMBRES[dia].toLowerCase());
    (HORARIO[dia] || []).forEach(function (c) {
      var fila = el("div", "clase");
      var info = el("div");
      info.appendChild(el("h3", "", c[1]));
      info.appendChild(el("p", "", "Con " + c[3]));
      fila.appendChild(el("span", "clase-hora", c[0]));
      fila.appendChild(info);
      fila.appendChild(el("span", "nivel", c[2]));
      panel.appendChild(fila);
    });
  }

  var botones = Array.prototype.slice.call(tabs.querySelectorAll(".tab"));

  tabs.addEventListener("click", function (e) {
    var b = e.target.closest(".tab");
    if (b) mostrar(+b.dataset.dia);
  });

  // Navegación con flechas del teclado
  tabs.addEventListener("keydown", function (e) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    var i = botones.indexOf(document.activeElement);
    if (i < 0) return;
    i = (i + (e.key === "ArrowRight" ? 1 : -1) + botones.length) % botones.length;
    botones[i].focus();
    mostrar(+botones[i].dataset.dia);
  });

  mostrar(new Date().getDay()); // abre el día de hoy
})();
// [/P2-3]

// [P2-4] Ventana para elegir un plan y enviarlo por WhatsApp
(function () {
  var botones = document.querySelectorAll("[data-plan]");
  var dlg = document.getElementById("planDialog");
  var form = document.getElementById("planForm");
  var nombrePlan = document.getElementById("planNombre");
  var cliente = document.getElementById("planCliente");
  var cancelar = document.getElementById("planCancelar");
  var elegido = "";

  function enviar(nombre) {
    var msg = "Hola, quiero información sobre el plan " + elegido + " del gimnasio" +
              (nombre ? ". Mi nombre es " + nombre : "");
    window.open(TITAN.wa(msg), "_blank", "noopener");
  }

  botones.forEach(function (b) {
    b.addEventListener("click", function () {
      elegido = b.dataset.plan;
      if (dlg && typeof dlg.showModal === "function") {
        nombrePlan.textContent = elegido;
        dlg.showModal();
        cliente.focus();
      } else {
        enviar(""); // navegador antiguo sin <dialog>: manda el mensaje directo
      }
    });
  });

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      enviar(cliente.value.trim());
      dlg.close();
      form.reset();
    });
  }
  if (cancelar) cancelar.addEventListener("click", function () { dlg.close(); });

  // Clic fuera de la ventana = cerrar
  if (dlg) {
    dlg.addEventListener("click", function (e) {
      if (e.target !== dlg) return;
      var r = dlg.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dlg.close();
    });
  }
})();
// [/P2-4]
