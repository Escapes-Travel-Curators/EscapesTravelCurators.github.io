import useScrollReveal from '../hooks/useScrollReveal';

const PROMISES = [
  'Itineraries built around your real travel style and pace.',
  'Competitive options without ever compromising the experience.',
  'One team coordinating flights, stays, visas, cars, and tours.',
  'Trusted destination partners for smoother on-ground travel.',
];

export default function Promise() {
  const ref = useScrollReveal();

  return (
    <section className="section promise" ref={ref}>
      <div className="container">
        <div className="promise-panel reveal">
          <div className="promise-bg-img" aria-hidden="true" />
          <div className="promise-content">
            <div className="promise-copy">
              <p className="eyebrow light">
                <span className="eyebrow-dot" aria-hidden="true" />
                Why Escapes
              </p>
              <h2>Premium does not mean loud. It means <em>considered</em>.</h2>
            </div>
            <ul className="promise-list">
              {PROMISES.map((p, i) => (
                <li key={i}>
                  <div className="check-icon" aria-hidden="true">
                    <i className="fa-solid fa-check" />
                  </div>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
