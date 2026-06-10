(function () {
  'use strict';

  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.nav__link');
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    if (window.scrollY > 10) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }

    updateActiveNav();
  }

  function updateActiveNav() {
    const scrollPos = window.scrollY + header.offsetHeight + 40;

    let current = '';
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('nav__link--active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('nav__link--active');
      }
    });
  }

  function toggleNav() {
    const isOpen = nav.classList.toggle('nav--open');
    navToggle.classList.toggle('nav--open', isOpen);
    navToggle.classList.toggle('nav-toggle--open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  }

  function closeNav() {
    nav.classList.remove('nav--open');
    navToggle.classList.remove('nav--open', 'nav-toggle--open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  navToggle.addEventListener('click', toggleNav);

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      formSuccess.hidden = false;
      contactForm.reset();

      setTimeout(function () {
        formSuccess.hidden = true;
      }, 5000);
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
})();
