/* ════════════════════════════════════════════════════════════
   ESCAPES TRAVEL CURATORS — Interactive JavaScript
   ════════════════════════════════════════════════════════════ */

'use strict';

// ─── DOM REFERENCES ─────────────────────────────────────────
const header        = document.querySelector('[data-header]');
const menuToggle    = document.getElementById('menu-toggle');
const mobilePanel   = document.getElementById('mobile-panel');
const mobileOverlay = document.getElementById('mobile-overlay');
const closeMenu     = document.getElementById('close-menu');
const mobileLinks   = document.querySelectorAll('.mobile-panel a');
const revealItems   = document.querySelectorAll('.reveal');
const heroPhotos    = document.querySelectorAll('.hero-photo[data-speed]');
const form          = document.getElementById('inquiry-form');
const formStatus    = document.getElementById('form-status');
const formSubmit    = document.getElementById('form-submit');

// ════════════════════════════════════════════════════════════
// MOBILE MENU
// ════════════════════════════════════════════════════════════
function openMenu() {
  mobilePanel?.classList.add('is-open');
  mobileOverlay?.classList.add('is-visible');
  menuToggle?.classList.add('is-open');
  menuToggle?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenuFn() {
  mobilePanel?.classList.remove('is-open');
  mobileOverlay?.classList.remove('is-visible');
  menuToggle?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuToggle?.addEventListener('click', openMenu);
closeMenu?.addEventListener('click', closeMenuFn);
mobileOverlay?.addEventListener('click', closeMenuFn);
mobileLinks.forEach(link => link.addEventListener('click', closeMenuFn));

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenuFn();
});

// ════════════════════════════════════════════════════════════
// HEADER SCROLL BEHAVIOUR
// ════════════════════════════════════════════════════════════
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  header?.classList.toggle('is-scrolled', scrollY > 40);
  lastScroll = scrollY;
}, { passive: true });

// ════════════════════════════════════════════════════════════
// SCROLL REVEAL (INTERSECTION OBSERVER)
// ════════════════════════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -48px 0px'
});

revealItems.forEach(el => revealObserver.observe(el));

// ════════════════════════════════════════════════════════════
// PARALLAX — HERO PHOTOS
// ════════════════════════════════════════════════════════════
function updateParallax() {
  const scrollY = window.scrollY;
  heroPhotos.forEach(el => {
    const speed  = parseFloat(el.getAttribute('data-speed') || '0.15');
    const offset = scrollY * speed;
    el.style.transform = `translateY(${offset}px)`;
  });
}

// Only enable on non-mobile & non-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroPhotos.length && window.innerWidth > 768 && !prefersReducedMotion) {
  window.addEventListener('scroll', updateParallax, { passive: true });
}

// ════════════════════════════════════════════════════════════
// TESTIMONIAL CAROUSEL
// ════════════════════════════════════════════════════════════
(function initCarousel() {
  const carousel = document.getElementById('testimonial-carousel');
  const track    = document.getElementById('testimonial-track');
  const dotsEl   = document.getElementById('carousel-dots');
  const prevBtn  = document.getElementById('carousel-prev');
  const nextBtn  = document.getElementById('carousel-next');

  if (!track || !dotsEl) return;

  const cards = Array.from(track.querySelectorAll('.testimonial-card'));
  let current  = 0;
  let autoTimer;
  let perView  = computePerView();
  let total    = computeTotal();

  function computePerView() {
    if (window.innerWidth < 640)  return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function computeTotal() {
    return Math.max(1, cards.length - perView + 1);
  }

  function buildDots() {
    dotsEl.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const btn = document.createElement('button');
      btn.className = 'carousel-dot' + (i === current ? ' is-active' : '');
      btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', String(i === current));
      btn.addEventListener('click', () => goTo(i));
      dotsEl.appendChild(btn);
    }
  }

  function updateDots() {
    dotsEl.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-selected', String(active));
    });
  }

  function getCardWidth() {
    const card = cards[0];
    if (!card) return 0;
    const style = getComputedStyle(card);
    return card.offsetWidth + parseFloat(style.marginRight || 0) + 24; // 24 = gap
  }

  function goTo(index) {
    total   = computeTotal();
    current = Math.max(0, Math.min(index, total - 1));
    const offset = current * getCardWidth();
    track.style.transform = `translateX(-${offset}px)`;
    updateDots();
    resetTimer();
  }

  function goNext() { goTo(current + 1 >= total ? 0 : current + 1); }
  function goPrev() { goTo(current - 1 < 0 ? total - 1 : current - 1); }

  function resetTimer() {
    clearInterval(autoTimer);
    autoTimer = setInterval(goNext, 5500);
  }

  // Keyboard navigation
  prevBtn?.addEventListener('click', goPrev);
  nextBtn?.addEventListener('click', goNext);

  // Touch / swipe
  let touchStartX = 0;
  let touchStartY = 0;
  let isDragging  = false;

  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    isDragging  = true;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const dx = Math.abs(e.touches[0].clientX - touchStartX);
    const dy = Math.abs(e.touches[0].clientY - touchStartY);
    if (dx > dy) e.preventDefault(); // prevent page scroll on horizontal swipe
  }, { passive: false });

  track.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 44) {
      dx < 0 ? goNext() : goPrev();
    }
  });

  // Pause on hover
  carousel?.addEventListener('mouseenter', () => clearInterval(autoTimer));
  carousel?.addEventListener('mouseleave', resetTimer);

  // Rebuild on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      perView = computePerView();
      total   = computeTotal();
      current = 0;
      buildDots();
      goTo(0);
    }, 200);
  });

  // Initialise
  buildDots();
  resetTimer();
})();

// ════════════════════════════════════════════════════════════
// FAQ ACCORDION
// ════════════════════════════════════════════════════════════
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (!item.open) return;
    document.querySelectorAll('.faq-item[open]').forEach(openItem => {
      if (openItem !== item) openItem.open = false;
    });
  });
});

// ════════════════════════════════════════════════════════════
// FORM SUBMISSION
// ════════════════════════════════════════════════════════════
form?.addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!formStatus || !formSubmit) return;

  // Simple client-side validation
  const name    = document.getElementById('form-name')?.value.trim();
  const email   = document.getElementById('form-email')?.value.trim();
  const message = document.getElementById('form-message')?.value.trim();

  if (!name || !email || !message) {
    setFormStatus('Please fill in all required fields.', 'error');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setFormStatus('Please enter a valid email address.', 'error');
    return;
  }

  // Loading state
  formSubmit.disabled = true;
  formSubmit.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Sending…';
  formStatus.className = 'form-status';
  formStatus.textContent = '';

  try {
    // Replace the URL below with your Formspree endpoint or backend URL.
    // e.g. https://formspree.io/f/YOUR_FORM_ID
    // For now we simulate a successful send.
    await simulateSend();

    setFormStatus('✓ Inquiry sent! We will respond within 24 hours.', 'success');
    form.reset();
  } catch (err) {
    setFormStatus('Something went wrong. Please WhatsApp or email us directly.', 'error');
  } finally {
    formSubmit.disabled = false;
    formSubmit.innerHTML = '<i class="fa-solid fa-paper-plane" aria-hidden="true"></i> Send inquiry';
  }

  setTimeout(() => {
    formStatus.textContent = '';
    formStatus.className = 'form-status';
  }, 7000);
});

function setFormStatus(msg, type) {
  if (!formStatus) return;
  formStatus.textContent = msg;
  formStatus.className = `form-status ${type}`;
}

function simulateSend() {
  // Remove this function and replace with real fetch() when you have an endpoint
  return new Promise((resolve) => setTimeout(resolve, 1600));
}

// ════════════════════════════════════════════════════════════
// SERVICE CARD — CURSOR GLOW TRACKING
// ════════════════════════════════════════════════════════════
document.querySelectorAll('.service-card:not(.service-card--accent)').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (((e.clientX - rect.left) / rect.width) * 100).toFixed(1);
    const y = (((e.clientY - rect.top) / rect.height) * 100).toFixed(1);
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// ════════════════════════════════════════════════════════════
// SMOOTH ACTIVE NAV LINK HIGHLIGHTING
// ════════════════════════════════════════════════════════════
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (!sections.length || !navLinks.length) return;

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('is-active', href === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));
})();

// ════════════════════════════════════════════════════════════
// DESTINATION CARDS — SUBTLE TILT ON HOVER
// ════════════════════════════════════════════════════════════
if (window.innerWidth > 768 && !prefersReducedMotion) {
  document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx   = rect.left + rect.width / 2;
      const cy   = rect.top  + rect.height / 2;
      const dx   = (e.clientX - cx) / (rect.width / 2);
      const dy   = (e.clientY - cy) / (rect.height / 2);
      card.style.transform = `
        perspective(1000px)
        rotateY(${dx * 4}deg)
        rotateX(${-dy * 3}deg)
        scale(1.02)
      `;
    });

    card.addEventListener('mouseleave', () => {
      const nth = card.classList.contains('destination-card')
        ? parseInt(card.style.getPropertyValue('--nth') || '0')
        : 0;

      // Reset to original offset transforms
      const el = card.closest('.destination-stack')?.children;
      if (el) {
        const idx = Array.from(el).indexOf(card);
        const offsets = [0, -32, 24];
        card.style.transform = idx < offsets.length
          ? `translateX(${offsets[idx]}px)`
          : '';
      } else {
        card.style.transform = '';
      }
    });
  });
}

// ════════════════════════════════════════════════════════════
// HERO — TYPED EYEBROW ANIMATION (subtle, one-time)
// ════════════════════════════════════════════════════════════
(function initHeroEntrance() {
  const heroCopy = document.querySelector('.hero-copy');
  if (!heroCopy) return;

  // Stagger hero elements in on load
  const elements = heroCopy.querySelectorAll('.eyebrow, h1, .hero-sub, .hero-actions');
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 700ms ease ${200 + i * 120}ms, transform 700ms ease ${200 + i * 120}ms`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  });

  // Also animate the hero card
  const heroCard = document.getElementById('hero-card');
  if (heroCard) {
    heroCard.style.opacity = '0';
    heroCard.style.transform = 'translateY(28px)';
    heroCard.style.transition = 'opacity 700ms ease 800ms, transform 700ms ease 800ms';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroCard.style.opacity = '';
        heroCard.style.transform = '';
      });
    });
  }
})();

// ════════════════════════════════════════════════════════════
// ACTIVE NAV LINK STYLES (CSS helper)
// ════════════════════════════════════════════════════════════
// Inject active link style
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
  .nav-links a.is-active {
    color: var(--navy);
    background: rgba(13, 33, 55, 0.07);
    font-weight: 700;
  }
`;
document.head.appendChild(activeNavStyle);
