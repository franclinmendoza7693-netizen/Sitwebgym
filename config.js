/* ==========================================================
   config.js  ·  COMPARTIDO por todo el equipo
   Viene en el primer commit (esqueleto). Nadie lo modifica
   salvo para cambiar el número de WhatsApp.
   ========================================================== */
window.TITAN = (function () {
  var numero = "51926498836"; // número con código de país, sin + ni espacios

  return {
    numero: numero,
    // Devuelve el enlace de WhatsApp con el mensaje ya escrito
    wa: function (mensaje) {
      return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);
    }
  };
})();
