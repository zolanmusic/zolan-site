# Cómo agregar tus fotos y artwork

Esta carpeta está vacía a propósito. El sitio hoy usa **bloques de color generados por CSS** como
placeholder (en la sección "Visual" y en las carátulas de "Lanzamientos"). Cuando tengas tus fotos,
sigue esto:

## 1. Fotos de la galería (sección "Visual")

1. Copia tus fotos aquí, por ejemplo:
   - `assets/images/foto-01.jpg`
   - `assets/images/foto-02.jpg`
   - `assets/images/foto-03.jpg`
   - `assets/images/foto-04.jpg`
2. Abre `index.html`, busca la sección `<!-- ============ VISUAL / GALERÍA ============ -->`.
3. Cada `<div class="gallery__item" data-placeholder="foto-01"></div>` cámbialo por:
   ```html
   <div class="gallery__item" style="background-image:url('assets/images/foto-01.jpg')"></div>
   ```
4. En `css/style.css`, dentro de `.gallery__item` agrega (si no está):
   ```css
   background-size: cover;
   background-position: center;
   ```
   (ya está preparado el resto de estilos, solo faltará la imagen real).

## 2. Carátulas de lanzamientos (sección "Lanzamientos")

Ahora mismo cada carátula es un gradiente (`.release-card__art--1` a `--6` en `style.css`).
Si tienes el artwork real de cada canción:

1. Guarda las imágenes cuadradas (1000x1000px recomendado) en `assets/images/covers/`.
2. En `index.html`, reemplaza:
   ```html
   <div class="release-card__art release-card__art--1" data-cover="1"></div>
   ```
   por:
   ```html
   <div class="release-card__art" style="background-image:url('assets/images/covers/echoes-in-the-silence.jpg'); background-size:cover; background-position:center;"></div>
   ```

## 3. Foto de portada para redes (Open Graph)

Sube una imagen 1200x630px como `assets/images/og-cover.jpg`. Ya está referenciada en el `<head>`
del `index.html` (`meta property="og:image"`), así que apenas la subas, los links que compartas en
WhatsApp/Instagram/X mostrarán una vista previa con esa imagen.

## Recomendaciones de peso

Para que el sitio cargue rápido (importante para SEO y para que no se sienta "pesado" en mobile):
- Exporta tus fotos en `.jpg` o `.webp` (webp pesa menos).
- Ancho máximo recomendado: 1600px para fotos de galería, 1000px para carátulas.
- Puedes comprimir gratis en https://squoosh.app antes de subirlas.
