import { useState, useEffect } from 'react';
import Header      from './components/Header';
import Hero        from './components/Hero';
import Marquee     from './components/Marquee';
import Services    from './components/Services';
import Journeys    from './components/Journeys';
import LiveCurator from './components/LiveCurator';
import Process     from './components/Process';
import Promise     from './components/Promise';
import Testimonials from './components/Testimonials';
import FAQs        from './components/FAQs';
import Contact     from './components/Contact';
import Footer      from './components/Footer';
import SEO         from './components/SEO';

const SECTION_SEO = {
  home: {
    title: 'Escapes Travel Curators | Premium Custom Travel',
    description: 'Handcrafted luxury travel experiences. Expert-curated destinations, bespoke itineraries, and seamless service from first idea to final landing.',
    keywords: 'bespoke luxury travel, custom holidays, luxury travel agency India, private journeys, luxury villa stays, travel curators',
    canonicalUrl: 'https://escapes-travel-curators.github.io/EscapesTravelCurators.github.io/#home',
  },
  services: {
    title: 'Bespoke Travel Concierge Services',
    description: 'From streamlined visa assistance and flexible flight ticketing to curated hotel portfolios and scenic luxury villa stays. We handle the complexity.',
    keywords: 'visa assistance, custom flight bookings, premium luxury hotels, luxury villa bookings, private car transfers',
    canonicalUrl: 'https://escapes-travel-curators.github.io/EscapesTravelCurators.github.io/#services',
  },
  journeys: {
    title: 'Curated Destination Journeys',
    description: 'Explore custom travel packages for Bali, Europe, Maldives and beyond. Discover bespoke itineraries tailored to your unique rhythm and taste.',
    keywords: 'bespoke travel packages, custom Europe trips, Bali luxury villas, tailored vacations, private tour itineraries',
    canonicalUrl: 'https://escapes-travel-curators.github.io/EscapesTravelCurators.github.io/#journeys',
  },
  'ai-curator': {
    title: 'Live AI Travel Itinerary Curator',
    description: 'Instantly generate a tailored luxury travel draft using our real-time AI Travel Curator tool. Tell us your vibe, duration, and budget in natural language.',
    keywords: 'AI travel planner, live custom itinerary builder, AI travel assistant, instant tour draft, personalized travel AI, custom itinerary curator',
    canonicalUrl: 'https://escapes-travel-curators.github.io/EscapesTravelCurators.github.io/#ai-curator',
  },
  process: {
    title: 'Our Tailored Planning Process',
    description: 'Discover our four-step planning process: Discovery, Curated Options, booking coordination, and 24/7 client support during travel.',
    keywords: 'bespoke travel planning, travel desk, luxury concierge service, client travel support',
    canonicalUrl: 'https://escapes-travel-curators.github.io/EscapesTravelCurators.github.io/#process',
  },
  testimonials: {
    title: 'Client Reviews & Travel Stories',
    description: 'Read real client stories and reviews about our custom honeymoons, Schengen visa application success, and high-touch business trips.',
    keywords: 'escapes travel reviews, custom trip feedback, reliable travel agent reviews',
    canonicalUrl: 'https://escapes-travel-curators.github.io/EscapesTravelCurators.github.io/#testimonials',
  },
  faqs: {
    title: 'Travel Planning FAQs',
    description: 'Common questions about premium travel booking, custom packaging, flexible payment options, and urgent visa support.',
    keywords: 'travel booking rules, premium travel desk payment options, custom travel packages faq',
    canonicalUrl: 'https://escapes-travel-curators.github.io/EscapesTravelCurators.github.io/#faqs',
  },
  contact: {
    title: 'Plan Your Bespoke Escape',
    description: 'Get in touch with our travel curators. Share your dates, budget, and dream vibe to receive a customized proposal within 24 hours.',
    keywords: 'luxury travel planner contact, escapes travel whatsapp, custom holiday inquiry',
    canonicalUrl: 'https://escapes-travel-curators.github.io/EscapesTravelCurators.github.io/#contact',
  },
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'services', 'journeys', 'ai-curator', 'process', 'testimonials', 'faqs', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (sections.includes(id)) {
              setActiveSection(id);
            }
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const seoData = SECTION_SEO[activeSection] || SECTION_SEO.home;

  return (
    <>
      {/* Dynamic SEO Meta Management */}
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonicalUrl={seoData.canonicalUrl}
      />

      {/* Ambient background orbs */}
      <div className="bg-orb orb-1" aria-hidden="true" />
      <div className="bg-orb orb-2" aria-hidden="true" />
      <div className="bg-orb orb-3" aria-hidden="true" />

      <Header />

      <main>
        <Hero />
        <Marquee />
        <Services />
        <Journeys />
        <LiveCurator />
        <Process />
        <Promise />
        <Testimonials />
        <FAQs />
        <Contact />
      </main>

      <Footer />

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/919780091116"
        className="whatsapp-fab"
        id="whatsapp-fab"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <i className="fa-brands fa-whatsapp" aria-hidden="true" />
        <span className="fab-label">Chat with us</span>
      </a>
    </>
  );
}
