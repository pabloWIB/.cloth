# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/).

## [2.0.0] — 2026-07-30

Pasada completa de auditoría y pulido sobre el proyecto de 2024. **No es un rebuild:**
se conservaron el diseño y todo el contenido; se reconstruyó lo que había debajo.

Base de comparación: commit `b3456ae`.
84 archivos tocados · +2 579 / −2 238 líneas · 13 commits.

### Resumen

| | Antes | Después |
|---|---:|---:|
| Peso del repo | 2.70 MB | **611 KB** |
| Peso transferido | 1.17 MB | **149 KB** |
| Peticiones a terceros | 10 | **0** |
| Dependencias JS | 4 (351 KB) | **0** |
| Lighthouse móvil (P/A/BP/SEO) | 67 / 96 / 100 / 91 | **99-100 / 100 / 100 / 100** |
| Lighthouse escritorio | 97 / 97 / 100 / 91 | **100 / 100 / 100 / 100** |
| LCP móvil | 7.1 s | **1.6-2.0 s** |
| TBT | 170 ms | **0 ms** |
| Errores W3C | 6 | **0** |
| Breakpoints | 3 | **1** |
| Páginas | 1 | 2 (con `404.html`) |

---

### Fase 1 — Auditoría (`3af3907`)

Inventario de los 26 archivos. Se documentó el estado inicial en
`docs/audit-inventory.md` antes de tocar nada.

- **5 assets huérfanos** sin referenciar: 1.59 MB, el **60 % del repo**.
- **jQuery cargado dos veces**, una de ellas la `3.0.0-beta1`.
- **Popper.js** cargado sin un solo componente que lo usara.
- `.container` del proyecto **pisada por la de Bootstrap**, que era la que daba el ancho.
- `normalize.css` contaminado con `*{transition:.3s}` y un scrollbar morado.
- `fonts.css` aplicaba estilos a un selector `su` inexistente.
- `prepros.config`: 22 KB de configuración de IDE commiteada.
- 15 `href=""` que recargaban la página al pulsar.
- **README de otro proyecto** («Client Opinion»).
- 5 bugs de layout confirmados en navegador, con **0 errores en consola**.

### Fase 2 — Estructura (`b735985`)

- `CSS/`, `JS/`, `IMG/` → `assets/{css,js,img,icons}`, con `git mv` para conservar historial.
- Huérfanos y archivos muertos a `_archive/`, fuera de git y recuperables del historial.
- Todas las rutas actualizadas. Verificado: **0 respuestas 404**.

### Fase 3 — Higiene (`6e516fc`)

- `.gitignore`, `.editorconfig` (utf-8, LF, indent 2), `.gitattributes`, `LICENSE` MIT.
- Iconos a kebab-case.
- Comprobado: sin secretos, sin rutas locales, sin mojibake. Todo UTF-8 sin BOM.

### Fase 4 — Imágenes (`624b260`)

- 6 imágenes a **WebP q82** con EXIF eliminado y nombres descriptivos: **411 KB → 57 KB (−86 %)**.
- **Favicon reconstruido**: era un PNG de 1024×1024 y **642 KB** para un hueco de 32 px.
  Recortado al círculo y cuantizado → **32 KB (−95 %)**, más el set completo
  (`.ico` multirresolución, 192, 512, apple-touch, webmanifest).
- Open Graph 1200×630 en webp + jpg de respaldo.
- SVG con `svgo`: 5 382 → 2 920 B (−45 %).
- `width`/`height` en las **23 imágenes** → CLS a 0. LCP con `fetchpriority`, resto `lazy`.
- **Total imágenes: 2 678 582 B → 194 029 B (−92.8 %).**

### Fase 5 — HTML, `<head>` y accesibilidad (`d7c9c63`)

- Landmarks reales: `header`, `nav`, `main`, `section`, `footer`.
- Iconos-`div` → `<button aria-label>`; controles del carrusel → `<button>`.
- Jerarquía corregida: `01/03` era un `h3` y PREVIOUS/NEXT eran `h5` (saltando `h4`).
- Skip link, `:focus-visible`, `prefers-reduced-motion`, submenú por teclado con `:focus-within`.
- `<title>` de 6 → 46 caracteres. Description de 156 tomada del copy real. Canonical,
  Open Graph, Twitter Card, `theme-color`, JSON-LD `WebSite`.
- `preconnect` duplicado y dos peticiones de fuentes → una sola.
- `lang="es"` en los elementos en español.
- Errata corregida: «**EThis** hoodie» → «This hoodie».
- **Contraste: 10/10 pares pasan AA.**

### Fase 6 — CSS: tokens y arquitectura (`ad6ba83`)

- Un `styles.css` de 517 líneas generadas desde SCSS → **5 hojas** legibles.
- **12 valores de espaciado sueltos** → escala única de 8 pasos.
- **9 tamaños de fuente fijos** → escala fluida de 6 pasos con `clamp()`.
- **132 líneas de prefijos** `-webkit-box` / `-ms-flexbox` eliminadas.
- Cadenas `:nth-child()` → clases semánticas.
- `--ink` fijado a `#212529`: **ese color lo ponía Bootstrap**, no el proyecto.
- `.container` → `.slide-container` con ancho propio: fin de la colisión.
- Eliminados `*{transition:.3s}`, el scrollbar `#5308FC` y el `background:purple` de depuración.
- El subrayado del nav pasa de tres bloques jQuery a CSS `:hover` / `:focus-within`.
- **Corregido: Bootstrap se cargaba después de las hojas propias** y su `a{color:#007bff}`
  teñía de azul toda la navegación.

### Fase 7 — Responsive (`2560a58`)

Las tres causas raíz de que el sitio estuviera roto:

1. **El carrusel tapaba la cabecera.** El JS medía la altura de los slides *antes de que
   cargaran las imágenes* y fijaba `min-height:972px` sobre un contenedor de `60vh`;
   con `place-content:center` sobresalía 190-250 px por arriba.
2. **`body{height:100vh; overflow:hidden}`** dejaba el contenido cortado **inalcanzable**
   en móvil. Ahora `min-height:100svh`, con `svh` para el salto de barra de Safari iOS.
3. **`flex-flow: column wrap`**: al no caber, el footer **saltaba a una segunda columna
   del flex** y se dibujaba encima del contenido.

Además: iconos de utilidad ocultos en móvil (se solapaban con la imagen), miniaturas en
grid de 3 en vez de apiladas, párrafo de 13 px → 16-17 px, línea limitada a 65ch,
**44×44 px mínimo en todo lo interactivo**, y breakpoints mobile-first (3 → 1 real).

Resultado en 8 anchos (320-1920): **0 overflow horizontal, 0 errores, 0 objetivos táctiles pequeños.**

### Fase 8 — UX/UI (`9c42d1b`)

- **`404.html`** con la identidad del sitio y ruta de vuelta.
- 4 estados en todo lo interactivo (+ `:disabled`).
- Enlaces del footer distinguibles; copyright con año dinámico.
- `cursor:pointer` restringido a controles reales (normalize se lo ponía a `input` y `textarea`).
- `docs/improvements.md` con 13 propuestas **no aplicadas** y 4 ideas descartadas.

### Fase 9 — JavaScript (`2469603`)

- **jQuery ×2 + Popper + Bootstrap JS (210 KB) → 136 líneas propias (4.7 KB), −97.8 %.**
- Carrusel reescrito: prev/next, circular, **flechas de teclado**, y rotación automática
  **pausable** al pasar el ratón, al enfocar dentro, al ocultar la pestaña y con
  `prefers-reduced-motion`. La versión con `data-ride` no permitía pararla — incumplía WCAG 2.2.2.
- Menú móvil: cierra con `Esc` devolviendo el foco, al navegar y al volver a escritorio;
  `aria-expanded`, `aria-label` y bloqueo de scroll sincronizados.
- Guardas contra nodos ausentes. Todo con `defer`, nada bloqueante.

### Fase 10 — Rendimiento (`256bf50`)

- **CSS de Bootstrap eliminado** (141 KB): última petición a terceros.
- Judson y Nunito Sans **autoalojadas** en woff2 con `font-display:swap`.
- `preload` de la fuente crítica y de la imagen LCP.
- **Corregido: `role="group"` no es válido en `<article>`** — las slides pasan a `<div>`
  según el patrón APG. Eso subió Accessibility a 100.
- Móvil: **67 → 99-100**. Escritorio: **100 en las cuatro categorías**.

### Fase 11 — QA (`221c9ad`)

- **6 errores W3C** corregidos: `<div>` dentro de `<button>`, que solo admite contenido
  de frase. → **0 errores y 0 warnings** en ambas páginas.
- Enlaces de nav a 44 px de ancho mínimo.
- **Cross-browser en Chromium, Firefox y WebKit**: geometría idéntica dentro de 3 px,
  0 errores, fuentes y `100svh` soportados en los tres.
- Teclado: 17 paradas en orden lógico, **todas con foco visible**.
- Contraste: 26 nodos medidos entre las dos páginas, **ninguno por debajo de AA**.

### Fase 12 — Documentación (`ea2796e`)

- README reescrito. El anterior describía **«Client Opinion»**, otro repo, con un árbol
  de carpetas inexistente, la afirmación «No Dependencies» mientras cargaba cuatro
  librerías, y una imagen enlazada desde el repo de otro usuario.
- 9 documentos en `docs/` y 7 capturas, incluida `cover.webp` 1200×630.

### Fase 13 — Despliegue (`6ff5d34`)

- `vercel.json`: `cleanUrls`, caché inmutable para `/assets` y `/seo`, cabeceras de seguridad.
- **`404.html` a rutas absolutas**: el host la sirve para cualquier profundidad, y las
  rutas relativas habrían resuelto contra esa URL.

---

## Pendiente

No es deuda técnica, sino decisiones y contenido que no están en el repo.
Detalle en [`docs/needs-input.md`](docs/needs-input.md) y
[`docs/improvements.md`](docs/improvements.md).

- **Derechos de las fotografías.** Son de una colección H&M × Stranger Things
  (la etiqueta se lee en `detalle-etiqueta.webp`). Es el punto más delicado si el repo
  es público.
- **16 enlaces sin destino**, marcados `[FALTA]` en el HTML.
- **Las 3 slides son el mismo producto**: mismo `h2`, mismas miniaturas. El contador
  dice «01/03» y promete tres.
- Contacto y aviso legal en el footer.
- Comportamiento de los botones de buscar, carrito y cuenta.
- Confirmar el nombre del `LICENSE` y el dominio canónico.

## [1.0.0] — 2024

Versión original.
