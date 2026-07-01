import { useEffect } from 'react';
import { services } from '../data/services';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Services() {
  const ref = useScrollReveal();

  // Cursor glow tracking on service cards (matches original script.js)
  useEffect(() => {
    const cards = document.querySelectorAll('.service-card:not(.service-card--accent)');
    const handlers = [];
    cards.forEach((card) => {
      const fn = (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${(((e.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`);
        card.style.setProperty('--my', `${(((e.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`);
      };
      card.addEventListener('mousemove', fn);
      handlers.push({ card, fn });
    });
    return () => handlers.forEach(({ card, fn }) => card.removeEventListener('mousemove', fn));
  }, []);

  return (
    <section className="section services" id="services" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Everything handled</p>
          <h2>Designed for travellers who want the beautiful version, without the chaos.</h2>
        </div>

        <div className="services-grid">
          {services.map((s) =>
            s.accent ? (
              <article
                key={s.id}
                id={s.id}
                className="service-card service-card--accent reveal"
                style={{ '--delay': `${s.delay}ms` }}
              >
                <p className="eyebrow-sm">{s.eyebrow}</p>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <a className="btn-link" href={s.ctaHref}>
                  {s.ctaText} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                </a>
              </article>
            ) : (
              <article
                key={s.id}
                id={s.id}
                className="service-card reveal"
                style={{ '--delay': `${s.delay}ms` }}
              >
                <div className="service-icon" aria-hidden="true">
                  <i className={s.icon} />
                </div>
                <h3>{s.title}</h3>
                <p>{s.description}</p>
                <div className="card-shimmer" aria-hidden="true" />
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
