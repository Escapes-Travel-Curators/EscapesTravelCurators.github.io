// Simple Reliable Navigation
document.addEventListener('DOMContentLoaded', () => {
  // Hide all sections except Home initially
  document.querySelectorAll('section:not(#home)').forEach(section => {
    section.style.display = 'none';
  });

  // Handle all navigation clicks
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetSection = link.getAttribute('href');
      
      // Hide all sections
      document.querySelectorAll('section').forEach(s => {
        s.style.display = 'none';
      });
      
      // Show clicked section
      document.querySelector(targetSection).style.display = 'block';
      
      // Close mobile menu
      document.querySelector('.mobile-nav').classList.remove('active');
      
      // Scroll to top smoothly
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
});