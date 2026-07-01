import useScrollReveal from '../hooks/useScrollReveal';

const STEPS = [
  {
    id: 'step-1', num: '01', delay: 0,
    title: 'Discovery',
    body: 'We understand dates, destination ideas, budget, travellers, occasion, and non-negotiables — all in one conversation.',
  },
  {
    id: 'step-2', num: '02', delay: 100,
    title: 'Curated Options',
    body: 'You receive a thoughtful shortlist of routes, stays, experiences, and pricing within 24 hours of your brief.',
  },
  {
    id: 'step-3', num: '03', delay: 200,
    title: 'Booking Desk',
    body: 'Flights, hotels, visas, cars, and tours are coordinated together with transparent updates along the way.',
  },
  {
    id: 'step-4', num: '04', delay: 300,
    title: 'Travel Support',
    body: 'We stay available through WhatsApp and call for urgent adjustments and on-ground local support throughout.',
  },
];

export default function Process() {
  const ref = useScrollReveal();

  return (
    <section className="section process" id="process" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />How it works</p>
          <h2>A clear planning flow for premium travel decisions.</h2>
        </div>

        <div className="process-timeline">
          {STEPS.map((step) => (
            <article
              key={step.id}
              id={step.id}
              className="process-step reveal"
              style={{ '--delay': `${step.delay}ms` }}
            >
              <div className="step-number" aria-hidden="true">{step.num}</div>
              <div className="step-body">
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
