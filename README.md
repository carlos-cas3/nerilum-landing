# Nerilum landing

Landing page modular, sin dependencias. Abre `index.html` en el navegador y funciona.

## Estructura

```
index.html              página final (generada, no la edites a mano)
build.js                une la plantilla con las secciones
src/
  index.template.html   esqueleto: head, orden de las secciones y scripts
  sections/             el HTML de cada sección
    nav.html            logotipo, enlaces y botón Ingreso
    hero.html           portada con la demo del escaneo
    contexto.html       gráfico de 100 puntos y datos de la OMS
    como.html           pasos, historial y reporte PDF
    privacidad.html     banda verde de privacidad
    cierre.html         investigación y aviso médico
    footer.html         pie de página
    totop.html          botón flotante para subir
    progress.html       barra de progreso de lectura
css/                    un archivo por sección, más tokens, base y botones
js/                     un archivo por comportamiento
```

## Cómo modificar una sección

1. Edita su HTML en `src/sections/` y su estilo en `css/` (el archivo tiene el mismo nombre).
2. Ejecuta `node build.js` para regenerar `index.html`.
3. Si solo cambiaste CSS o JS, no hace falta el paso 2: recarga la página.

## Dónde está cada cosa

- **Colores y tipografías:** `css/tokens.css` (paleta, modo claro y oscuro).
- **URL del botón Ingreso:** aparece en `src/sections/nav.html` y en `src/sections/cierre.html` (ahora apunta a google.com).
- **Datos de ejemplo de la demo del escaneo:** arreglo `D` al inicio de `js/scan-demo.js`.
- **Tiempo de cada categoría de la demo:** `css/scan-demo.css`, regla `.timer b.cur i` (3.2s).
- **Textos del gráfico de puntos:** `src/sections/contexto.html`. La cantidad de puntos por grupo está en `js/waffle.js`.
- **Animaciones:** cada archivo CSS de sección trae su bloque `prefers-reduced-motion`, así se respetan las preferencias del dispositivo.

## Animaciones ligadas al scroll

Usan CSS puro (`animation-timeline: view()` / `scroll()`), sin JavaScript:

- **Barra de progreso de lectura:** `css/progress.css`.
- **Gráfico de puntos:** se llena según avanzas (`css/contexto.css`, bloque `@supports` al final).
- **Pasos:** la línea se dibuja y cada paso aparece en orden (`css/como.css`).
- **Historial y reporte PDF:** las filas entran y la hoja se acomoda (`css/como.css`).
- **Privacidad:** el subrayado de cada frase avanza con el scroll (`css/privacidad.css`).

Todo va dentro de `@supports (animation-timeline: view())` y de `prefers-reduced-motion: no-preference`. En navegadores sin soporte (por ejemplo Firefox, por ahora) se mantiene la versión anterior, que se activa al entrar en pantalla con `js/reveal.js`. Para ajustar el ritmo, cambia los porcentajes de `animation-range`.

## Agregar una sección nueva

1. Crea `src/sections/mi-seccion.html`.
2. Agrega `<!-- @include sections/mi-seccion.html -->` en `src/index.template.html`.
3. Crea `css/mi-seccion.css` y enlázalo con un `<link>` en la plantilla.
4. Ejecuta `node build.js`.

Los scripts son clásicos (no módulos) a propósito, para que la página funcione abriendo el archivo directamente, sin servidor.
