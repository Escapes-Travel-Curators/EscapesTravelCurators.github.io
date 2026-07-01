import { useEffect } from 'react';
import { destinations } from '../data/destinations';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Journeys() {
  const ref = useScrollReveal();

  // Subtle tilt on hover (matches original script.js)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (window.innerWidth <= 768 || prefersReduced) return;

    const cards = document.querySelectorAll('.destination-card');
    const handlers = [];

    cards.forEach((card) => {
      const stack = card.closest('.destination-stack');

      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
        card.style.transform = `perspective(1000px) rotateY(${dx * 4}deg) rotateX(${-dy * 3}deg) scale(1.02)`;
      };

      const onLeave = () => {
        if (stack) {
          const idx = Array.from(stack.children).indexOf(card);
          const offsets = [0, -32, 24];
          card.style.transform = idx < offsets.length ? `translateX(${offsets[idx]}px)` : '';
        } else {
          card.style.transform = '';
        }
      };

      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      handlers.push({ card, onMove, onLeave });
    });

    return () => handlers.forEach(({ card, onMove, onLeave }) => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    });
  }, []);

  return (
    <section className="section journeys" id="journeys" ref={ref}>
      <div className="container journeys-layout">
        <div className="journey-copy reveal">
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Aesthetic itineraries</p>
          <h2>Trips that feel <em>collected</em>, not copied.</h2>
          <p>
            We build around how you want the trip to feel: slow coastal mornings,
            cinematic road journeys, destination celebrations, shopping-led city breaks,
            or a practical business itinerary with premium touches.
          </p>
          <a className="btn btn-primary" href="#contact" id="journeys-cta">Plan a journey</a>
        </div>

        <div className="destination-stack">
          {destinations.map((dest) => (
            <article
              key={dest.id}
              id={dest.id}
              className="destination-card reveal"
              style={{ '--delay': `${dest.delay}ms` }}
            >
              <img src={dest.image} alt={dest.alt} loading="lazy" />
              <div className="dest-overlay">
                <span>{dest.tag}</span>
                <h3>{dest.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
