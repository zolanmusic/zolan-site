/* ==========================================================================
   ZØLAN — i18n.js
   Traducción por atributos data-i18n / data-i18n-html.
   Detección automática por país (IP) + selector manual guardado en localStorage.
   ========================================================================== */

(function () {
  "use strict";

  var STORAGE_KEY = "zolan_lang";
  var DEFAULT_LANG = "en";
  var SUPPORTED = ["es", "en", "uk", "ru", "pl"];

  /* ------------------------------------------------------------------ */
  /* 1. Diccionario de traducciones                                      */
  /*    Para agregar un idioma nuevo: copia un bloque completo, cambia   */
  /*    el código ("xx") y traduce cada valor.                           */
  /* ------------------------------------------------------------------ */
  var STRINGS = {

    es: {
      "nav.sonido": "Sonido",
      "nav.lanzamientos": "Música",
      "nav.visual": "Visual",
      "nav.conecta": "Conecta",
      "nav.cta": "Escuchar",
      "hero.subtitle": "Progressive, melodic y deep house en fusión.",
      "hero.cta_listen": "Escuchar en Spotify",
      "hero.cta_releases": "Música",
      "hero.scroll": "scroll",
      "sonido.eyebrow": "El estudio",
      "sonido.heading": "Tres texturas, un mismo estado de ánimo.",
      "texture.progressive": "Construcción lenta y deliberada. Capas que se acumulan hasta convertirse en tensión, nunca en ruido.",
      "texture.melodic": "El centro emocional. Líneas melódicas que llevan la narrativa del track de principio a fin.",
      "texture.deep": "Graves cálidos y espacio de sobra. La fusión que le da profundidad y calma a cada lanzamiento.",
      "bio.p1": "ZØLAN empezó a producir desde muy joven, de forma autodidacta, mezclando curiosidad técnica con referencias del house electrónico global. Tras una pausa dedicada a sus estudios, volvió con un sonido más definido: atmósferas envolventes que combinan la construcción del progressive house, la emoción del melodic house y la profundidad del deep house.",
      "bio.p2": "Su catálogo incluye colaboraciones como <em>“Save Love”</em>, junto a la cantante chilena Maca Koller, y remixes propios como <em>“No Vas Sola”</em>. Hoy el foco está completo en estudio: diseño de sonido, producción y una identidad sonora en constante evolución.",
      "releases.eyebrow": "Discografía",
      "releases.upcoming": "Próximamente",
      "releases.heading": "Lanzamientos.",
      "releases.link": "Discografía completa en Spotify →",
      "releases.hint": "Desliza para ver más →",
      "releases.smartlink": "Escuchar en todas las plataformas",
      "visual.eyebrow": "Identidad",
      "visual.heading": "Visual.",
      "conecta.eyebrow": "Conecta",
      "conecta.heading": "Sígueme.",
      "conecta.contact": "Prensa / Contacto",
      "sound.label": "Sonido",
      "next.eyebrow": "Próximo lanzamiento",
      "next.cta": "Pre-guardar ahora",
      "next.days": "días",
      "next.hours": "horas",
      "next.mins": "min",
      "next.secs": "seg",
      "footer.text": "Progressive · Melodic · Deep House — © <span id=\"year\"></span> ZØLAN. Todos los derechos reservados."
    },

    en: {
      "nav.sonido": "Sound",
      "nav.lanzamientos": "Music",
      "nav.visual": "Visuals",
      "nav.conecta": "Connect",
      "nav.cta": "Listen",
      "hero.subtitle": "Progressive, melodic and deep house in fusion.",
      "hero.cta_listen": "Listen on Spotify",
      "hero.cta_releases": "Music",
      "hero.scroll": "scroll",
      "sonido.eyebrow": "In the studio",
      "sonido.heading": "Three textures, one mood.",
      "texture.progressive": "A slow, deliberate build. Layers that stack into tension, never into noise.",
      "texture.melodic": "The emotional core. Melodic lines that carry the track from the first bar to the last.",
      "texture.deep": "Warm low end and room to breathe. The fusion that gives every track its depth.",
      "bio.p1": "ZØLAN started producing young and self-taught, pairing a technical curiosity with a deep love for electronic house. After stepping away to focus on his studies, he came back with a sharper sound: immersive atmospheres built on the patience of progressive house, the emotion of melodic house and the weight of deep house.",
      "bio.p2": "His catalogue spans collaborations like <em>“Save Love”</em> with Chilean vocalist Maca Koller, and remixes such as <em>“No Vas Sola”</em>. Right now it's all studio work — sound design, production, and a sonic identity that keeps evolving.",
      "releases.eyebrow": "Discography",
      "releases.upcoming": "Upcoming",
      "releases.heading": "Releases.",
      "releases.link": "Full discography on Spotify →",
      "releases.hint": "Swipe for more →",
      "releases.smartlink": "Listen everywhere",
      "visual.eyebrow": "Identity",
      "visual.heading": "Visuals.",
      "conecta.eyebrow": "Connect",
      "conecta.heading": "Find me here.",
      "conecta.contact": "Press / Contact",
      "sound.label": "Sound",
      "next.eyebrow": "Next release",
      "next.cta": "Pre-save now",
      "next.days": "days",
      "next.hours": "hrs",
      "next.mins": "min",
      "next.secs": "sec",
      "footer.text": "Progressive · Melodic · Deep House — © <span id=\"year\"></span> ZØLAN. All rights reserved."
    },

    uk: {
      "nav.sonido": "Звук",
      "nav.lanzamientos": "Музика",
      "nav.visual": "Візуал",
      "nav.conecta": "Контакти",
      "nav.cta": "Слухати",
      "hero.subtitle": "Progressive, melodic і deep house у поєднанні.",
      "hero.cta_listen": "Слухати у Spotify",
      "hero.cta_releases": "Музика",
      "hero.scroll": "скрол",
      "sonido.eyebrow": "У студії",
      "sonido.heading": "Три текстури, один настрій.",
      "texture.progressive": "Повільна, продумана побудова. Шари, що наростають у напругу, а не в шум.",
      "texture.melodic": "Емоційне ядро. Мелодійні лінії, що ведуть трек від першого такту до останнього.",
      "texture.deep": "Теплий низ і простір, щоб дихати. Ф’южн, який дає кожному треку глибину.",
      "bio.p1": "ZØLAN почав створювати музику змолоду й самотужки, поєднавши технічну цікавість із любов’ю до електронного хаусу. Після перерви на навчання він повернувся з чіткішим звучанням: занурювальні атмосфери, побудовані на терплячості progressive house, емоційності melodic house і вазі deep house.",
      "bio.p2": "У його каталозі є колаборації, як-от <em>“Save Love”</em> з чилійською вокалісткою Maca Koller, і ремікси на кшталт <em>“No Vas Sola”</em>. Зараз усе — про студію: саунд-дизайн, продюсування і звукова ідентичність, що постійно розвивається.",
      "releases.eyebrow": "Дискографія",
      "releases.upcoming": "Незабаром",
      "releases.heading": "Релізи.",
      "releases.link": "Уся дискографія у Spotify →",
      "releases.hint": "Гортайте далі →",
      "releases.smartlink": "Слухати на всіх платформах",
      "visual.eyebrow": "Ідентичність",
      "visual.heading": "Візуал.",
      "conecta.eyebrow": "Контакти",
      "conecta.heading": "Знайди мене тут.",
      "conecta.contact": "Преса / Контакт",
      "sound.label": "Звук",
      "next.eyebrow": "Наступний реліз",
      "next.cta": "Pre-save зараз",
      "next.days": "днів",
      "next.hours": "год",
      "next.mins": "хв",
      "next.secs": "сек",
      "footer.text": "Progressive · Melodic · Deep House — © <span id=\"year\"></span> ZØLAN. Усі права захищені."
    },

    ru: {
      "nav.sonido": "Звук",
      "nav.lanzamientos": "Музыка",
      "nav.visual": "Визуал",
      "nav.conecta": "Контакты",
      "nav.cta": "Слушать",
      "hero.subtitle": "Progressive, melodic и deep house в сочетании.",
      "hero.cta_listen": "Слушать в Spotify",
      "hero.cta_releases": "Музыка",
      "hero.scroll": "скролл",
      "sonido.eyebrow": "В студии",
      "sonido.heading": "Три текстуры, одно настроение.",
      "texture.progressive": "Медленное, продуманное построение. Слои, которые нарастают в напряжение, а не в шум.",
      "texture.melodic": "Эмоциональное ядро. Мелодические линии, ведущие трек от первого такта до последнего.",
      "texture.deep": "Тёплый низ и пространство, чтобы дышать. Фьюжн, который даёт каждому треку глубину.",
      "bio.p1": "ZØLAN начал писать музыку в юном возрасте и самостоятельно, соединив техническое любопытство с любовью к электронному хаусу. После перерыва на учёбу он вернулся с более чётким звучанием: обволакивающие атмосферы, построенные на терпении progressive house, эмоциональности melodic house и весе deep house.",
      "bio.p2": "В его каталоге — коллаборации вроде <em>“Save Love”</em> с чилийской вокалисткой Maca Koller и ремиксы, такие как <em>“No Vas Sola”</em>. Сейчас всё внимание студии: саунд-дизайн, продюсирование и звуковая идентичность, которая продолжает развиваться.",
      "releases.eyebrow": "Дискография",
      "releases.upcoming": "Скоро",
      "releases.heading": "Релизы.",
      "releases.link": "Вся дискография в Spotify →",
      "releases.hint": "Листайте дальше →",
      "releases.smartlink": "Слушать на всех платформах",
      "visual.eyebrow": "Идентичность",
      "visual.heading": "Визуал.",
      "conecta.eyebrow": "Контакты",
      "conecta.heading": "Найди меня здесь.",
      "conecta.contact": "Пресса / Контакт",
      "sound.label": "Звук",
      "next.eyebrow": "Следующий релиз",
      "next.cta": "Pre-save сейчас",
      "next.days": "дней",
      "next.hours": "час",
      "next.mins": "мин",
      "next.secs": "сек",
      "footer.text": "Progressive · Melodic · Deep House — © <span id=\"year\"></span> ZØLAN. Все права защищены."
    },

    pl: {
      "nav.sonido": "Brzmienie",
      "nav.lanzamientos": "Muzyka",
      "nav.visual": "Wizualia",
      "nav.conecta": "Kontakt",
      "nav.cta": "Posłuchaj",
      "hero.subtitle": "Progressive, melodic i deep house w fuzji.",
      "hero.cta_listen": "Posłuchaj na Spotify",
      "hero.cta_releases": "Muzyka",
      "hero.scroll": "scroll",
      "sonido.eyebrow": "W studiu",
      "sonido.heading": "Trzy tekstury, jeden nastrój.",
      "texture.progressive": "Powolne, przemyślane budowanie. Warstwy, które narastają w napięcie, nigdy w hałas.",
      "texture.melodic": "Emocjonalny rdzeń. Melodyjne linie, które prowadzą utwór od pierwszego taktu do ostatniego.",
      "texture.deep": "Ciepły dół i przestrzeń, żeby oddychać. Fuzja, która nadaje każdemu utworowi głębię.",
      "bio.p1": "ZØLAN zaczął produkować młodo i samodzielnie, łącząc techniczną ciekawość z miłością do elektronicznego house’u. Po przerwie na studia wrócił z wyraźniejszym brzmieniem: wciągające atmosfery zbudowane na cierpliwości progressive house’u, emocjach melodic house’u i ciężarze deep house’u.",
      "bio.p2": "W jego katalogu są kolaboracje takie jak <em>“Save Love”</em> z chilijską wokalistką Maca Koller oraz remiksy, jak <em>“No Vas Sola”</em>. Teraz liczy się tylko studio: sound design, produkcja i tożsamość dźwiękowa, która wciąż się rozwija.",
      "releases.eyebrow": "Dyskografia",
      "releases.upcoming": "Wkrótce",
      "releases.heading": "Wydania.",
      "releases.link": "Pełna dyskografia na Spotify →",
      "releases.hint": "Przesuń dalej →",
      "releases.smartlink": "Posłuchaj na wszystkich platformach",
      "visual.eyebrow": "Tożsamość",
      "visual.heading": "Wizualia.",
      "conecta.eyebrow": "Kontakt",
      "conecta.heading": "Znajdź mnie tutaj.",
      "conecta.contact": "Prasa / Kontakt",
      "sound.label": "Dźwięk",
      "next.eyebrow": "Nadchodzące wydanie",
      "next.cta": "Pre-save teraz",
      "next.days": "dni",
      "next.hours": "godz",
      "next.mins": "min",
      "next.secs": "sek",
      "footer.text": "Progressive · Melodic · Deep House — © <span id=\"year\"></span> ZØLAN. Wszelkie prawa zastrzeżone."
    }
  };

  /* ------------------------------------------------------------------ */
  /* 2. Mapa país (código ISO-2 de la API) → idioma                      */
  /* ------------------------------------------------------------------ */
  var COUNTRY_TO_LANG = {
    // Ucrania, Rusia, Polonia — los que pediste explícitamente
    UA: "uk",
    RU: "ru",
    PL: "pl",
    BY: "ru", // Bielorrusia — ruso muy extendido

    // Países de habla hispana → español
    CL: "es", ES: "es", MX: "es", AR: "es", CO: "es", PE: "es",
    VE: "es", EC: "es", BO: "es", PY: "es", UY: "es", CR: "es",
    PA: "es", GT: "es", HN: "es", SV: "es", NI: "es", DO: "es",
    CU: "es", GQ: "es"
  };

  /* ------------------------------------------------------------------ */
  /* 3. Utilidades                                                       */
  /* ------------------------------------------------------------------ */
  function langFromBrowser() {
    var nav = (navigator.language || navigator.userLanguage || "en").toLowerCase();
    if (nav.indexOf("es") === 0) return "es";
    if (nav.indexOf("uk") === 0) return "uk";
    if (nav.indexOf("ru") === 0) return "ru";
    if (nav.indexOf("pl") === 0) return "pl";
    return DEFAULT_LANG;
  }

  function applyLanguage(lang) {
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    var dict = STRINGS[lang];

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key]) el.textContent = dict[key];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (dict[key]) el.innerHTML = dict[key];
    });

    document.documentElement.setAttribute("lang", lang);

    // Marcar visualmente el botón activo en ambos selectores (desktop y mobile)
    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
    });

    // Re-aplicar el año en el footer (el innerHTML de arriba lo resetea a vacío)
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    window.__zolanLang = lang;
  }

  function setLanguage(lang, remember) {
    applyLanguage(lang);
    if (remember) {
      try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* Safari privado, etc. */ }
    }
  }

  /* ------------------------------------------------------------------ */
  /* 4. Selectores manuales de idioma (nav + menú móvil)                 */
  /* ------------------------------------------------------------------ */
  function bindSwitchers() {
    document.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLanguage(btn.getAttribute("data-lang"), true);
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* 5. Arranque: localStorage > geolocalización por IP > idioma del navegador */
  /* ------------------------------------------------------------------ */
  function init() {
    bindSwitchers();

    var saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* noop */ }

    if (saved && SUPPORTED.indexOf(saved) !== -1) {
      applyLanguage(saved);
      return;
    }

    // Mientras llega la respuesta de geolocalización, mostramos algo razonable
    applyLanguage(langFromBrowser());

    // Servicio gratuito de geolocalización por IP, sin API key.
    // Si falla (bloqueado, sin internet, CORS, etc.) nos quedamos con el idioma del navegador.
    fetch("https://ipwho.is/")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (!data || data.success === false) return;
        var code = (data.country_code || "").toUpperCase();
        var mapped = COUNTRY_TO_LANG[code];
        if (mapped) applyLanguage(mapped); // no lo guardamos: es detección automática, no elección del usuario
      })
      .catch(function () { /* se queda con el idioma del navegador */ });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
