# Mejoras propuestas — `.cloth`

Cosas que **no** se han aplicado porque cambian el diseño, añaden contenido que no
existe o requieren una decisión tuya. Ordenadas por impacto.

## Alta

### 1. El carrusel gira solo y no se puede parar
`data-ride="carousel"` hace que las slides avancen cada 5 segundos. Es un patrón que
molesta: el usuario pierde la slide que estaba leyendo a mitad de párrafo, y para
lectores de pantalla y personas con déficit de atención es un problema real
(WCAG 2.2.2 «Pause, Stop, Hide»).

**Propuesta:** quitar la rotación automática y dejar el avance solo manual, o añadir
un botón de pausa. Como quitarla cambia el comportamiento que diseñaste, no la he tocado.

### 2. Las tres slides son el mismo producto
`h2` idéntico («Relaxed Fit Hoodie»), mismas tres miniaturas, mismo CTA. Solo cambian
la foto grande y el párrafo. El contador dice «01/03», lo que promete tres productos
distintos y entrega uno visto tres veces.

**Propuesta:** o son tres productos con nombre y precio propios, o el carrusel es una
galería de un único producto y el contador debería reflejarlo. Necesita contenido real
(ver `needs-input.md` C4).

### 3. Un carrusel para tres imágenes
Bootstrap + Popper + jQuery existen en el proyecto **solo** para este carrusel. Tras la
fase 9 se resuelve con ~40 líneas de JS propio, pero merece la pena preguntarse si el
carrusel aporta algo frente a mostrar las tres piezas a la vez en una rejilla.

### 4. El sitio es una sola pantalla
No hay ficha de producto, ni listado, ni «about», ni carrito. Los 15 enlaces no llevan
a ningún sitio. Como pieza de portafolio funciona, pero conviene decidir si se presenta
como **maqueta de una home** (honesto) o se completa con 2-3 páginas más.

## Media

### 5. El favicon no es la marca
El logotipo (círculo navy y arena con una onda) no guarda relación con el wordmark
`.cloth`, que es tipográfico y en negro. Son dos identidades distintas conviviendo.

**Propuesta:** un favicon derivado del wordmark (por ejemplo el punto de `.cloth`),
o adoptar el círculo como logo real y usarlo también en la cabecera.

### 6. El CTA no tiene jerarquía porque es el único
Hay un solo estilo de botón. En cuanto aparezca un segundo (por ejemplo «Añadir al
carrito» junto a «Ver detalles») hará falta un `.btn-secondary`. Los tokens ya lo
soportan; solo falta el componente.

### 7. Footer sin navegación, contacto ni aviso legal
La fase 8 añadió el año dinámico y el copyright. Falta el resto de lo que suele llevar
un footer: navegación secundaria, contacto y enlaces legales. **No lo he añadido porque
requiere contenido que no existe** (ver `needs-input.md` C7) y porque llenar el footer
de columnas cambiaría un diseño deliberadamente minimalista.

### 8. «EXPLORE MORE» en mayúsculas sostenidas
VoiceOver y TalkBack tienden a deletrear las palabras en mayúsculas
(«E-X-P-L-O-R-E»). Se soluciona escribiendo «Explore more» en el HTML y aplicando
`text-transform: uppercase` en CSS: se ve igual y se lee bien.

No lo he aplicado por no tocar el copy sin permiso. Es un cambio de una línea.

### 9. Los iconos de buscar, carrito y cuenta no hacen nada
Son botones accesibles y enfocables que no responden. En escritorio se ven; en móvil
los oculté porque se solapaban con la imagen (fase 7).

**Propuesta:** darles comportamiento, o retirarlos hasta que lo tengan. Un botón que
no responde es peor que un botón ausente.

## Baja

### 10. `--brand-sand` y `--brand-cream` sin usar
Muestreados del logotipo y declarados como tokens, pero el sitio no los usa en ningún
sitio: la paleta real es blanco, negro y el gris del botón. O se incorporan al diseño
o se retiran de `tokens.css`.

### 11. `--radius: 0`
El diseño no usa esquinas redondeadas. Está declarado explícitamente para que sea una
decisión y no un olvido, pero conviene confirmarlo.

### 12. Las fotos de producto no son propias
Son de una colección **H&M × Stranger Things** (la etiqueta se lee en
`detalle-etiqueta.webp`). Para una pieza de portafolio público conviene sustituirlas por
imágenes con licencia clara o de creación propia (ver `needs-input.md` A3).

### 13. `og:description` no es igual que `meta description`
La description usa el copy literal de la primera slide; la de Open Graph resume las
tres. Es deliberado (formatos y contextos distintos), pero si prefieres que coincidan,
es un cambio trivial.

## Descartadas

| Idea | Por qué no |
|---|---|
| Migrar a Tailwind / un framework CSS | El proyecto son 761 líneas de CSS propio y ninguna dependencia. Añadir un framework empeoraría el peso y el control |
| Mantener SCSS + Prepros | Una sola hoja de estilos y ninguna variable de Sass que las custom properties no cubran. La cadena de compilación era coste sin beneficio |
| Reescribir el carrusel con una librería | La necesidad son tres slides con prev/next. Cualquier librería pesa más que la solución propia |
| Añadir `Product` en JSON-LD | Exigiría precio, moneda y disponibilidad reales. Declararlos inventados sería datos estructurados falsos |
