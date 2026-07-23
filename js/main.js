/* ==========================================================================
   ZØLAN — main.js
   Sin dependencias externas. Todo vanilla JS.
   ========================================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------ */
  /* 1. Año dinámico en el footer                                        */
  /* ------------------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ------------------------------------------------------------------ */
  /* 2. Nav: fondo/blur al hacer scroll                                  */
  /* ------------------------------------------------------------------ */
  var nav = document.getElementById("nav");
  function onScrollNav() {
    if (window.scrollY > 20) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  }
  window.addEventListener("scroll", onScrollNav, { passive: true });
  onScrollNav();

  /* ------------------------------------------------------------------ */
  /* 3. Menú móvil fullscreen                                            */
  /* ------------------------------------------------------------------ */
  var burgerBtn = document.getElementById("burgerBtn");
  var mobileMenu = document.getElementById("mobileMenu");

  function toggleMenu(open) {
    var isOpen = typeof open === "boolean" ? open : !mobileMenu.classList.contains("is-open");
    mobileMenu.classList.toggle("is-open", isOpen);
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    burgerBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }

  burgerBtn.addEventListener("click", function () { toggleMenu(); });

  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { toggleMenu(false); });
  });

  /* ------------------------------------------------------------------ */
  /* 4. Reveal on scroll (IntersectionObserver)                          */
  /* ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // Sin soporte / movimiento reducido: mostrar todo directamente
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ------------------------------------------------------------------ */
  /* 5. Canvas de frecuencia — visualizador ambiental en el hero         */
  /*    (patrón generado, no analiza audio real; es puro efecto visual) */
  /* ------------------------------------------------------------------ */
  var canvas = document.getElementById("freqCanvas");

  if (canvas && !prefersReducedMotion) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width, height, bars, t = 0;

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // número de barras según ancho disponible
      var count = Math.max(28, Math.floor(width / 26));
      bars = new Array(count).fill(0).map(function (_, i) {
        return {
          seed: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.6,
          amp: 0.35 + Math.random() * 0.65
        };
      });
    }

    function draw() {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      var cx = width / 2;
      var baseline = height * 0.72;
      var gap = width / bars.length;

      bars.forEach(function (bar, i) {
        var x = i * gap + gap / 2;
        // distancia al centro para dar forma de "orbe" -> más alto al centro
        var distFromCenter = Math.abs(x - cx) / cx; // 0 al centro, 1 en bordes
        var envelope = Math.pow(1 - distFromCenter, 1.4);
        var wave = (Math.sin(t * bar.speed + bar.seed) + 1) / 2; // 0..1
        var h = envelope * bar.amp * height * 0.5 * wave + envelope * 10;

        var grad = ctx.createLinearGradient(0, baseline, 0, baseline - h);
        grad.addColorStop(0, "rgba(139, 92, 246, 0.05)");
        grad.addColorStop(0.5, "rgba(45, 226, 230, 0.55)");
        grad.addColorStop(1, "rgba(255, 46, 146, 0.85)");

        ctx.fillStyle = grad;
        var barWidth = Math.max(2, gap * 0.35);
        roundedBar(ctx, x - barWidth / 2, baseline - h, barWidth, h, barWidth / 2);
      });

      requestAnimationFrame(draw);
    }

    function roundedBar(ctx, x, y, w, h, r) {
      if (h < r * 2) r = h / 2;
      ctx.beginPath();
      ctx.moveTo(x, y + h);
      ctx.lineTo(x, y + r);
      ctx.arcTo(x, y, x + r, y, r);
      ctx.lineTo(x + w - r, y);
      ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h);
      ctx.closePath();
      ctx.fill();
    }

    window.addEventListener("resize", resize, { passive: true });
    resize();
    requestAnimationFrame(draw);
  }

})();
