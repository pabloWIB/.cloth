# Auditoría UX / UI / accesibilidad — `.cloth`

Objetivo: WCAG 2.1 nivel AA. Página única (`index.html`).
Severidad: **alta** = bloquea uso · **media** = degrada la experiencia · **baja** = pulido.

## Accesibilidad

| # | Hallazgo | Sev. | Estado |
|---|---|---|---|
| A01 | Ningún `<img>` tenía `width`/`height` → CLS en cada carga | alta | corregido (fase 4) |
| A02 | 8 fotos de producto con `alt=""` siendo contenido informativo | alta | corregido (fase 4) |
| A03 | `next-line.svg` con `alt="Previous"` (etiqueta equivocada) | media | corregido (fase 4) |
| A04 | Botón de menú era un `<div>`: no enfocable ni operable por teclado | alta | corregido (fase 5) |
| A05 | Iconos buscar/carrito/usuario eran `<div><img>`: invisibles para lectores de pantalla | alta | corregido (fase 5) — ahora `<button aria-label>` |
| A06 | Controles del carrusel eran `<a role="button">` con `href="#carrusel"` | media | corregido (fase 5) — ahora `<button>` |
| A07 | Sin enlace de salto al contenido | media | corregido (fase 5) |
| A08 | Sin `:focus-visible` en ningún elemento interactivo | alta | corregido (fase 5) |
| A09 | Submenú «Productos» solo abría con `:hover`: inaccesible por teclado | alta | corregido (fase 5) — añadido `:focus-within` |
| A10 | `prefers-reduced-motion` no respetado (y `*{transition:.3s}` global) | media | corregido (fase 5) |
| A11 | Jerarquía de títulos saltaba `h3` → `h5` | media | corregido (fase 5) — `01/03` es `<p>`, PREVIOUS/NEXT son `<span>` |
| A12 | `<html lang="en">` con elementos en español sin marcar | baja | corregido (fase 5) — `lang="es"` en «Productos» y «Producto 1-3» |
| A13 | Menú móvil usaba `<ol>` (lista ordenada) para navegación | baja | corregido (fase 5) — `<nav><ul>` |
| A14 | Carrusel sin semántica de carrusel para lectores de pantalla | media | corregido (fase 5) — `aria-roledescription`, `aria-label` por slide |
| A15 | Contraste de texto | — | **verificado, 10/10 pares pasan AA** (mínimo medido 12.82:1) |
| A16 | Menú móvil no cierra con `Esc` ni bloquea el scroll del body | alta | pendiente (fase 7) |
| A17 | `aria-expanded` del botón de menú no se actualiza al abrir | media | pendiente (fase 9) |
| A18 | Áreas táctiles por debajo de 44×44 px (iconos de 20-25 px) | media | pendiente (fase 7) |

### Contraste medido

| Elemento | Color | Fondo | Ratio | Mínimo | Resultado |
|---|---|---|---:|---:|---|
| `h1` marca | `#212529` | `#ffffff` | 15.43:1 | 3:1 | OK |
| Nav principal | `#000000` | `#ffffff` | 21.00:1 | 4.5:1 | OK |
| Dropdown | `#000000` | `#ffffff` | 21.00:1 | 4.5:1 | OK |
| PREVIOUS / NEXT | `#000000` | `#ffffff` | 21.00:1 | 4.5:1 | OK |
| Contador `01/03` | `#212529` | `#ffffff` | 15.43:1 | 3:1 | OK |
| `h2` producto | `#212529` | `#ffffff` | 15.43:1 | 3:1 | OK |
| Párrafo | `#212529` | `#ffffff` | 15.43:1 | 4.5:1 | OK |
| Botón CTA | `#ffffff` | `#323232` | 12.82:1 | 4.5:1 | OK |
| Footer | `#000000` | `#ffffff` | 21.00:1 | 4.5:1 | OK |
| Menú móvil | `#000000` | `#ffffff` | 21.00:1 | 4.5:1 | OK |

**Ningún par falla.** Aviso: el `#212529` no es del proyecto, lo aporta Bootstrap
(`$body-color`). Al retirar Bootstrap el texto pasaría a negro puro; se fija el valor
explícitamente en tokens (fase 6) para que el retiro no cambie nada.

## SEO y `<head>`

| # | Hallazgo | Sev. | Estado |
|---|---|---|---|
| S01 | `<title>` era `.cloth` (6 caracteres, sin contexto) | alta | corregido — 46 caracteres |
| S02 | Sin `meta description` | alta | corregido — 156 caracteres, tomados del copy real |
| S03 | Sin `canonical` | media | corregido |
| S04 | Sin Open Graph ni Twitter Card | media | corregido + imagen 1200×630 |
| S05 | Sin `theme-color` | baja | corregido (`#ffffff`, el fondo real) |
| S06 | Sin datos estructurados | baja | corregido — `WebSite` (ver nota) |
| S07 | `preconnect` a Google Fonts duplicado, y 2 peticiones de CSS de fuentes | media | corregido — un `preconnect` y una sola petición combinada |
| S08 | Favicon de 642 KB | alta | corregido (fase 4) |

Nota sobre datos estructurados: solo se declara `WebSite`, que es verificable.
No se añade `Organization`, `LocalBusiness` ni `Product` porque exigirían datos de
negocio reales (dirección, precio, disponibilidad, moneda) que no existen en el proyecto.

## Consistencia de UI

| # | Hallazgo | Sev. | Estado |
|---|---|---|---|
| U01 | Un solo estilo de botón (`EXPLORE MORE`) — sin jerarquía primaria/secundaria | baja | ver `improvements.md` |
| U02 | Espaciado con valores arbitrarios: 37.5, 13.5, 12.5%, 87.5%, 125, −17.5, −40 px | media | pendiente (fase 6) |
| U03 | Breakpoints arbitrarios y desordenados: 915, 800, 700 px | media | pendiente (fase 7) |
| U04 | `all: unset` sobre `h5` y `button`, anulando estilos base | media | pendiente (fase 6) |
| U05 | Sin estados `:hover` / `:active` en el CTA ni en el footer | media | pendiente (fase 8) |
| U06 | `cursor:pointer` aplicado a imágenes decorativas del header | baja | pendiente (fase 8) |
| U07 | Nav sin estado activo de página | baja | ver `improvements.md` (no hay más páginas) |
| U08 | Footer sin navegación, contacto, legal ni año | media | pendiente (fase 8) |
| U09 | Enlaces del footer no se distinguen del texto (sin subrayado ni color) | media | pendiente (fase 8) |
| U10 | Los 3 `h2` del carrusel son idénticos | baja | contenido real, ver `needs-input.md` C4 |
| U11 | No existe `404.html` | media | pendiente (fase 8) |
| U12 | `background: purple` residual de depuración en el CSS | baja | pendiente (fase 6) — la regla nunca llega a aplicar |

## Microcopy

| # | Hallazgo | Sev. | Estado |
|---|---|---|---|
| M01 | «**EThis** hoodie is suitable…» — errata en la slide 2 | media | corregido (fase 5) |
| M02 | «EXPLORE MORE» en mayúsculas sostenidas (lo lee mal TalkBack/VoiceOver) | baja | ver `improvements.md` |
| M03 | Mezcla de idiomas: nav en inglés + «Productos» en español | media | marcado con `lang`, contenido intacto — ver `needs-input.md` C4 |
| M04 | 15 enlaces sin destino | alta | marcado `[FALTA]`, ver `needs-input.md` C1/C2 |

## Bugs de layout (detalle en `responsive-audit.md`)

| # | Hallazgo | Sev. | Estado |
|---|---|---|---|
| L01 | El carrusel se superpone al header (`min-height` calculado sin imágenes cargadas) | alta | pendiente (fase 7) |
| L02 | `body{overflow:hidden}` deja contenido inalcanzable en móvil | alta | pendiente (fase 7) |
| L03 | Footer superpuesto al contenido en ≤500 px | alta | pendiente (fase 7) |
| L04 | Iconos de utilidad visibles en móvil sobre la imagen | media | pendiente (fase 7) |
| L05 | `height:100vh` sin `svh`/`dvh` | media | pendiente (fase 7) |
