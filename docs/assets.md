# Inventario de assets — `.cloth`

## Imágenes de contenido — antes → después

| Original | Nuevo nombre | Dimensiones | Peso antes | Peso después | Ahorro |
|---|---|---|---:|---:|---:|
| `image1.png` | `hoodie-verde-hombre.webp` | 765×842 → **750×825** | 252 490 B | 14 818 B | **94 %** |
| `option4.jpg` | `hoodie-verde-mujer-frontal.webp` | 736×800 (igual) | 46 973 B | 18 734 B | **60 %** |
| `option2.jpg` | `hoodie-verde-mujer-gorro.webp` | 736×800 (igual) | 48 203 B | 17 780 B | **63 %** |
| `image2.png` | `detalle-etiqueta.webp` | 181×118 (igual) | 38 903 B | 3 528 B | **90 %** |
| `image3.png` | `detalle-camisa-rayas.webp` | 181×118 (igual) | 16 455 B | 1 932 B | **88 %** |
| `image4.png` | `detalle-pantalon-blanco.webp` | 181×118 (igual) | 8 045 B | 670 B | **91 %** |
| | | **Subtotal** | **411 069 B** | **57 462 B** | **86 %** |

Conversión: WebP calidad 82, EXIF eliminado (`-strip`).
Solo `image1.png` necesitaba redimensionarse (el slot son 375 px CSS; 750 px cubre pantallas 2×).
Las tres miniaturas ya estaban por debajo de su límite 2× (200 px) y se dejaron a tamaño nativo.

## Logo y favicons

| Archivo | Dimensiones | Peso | Uso |
|---|---|---:|---:|
| `assets/img/logo-cloth.png` | 512×512 | 31 863 B | fuente de marca (no referenciado en HTML) |
| `seo/favicon/favicon.ico` | 16+32+48 | 15 086 B | pestaña del navegador |
| `seo/favicon/icon-192.png` | 192×192 | 5 708 B | manifest / Android |
| `seo/favicon/icon-512.png` | 512×512 | 31 863 B | manifest / splash |
| `seo/favicon/apple-touch-icon.png` | 180×180 | 5 042 B | iOS |
| `seo/favicon/site.webmanifest` | — | 380 B | PWA básica |

El original `icon.png` era **1024×1024 y 641 846 B sirviendo un favicon de 32 px**. Además el logo
estaba descentrado en un lienzo con mucho blanco y textura de papel. Se recortó al círculo
(`-crop 660x660+182+88`), se limpió el ruido y se cuantizó a 32 colores: **641 846 B → 31 863 B (95 %)**.

## Open Graph

| Archivo | Dimensiones | Peso | Uso |
|---|---|---:|---:|
| `seo/og-image.webp` | 1200×630 | 15 382 B | previsualización moderna |
| `seo/og-image.jpg` | 1200×630 | 28 703 B | fallback para scrapers antiguos |

Compuesta a partir de `hoodie-verde-hombre.webp` sobre el fondo lavanda del propio producto
(`#B9CCEA`), con el wordmark `.cloth` y el nombre de producto reales del sitio. No se inventó copy.

## Iconos SVG

Optimizados con `svgo --multipass`: **5 382 B → 2 920 B (45 %)**. Sin metadata de Illustrator/Figma.

| Icono | viewBox | Peso |
|---|---|---:|
| `cart.svg` | 0 0 25 25 | 1 043 B |
| `user.svg` | 0 0 25 25 | 742 B |
| `magnify.svg` | 0 0 25 25 | 496 B |
| `hover-selection.svg` | 0 0 58 7 | 178 B |
| `prev-line.svg` | 0 0 58 8 | 175 B |
| `next-line.svg` | 0 0 58 7 | 177 B |
| `menu-open.svg` | 0 -960 960 960 | 176 B |
| `menu.svg` | 0 -960 960 960 | 122 B |
| `direction-down.svg` | 0 0 10 5 | 141 B |

Renombrados a kebab-case en la fase 3 (`directionDown` → `direction-down`, etc.).

## Balance total

| Concepto | Antes | Después |
|---|---:|---:|
| Carpeta `IMG/` original (21 archivos) | **2 678 582 B** | — |
| `assets/img` + `assets/icons` | — | **92 245 B** |
| Añadido: set de favicons | — | 57 699 B |
| Añadido: Open Graph (webp + jpg) | — | 44 085 B |
| **Total imágenes del repo** | **2 678 582 B** | **194 029 B** |
| | | **−92.8 %** |

Peso total del proyecto (sin `.git` ni `_archive`): **2.70 MB → 313 KB**.

## Archivado (fuera de git, en `_archive/`)

| Archivo | Peso | Motivo |
|---|---:|---|
| `fondo.png` | 1 458 875 B | huérfano — nunca referenciado |
| `fondo.jpg` | 82 702 B | huérfano |
| `option3.jpg` | 44 549 B | huérfano |
| `tshirt2.jpg` | 34 159 B | huérfano |
| `next.svg` | 171 B | huérfano |
| `originales-raster/` | 1 052 915 B | los 7 PNG/JPG originales antes de convertir a WebP |

Se conservan en local por si `fondo.*` debía ser el fondo de las slides (ver `needs-input.md` A1).

## Decisión: `<img>` en vez de `<picture>`

La plantilla del encargo propone `<picture>` con `source` WebP e `img` JPG de respaldo, pero también
indica conservar fallback `.jpg` **solo para la OG image**. Como no hay archivos de respaldo que
ofrecer, un `<picture>` con un único `source` no aporta nada. Se usa `<img>` directo apuntando al
WebP, con `width`, `height`, `alt`, `decoding` y `loading`/`fetchpriority`. WebP tiene soporte
universal en los navegadores objetivo del proyecto.

## Reglas aplicadas en el HTML

- `width` y `height` en **las 23 imágenes** (23/23), incluidos los SVG, para eliminar CLS.
- `fetchpriority="high"` y **sin** `loading="lazy"` en `hoodie-verde-hombre.webp` (imagen LCP,
  visible above the fold).
- `loading="lazy"` en las 22 restantes.
- `alt` descriptivo real en las 6 fotos de producto; `alt=""` en los SVG decorativos
  (líneas de subrayado, chevron, hamburguesa).
