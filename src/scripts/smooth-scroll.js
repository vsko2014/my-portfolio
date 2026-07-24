import Lenis from 'lenis';

export function initSmoothScroll() {
  const lenis = new Lenis({
    lerp: 0.1,          // suavidade do scroll (0-1, menor = mais "lento"/fluido)
    smoothWheel: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return lenis;
}
