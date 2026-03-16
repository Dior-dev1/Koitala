/* ============================================
   AGENCE IMMOBILIÈRE KOITALA - Script Global
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* === ANIMATION EN CASCADE === */
  function applyStagger(containerSelector, stepMs) {
    document.querySelectorAll(containerSelector).forEach(function (container) {
      var animatedChildren = container.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
      animatedChildren.forEach(function (el, index) {
        el.style.setProperty('--stagger-delay', (index * stepMs) + 'ms');
      });
    });
  }

  applyStagger('.cards-grid', 90);
  applyStagger('.services-grid', 90);
  applyStagger('.realisations-grid', 90);
  applyStagger('.values-grid', 90);
  applyStagger('.process-grid', 90);
  applyStagger('.testimonials-grid', 90);
  applyStagger('.proof-grid', 90);
  applyStagger('.quick-contact-grid', 90);
  applyStagger('.timeline', 120);

  /* === MENU MOBILE HAMBURGER === */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      if (navOverlay) navOverlay.classList.toggle('active');
      var menuOpen = navMenu.classList.contains('active');
      hamburger.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    });

    if (navOverlay) {
      navOverlay.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navOverlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    }

    /* Fermer le menu en cliquant sur un lien */
    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        if (navOverlay) navOverlay.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* === HEADER SCROLL EFFECT === */
  const header = document.querySelector('.header');

  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  /* === HERO SLIDESHOW === */
  var heroSlides = document.querySelectorAll('.hero-slide');

  if (heroSlides.length > 1) {
    var currentSlide = 0;
    var totalSlides = heroSlides.length;

    setInterval(function () {
      heroSlides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % totalSlides;
      heroSlides[currentSlide].classList.add('active');
    }, 5000);
  }

  /* === BANNER SLIDESHOW (pages internes) === */
  var bannerSlides = document.querySelectorAll('.banner-slide');

  if (bannerSlides.length > 1) {
    var currentBanner = 0;
    var totalBanners = bannerSlides.length;

    setInterval(function () {
      bannerSlides[currentBanner].classList.remove('active');
      currentBanner = (currentBanner + 1) % totalBanners;
      bannerSlides[currentBanner].classList.add('active');
    }, 4000);
  }

  /* === ANIMATIONS AU SCROLL === */
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');

  if (animatedElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* === FAQ ACCORDION === */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        /* Fermer tous les autres */
        faqItems.forEach(function (other) {
          other.classList.remove('active');
          var otherQuestion = other.querySelector('.faq-question');
          if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
        });

        /* Ouvrir celui cliqué si pas déjà ouvert */
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* === VALIDATION DU FORMULAIRE DE CONTACT === */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    var whatsAppLeadLink = document.getElementById('whatsAppLeadLink');

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      /* Réinitialiser les erreurs */
      contactForm.querySelectorAll('.error').forEach(function (el) {
        el.classList.remove('error');
      });
      contactForm.querySelectorAll('.error-message').forEach(function (el) {
        el.style.display = 'none';
      });

      /* Nom complet */
      const nom = document.getElementById('nom');
      if (nom && nom.value.trim().length < 2) {
        showError(nom, 'Veuillez entrer votre nom complet.');
        isValid = false;
      }

      /* Téléphone */
      const telephone = document.getElementById('telephone');
      if (telephone && telephone.value.trim().length < 6) {
        showError(telephone, 'Veuillez entrer un numéro de téléphone valide.');
        isValid = false;
      }

      /* Email */
      const email = document.getElementById('email');
      if (email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
          showError(email, 'Veuillez entrer une adresse email valide.');
          isValid = false;
        }
      }

      /* Service */
      const service = document.getElementById('service');
      if (service && service.value === '') {
        showError(service, 'Veuillez sélectionner un service.');
        isValid = false;
      }

      /* Message */
      const message = document.getElementById('message');
      if (message && message.value.trim().length < 10) {
        showError(message, 'Veuillez entrer un message d\'au moins 10 caractères.');
        isValid = false;
      }

      /* Si valide, afficher le message de succès */
      if (isValid) {
        var successMsg = document.getElementById('formSuccess');
        var payload = {
          nom: nom.value.trim(),
          telephone: telephone.value.trim(),
          email: email.value.trim(),
          service: service.value.trim(),
          message: message.value.trim()
        };

        var emailSubject = 'Demande de contact KOITALA - ' + payload.service;
        var emailBody =
          'Nom : ' + payload.nom + '\n' +
          'Téléphone : ' + payload.telephone + '\n' +
          'Email : ' + payload.email + '\n' +
          'Service : ' + payload.service + '\n\n' +
          'Message :\n' + payload.message;

        var whatsAppText =
          'Bonjour KOITALA,%0A%0A' +
          'Nom : ' + encodeURIComponent(payload.nom) + '%0A' +
          'Téléphone : ' + encodeURIComponent(payload.telephone) + '%0A' +
          'Email : ' + encodeURIComponent(payload.email) + '%0A' +
          'Service : ' + encodeURIComponent(payload.service) + '%0A%0A' +
          'Message :%0A' + encodeURIComponent(payload.message);

        if (whatsAppLeadLink) {
          whatsAppLeadLink.setAttribute('href', 'https://wa.me/221766752135?text=' + whatsAppText);
        }

        if (successMsg) {
          successMsg.classList.add('visible');
          setTimeout(function () {
            window.location.href = 'mailto:amzakoita@gmail.com?subject=' + encodeURIComponent(emailSubject) + '&body=' + encodeURIComponent(emailBody);
          }, 200);

          setTimeout(function () {
            successMsg.classList.remove('visible');
          }, 5000);
        }
      }
    });

    /* Supprimer les erreurs en tapant */
    contactForm.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        field.classList.remove('error');
        var errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.style.display = 'none';
      });
    });
  }

  /**
   * Affiche une erreur sur un champ de formulaire
   */
  function showError(field, message) {
    field.classList.add('error');
    var errorMsg = field.parentElement.querySelector('.error-message');
    if (errorMsg) {
      errorMsg.textContent = message;
      errorMsg.style.display = 'block';
    }
  }

  /* === NAVIGATION ACTIVE LINK === */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a:not(.btn)');

  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});
