# Auditoría e inventario — `.cloth`

Fecha: 2026-07-30 · Fase 1 · Estado del repo al auditar: `b3456ae` (limpio, sincronizado con `origin/main`)

## 1. Árbol del proyecto (estado inicial)

```
.cloth/
├── index.html                 7.0 KB   230 líneas
├── README.md                  5.2 KB   170 líneas
├── CSS/
│   ├── fonts.css               80 B      3 líneas
│   ├── normalize.css          2.4 KB    16 líneas
│   ├── prepros.config        22.2 KB   883 líneas   ← config de IDE
│   ├── styles.css            14.2 KB   517 líneas   ← compilado
│   └── styles.scss            7.1 KB   438 líneas   ← fuente
├── JS/
│   └── script.js              906 B     36 líneas
└── IMG/                                 21 archivos
    ├── 11 raster (png/jpg)   2.67 MB
    └── 10 svg                 5.5 KB
```

## 2. Peso

| Grupo | Peso | % del repo |
|---|---:|---:|
| Imágenes (`IMG/`) | **2.61 MB** | **96.4 %** |
| CSS | 45.9 KB | 1.7 % |
| HTML | 7.0 KB | 0.3 % |
| JS | 906 B | 0.03 % |
| Docs | 5.2 KB | 0.2 % |
| **Total (sin `.git`)** | **2.70 MB** | 100 % |

`.git` pesa 2.6 MB aparte.

## 3. Clasificación de archivos

| Grupo | Archivos |
|---|---|
| HTML | `index.html` (única página) |
| CSS propio | `styles.scss` → `styles.css`, `fonts.css` |
| CSS vendor | `normalize.css` (modificado, ver §7) |
| CSS remoto | Bootstrap 4.1.3 (CDN) |
| JS propio | `script.js` |
| JS vendor | jQuery ×2, Popper 1.14.3, Bootstrap 4.1.3 (todo CDN) |
| Imágenes | 11 raster + 10 SVG |
| Fuentes | ninguna local — Judson y Nunito Sans por Google Fonts |
| Docs | `README.md` (contenido de otro proyecto, ver §8) |
| Basura | `CSS/prepros.config` (22 KB, config del IDE Prepros) |

## 4. Imágenes — dimensiones reales vs. uso

| Archivo | Dimensiones | Peso | Slot en layout | Veredicto |
|---|---|---:|---|---|
| `fondo.png` | 3856×2366 | 1 458 875 B | — | **huérfano** |
| `icon.png` | 1024×1024 | 641 846 B | favicon 32px | 20 000× sobredimensionado |
| `image1.png` | 765×842 | 252 490 B | máx 375px | 2× sobredimensionado |
| `fondo.jpg` | 3856×2366 | 82 702 B | — | **huérfano** |
| `option2.jpg` | 736×800 | 48 203 B | máx 375px | 2× sobredimensionado |
| `option4.jpg` | 736×800 | 46 973 B | máx 375px | 2× sobredimensionado |
| `option3.jpg` | 736×800 | 44 549 B | — | **huérfano** |
| `image2.png` | 181×118 | 38 903 B | máx 100px | PNG para foto |
| `tshirt2.jpg` | 512×352 | 34 159 B | — | **huérfano** |
| `image3.png` | 181×118 | 16 455 B | máx 100px | PNG para foto |
| `image4.png` | 181×118 | 8 045 B | máx 100px | PNG para foto |

**5 huérfanos = 1 667 258 B (1.59 MB) = 60 % del repo entero.**

Los 10 SVG están todos referenciados salvo `next.svg`.

## 5. Archivos huérfanos (no referenciados en ningún HTML/CSS/JS)

| Archivo | Peso |
|---|---:|
| `IMG/fondo.png` | 1.39 MB |
| `IMG/fondo.jpg` | 80.8 KB |
| `IMG/option3.jpg` | 43.5 KB |
| `IMG/tshirt2.jpg` | 33.4 KB |
| `IMG/next.svg` | 171 B |

Las reglas `.slide1/.slide2/.slide3` declaran `background-size: cover` pero **nunca declaran `background-image`** — ahí es donde `fondo.*` estaba pensado y quedó a medias.

## 6. Referencias rotas y enlaces muertos

- **0 referencias 404** a archivos locales (todas las rutas `src`/`href` resuelven).
- **15 `href=""`** — enlaces de navegación y footer sin destino. Recargan la página al hacer clic.
- `href="#"` en «Productos» (1).
- No existe `404.html`.

## 7. CSS/JS duplicado o problemático

| Hallazgo | Detalle |
|---|---|
| **jQuery cargado 2 veces** | `3.0.0-beta1` (en `<head>`, versión **beta**) y `3.3.1` (antes de `</body>`). Gana 3.3.1; la primera es descarga muerta. |
| **`preconnect` duplicado** | Líneas 11-12 y 14-15 de `index.html`, idénticas. |
| **Colisión `.container`** | El proyecto define `.container{display:flex;gap:20px}` pero Bootstrap ya define `.container` con `max-width:1140px;padding:0 15px`. Gana Bootstrap (computado: `1140px`). El layout depende de una clase de terceros sin saberlo. |
| **`normalize.css` contaminado** | No es normalize puro: le añadieron `*{transition:.3s}` (transición global sobre **todo**), scrollbar custom `#5308FC` y hacks `::selection`. |
| **`fonts.css` inútil** | 3 líneas, aplica a un selector `su` que no existe en el HTML, y declara dos `font-family` seguidos (el segundo pisa al primero). Archivo muerto. |
| **`prepros.config`** | 22 KB de configuración del IDE Prepros commiteados. |
| **Regla muerta** | `body header .overlay.hoverSelection5N{background:purple}` nunca aplica: `.overlay` es hermano de `<header>`, no descendiente. Restos de depuración. |
| **Prefijos obsoletos** | `-webkit-box`, `-ms-flexbox`, `-ms-flex-*` en todo el CSS compilado (flexbox de 2011). |
| **Selectores frágiles** | Casi todo el CSS cuelga de cadenas `:nth-child()` (`body header > :nth-child(2) > :nth-child(4) ul li div a`). Cualquier `<div>` insertado rompe el diseño. |

## 8. Librerías externas por CDN

| Librería | Versión | Viva | ¿Se usa? |
|---|---|---|---|
| jQuery slim | 3.0.0-**beta1** | sí (cdnjs) | **no** — la pisa la 3.3.1 |
| jQuery slim | 3.3.1 | sí | sí — `script.js` + Bootstrap |
| Popper.js | 1.14.3 | sí | **no** — solo lo necesitan dropdown/tooltip/popover, aquí no hay ninguno |
| Bootstrap CSS | 4.1.3 | sí | parcialmente — solo `.carousel*`; aporta la colisión de `.container` |
| Bootstrap JS | 4.1.3 | sí | sí — el carrusel |
| Google Fonts | Judson, Nunito Sans | sí | sí |

Coste: ~4 peticiones de terceros bloqueantes para usar **un carrusel**.

## 9. Bugs de layout confirmados en navegador

Verificado sirviendo en `http://127.0.0.1:8000` (Chrome).

1. **El carrusel se superpone al header.** `script.js` (líneas 30-37) mide la altura de los `.carousel-item` **antes de que carguen las imágenes** y fija `min-height:920px` sobre un contenedor de 540px. Como `.carousel` centra con `place-content:center`, el item sobresale ~190px por arriba y por abajo, tapando la cabecera.
2. **Sin scroll posible.** `body{height:100vh;overflow:hidden}`: en móvil el contenido que no cabe es **inalcanzable** (el párrafo del producto queda cortado a media frase).
3. **Footer superpuesto al contenido** en ≤500px.
4. **Fila de iconos (buscar/carrito/usuario) visible en móvil** encima de la imagen de producto: la media query de 700px oculta el nav (`:nth-child(2)`) pero no esa fila (`:nth-child(3)`).
5. **`height:100vh`** provoca el salto de barra en Safari iOS (falta `svh`/`dvh`).

Consola: **0 errores** (el sitio falla en silencio, no por excepción).

## 10. HTML — hallazgos de estructura y `<head>`

- `<html lang="en">` pero el contenido mezcla inglés y **español** («Productos», «Producto 1»).
- `<title>.cloth</title>` — 6 caracteres, sin marca ni propuesta.
- **Faltan por completo**: `meta description`, `canonical`, Open Graph, Twitter Card, `theme-color`, datos estructurados.
- Jerarquía de títulos rota: `h1` → `h2` → `h3` → **`h5`** (salta `h4`). Además los `h5` llevan `all:unset`, así que son títulos solo de nombre.
- **`h2` "Relaxed Fit Hoodie" repetido 3 veces** (uno por slide).
- Sin `skip link`, sin `:focus-visible`, sin `aria-label` en los botones de solo icono (buscar, carrito, usuario, hamburguesa).
- 8 `<img>` con `alt=""` que **no** son decorativas (fotos de producto).
- Ningún `<img>` lleva `width`/`height` → CLS garantizado.
- Ningún `<img>` lleva `loading`/`decoding`.
- Favicon = PNG de 1024×1024 (642 KB).
- `<div class="active4">` como botón de menú: no es `<button>`, no es enfocable por teclado.

## 11. Contenido

- Errata en la slide 2: «**EThis** hoodie is suitable…» (E de más al inicio).
- Las 3 slides comparten el mismo `h2` y las mismas 3 miniaturas; solo cambia el párrafo y la foto grande.
- El texto del producto es genérico de plantilla, no de una marca real.

## 12. `README.md` — es de otro proyecto

El README actual describe **«Client Opinion»** (repo #13 del portafolio), no `.cloth`:

- Título: `# Client Opinion`.
- Enlaza `https://github.com/pabloWIB/Client-Opinion.git`.
- Describe un árbol de carpetas (`css/main.css`, `js/gallery.js`, `pages/about.html`…) que **no existe** aquí.
- Afirma «**No Dependencies**: Pure static implementation» y «Vanilla JavaScript» cuando el sitio carga jQuery ×2 + Popper + Bootstrap.
- Afirma «CSS Variables» y «Mobile-first»: el CSS no tiene ni una variable y las media queries son `max-width` (desktop-first).
- La imagen de cabecera apunta a `github.com/pabloDYEL/ESTATICA-42/assets/...` (otro usuario, otro repo).

Es boilerplate generado pegado en el repo equivocado. Se reescribe en la fase 12.

## 13. Riesgos antes de mover nada

| Riesgo | Mitigación |
|---|---|
| El layout depende de `.container` de Bootstrap | Al quitar Bootstrap hay que replicar `max-width:1140px;padding:0 15px` explícitamente, o el ancho cambia. |
| Todo el CSS cuelga de `:nth-child()` | Cualquier cambio en el árbol del HTML rompe estilos. Hay que introducir clases **antes** de tocar la estructura. |
| `styles.css` es generado desde `styles.scss` | Editar solo el `.css` se pierde si alguien recompila. Decisión: eliminar la cadena SCSS/Prepros y pasar a CSS a mano (fase 6). |
| Quitar jQuery obliga a reescribir el carrusel | El carrusel de Bootstrap requiere jQuery. Se sustituye por uno vanilla equivalente, conservando comportamiento y aspecto. |
| Los 5 huérfanos podrían ser assets pendientes de usar | `fondo.*` encaja con las reglas `.slideN{background-size:cover}` sin `background-image`. Se mueven a `_archive/`, no se borran. |

## 14. Resumen de la fase

- **26 archivos** auditados, **1 página** HTML.
- **5 assets huérfanos** que son el **60 % del peso**.
- **4 librerías de terceros** para un solo carrusel; 2 de ellas (jQuery beta, Popper) no se usan.
- **5 bugs de layout** confirmados en navegador, ninguno visible en consola.
- **README de otro proyecto**.
- **0 referencias rotas** a archivos locales — lo único sano del repo.
