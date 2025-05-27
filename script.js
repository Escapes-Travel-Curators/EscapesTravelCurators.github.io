document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.close-menu');
  
  hamburger.addEventListener('click', function() {
    mobileNav.classList.add('active');
  });
  
  closeBtn.addEventListener('click', function() {
    mobileNav.classList.remove('active');
  });
  
  // Close menu when clicking links
  document.querySelectorAll('.mobile-nav a').forEach(link => {
    link.addEventListener('click', function() {
      mobileNav.classList.remove('active');
    });
  });
  
  // Section navigation
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = this.getAttribute('href');
      
      // Hide all sections
      document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
      });
      
      // Show target section
      document.querySelector(target).classList.add('active');
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });
  
  // Show home section by default
  document.querySelector('#home').classList.add('active');
});