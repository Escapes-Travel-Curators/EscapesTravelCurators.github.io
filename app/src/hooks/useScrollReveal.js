import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver to all .reveal elements inside
 * the returned ref's DOM node. Adds 'is-visible' class when in view.
 */
export default function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current || document.documentElement;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -30px 0px' }
    );

    const items = root.querySelectorAll('.reveal:not(.is-visible)');
    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
}
