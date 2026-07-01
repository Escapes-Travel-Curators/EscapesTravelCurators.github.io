import { useState, useEffect } from 'react';
import useActiveNav from '../hooks/useActiveNav';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);
  useActiveNav();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function openMenu()  { setMenuOpen(true);  document.body.style.overflow = 'hidden'; }
  function closeMenu() { setMenuOpen(false); document.body.style.overflow = '';       }

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeMenu(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const navLinks = [
    { href: '#services',     label: 'Services'     },
    { href: '#journeys',     label: 'Journeys'     },
    { href: '#ai-curator',   label: 'AI Curator'   },
    { href: '#process',      label: 'Process'      },
    { href: '#testimonials', label: 'Reviews'      },
    { href: '#faqs',         label: 'FAQs'         },
    { href: '#contact',      label: 'Contact'      },
  ];

  return (
    <>
      <header className={`site-header${scrolled ? ' is-scrolled' : ''}`} data-header>
        <a className="brand" href="#home" aria-label="Escapes Travel Curators — home">
          <img
            src="/EscapesTravelCurators.github.io/assets/logo with etc.jpg"
            alt="ETC Logo"
            loading="eager"
            fetchPriority="high"
          />
          <span className="brand-text">
            <strong>Escapes</strong>
            <small>Travel Curators</small>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary navigation">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>

        <a className="nav-cta" href="https://wa.me/919780091116" target="_blank" rel="noreferrer">
          <i className="fa-brands fa-whatsapp" aria-hidden="true" />
          Start planning
        </a>

        <button
          className={`menu-toggle${menuOpen ? ' is-open' : ''}`}
          id="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={openMenu}
        >
          <span /><span /><span />
        </button>
      </header>

      {/* Mobile overlay */}
      <div
        className={`mobile-overlay${menuOpen ? ' is-visible' : ''}`}
        id="mobile-overlay"
        aria-hidden="true"
        onClick={closeMenu}
      />

      {/* Mobile panel */}
      <nav
        className={`mobile-panel${menuOpen ? ' is-open' : ''}`}
        id="mobile-panel"
        aria-label="Mobile navigation"
      >
        <button className="close-menu" id="close-menu" type="button" aria-label="Close menu" onClick={closeMenu}>
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
        {navLinks.map((l) => (
          <a key={l.href} href={l.href} onClick={closeMenu}>{l.label}</a>
        ))}
        <a className="mobile-cta" href="https://wa.me/919780091116" target="_blank" rel="noreferrer" onClick={closeMenu}>
          <i className="fa-brands fa-whatsapp" aria-hidden="true" /> WhatsApp Us
        </a>
      </nav>
    </>
  );
}
