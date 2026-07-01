export default function Footer() {
  const serviceLinks = ['Visa Assistance', 'Flights', 'Hotels & Villas', 'Land Packages', 'Cars & Transfers'];
  const exploreLinks = [
    { label: 'Journeys',       href: '#journeys'     },
    { label: 'AI Curator',     href: '#ai-curator'   },
    { label: 'Our Process',    href: '#process'      },
    { label: 'Client Reviews', href: '#testimonials' },
    { label: 'FAQs',           href: '#faqs'         },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-layout">
        <div className="footer-brand">
          <a className="brand" href="#home">
            <img src="/EscapesTravelCurators.github.io/assets/logo with etc.jpg" alt="ETC Logo" loading="lazy" />
            <span className="brand-text">
              <strong>Escapes</strong>
              <small>Travel Curators</small>
            </span>
          </a>
          <p>Premium custom travel, carefully curated from first idea to final landing.</p>
          <div className="footer-socials">
            <a href="https://www.instagram.com/escapestravelcurators" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fa-brands fa-instagram" aria-hidden="true" />
            </a>
            <a href="https://wa.me/919780091116" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
            </a>
            <a href="mailto:escapestravelcurators@gmail.com" aria-label="Email">
              <i className="fa-solid fa-envelope" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Services</h4>
            {serviceLinks.map((l) => <a key={l} href="#services">{l}</a>)}
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            {exploreLinks.map((l) => <a key={l.href} href={l.href}>{l.label}</a>)}
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <a href="tel:+919780091116">+91 97800 91116</a>
            <a href="mailto:escapestravelcurators@gmail.com">escapestravelcurators@gmail.com</a>
            <a href="https://wa.me/919780091116" target="_blank" rel="noreferrer">WhatsApp Us</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Escapes Travel Curators. All rights reserved.</p>
      </div>
    </footer>
  );
}
