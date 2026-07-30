# Rendimiento — `.cloth`

Medido con **Lighthouse 12** contra Chrome headless. El estado «antes» es el commit
`b3456ae` (el original, antes de esta pasada), extraído con `git archive` y servido en
paralelo en otro puerto para que la comparación sea real y no de memoria.

Ambos estados servidos con `python -m http.server`: sin gzip, sin HTTP/2 y sin cabeceras
de caché. Es el peor escenario posible, e idéntico para los dos.

## Lighthouse

### Móvil (throttling por defecto: 4× CPU, Slow 4G)

| Categoría | Antes | Después |
|---|---:|---:|
| Performance | **67** | **99-100** |
| Accessibility | 96 | **100** |
| Best Practices | 100 | **100** |
| SEO | 91 | **100** |

### Escritorio

| Categoría | Antes | Después |
|---|---:|---:|
| Performance | 97 | **100** |
| Accessibility | 97 | **100** |
| Best Practices | 100 | **100** |
| SEO | 91 | **100** |

Objetivo del encargo: ≥95 en las cuatro categorías. **Cumplido en móvil y escritorio.**

> La Performance móvil oscila entre 99 y 100 entre ejecuciones (LCP medido de 1.6 s a
> 2.0 s). Es varianza normal de Lighthouse; ambos valores superan el objetivo.

## Core Web Vitals

| Métrica | Antes (móvil) | Después (móvil) | Antes (desktop) | Después (desktop) |
|---|---:|---:|---:|---:|
| **LCP** | 7.1 s | **1.6-2.0 s** | 1.1 s | **0.4 s** |
| **CLS** | 0 | **0** | 0.021 | **0** |
| **TBT** | 170 ms | **0 ms** | 0 ms | **0 ms** |
| FCP | 2.8 s | **1.1-1.4 s** | — | — |
| Speed Index | 4.5 s | **1.1-2.3 s** | — | — |

**LCP móvil: −72 %.** **TBT: 170 ms → 0 ms**, al desaparecer los 210 KB de JavaScript
de terceros que había que descargar, parsear y ejecutar.

El CLS del original marcaba 0 en móvil, pero es un cero engañoso: la página no se
desplazaba porque tenía `height: 100vh` y `overflow: hidden`, es decir, no se movía nada
porque no cabía nada. En escritorio, donde sí había espacio, aparecía el 0.021 real.

## Peso y peticiones

| | Antes | Después | Cambio |
|---|---:|---:|---:|
| **Peso total transferido** | **1 227 261 B** (1.17 MB) | **152 078 B** (149 KB) | **−87.6 %** |
| **Peticiones** | 31 | 27 | −4 |
| **Peticiones a terceros** | **10** | **0** | **−100 %** |

### Desglose por tipo

| Tipo | Antes | Después |
|---|---:|---:|
| Other (favicon PNG de 1024 px) | 1 · 642 035 B | 2 · 21 172 B |
| Imágenes | 15 · 419 293 B | 13 · 26 386 B |
| Scripts | 5 · 69 737 B | **1 · 4 915 B** |
| Fuentes | 3 · 47 423 B (terceros) | 3 · 64 137 B (propias) |
| Hojas de estilo | 6 · 41 557 B | 6 · 23 777 B |
| Documento | 1 · 7 216 B | 1 · 11 145 B |
| Manifest | — | 1 · 546 B |

Las fuentes pesan algo **más** ahora (64 KB frente a 47 KB) porque el navegador descarga
los tres archivos completos en vez de los subconjuntos que Google servía a medida.
A cambio desaparecen dos conexiones a dominios externos (`fonts.googleapis.com` y
`fonts.gstatic.com`) con su DNS, TLS y CSS bloqueante, que costaban bastante más que
esos 17 KB. El documento crece de 7 a 11 KB por el `<head>` completo (Open Graph,
JSON-LD, favicons) y el marcado accesible.

## Qué se hizo

| Acción | Efecto |
|---|---|
| Eliminar jQuery ×2, Popper y Bootstrap JS | −205 KB, −4 peticiones, TBT a 0 |
| Eliminar el CSS de Bootstrap | −141 KB, −1 petición de terceros |
| Convertir las imágenes a WebP y redimensionar | −354 KB |
| Reconstruir el favicon (1024 px, 642 KB → set completo) | −610 KB |
| Autoalojar Judson y Nunito Sans (woff2, `font-display: swap`) | −2 dominios externos, sin CSS de fuentes bloqueante |
| `preload` de `judson-700.woff2` | La fuente del texto más grande no espera al CSS |
| `preload` + `fetchpriority="high"` en la imagen LCP, sin `lazy` | LCP deja de esperar su turno |
| `loading="lazy"` en las otras 22 imágenes | Solo se descarga lo visible |
| `width`/`height` en las 23 imágenes | CLS a 0 |
| `defer` en el único script | Nada bloquea el parseo |
| Retirar 5 assets huérfanos (1.59 MB) | No se descargaban, pero lastraban el repo |

## Pendiente, y por qué

| Auditoría | Estado | Motivo |
|---|---|---|
| `uses-text-compression` | no superada en local | Requiere gzip/brotli del servidor. Vercel, Netlify y GitHub Pages lo aplican de serie |
| `uses-long-cache-ttl` / `cache-insight` | no superada en local | Cabeceras de caché del servidor. Se configuran en `vercel.json` (fase 13) |
| `unminified-css` / `unminified-javascript` | **decisión** | El encargo pide mantener los fuentes legibles en el repo y desplegar **sin build step**. Minificar exigiría o bien una compilación, o bien duplicar cada archivo. Con 28 KB de CSS+JS sin comprimir y Performance en 100, no compensa |
| `render-blocking-resources` (6 hojas) | **decisión** | La arquitectura de 5 hojas + fuentes es el entregable pedido, y es lo que hace el CSS mantenible. Lighthouse mide aquí sobre HTTP/1.1 sin multiplexación; en Vercel (HTTP/2) las 6 peticiones van por la misma conexión y el coste real es una fracción. Aun así Performance da 100 |

## Cómo reproducir

```bash
npx serve .                      # o: python -m http.server 8000
npx lighthouse http://localhost:8000 --view                  # móvil
npx lighthouse http://localhost:8000 --preset=desktop --view # escritorio
```

Para volver a comparar contra el original:

```bash
mkdir /tmp/original && git archive b3456ae | tar -x -C /tmp/original
cd /tmp/original && python -m http.server 8001
```
