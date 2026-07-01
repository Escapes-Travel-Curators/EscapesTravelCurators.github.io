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

export default function App() {
  return (
    <>
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
