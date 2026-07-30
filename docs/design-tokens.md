# Design tokens — `.cloth`

Definidos en `assets/css/tokens.css`. Todos los valores se extrajeron del CSS
original del proyecto o se muestrearon de las imágenes de marca. Ninguno es inventado.

## Color

| Token | Valor | Origen | Uso |
|---|---|---|---|
| `--ink` | `#212529` | Bootstrap `$body-color` — era el color real del texto en pantalla | Texto de cuerpo, títulos, contador |
| `--ink-strong` | `#000000` | el `color: black` del CSS original | Enlaces, nav, footer |
| `--bg` | `#ffffff` | fondo del documento | Fondo general |
| `--surface` | `#ffffff` | `background-color:#fff` del submenú | Panel del submenú |
| `--brand` | `#2c4359` | muestreado del logotipo (navy del anillo) | Scrollbar, `theme_color` del manifest |
| `--brand-sand` | `#cdb383` | muestreado del logotipo (onda superior) | Reservado |
| `--brand-cream` | `#e1dcca` | muestreado del logotipo (interior) | Fondo del apple-touch-icon |
| `--product-bg` | `#b9ccea` | muestreado de las fotos de producto | Lienzo de la OG image |
| `--btn-bg` | `#323232` | `background:#323232` del CTA | Fondo del botón |
| `--btn-bg-hover` | `#1f1f1f` | derivado, oscurece el anterior | Estado hover del botón |
| `--btn-ink` | `#ffffff` | `color:white` del CTA | Texto del botón |
| `--border` | `rgb(0 0 0 / .12)` | derivado | Reservado |

> **Aviso importante.** `--ink` no venía del proyecto: lo aportaba Bootstrap.
> Se fija explícitamente para que retirar el framework (fase 10) no altere el color
> del texto. Sin este token, todo el cuerpo saltaría de `#212529` a negro puro.

Se eliminó `#5308FC` (morado del scrollbar en `normalize.css`): no aparecía en
ninguna otra parte del proyecto ni en la marca. Sustituido por `--brand`.

## Tipografía

| Token | Valor | Uso |
|---|---|---|
| `--font-display` | `"Judson", Georgia, serif` | `h1` de marca, contador, título de producto |
| `--font-body` | `"Nunito Sans", system-ui, …` | Todo lo demás |
| `--leading-tight` | `1.1` | Títulos |
| `--leading-body` | `1.6` | Texto corrido |
| `--measure` | `65ch` | Ancho máximo de línea del párrafo |

### Escala fluida

| Token | Rango | Sustituye a | Uso |
|---|---|---|---|
| `--step--2` | `12px` fijo | `11px` | PREVIOUS/NEXT, texto del CTA |
| `--step--1` | `13 → 14px` | `13px`, `13.5px` | Nav, párrafo de producto |
| `--step-0` | `16 → 17px` | `15px` | Cuerpo, enlaces del footer, menú móvil |
| `--step-1` | `24 → 28px` | `28px` | Contador `01/03` |
| `--step-2` | `30 → 37.5px` | `37.5 / 35 / 33.5px` | `h1` de marca |
| `--step-3` | `34 → 45px` | `45px` | Título de producto |

Los tres tamaños distintos de `h1` (37.5 / 35 / 33.5 px, uno por media query)
se sustituyen por un único `clamp()`. Eso es lo que permite eliminar dos de los
tres breakpoints del proyecto.

## Espaciado

Escala única de 8 pasos. El CSS original tenía **doce valores sueltos**:
6, 6.5, 7.5, 10, 20, 22, 22.5, 25, 30, 55, 75 y 125 px.

| Token | Valor | Reemplaza a |
|---|---|---|
| `--space-1` | `0.25rem` / 4px | — |
| `--space-2` | `0.5rem` / 8px | 6, 6.5, 7.5, 10 |
| `--space-3` | `1rem` / 16px | 12.5 |
| `--space-4` | `1.5rem` / 24px | 20, 22, 22.5, 25 |
| `--space-5` | `2rem` / 32px | 30 |
| `--space-6` | `3rem` / 48px | 55 |
| `--space-7` | `5rem` / 80px | 75 |
| `--space-8` | `8rem` / 128px | 125 |

## Forma y profundidad

| Token | Valor | Nota |
|---|---|---|
| `--radius` | `0` | El diseño no usa esquinas redondeadas en ningún elemento. Se declara para que sea una decisión explícita, no un olvido. |
| `--radius-full` | `999px` | Reservado |
| `--shadow-sm` | `0 2px 4px rgb(0 0 0 / .1)` | Submenú (valor original) |
| `--shadow-md` | `2px 2px 2px rgb(0 0 0 / .35)` | Miniaturas. El original era `2px 2px 2px gray`; se pasa a alfa para que funcione sobre cualquier fondo. |

## Layout

| Token | Valor | Nota |
|---|---|---|
| `--container` | `1140px` | Igual al `.container` de Bootstrap, del que dependía el ancho de las slides sin que el proyecto lo supiera |
| `--gutter` | `5vw` | Equivale al `width:90%; margin:0 auto` repetido en 5 sitios |
| `--header-h` | `12.5%` | Altura de cabecera del original |

## Movimiento

| Token | Valor | Nota |
|---|---|---|
| `--transition` | `180ms cubic-bezier(.4,0,.2,1)` | Unifica los `0.2s`, `0.3s` y `0.5s` dispersos |

Se eliminó `* { transition: .3s }` de `base.css`: aplicaba una transición a
**todas** las propiedades de **todos** los elementos del documento.

## Breakpoint

| Token | Valor | Nota |
|---|---|---|
| `--bp-nav` | `48rem` / 768px | Único punto de corte: cambio de nav de escritorio a hamburguesa |

Antes había tres (`915px`, `800px`, `700px`). Los de 915 y 800 solo reescalaban
tipografías y espaciados, trabajo que ahora hace la escala fluida. Queda uno.

> Las media queries no aceptan `var()`, así que el valor va literal en
> `components.css`. El token existe como referencia única documentada.

## Arquitectura de hojas

Orden de carga obligatorio (`index.html`):

```
vendor (Bootstrap, sale en la fase 10)
  ↓
tokens.css       variables
base.css         reset + elementos base
layout.css       contenedores, secciones
components.css   nav, botones, carrusel, menú
utilities.css    helpers
```

Bootstrap se carga **antes** que las hojas del proyecto para que estas puedan
pisarlo. Al colocarlo al final, su `a{color:#007bff}` teñía de azul toda la
navegación y el footer.

| Archivo | Líneas | Peso |
|---|---:|---:|
| `tokens.css` | 100 | 3.4 KB |
| `base.css` | 214 | 3.4 KB |
| `layout.css` | 116 | 2.0 KB |
| `components.css` | 300 | 5.1 KB |
| `utilities.css` | 20 | 456 B |

El `styles.css` original eran 517 líneas generadas desde SCSS, con **132 líneas de
prefijos obsoletos** (`-webkit-box`, `-ms-flexbox`) y selectores como
`body header > :nth-child(2) > :nth-child(4) ul li div a`.

## Renombrado de clases

| Antes | Ahora | Motivo |
|---|---|---|
| `.container` | `.slide-container` | Chocaba con la clase homónima de Bootstrap |
| `.overlay` | `.mobile-menu` | Describe qué es, no cómo se ve |
| `.uno` / `.dos` | `.slide-media` / `.slide-body` | Eran «uno» y «dos» |
| `.active1/2/3` | `.nav-link` | Eran tres clases idénticas |
| `.hoverSelection1/2/3` | `.nav-underline` | Idem |
| `.hoverSelection4N/5N` | `.is-open` | Nombre de estado real |
| `.hoverSelection6N/7N` | `body.menu-open` | Se resuelve desde el padre |
| `.active4` | `.nav-toggle` | Es el botón de menú |
| `.buttonsSelection` | `.carousel-nav` | — |
| `.imagePrevNext` | `.control-line` | — |
| `.slide1/2/3` | *(eliminadas)* | Solo declaraban `background-size` sin `background-image` |

El subrayado del nav lo activaba jQuery con tres bloques casi idénticos.
Ahora es CSS puro (`:hover` + `:focus-within`), así que también responde al teclado.
