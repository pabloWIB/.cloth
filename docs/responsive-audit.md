# Auditoría responsive — `.cloth`

Medido con Chrome headless a **320, 375, 414, 768, 1024, 1280, 1440 y 1920 px**,
más zoom al 200 % y landscape móvil (812×375).

Capturas: `screenshots/antes-desktop.webp` · `antes-movil.webp` ·
`despues-desktop.webp` · `despues-movil.webp` · `menu-movil.webp`.

## Problemas y correcciones

| Breakpoint | Problema | Causa | Fix aplicado |
|---|---|---|---|
| **todos** | El carrusel se superponía a la cabecera (el `article` empezaba en `top: -154 px` a 823 px, `-249 px` a 320 px) | `main.js` medía la altura de los `.carousel-item` **antes de que cargaran las imágenes** y fijaba `min-height: 972px` sobre un `.carousel` de `height: 60vh`. Con `place-content: center`, el item sobresalía por arriba y por abajo | Eliminado el cálculo de `min-height` del JS y la `height: 60vh` del carrusel. El contenedor se adapta a su contenido |
| **320-767** | El contenido cortado era **inalcanzable**: el párrafo del producto quedaba a media frase y no había forma de llegar | `body { height: 100vh; overflow: hidden }` | `min-height: 100svh` y sin `overflow: hidden`. Se usa `svh` para evitar el salto de la barra de Safari iOS |
| **320-500** | El footer se superponía al contenido, apareciendo a media página | `body { flex-flow: column wrap }` con altura fija: al no caber, el footer **saltaba a una segunda columna** del flex | `flex-direction: column` sin `wrap` |
| **320-767** | Los iconos de buscar / carrito / cuenta se dibujaban encima de la imagen de producto | La media query de 700 px ocultaba el nav (`:nth-child(2)`) y mostraba la hamburguesa, pero dejaba visible esa fila (`:nth-child(3)`) | `.utility-nav { display: none }` por debajo de 48rem. Sin comportamiento asociado y sin espacio en 320 px |
| **320-767** | Las tres miniaturas se apilaban en vertical, ocupando media pantalla | `display: flex` con `max-width: 100px` por hijo y `margin-left: -40px` | `display: grid; grid-template-columns: repeat(3, minmax(0, 100px))`. El `minmax(0, …)` impide que el contenido fuerce el ancho |
| **todos** | Altura de cabecera indefinida al cambiar el body | `.site-header { height: 12.5% }` — porcentaje del alto del body, que dejó de tener sentido con altura automática | Altura automática con `padding` de la escala |
| **768-1919** | La imagen y el texto se apilaban a partir de ~820 px pese a haber sitio | `.slide-media{max-width:375px}` + `.slide-body{width:52%}` + `gap`: la suma superaba el ancho disponible y el flex hacía wrap | `display: grid` con `minmax(0, 375px) minmax(0, 1fr)` |
| **todos** | Párrafo de producto a **13 px** | `font-size: 13px` fijo | `var(--step-0)`: **16 px en móvil, 17 px en escritorio**. Cumple el mínimo de cuerpo en móvil |
| **todos** | 3 a 7 áreas táctiles por debajo de 44×44 px en cada breakpoint | Botones de 20×20 (utilidad), 24×24 (hamburguesa), enlaces de 22-38 px de alto | Todos a `min-height: 44px`; los de icono a 44×44 con el icono a 20 px. Separación mínima de 8 px |
| **todos** | Longitud de línea sin límite en pantallas anchas | — | `.slide-text { max-width: 65ch }` |

## Estado final por breakpoint

| Ancho | Overflow X | Scroll | `article.top` | Párrafo | Nav | Táctil <44px | Errores | 404 |
|---:|---|---|---:|---:|---|---:|---:|---:|
| 320 | no | sí | 144 | 16 px | hamburguesa | 0 | 0 | 0 |
| 375 | no | sí | 144 | 16.1 px | hamburguesa | 0 | 0 | 0 |
| 414 | no | sí | 144 | 16.1 px | hamburguesa | 0 | 0 | 0 |
| 768 | no | sí | 276 | 16.7 px | escritorio | 0 | 0 | 0 |
| 1024 | no | no | 276 | 17 px | escritorio | 0 | 0 | 0 |
| 1280 | no | no | 216 | 17 px | escritorio | 0 | 0 | 0 |
| 1440 | no | no | 216 | 17 px | escritorio | 0 | 0 | 0 |
| 1920 | no | no | 216 | 17 px | escritorio | 0 | 0 | 0 |

`article.top` positivo en todos = el carrusel ya no invade la cabecera.

## Casos adicionales

| Caso | Resultado |
|---|---|
| Zoom del navegador al 200 % (640 px CSS) | Sin overflow horizontal |
| Landscape móvil 812×375 | Sin overflow horizontal, scroll disponible, altura de documento 908 px |
| Menú móvil: abre | Sí — ocupa 338×644, oculta `main` y `footer`, 6 enlaces visibles |
| Menú móvil: cierra con `Esc` | **No** — pendiente, fase 9 |
| Menú móvil: `aria-expanded` se actualiza | **No** — pendiente, fase 9 |
| Menú móvil: bloquea scroll del body | **No** — pendiente, fase 9 |

Los tres pendientes son comportamiento JavaScript. Se resuelven en la fase 9
junto con la reescritura a vanilla, en lugar de escribir jQuery que se borraría acto seguido.

## Breakpoints

Antes: `max-width: 915px`, `max-width: 800px`, `max-width: 700px` — desktop-first,
sin criterio documentado, y los tres tocando las mismas propiedades.

Ahora, mobile-first:

| Breakpoint | Valor | Qué cambia |
|---|---|---|
| base | — | Una columna, hamburguesa, iconos de utilidad ocultos |
| `min-width: 48rem` | 768 px | Dos columnas en la slide, nav de escritorio, iconos visibles, espaciados mayores |
| `min-width: 64rem` | 1024 px | Solo la separación del nav principal |

Los antiguos 915 px y 800 px solo reescalaban tipografía; ese trabajo lo hace ahora
`clamp()` de forma continua, sin saltos.
