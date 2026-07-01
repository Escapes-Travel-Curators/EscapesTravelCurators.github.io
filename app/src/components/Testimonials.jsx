import { useState, useEffect, useRef, useCallback } from 'react';
import { testimonials } from '../data/testimonials';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Testimonials() {
  const [current, setCurrent]   = useState(0);
  const [perView, setPerView]   = useState(1);
  const autoTimer = useRef(null);
  const ref = useScrollReveal();

  function computePerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640)  return 2;
    return 1;
  }

  const total = useCallback(() => Math.ceil(testimonials.length / perView), [perView]);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(idx, total() - 1));
    setCurrent(clamped);
  }, [total]);

  const goNext = useCallback(() => goTo((current + 1) % total()), [current, goTo, total]);
  const goPrev = useCallback(() => goTo((current - 1 + total()) % total()), [current, goTo, total]);

  const resetTimer = useCallback(() => {
    clearInterval(autoTimer.current);
    autoTimer.current = setInterval(goNext, 5000);
  }, [goNext]);

  useEffect(() => {
    setPerView(computePerView());
    resetTimer();

    const onResize = () => {
      const pv = computePerView();
      setPerView(pv);
      setCurrent(0);
    };
    window.addEventListener('resize', onResize);
    return () => { window.removeEventListener('resize', onResize); clearInterval(autoTimer.current); };
  }, []);

  useEffect(() => { resetTimer(); }, [current, resetTimer]);

  const translatePct = -(current * (100 / perView));

  return (
    <section className="section testimonials" id="testimonials" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />What clients say</p>
          <h2>Real trips. Real praise.</h2>
        </div>

        <div
          className="testimonial-carousel"
          id="testimonial-carousel"
          onMouseEnter={() => clearInterval(autoTimer.current)}
          onMouseLeave={resetTimer}
        >
          <div
            className="testimonial-track"
            id="testimonial-track"
            style={{ transform: `translateX(${translatePct}%)` }}
          >
            {testimonials.map((t) => (
              <article key={t.id} className="testimonial-card" style={{ flex: `0 0 ${100 / perView}%` }}>
                <div className="stars" aria-label={`${t.stars} out of 5 stars`}>{'★'.repeat(t.stars)}</div>
                <blockquote>"{t.quote}"</blockquote>
                <div className="reviewer">
                  <div className="reviewer-avatar" aria-hidden="true">{t.avatarLetter}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <small>{t.trip}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="carousel-controls" aria-label="Carousel navigation">
            <button className="carousel-btn" id="carousel-prev" aria-label="Previous review" onClick={goPrev}>
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            </button>
            <div className="carousel-dots" id="carousel-dots" role="tablist" aria-label="Testimonial slides">
              {Array.from({ length: total() }).map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === current ? ' is-active' : ''}`}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button className="carousel-btn" id="carousel-next" aria-label="Next review" onClick={goNext}>
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
