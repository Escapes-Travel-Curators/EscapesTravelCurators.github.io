import { useEffect } from 'react';

/**
 * Applies a CSS translateY parallax effect to elements with [data-speed].
 * Matches the original vanilla JS implementation.
 */
export default function useParallax() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.innerWidth <= 768 || prefersReduced) return;

    const photos = document.querySelectorAll('.hero-photo[data-speed]');
    if (!photos.length) return;

    function update() {
      const scrollY = window.scrollY;
      photos.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0.15');
        el.style.transform = `translateY(${scrollY * speed}px)`;
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
}
