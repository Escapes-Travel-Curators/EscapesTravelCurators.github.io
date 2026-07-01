import { useEffect } from 'react';
import useParallax from '../hooks/useParallax';

export default function Hero() {
  useParallax();

  // Staggered entrance animation (matches original script.js)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const heroCopy = document.getElementById('hero-copy');
    if (!heroCopy) return;

    const els = heroCopy.querySelectorAll('.eyebrow, h1, .hero-sub, .hero-actions');
    els.forEach((el, i) => {
      el.style.opacity  = '0';
      el.style.transform = 'translateY(18px)';
      // 300ms snappy — only opacity + transform (GPU-composited)
      el.style.transition = `opacity 320ms ease ${100 + i * 80}ms, transform 320ms ease ${100 + i * 80}ms`;
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          el.style.opacity  = '1';
          el.style.transform = 'translateY(0)';
        })
      );
    });

    const heroCard = document.getElementById('hero-card');
    if (heroCard) {
      heroCard.style.opacity   = '0';
      heroCard.style.transform = 'translateY(22px)';
      heroCard.style.transition = 'opacity 350ms ease 480ms, transform 350ms ease 480ms';
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          heroCard.style.opacity   = '1';
          heroCard.style.transform = 'translateY(0)';
        })
      );
    }
  }, []);

  return (
    <section className="hero" id="home">
      {/* Floating photo collage */}
      <div className="hero-photos" aria-hidden="true">
        <div className="hero-photo hero-photo-a" data-speed="0.12">
          <img
            src="/EscapesTravelCurators.github.io/assets/images/travel4.jpg"
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="hero-photo hero-photo-b" data-speed="0.22">
          <img
            src="/EscapesTravelCurators.github.io/assets/images/travel5.jpg"
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>
        <div className="hero-photo hero-photo-c" data-speed="0.08">
          <img
            src="/EscapesTravelCurators.github.io/assets/images/travel6.jpg"
            alt=""
            fetchPriority="high"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      <div className="hero-inner">
        <div className="hero-copy" id="hero-copy">
          <p className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            Private journeys, carefully composed
          </p>
          <h1>Luxury travel made <em>personal</em>,<br />from first idea to final landing.</h1>
          <p className="hero-sub">
            Escapes Travel Curators plans premium holidays, honeymoons, family retreats,
            villa stays, flights, visas, and local experiences — with one calm point of contact.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact" id="hero-cta-primary">
              <i className="fa-solid fa-paper-plane" aria-hidden="true" />
              Curate my trip
            </a>
            <a className="btn btn-ghost" href="tel:+919780091116" id="hero-cta-call">
              <i className="fa-solid fa-phone" aria-hidden="true" />
              +91 97800 91116
            </a>
          </div>
        </div>

        <div className="hero-card" id="hero-card">
          <div className="hero-card-badge">
            <i className="fa-solid fa-star" aria-hidden="true" />
            Concierge note
          </div>
          <p className="hero-card-title">Visas, flights, stays, cars, tours &amp; special requests — handled together.</p>
          <div className="mini-stats">
            <div className="stat"><b>24h</b><small>proposal window</small></div>
            <div className="stat"><b>1:1</b><small>travel desk</small></div>
            <div className="stat"><b>Global</b><small>partner network</small></div>
          </div>
        </div>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}
