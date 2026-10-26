document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('nav');
  const header = document.querySelector('.site-header');

  // Create mobile nav if it doesn't exist
  if (!document.querySelector('.nav-mobile')) {
    const mobileNav = document.createElement('div');
    mobileNav.className = 'nav-mobile';
    mobileNav.innerHTML = nav.innerHTML;
    document.body.appendChild(mobileNav);

    // Toggle mobile menu
    menuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('active');
      menuBtn.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        menuBtn.textContent = '☰';
      });
    });
  }

  // Scroll Header Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Reveal animations on scroll
  const revealElements = document.querySelectorAll('section, .card, .skills-list li, .info-item');
  revealElements.forEach(el => el.classList.add('reveal'));

  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check

  // set footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});