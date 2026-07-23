# ZØLAN — sitio web

Sitio de una sola página (landing) para ZØLAN. Es **HTML + CSS + JS puro** — sin frameworks,
sin paso de "build", sin `npm install` obligatorio. Esto es a propósito: así lo puedes editar
directo en VS Code y subirlo a Vercel sin complicarte.

```
zolan-site/
├── index.html          ← toda la estructura del sitio (secciones, textos, links)
├── css/
│   └── style.css       ← todo el diseño (colores, tipografías, animaciones)
├── js/
│   └── main.js         ← menú móvil, animaciones al hacer scroll, canvas del hero
├── assets/
│   ├── images/         ← acá van tus fotos (por ahora vacía, con instrucciones)
│   └── press/          ← por si luego quieres dejar un press kit / EPK en PDF
├── vercel.json
├── .gitignore
└── README.md            ← este archivo
```

## Qué contiene ya el sitio

- **Bio** basada en tu perfil real de Spotify (ZØLAN, autodidacta, progressive/melodic/deep house).
- **Discografía completa** con los 8 lanzamientos reales de tu Spotify, cada uno enlazado a su
  álbum/single (Echoes in the Silence, I Believe It, Ganda, No Vas Sola Remix, Wide Awake,
  Talk to Me (Tonight), Glowing Infrared, Save Love VIP Mix).
- **Links reales** a tu Spotify e Instagram (`@iamzolan`) y tu X (`@zolanmusic_`, según tu bio de Spotify).
- **Sin nada de conciertos/shows**, tal como pediste — el foco está 100% en estudio y sonido.
- Espacio para fotos y artwork que dejé como placeholders (ver `assets/images/README.md`).

Cosas que **debes revisar y personalizar** antes de lanzar:
- El correo de contacto de prensa (`mailto:contacto@zolanmusic.com`) — está en `index.html`,
  sección "Conecta". Cámbialo por tu correo real.
- Verifica que `https://twitter.com/zolanmusic_` sea realmente tu cuenta de X (lo tomé de tu bio
  de Spotify, pero confírmalo tú).
- Sube tus fotos reales (instrucciones detalladas en `assets/images/README.md`).

---

## Parte 1 — Abrir el proyecto en Visual Studio Code

1. Descarga/descomprime esta carpeta `zolan-site` en tu computador (por ejemplo, en tu
   Escritorio o en una carpeta `Proyectos`).
2. Abre **Visual Studio Code**.
3. Ve a **Archivo → Abrir carpeta...** (o `File → Open Folder...`) y selecciona la carpeta
   `zolan-site`.
4. En el panel izquierdo (Explorer) verás todos los archivos listados arriba.

### Ver el sitio en vivo mientras editas (opcional pero muy recomendado)

1. En VS Code, ve al ícono de Extensiones (el cuadradito en la barra lateral izquierda, o
   `Ctrl+Shift+X` / `Cmd+Shift+X` en Mac).
2. Busca **"Live Server"** (de Ritwick Dey) e instálala.
3. Click derecho sobre `index.html` en el panel izquierdo → **"Open with Live Server"**.
4. Se abrirá tu navegador en algo como `http://127.0.0.1:5500` mostrando el sitio. Cada vez que
   guardes un cambio (`Ctrl+S` / `Cmd+S`), la página se refresca sola.

### Cosas fáciles de editar

- **Textos**: abre `index.html`, busca el texto que quieras cambiar (Ctrl+F / Cmd+F) y edítalo
  directamente entre las etiquetas.
- **Colores**: abre `css/style.css`, arriba de todo está el bloque `:root { ... }` con todos los
  colores nombrados (`--violet`, `--cyan`, `--magenta`, etc). Cambia el valor hexadecimal y se
  actualiza en todo el sitio.
- **Tipografías**: también en `:root`, las variables `--font-display`, `--font-body`, `--font-mono`.
  Si quieres otra fuente de Google Fonts, cambias el `<link>` en el `<head>` de `index.html` y el
  nombre acá.

---

## Parte 2 — Subir el proyecto a GitHub

Si nunca has usado GitHub, aquí va paso a paso.

### 2.1. Crear cuenta y repositorio

1. Crea una cuenta en [github.com](https://github.com) si no tienes una.
2. Arriba a la derecha, click en el **+** → **"New repository"**.
3. Nombre sugerido: `zolan-site`.
4. Déjalo en **Public** (o Private si prefieres, ambas funcionan igual con Vercel).
5. **No** marques "Add a README" (ya tienes uno). Click en **"Create repository"**.
6. GitHub te va a mostrar una página con comandos — vas a usar la sección
   **"…or push an existing repository from the command line"**.

### 2.2. Subir tu carpeta desde VS Code

En VS Code, abre la terminal integrada: menú **Terminal → Nueva terminal** (o `` Ctrl+` ``).
Pega esto línea por línea (reemplaza `TU-USUARIO` por tu usuario de GitHub):

```bash
git init
git add .
git commit -m "Primer lanzamiento del sitio de ZØLAN"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/zolan-site.git
git push -u origin main
```

Si es la primera vez que usas Git en tu computador, antes de lo anterior necesitas decirle
quién eres (solo se hace una vez, cambia los datos por los tuyos):

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu-correo@ejemplo.com"
```

Si no tienes Git instalado, VS Code te va a avisar. Descárgalo desde
[git-scm.com](https://git-scm.com/downloads) e instálalo (siguiente, siguiente, siguiente),
luego reinicia VS Code.

Al hacer `git push` te va a pedir iniciar sesión en GitHub — sigue el flujo que te muestre
(normalmente abre el navegador y te pide autorizar).

---

## Parte 3 — Publicar en Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta — lo más fácil es click en
   **"Continue with GitHub"** para que quede conectado de una.
2. Una vez adentro, click en **"Add New..." → "Project"**.
3. Vercel te va a mostrar tus repositorios de GitHub — busca `zolan-site` y click en **"Import"**.
4. En la pantalla de configuración:
   - **Framework Preset**: déjalo en **"Other"** (es un sitio estático, no necesita build).
   - **Build Command**: déjalo vacío.
   - **Output Directory**: déjalo vacío (o `.` si te obliga a poner algo).
5. Click en **"Deploy"**.
6. En 20-30 segundos vas a tener una URL tipo `zolan-site.vercel.app` con tu sitio funcionando.

### Actualizar el sitio después de hacer cambios

Cada vez que quieras subir un cambio (por ejemplo, después de agregar tus fotos):

```bash
git add .
git commit -m "Agrego fotos"
git push
```

Vercel detecta el push automáticamente y vuelve a publicar el sitio solo — no necesitas volver
a hacer nada en Vercel.

### Dominio propio (opcional)

Si más adelante compras un dominio (ej. `zolanmusic.com`), en el proyecto dentro de Vercel ve a
**Settings → Domains** y sigue las instrucciones para apuntarlo. Vercel te da los registros DNS
exactos que debes configurar donde compraste el dominio.

---

## Notas técnicas rápidas

- El "orbe" animado del hero es un `<canvas>` con barras generadas por código (no analiza audio
  real, es un efecto ambiental). Si en algún momento quieres que reaccione a una canción real,
  se puede conectar a la Web Audio API — avísame y lo armamos.
- El sitio respeta `prefers-reduced-motion`: si alguien tiene las animaciones reducidas activadas
  en su sistema, las animaciones se desactivan automáticamente.
- Todo el layout está hecho **mobile-first**: los estilos base son para celular y se van
  ampliando con `@media (min-width: ...)` para tablet/escritorio.
- No hay dependencias de npm ni paso de compilación — es intencional, para que sea lo más simple
  posible de mantener y editar.
