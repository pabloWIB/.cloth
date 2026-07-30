# Qué falta — `.cloth`

Todo lo que depende de una decisión tuya o de material que no está en el repo.
Mientras no se resuelva, queda marcado `[FALTA]` en el código.

## Legal

| # | Ítem | Estado | Detalle |
|---|---|---|---|
| L1 | Nombre para el `LICENSE` | **asumido** | Puse `Copyright (c) 2024 Pablo Nieto`, deducido del email del repo y de la firma `Pablo N` en el historial. Confirma el nombre legal que quieres o dime si prefieres `pabloWIB`. |
| L2 | Año de copyright | **asumido** | 2024 = primer commit del repo. |

## Dominio y despliegue

| # | Ítem | Estado | Detalle |
|---|---|---|---|
| D1 | Dominio canónico | **asumido** | Uso `https://cloth.wib.digital` (el del índice del portafolio) para `canonical`, `og:url` y `og:image`. Confirma que es el definitivo. |

## Contenido

| # | Ítem | Estado | Detalle |
|---|---|---|---|
| C1 | Destino de los 15 enlaces | **[FALTA]** | `Woman`, `Man`, `Kids`, `Producto 1/2/3` y los 3 del footer tienen `href=""`. No hay páginas a las que apuntar. |
| C2 | URLs reales de redes sociales | **[FALTA]** | Footer dice Facebook / Twitter / Instagram sin cuenta asociada. |
| C3 | Destino del botón `EXPLORE MORE` | **[FALTA]** | No hay ficha de producto ni tienda. |
| C4 | Nombre y textos reales de producto | **[FALTA]** | Las 3 slides comparten el mismo `h2` («Relaxed Fit Hoodie») y las mismas miniaturas; solo cambia el párrafo. El copy es genérico de plantilla. |
| C5 | Identidad de marca | **[FALTA]** | No hay logotipo (el `h1` es texto), ni paleta declarada, ni guía de color. Los tokens se extrajeron del CSS existente. |
| C6 | Comportamiento de buscar / carrito / cuenta | **[FALTA]** | Los tres botones del header son accesibles y enfocables pero no responden a nada. En móvil se ocultan (se solapaban con la imagen). Ver `improvements.md` #9. |
| C7 | Contacto y aviso legal | **[FALTA]** | El footer lleva copyright y año dinámico, pero no hay email, teléfono, dirección, política de privacidad ni aviso legal. Necesarios si el sitio se publica como comercio real. |
| C8 | ¿Rotación automática del carrusel? | **decisión** | `data-ride="carousel"` avanza cada 5 s y no se puede pausar (incumple WCAG 2.2.2). No lo he tocado por ser comportamiento que diseñaste. Ver `improvements.md` #1. |

## Assets

| # | Ítem | Estado | Detalle |
|---|---|---|---|
| A1 | Uso previsto de `fondo.png` / `fondo.jpg` | **[FALTA]** | 3856×2366, huérfanos. Las reglas `.slide1/2/3` tienen `background-size:cover` sin `background-image`, así que parecen un fondo que quedó a medias. Están en `_archive/`. ¿Se recuperan o se descartan? |
| A2 | Uso previsto de `option3.jpg` y `tshirt2.jpg` | **[FALTA]** | Huérfanos en `_archive/`. `option3` encaja con las otras dos `option*` (mismo tamaño), como si faltara una 4ª slide. |
| A3 | Origen/derechos de las fotos de producto | **[FALTA]** | Son de una colección **H&M × Stranger Things**: la etiqueta con ambas marcas se lee en `detalle-etiqueta.webp`, y el hoodie lleva el logotipo «Hawkins». Fotografía de producto de terceros, sin licencia constatable. Es el punto más importante de esta lista si el repo es público. |
| A4 | Imagen de portada del portafolio | **generada** | `docs/screenshots/cover.webp` se generó capturando el sitio ya corregido. Sustitúyela si tienes una mejor. |
