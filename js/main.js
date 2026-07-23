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
  /* 5. Canvas del hero — campo de partículas acercándose (efecto "warp") */
  /*    Pura decoración generativa, sin dependencias externas.           */
  /* ------------------------------------------------------------------ */
  var canvas = document.getElementById("freqCanvas");

  if (canvas && !prefersReducedMotion) {
    var ctx = canvas.getContext("2d");
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var width, height, particles;

    // Paleta cálida — coincide con los tokens de color de style.css
    var PALETTE = [
      [209, 81, 44],   // --rust
      [242, 201, 74],  // --gold
      [156, 184, 79],  // --sage
      [229, 154, 47]   // --amber
    ];

    function makeParticle(freshStart) {
      var angle = Math.random() * Math.PI * 2;
      var radius = Math.random(); // distribución radial desde el centro
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.6, // achatado, se siente más "cinematográfico"
        z: freshStart ? Math.random() : 0.05 + Math.random() * 0.95,
        speed: 0.12 + Math.random() * 0.22,
        color: PALETTE[(Math.random() * PALETTE.length) | 0],
        prevProjX: null,
        prevProjY: null
      };
    }

    function resize() {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      var count = Math.max(70, Math.min(160, Math.floor((width * height) / 9000)));
      particles = new Array(count).fill(0).map(function () { return makeParticle(true); });
    }

    function project(p, cx, cy, focal) {
      var scale = focal / (p.z * focal + focal);
      return { x: cx + p.x * cx * scale * 2.2, y: cy + p.y * cy * scale * 2.2, scale: scale };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      var cx = width / 2;
      var cy = height * 0.46;
      var focal = Math.min(width, height) * 0.5;

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];

        var before = project(p, cx, cy, focal);
        if (p.prevProjX === null) { p.prevProjX = before.x; p.prevProjY = before.y; }

        // se acerca al espectador
        p.z -= p.speed * 0.016;
        if (p.z <= 0.02) {
          particles[i] = makeParticle(false);
          particles[i].z = 1;
          continue;
        }

        var after = project(p, cx, cy, focal);
        var closeness = 1 - Math.min(p.z, 1); // 0 = lejos, 1 = muy cerca
        var alpha = 0.08 + closeness * 0.7;
        var size = 0.6 + closeness * closeness * 3.4;
        var c = p.color;

        // estela — sensación de movimiento hacia adelante
        ctx.strokeStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (alpha * 0.5) + ")";
        ctx.lineWidth = Math.max(0.6, size * 0.5);
        ctx.beginPath();
        ctx.moveTo(p.prevProjX, p.prevProjY);
        ctx.lineTo(after.x, after.y);
        ctx.stroke();

        // núcleo brillante de la partícula
        var glow = ctx.createRadialGradient(after.x, after.y, 0, after.x, after.y, size * 2.4);
        glow.addColorStop(0, "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + alpha + ")");
        glow.addColorStop(1, "rgba(" + c[0] + "," + c[1] + "," + c[2] + ",0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(after.x, after.y, size * 2.4, 0, Math.PI * 2);
        ctx.fill();

        p.prevProjX = after.x;
        p.prevProjY = after.y;
      }

      requestAnimationFrame(draw);
    }

    window.addEventListener("resize", function () {
      resize();
      particles.forEach(function (p) { p.prevProjX = null; p.prevProjY = null; });
    }, { passive: true });
    resize();
    requestAnimationFrame(draw);
  }

})();
