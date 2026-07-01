import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Contact() {
  const [fields,  setFields]  = useState({ name: '', email: '', phone: '', message: '' });
  const [status,  setStatus]  = useState(''); // ''|'loading'|'success'|'error'
  const [msg,     setMsg]     = useState('');
  const ref = useScrollReveal();

  function onChange(e) {
    setFields(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const { name, email, message } = fields;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error'); setMsg('Please fill in all required fields.'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error'); setMsg('Please enter a valid email address.'); return;
    }

    setStatus('loading');
    setMsg('');

    try {
      // Replace with your Formspree endpoint: https://formspree.io/f/YOUR_ID
      // const res = await fetch('https://formspree.io/f/YOUR_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      //   body: JSON.stringify(fields),
      // });
      // if (!res.ok) throw new Error();
      await new Promise(r => setTimeout(r, 1500)); // Simulated — remove when Formspree is wired
      setStatus('success');
      setMsg('✓ Inquiry sent! We will respond within 24 hours.');
      setFields({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => { setStatus(''); setMsg(''); }, 7000);
    } catch {
      setStatus('error');
      setMsg('Something went wrong. Please WhatsApp or email us directly.');
    }
  }

  const channels = [
    { id: 'contact-phone', href: 'tel:+919780091116',              icon: 'fa-solid fa-phone',        label: 'Call us',    value: '+91 97800 91116' },
    { id: 'contact-email', href: 'mailto:escapestravelcurators@gmail.com', icon: 'fa-solid fa-envelope', label: 'Email us',   value: 'escapestravelcurators@gmail.com', className: '' },
    { id: 'contact-wa',    href: 'https://wa.me/919780091116',     icon: 'fa-brands fa-whatsapp',    label: 'WhatsApp',   value: 'Message instantly', iconClass: 'whatsapp', external: true },
    { id: 'contact-insta', href: 'https://www.instagram.com/escapestravelcurators', icon: 'fa-brands fa-instagram', label: 'Instagram', value: '@escapestravelcurators', iconClass: 'insta', external: true },
  ];

  return (
    <section className="section contact" id="contact" ref={ref}>
      <div className="container">
        <div className="contact-layout">
          <div className="contact-copy reveal">
            <p className="eyebrow"><span className="eyebrow-dot" aria-hidden="true" />Plan your escape</p>
            <h2>Send the brief. We'll shape the trip.</h2>
            <p>
              Tell us where you want to go, who is travelling, the dates, and the level
              of comfort you want. We will come back with a curated direction within 24 hours.
            </p>
            <div className="contact-channels">
              {channels.map(ch => (
                <a
                  key={ch.id}
                  id={ch.id}
                  className="contact-channel"
                  href={ch.href}
                  {...(ch.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  <div className={`channel-icon${ch.iconClass ? ` ${ch.iconClass}` : ''}`} aria-hidden="true">
                    <i className={ch.icon} />
                  </div>
                  <div>
                    <span>{ch.label}</span>
                    <strong>{ch.value}</strong>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <form
            className="inquiry-form reveal"
            id="inquiry-form"
            style={{ '--delay': '150ms' }}
            noValidate
            onSubmit={onSubmit}
          >
            <h3>Quick inquiry</h3>
            <div className="form-row">
              <label className="form-field">
                <span>Your Name</span>
                <input id="form-name" type="text" name="name" required autoComplete="name" placeholder="e.g. Priya Sharma" value={fields.name} onChange={onChange} />
              </label>
              <label className="form-field">
                <span>Email Address</span>
                <input id="form-email" type="email" name="email" required autoComplete="email" placeholder="you@example.com" value={fields.email} onChange={onChange} />
              </label>
            </div>
            <label className="form-field">
              <span>Phone <em style={{ fontStyle: 'normal', fontWeight: 400, color: 'var(--muted)' }}>(optional)</em></span>
              <input id="form-phone" type="tel" name="phone" autoComplete="tel" placeholder="+91 98765 43210" value={fields.phone} onChange={onChange} />
            </label>
            <label className="form-field">
              <span>Travel Brief</span>
              <textarea id="form-message" name="message" required placeholder="Where to, when, who's travelling, budget range, and what kind of trip you're imagining..." value={fields.message} onChange={onChange} />
            </label>
            <button className="btn btn-primary btn-full" type="submit" id="form-submit" disabled={status === 'loading'}>
              {status === 'loading'
                ? <><i className="fa-solid fa-spinner fa-spin" aria-hidden="true" /> Sending…</>
                : <><i className="fa-solid fa-paper-plane" aria-hidden="true" /> Send inquiry</>
              }
            </button>
            {msg && (
              <p className={`form-status ${status}`} role="status" aria-live="polite" id="form-status">{msg}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
