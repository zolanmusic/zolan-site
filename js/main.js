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

  /* ------------------------------------------------------------------ */
  /* 6. Countdown de próximo lanzamiento                                  */
  /*    Lee la fecha objetivo desde data-target en el HTML.              */
  /*    Para cambiar la fecha: edita el atributo data-target del div      */
  /*    #countdown en index.html (formato: AAAA-MM-DDTHH:MM:SS-04:00,     */
  /*    donde -04:00 es el huso horario de Chile en horario de invierno   */
  /*    y -03:00 en horario de verano).                                   */
  /* ------------------------------------------------------------------ */
  var countdownEl = document.getElementById("countdown");

  if (countdownEl) {
    var targetDate = new Date(countdownEl.getAttribute("data-target"));
    var daysEl = document.getElementById("cd-days");
    var hoursEl = document.getElementById("cd-hours");
    var minsEl = document.getElementById("cd-mins");
    var secsEl = document.getElementById("cd-secs");

    function pad(n) { return String(n).padStart(2, "0"); }

    function updateCountdown() {
      var diff = targetDate.getTime() - Date.now();
      if (isNaN(diff) || diff <= 0) {
        daysEl.textContent = "00";
        hoursEl.textContent = "00";
        minsEl.textContent = "00";
        secsEl.textContent = "00";
        return;
      }
      var totalSeconds = Math.floor(diff / 1000);
      var days = Math.floor(totalSeconds / 86400);
      var hours = Math.floor((totalSeconds % 86400) / 3600);
      var mins = Math.floor((totalSeconds % 3600) / 60);
      var secs = totalSeconds % 60;

      daysEl.textContent = pad(days);
      hoursEl.textContent = pad(hours);
      minsEl.textContent = pad(mins);
      secsEl.textContent = pad(secs);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ------------------------------------------------------------------ */
  /* 7. Título ZØLAN de partículas                                       */
  /*    Ciclo: FORMAR -> RESPIRAR -> COMPRIMIR -> EXPLOTAR -> repetir.   */
  /*    Las posiciones objetivo se muestrean pintando el texto en un     */
  /*    canvas oculto y leyendo qué píxeles quedan encendidos.           */
  /* ------------------------------------------------------------------ */
  var titleCanvas = document.getElementById("titleCanvas");

  if (titleCanvas && !prefersReducedMotion) {
    var tctx = titleCanvas.getContext("2d");
    var tdpr = Math.min(window.devicePixelRatio || 1, 2);
    var TEXT = "ZØLAN";
    var TW, TH, tParticles = [], tCenterX, tCenterY;

    // paleta cálida del sitio, con pesos (más foam/gold que el resto)
    var T_PALETTE = [
      "#f6f0e4", "#f6f0e4", "#f6f0e4",
      "#f2c94a", "#f2c94a",
      "#e59a2f",
      "#d1512c",
      "#9cb84f"
    ];

    var tPhase = "form";
    var tPhaseStart = 0;
    var T_DUR = { form: 2400, hold: 2600, compress: 850, explode: 1100 };

    function easeInCubic(x) { return x * x * x; }

    function sampleTextTargets() {
      var containerW = titleCanvas.parentElement.clientWidth || 320;
      TW = Math.max(280, Math.floor(containerW));

      // calcular tamaño de fuente que ocupe ~96% del ancho
      var off = document.createElement("canvas");
      var octx = off.getContext("2d");
      octx.font = "400 100px Syne, sans-serif";
      var measured = octx.measureText(TEXT).width || 350;
      var fontSize = Math.floor(100 * (TW * 0.96) / measured);
      TH = Math.ceil(fontSize * 1.22);

      off.width = TW;
      off.height = TH;
      octx = off.getContext("2d");
      octx.font = "400 " + fontSize + "px Syne, sans-serif";
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#fff";
      octx.fillText(TEXT, TW / 2, TH / 2 + fontSize * 0.04);

      var data = octx.getImageData(0, 0, TW, TH).data;
      // densidad adaptativa: más partículas en pantallas anchas, menos en mobile
      var gap = Math.max(2, Math.round(TW / 420));
      var targets = [];
      for (var y = 0; y < TH; y += gap) {
        for (var x = 0; x < TW; x += gap) {
          if (data[(y * TW + x) * 4 + 3] > 128) {
            targets.push({ x: x, y: y });
          }
        }
      }
      return targets;
    }

    function buildTitleParticles() {
      var targets = sampleTextTargets();
      titleCanvas.width = TW * tdpr;
      titleCanvas.height = TH * tdpr;
      tctx.setTransform(tdpr, 0, 0, tdpr, 0, 0);
      tCenterX = TW / 2;
      tCenterY = TH / 2;

      var old = tParticles;
      tParticles = targets.map(function (t, i) {
        var prev = old[i];
        return {
          tx: t.x,
          ty: t.y,
          x: prev ? prev.x : Math.random() * TW,
          y: prev ? prev.y : Math.random() * TH,
          vx: 0,
          vy: 0,
          a: prev ? prev.a : 0,
          size: Math.random() < 0.85 ? 0.6 : 1.1,
          color: T_PALETTE[(Math.random() * T_PALETTE.length) | 0],
          seed: Math.random() * Math.PI * 2
        };
      });
    }

    function titleFrame(now) {
      if (!tPhaseStart) tPhaseStart = now;
      var t = now - tPhaseStart;
      tctx.clearRect(0, 0, TW, TH);

      var i, p;

      if (tPhase === "form") {
        // las partículas vuelan hacia su lugar en las letras
        for (i = 0; i < tParticles.length; i++) {
          p = tParticles[i];
          p.x += (p.tx - p.x) * 0.085;
          p.y += (p.ty - p.y) * 0.085;
          p.a = Math.min(1, p.a + 0.035);
        }
        if (t > T_DUR.form) { tPhase = "hold"; tPhaseStart = now; }

      } else if (tPhase === "hold") {
        // respiración sutil: cada partícula orbita apenas su posición
        for (i = 0; i < tParticles.length; i++) {
          p = tParticles[i];
          p.x = p.tx + Math.sin(now * 0.0019 + p.seed) * 0.9;
          p.y = p.ty + Math.cos(now * 0.0023 + p.seed) * 0.9;
          p.a = 1;
        }
        if (t > T_DUR.hold) { tPhase = "compress"; tPhaseStart = now; }

      } else if (tPhase === "compress") {
        // todo colapsa hacia el centro, acelerando
        var progress = Math.min(1, t / T_DUR.compress);
        var S = 1 - 0.97 * easeInCubic(progress); // escala 1 -> 0.03
        for (i = 0; i < tParticles.length; i++) {
          p = tParticles[i];
          var gx = tCenterX + (p.tx - tCenterX) * S;
          var gy = tCenterY + (p.ty - tCenterY) * S;
          p.x += (gx - p.x) * 0.32;
          p.y += (gy - p.y) * 0.32;
        }
        // brillo creciente en el núcleo mientras colapsa
        var coreGlow = tctx.createRadialGradient(tCenterX, tCenterY, 0, tCenterX, tCenterY, 30 + 60 * progress);
        coreGlow.addColorStop(0, "rgba(242,201,74," + (0.25 * progress) + ")");
        coreGlow.addColorStop(1, "rgba(242,201,74,0)");
        tctx.fillStyle = coreGlow;
        tctx.fillRect(0, 0, TW, TH);

        if (progress >= 1) {
          tPhase = "explode";
          tPhaseStart = now;
          // asignar velocidades radiales de estallido
          for (i = 0; i < tParticles.length; i++) {
            p = tParticles[i];
            var dx = p.tx - tCenterX;
            var dy = p.ty - tCenterY;
            var d = Math.sqrt(dx * dx + dy * dy) || 1;
            var speed = 2.5 + Math.random() * 8;
            p.vx = (dx / d) * speed + (Math.random() - 0.5) * 2.5;
            p.vy = (dy / d) * speed + (Math.random() - 0.5) * 2.5;
          }
        }

      } else if (tPhase === "explode") {
        var eProgress = Math.min(1, t / T_DUR.explode);
        for (i = 0; i < tParticles.length; i++) {
          p = tParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.985;
          p.vy *= 0.985;
          p.a = 1 - eProgress;
        }
        // onda expansiva: anillo dorado que crece y se desvanece
        if (eProgress < 0.6) {
          var ringR = eProgress * TW * 0.55;
          tctx.strokeStyle = "rgba(242,201,74," + (0.5 * (1 - eProgress / 0.6)) + ")";
          tctx.lineWidth = 2;
          tctx.beginPath();
          tctx.arc(tCenterX, tCenterY, ringR, 0, Math.PI * 2);
          tctx.stroke();
        }
        if (eProgress >= 1) { tPhase = "form"; tPhaseStart = now; }
      }

      // dibujar todas las partículas (cuadraditos, estética futurista)
      for (i = 0; i < tParticles.length; i++) {
        p = tParticles[i];
        if (p.a <= 0) continue;
        tctx.globalAlpha = p.a;
        tctx.fillStyle = p.color;
        tctx.fillRect(p.x, p.y, p.size, p.size);
      }
      tctx.globalAlpha = 1;

      requestAnimationFrame(titleFrame);
    }

    function startTitle() {
      buildTitleParticles();
      requestAnimationFrame(titleFrame);
    }

    // reconstruir al cambiar el tamaño de la ventana (con debounce)
    var titleResizeTimer;
    window.addEventListener("resize", function () {
      clearTimeout(titleResizeTimer);
      titleResizeTimer = setTimeout(buildTitleParticles, 200);
    }, { passive: true });

    // esperar a que la fuente Syne esté cargada antes de muestrear el texto
    if (document.fonts && document.fonts.load) {
      document.fonts.load("400 100px Syne").then(startTitle).catch(startTitle);
    } else {
      setTimeout(startTitle, 600);
    }
  }

})();
