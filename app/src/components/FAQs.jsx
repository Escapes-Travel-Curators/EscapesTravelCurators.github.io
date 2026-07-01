import { useState } from 'react';
import { faqs } from '../data/faqs';
import useScrollReveal from '../hooks/useScrollReveal';

export default function FAQs() {
  const [openId, setOpenId] = useState(faqs.find(f => f.defaultOpen)?.id || null);
  const ref = useScrollReveal();

  function toggle(id) {
    setOpenId(prev => (prev === id ? null : id));
  }

  return (
    <section className="section faqs" id="faqs" ref={ref}>
      <div className="container">
        <div className="section-head reveal">
          <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Questions</p>
          <h2>Good to know before we plan.</h2>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="faq-item reveal"
              style={{ '--delay': `${faq.delay}ms` }}
              open={openId === faq.id}
              onToggle={(e) => {
                if (e.target.open) setOpenId(faq.id);
                else if (openId === faq.id) setOpenId(null);
              }}
            >
              <summary>{faq.question}</summary>
              <div className="faq-body">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
