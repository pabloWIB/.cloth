# QA final — `.cloth`

Ejecutado sobre `http://127.0.0.1:8000` con Chrome headless, Firefox y WebKit.
Dos páginas: `index.html` y `404.html`.

## Checklist

| # | Comprobación | `index.html` | `404.html` |
|---|---|---|---|
| 1 | Cero errores en consola | **0** | **0** |
| 2 | Cero warnings en consola | **0** | **0** |
| 3 | Cero 404 en Network | **0** | **0** |
| 4 | Enlaces internos funcionan | sí | sí |
| 5 | Externos con `target="_blank" rel="noopener"` | **n/a** — 0 enlaces externos | **n/a** |
| 6 | Formularios envían y dan feedback | **n/a** — el sitio no tiene formularios | **n/a** |
| 7 | Validación W3C sin errores | **0 errores, 0 warnings** | **0 errores, 0 warnings** |
| 8 | Navegación completa por teclado | 17 paradas, orden lógico | 4 paradas |
| 9 | Foco visible en todas las paradas | **17/17** | **4/4** |
| 10 | Contraste AA en todo el texto | **17/17**, mínimo 12.82:1 | **9/9**, mínimo 10.22:1 |
| 11 | Sin overflow horizontal a 320 px | sí | sí |
| 12 | OG image correcta | ver nota | `noindex`, sin OG |
| 13 | Favicon visible en pestaña | sí | sí |
| 14 | Chrome, Firefox y WebKit | **los tres** | — |
| 15 | Lighthouse ≥ 95 en las 4 categorías | **99-100 / 100 / 100 / 100** | — |

## Validación W3C

Enviado a `validator.w3.org/nu`. En la primera pasada salieron **6 errores reales**,
todos el mismo patrón:

> `Element “div” not allowed as child of element “button” in this context.`

`<button>` solo admite contenido de frase, y había `<div>` dentro del botón de menú y
de los dos controles del carrusel. Se sustituyeron por `<span>` con `display: block`,
y se eliminaron tres `<div>` envoltorios innecesarios de los iconos de utilidad.

Resultado: **0 errores y 0 warnings en ambas páginas.**

## Recorrido por teclado — `index.html`

| # | Elemento | Etiqueta accesible |
|---:|---|---|
| 1 | `a.skip-link` | Skip to content |
| 2-4 | `a.nav-link` ×3 | Woman · Man · Kids |
| 5 | `a` | Productos |
| 6-8 | `a` ×3 | Producto 1 · 2 · 3 |
| 9-11 | `button` ×3 | Search · Shopping cart · Account |
| 12-13 | `button.carousel-control` ×2 | PREVIOUS · NEXT |
| 14 | `button.btn` | EXPLORE MORE |
| 15-17 | `a` ×3 | Facebook · Twitter · Instagram |

Orden visual y de foco coinciden. Ninguna trampa de foco. **Las 17 paradas tienen
`outline` visible.**

## Contraste

Medido nodo a nodo sobre el texto renderizado, con el mínimo WCAG que corresponde a
cada tamaño y peso.

| Página | Nodos medidos | Fallan | Ratio mínimo |
|---|---:|---:|---:|
| `index.html` | 17 | **0** | 12.82:1 (botón CTA) |
| `404.html` | 9 | **0** | 10.22:1 |

Objetivo AA: 4.5:1 en texto normal, 3:1 en texto grande. El peor caso del sitio casi
triplica el requisito.

## Áreas táctiles

Comprobado en los 8 breakpoints (320, 375, 414, 768, 1024, 1280, 1440, 1920):
**0 elementos interactivos por debajo de 44×44 px.**

## Cross-browser

Geometría de los bloques principales, en píxeles `[x, y, ancho, alto]`, a 1440×900:

| Motor | Cabecera | Imagen | Texto | Pie | Errores |
|---|---|---|---|---|---:|
| **Chromium** (Chrome 141) | `72,0,1296,142` | `150,234,375,413` | `557,234,733,450` | `72,824,1296,76` | 0 |
| **Firefox** (133) | `72,0,1296,142` | `150,234,375,413` | `557,234,733,450` | `72,824,1296,76` | 0 |
| **WebKit** (18.2, motor de Safari) | `72,0,1296,142` | `150,234,375,413` | `557,234,733,447` | `72,824,1296,76` | 0 |

Diferencia máxima entre motores: **3 px** en el alto del bloque de texto, por el
redondeo de la métrica tipográfica. Sin diferencias perceptibles.

En móvil (375×720) WebKit calcula el contenedor 5 px más estrecho (333 frente a 338)
por cómo reserva el espacio de la barra de scroll. No afecta al diseño.

Verificado además en los tres motores:

| Comprobación | Chromium | Firefox | WebKit |
|---|---|---|---|
| Judson y Nunito Sans cargan | sí | sí | sí |
| Soporte de `100svh` | sí | sí | sí |
| Carrusel avanza (01/03 → 02/03) | sí | sí | sí |
| Menú móvil abre | sí | sí | sí |
| Menú móvil cierra con `Esc` | sí | sí | sí |

Safari real (macOS/iOS) no se ha podido probar: no hay equipo Apple disponible.
WebKit 18.2 es el mismo motor de renderizado, por lo que cubre el comportamiento de
CSS y layout, pero no las particularidades de la interfaz de Safari.

## Notas

**Enlaces.** Los 16 `href="#"` son marcadores de posición conscientes: el sitio es una
pantalla única y no existen destinos. Están marcados con comentarios `[FALTA]` en el
HTML y listados en `needs-input.md` (C1, C2, C3). No hay ningún `href=""`, que era lo
que en el original recargaba la página al pulsar.

**OG image.** Las etiquetas están completas (`og:image`, `:width`, `:height`, `:alt`,
`og:url`, `twitter:card`) y los archivos existen en `seo/` con las dimensiones
declaradas (1200×630, webp y jpg). La comprobación con un validador externo
(opengraph.xyz, el depurador de Facebook) **requiere que el sitio esté publicado**:
no puede leer `127.0.0.1`. Queda pendiente de hacer tras el despliegue.

**Formularios.** El sitio no tiene ninguno. Los tres botones de utilidad
(buscar, carrito, cuenta) son accesibles pero no tienen comportamiento asociado
(`needs-input.md` C6).
