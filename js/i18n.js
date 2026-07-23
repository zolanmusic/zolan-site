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
      "nav.lanzamientos": "Lanzamientos",
      "nav.visual": "Visual",
      "nav.conecta": "Conecta",
      "nav.cta": "Escuchar",
      "hero.subtitle": "ZØLAN construye atmósferas — capas profundas, melodías que respiran y groove progresivo pensado para escucharse con los ojos cerrados.",
      "hero.cta_listen": "Escuchar en Spotify",
      "hero.cta_releases": "Ver lanzamientos",
      "hero.scroll": "scroll",
      "sonido.eyebrow": "El estudio",
      "sonido.heading": "Tres texturas, un mismo estado de ánimo.",
      "texture.progressive": "Construcción lenta y deliberada. Capas que se acumulan hasta convertirse en tensión, nunca en ruido.",
      "texture.melodic": "El centro emocional. Líneas melódicas que llevan la narrativa del track de principio a fin.",
      "texture.deep": "Graves cálidos y espacio de sobra. La fusión que le da profundidad y calma a cada lanzamiento.",
      "bio.p1": "ZØLAN empezó a producir desde muy joven, de forma autodidacta, mezclando curiosidad técnica con referencias del house electrónico global. Tras una pausa dedicada a sus estudios, volvió con un sonido más definido: atmósferas envolventes que combinan la construcción del progressive house, la emoción del melodic house y la profundidad del deep house.",
      "bio.p2": "Su catálogo incluye colaboraciones como <em>“Save Love”</em>, junto a la cantante chilena Maca Koller, y remixes propios como <em>“No Vas Sola”</em>. Hoy el foco está completo en estudio: diseño de sonido, producción y una identidad sonora en constante evolución.",
      "releases.eyebrow": "Discografía",
      "releases.heading": "Lanzamientos.",
      "releases.link": "Ver catálogo completo en Spotify →",
      "releases.hint": "Desliza para ver todo el catálogo →",
      "releases.smartlink": "Escuchar \u201cEchoes in the Silence\u201d en todas las plataformas",
      "visual.eyebrow": "Identidad",
      "visual.heading": "Visual.",
      "visual.note": "Espacio reservado para fotografía de estudio y artwork. Reemplaza estos bloques por tus propias imágenes.",
      "conecta.eyebrow": "Conecta",
      "conecta.heading": "Sígueme el rastro.",
      "conecta.contact": "Prensa / Contacto",
      "footer.text": "Progressive · Melodic · Deep House — © <span id=\"year\"></span> ZØLAN. Todos los derechos reservados."
    },

    en: {
      "nav.sonido": "Sound",
      "nav.lanzamientos": "Releases",
      "nav.visual": "Visual",
      "nav.conecta": "Connect",
      "nav.cta": "Listen",
      "hero.subtitle": "ZØLAN builds atmospheres — deep layers, melodies that breathe, and progressive groove made to be heard with your eyes closed.",
      "hero.cta_listen": "Listen on Spotify",
      "hero.cta_releases": "See releases",
      "hero.scroll": "scroll",
      "sonido.eyebrow": "The studio",
      "sonido.heading": "Three textures, one mood.",
      "texture.progressive": "Slow, deliberate build. Layers that stack into tension, never noise.",
      "texture.melodic": "The emotional core. Melodic lines that carry the track's story from start to finish.",
      "texture.deep": "Warm low end and plenty of space. The fusion that gives every release its depth and calm.",
      "bio.p1": "ZØLAN started producing at a young age, self-taught, mixing technical curiosity with references from global electronic house music. After a break to focus on his studies, he came back with a more defined sound: immersive atmospheres blending the build of progressive house, the emotion of melodic house, and the depth of deep house.",
      "bio.p2": "His catalogue includes collaborations like <em>“Save Love”</em>, with Chilean singer Maca Koller, and remixes such as <em>“No Vas Sola”</em>. Today the focus is entirely on the studio: sound design, production, and a sonic identity in constant evolution.",
      "releases.eyebrow": "Discography",
      "releases.heading": "Releases.",
      "releases.link": "See the full catalogue on Spotify →",
      "releases.hint": "Swipe to see the full catalogue →",
      "releases.smartlink": "Listen to \u201cEchoes in the Silence\u201d everywhere",
      "visual.eyebrow": "Identity",
      "visual.heading": "Visual.",
      "visual.note": "Reserved space for studio photography and artwork.",
      "conecta.eyebrow": "Connect",
      "conecta.heading": "Follow the trail.",
      "conecta.contact": "Press / Contact",
      "footer.text": "Progressive · Melodic · Deep House — © <span id=\"year\"></span> ZØLAN. All rights reserved."
    },

    uk: {
      "nav.sonido": "Звук",
      "nav.lanzamientos": "Релізи",
      "nav.visual": "Візуал",
      "nav.conecta": "Контакти",
      "nav.cta": "Слухати",
      "hero.subtitle": "ZØLAN створює атмосфери — глибокі шари, мелодії, що дихають, і прогресивний грув, який хочеться слухати із заплющеними очима.",
      "hero.cta_listen": "Слухати на Spotify",
      "hero.cta_releases": "Дивитись релізи",
      "hero.scroll": "скрол",
      "sonido.eyebrow": "Студія",
      "sonido.heading": "Три текстури, один настрій.",
      "texture.progressive": "Повільна, продумана побудова. Шари, що накопичуються до напруги, а не до шуму.",
      "texture.melodic": "Емоційний центр. Мелодійні лінії, що ведуть історію треку від початку до кінця.",
      "texture.deep": "Теплі низькі частоти і багато простору. Ф'южн, що надає кожному релізу глибини й спокою.",
      "bio.p1": "ZØLAN почав продюсувати змолоду, самотужки, поєднуючи технічну цікавість із впливами світової електронної house-музики. Після паузи на навчання він повернувся з більш чітким звучанням: атмосферні композиції, що поєднують побудову progressive house, емоційність melodic house та глибину deep house.",
      "bio.p2": "До каталогу входять колаборації, як-от <em>“Save Love”</em> із чилійською співачкою Maca Koller, та власні ремікси, як-от <em>“No Vas Sola”</em>. Сьогодні весь фокус — на студії: саунд-дизайн, продюсування та звукова ідентичність у постійному розвитку.",
      "releases.eyebrow": "Дискографія",
      "releases.heading": "Релізи.",
      "releases.link": "Повний каталог на Spotify →",
      "releases.hint": "Гортайте, щоб побачити весь каталог →",
      "releases.smartlink": "Слухати “Echoes in the Silence” на всіх платформах",
      "visual.eyebrow": "Ідентичність",
      "visual.heading": "Візуал.",
      "visual.note": "Місце для студійних фото та артворку.",
      "conecta.eyebrow": "Контакти",
      "conecta.heading": "Слідкуй за треком.",
      "conecta.contact": "Преса / Контакт",
      "footer.text": "Progressive · Melodic · Deep House — © <span id=\"year\"></span> ZØLAN. Усі права захищені."
    },

    ru: {
      "nav.sonido": "Звук",
      "nav.lanzamientos": "Релизы",
      "nav.visual": "Визуал",
      "nav.conecta": "Контакты",
      "nav.cta": "Слушать",
      "hero.subtitle": "ZØLAN создаёт атмосферу — глубокие слои, мелодии, которые дышат, и прогрессивный грув, который хочется слушать с закрытыми глазами.",
      "hero.cta_listen": "Слушать на Spotify",
      "hero.cta_releases": "Смотреть релизы",
      "hero.scroll": "скролл",
      "sonido.eyebrow": "Студия",
      "sonido.heading": "Три текстуры, одно настроение.",
      "texture.progressive": "Медленное, продуманное построение. Слои, которые накапливаются в напряжение, а не в шум.",
      "texture.melodic": "Эмоциональный центр. Мелодические линии, которые ведут историю трека от начала до конца.",
      "texture.deep": "Тёплые низкие частоты и много пространства. Фьюжн, который придаёт каждому релизу глубину и спокойствие.",
      "bio.p1": "ZØLAN начал продюсировать в юном возрасте, самостоятельно, сочетая техническую любознательность со звучанием мировой электронной house-музыки. После паузы на учёбу он вернулся с более чётким звучанием: атмосферные композиции, объединяющие построение progressive house, эмоциональность melodic house и глубину deep house.",
      "bio.p2": "В каталоге есть коллаборации, например <em>“Save Love”</em> с чилийской певицей Maca Koller, и собственные ремиксы, такие как <em>“No Vas Sola”</em>. Сегодня весь фокус — на студии: саунд-дизайн, продюсирование и звуковая идентичность в постоянном развитии.",
      "releases.eyebrow": "Дискография",
      "releases.heading": "Релизы.",
      "releases.link": "Полный каталог в Spotify →",
      "releases.hint": "Листайте, чтобы увидеть весь каталог →",
      "releases.smartlink": "Слушать “Echoes in the Silence” на всех платформах",
      "visual.eyebrow": "Идентичность",
      "visual.heading": "Визуал.",
      "visual.note": "Место для студийных фото и артворка.",
      "conecta.eyebrow": "Контакты",
      "conecta.heading": "Следи за треком.",
      "conecta.contact": "Пресса / Контакт",
      "footer.text": "Progressive · Melodic · Deep House — © <span id=\"year\"></span> ZØLAN. Все права защищены."
    },

    pl: {
      "nav.sonido": "Dźwięk",
      "nav.lanzamientos": "Wydania",
      "nav.visual": "Wizualia",
      "nav.conecta": "Kontakt",
      "nav.cta": "Słuchaj",
      "hero.subtitle": "ZØLAN buduje atmosfery — głębokie warstwy, melodie, które oddychają, i progresywny groove stworzony do słuchania z zamkniętymi oczami.",
      "hero.cta_listen": "Słuchaj na Spotify",
      "hero.cta_releases": "Zobacz wydania",
      "hero.scroll": "scroll",
      "sonido.eyebrow": "Studio",
      "sonido.heading": "Trzy tekstury, jeden nastrój.",
      "texture.progressive": "Powolna, przemyślana budowa. Warstwy, które narastają w napięcie, nigdy w szum.",
      "texture.melodic": "Emocjonalne centrum. Melodyjne linie, które prowadzą historię utworu od początku do końca.",
      "texture.deep": "Ciepłe niskie tony i mnóstwo przestrzeni. Fuzja, która nadaje każdemu wydaniu głębię i spokój.",
      "bio.p1": "ZØLAN zaczął produkować muzykę w młodym wieku, samodzielnie, łącząc techniczną ciekawość z inspiracjami ze światowej muzyki house. Po przerwie poświęconej studiom wrócił z bardziej wyrazistym brzmieniem: wciągające atmosfery łączące budowę progressive house, emocje melodic house i głębię deep house.",
      "bio.p2": "Jego katalog obejmuje kolaboracje, takie jak <em>“Save Love”</em> z chilijską wokalistką Maca Koller, oraz własne remiksy, jak <em>“No Vas Sola”</em>. Dziś cała uwaga skupiona jest na studiu: sound design, produkcji i tożsamości dźwiękowej w ciągłym rozwoju.",
      "releases.eyebrow": "Dyskografia",
      "releases.heading": "Wydania.",
      "releases.link": "Zobacz pełny katalog na Spotify →",
      "releases.hint": "Przesuń, aby zobaczyć cały katalog →",
      "releases.smartlink": "Słuchaj “Echoes in the Silence” na wszystkich platformach",
      "visual.eyebrow": "Tożsamość",
      "visual.heading": "Wizualia.",
      "visual.note": "Miejsce zarezerwowane na zdjęcia ze studia i grafiki.",
      "conecta.eyebrow": "Kontakt",
      "conecta.heading": "Śledź ślad.",
      "conecta.contact": "Prasa / Kontakt",
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
