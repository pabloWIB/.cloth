/**
 * .cloth — JavaScript del sitio
 *
 * Sustituye a jQuery 3.3.1 + Popper 1.14.3 + Bootstrap 4.1.3, que estaban
 * ahí únicamente para un carrusel de tres slides y cuatro toggles de clase.
 *
 * Sin dependencias. Cargado con `defer`, así que el DOM ya existe.
 */
(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------
     Año del footer
     ------------------------------------------------------------------ */

  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  /* ------------------------------------------------------------------
     Menú móvil
     ------------------------------------------------------------------ */

  const initMobileMenu = () => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.querySelector('.mobile-menu');
    if (!toggle || !menu) return;

    const setOpen = (open) => {
      toggle.classList.toggle('is-open', open);
      menu.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      document.documentElement.classList.toggle('scroll-locked', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    const isOpen = () => menu.classList.contains('is-open');

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    // Cierra con Escape y devuelve el foco al botón.
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Cierra al navegar.
    menu.addEventListener('click', (e) => {
      if (e.target.closest('a')) setOpen(false);
    });

    // Si se vuelve a escritorio con el menú abierto, se restablece.
    const desktop = window.matchMedia('(min-width: 48rem)');
    desktop.addEventListener('change', (e) => {
      if (e.matches && isOpen()) setOpen(false);
    });
  };

  /* ------------------------------------------------------------------
     Carrusel

     Reemplaza al de Bootstrap. Mantiene sus clases (.carousel-item,
     .active) para no tocar el marcado, y añade lo que aquel no daba:
     navegación por teclado y anuncio a lectores de pantalla.
     ------------------------------------------------------------------ */

  const initCarousel = () => {
    const root = document.querySelector('#carrusel');
    if (!root) return;

    const slides = [...root.querySelectorAll('.carousel-item')];
    if (slides.length < 2) return;

    let current = Math.max(0, slides.findIndex((s) => s.classList.contains('active')));

    const show = (index) => {
      const next = (index + slides.length) % slides.length;
      if (next === current) return;

      slides[current].classList.remove('active');
      slides[next].classList.add('active');
      current = next;
    };

    document.querySelectorAll('[data-slide]').forEach((control) => {
      control.addEventListener('click', () => {
        show(current + (control.dataset.slide === 'prev' ? -1 : 1));
      });
    });

    // Flechas izquierda/derecha cuando el carrusel tiene el foco dentro.
    root.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
    });

    /* Rotación automática.
       El original la heredaba de `data-ride="carousel"` y no había forma
       de pararla, lo que incumple WCAG 2.2.2. Aquí se pausa al pasar el
       ratón, al enfocar dentro, al ocultarse la pestaña y con
       `prefers-reduced-motion`. Ver docs/improvements.md #1. */
    const INTERVAL = 5000;
    let timer = null;

    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => {
      if (timer || prefersReducedMotion.matches) return;
      timer = setInterval(() => show(current + 1), INTERVAL);
    };

    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    root.addEventListener('focusin', stop);
    root.addEventListener('focusout', start);
    document.addEventListener('visibilitychange', () => {
      document.hidden ? stop() : start();
    });
    prefersReducedMotion.addEventListener('change', (e) => {
      e.matches ? stop() : start();
    });

    document.querySelectorAll('.carousel-control').forEach((c) => {
      c.addEventListener('click', () => { stop(); start(); });
    });

    start();
  };

  initMobileMenu();
  initCarousel();
})();
