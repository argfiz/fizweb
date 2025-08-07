// ← OPTIMIZACIÓN: ES Module structure para mejor tree-shaking y parsing
'use strict';

/*****************************************************************************************************/
/*****************************************************************************************************/
/* ================================ CLEANUP MANAGEMENT ======================================= */
/*****************************************************************************************************/
/*****************************************************************************************************/

// ← OPTIMIZACIÓN: Sistema de cleanup para memory leaks
const cleanupManager = {
  listeners: [],
  observers: [],
  
  addListener(element, event, handler, options) {
    element.addEventListener(event, handler, options);
    this.listeners.push({ element, event, handler, options });
  },
  
  addObserver(observer) {
    this.observers.push(observer);
  },
  
  cleanup() {
    // Cleanup event listeners
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.listeners = [];
    
    // Cleanup observers
    this.observers.forEach(observer => {
      observer.disconnect();
    });
    this.observers = [];
  }
};

// ← OPTIMIZACIÓN: Cleanup automático al cambiar de página
window.addEventListener('beforeunload', () => {
  cleanupManager.cleanup();
});



/*****************************************************************************************************/
/*****************************************************************************************************/
/* ========================================== MENU DESKTOP - MENU HAMBURGUER ======================= */
/*****************************************************************************************************/
/*****************************************************************************************************/
// ← OPTIMIZACIÓN CRÍTICA: LAZY DOM QUERIES - NO bloquear main thread
let elements = null;

// ← OPTIMIZACIÓN: DOM queries diferidas hasta cuando sean necesarias
function getElements() {
  if (!elements) {
    elements = {
      hamburger: document.getElementById('hamburger'),
      navMenu: document.getElementById('navMenu'),
      navbar: document.getElementById('main-nav'),
      heroHighlight: document.querySelector('.hero-highlight')
    };
  }
  return elements;
}

// ← OPTIMIZAR: Función modular para hamburger menu
function initHamburgerMenu() {
  const { hamburger, navMenu } = getElements();

  const hamburgerClickHandler = () => {
    // Will-change dinámico para AMBOS elementos
    hamburger.classList.add('will-change');
    navMenu.classList.add('will-change');

    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');

    // Limpiar will-change
    setTimeout(() => {
      hamburger.classList.remove('will-change');
      navMenu.classList.remove('will-change');
    }, 250);
  };

  cleanupManager.addListener(hamburger, 'click', hamburgerClickHandler);

  // Cerrar menú al hacer click en un link del menú
  const menuLinks = document.querySelectorAll('.nav-menu__link');
  const menuLinkClickHandler = () => {
    hamburger.classList.remove('active', 'will-change');
    navMenu.classList.remove('active', 'will-change');
    document.body.classList.remove('menu-open');
  };

  menuLinks.forEach(link => {
    cleanupManager.addListener(link, 'click', menuLinkClickHandler);
  });

  // Cerrar menú al hacer click fuera
  const outsideClickHandler = (event) => {
    if (navMenu.contains(event.target) || hamburger.contains(event.target)) {
      return;
    }

    hamburger.classList.remove('active', 'will-change');
    navMenu.classList.remove('active', 'will-change');
    document.body.classList.remove('menu-open');
  };

  cleanupManager.addListener(document, 'click', outsideClickHandler, { passive: true });
}

/* ====== SCROLL OPTIMIZADO CON WILL-CHANGE ====== */
// ← OPTIMIZAR: Función modular para scroll navbar
function initScrollNavbar() {
  const { navbar } = getElements();
  let scrollTicking = false;

  function updateNavbarOnScroll() {
    const isScrolled = window.scrollY > 50;

    if (isScrolled && !navbar.classList.contains('scrolled')) {
      navbar.classList.add('will-change');
      navbar.classList.add('scrolled');

      setTimeout(() => {
        navbar.classList.remove('will-change');
      }, 250);

    } else if (!isScrolled && navbar.classList.contains('scrolled')) {
      navbar.classList.add('will-change');
      navbar.classList.remove('scrolled');

      setTimeout(() => {
        navbar.classList.remove('will-change');
      }, 250);
    }

    scrollTicking = false;
  }

  const scrollHandler = () => {
    if (!scrollTicking) {
      scrollTicking = true;
      requestAnimationFrame(updateNavbarOnScroll);
    }
  };

  cleanupManager.addListener(window, 'scroll', scrollHandler, { passive: true });
}

/* ====== LOGO CLICK OPTIMIZADO ====== */
// ← OPTIMIZAR: Función modular para logo navigation
function initLogoClick() {
  const { navbar } = getElements();
  const logoElement = navbar.querySelector('.logo-nav');
  
  if (!logoElement) return;
  
  const logoClickHandler = () => {
    const currentPath = window.location.pathname;
    if (currentPath !== '/index.html' && currentPath !== '/') {
      window.location.href = './index.html';
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  cleanupManager.addListener(logoElement, 'click', logoClickHandler);
}


/*======================================================================================
================== OPTIMIZACIÓN DE ANIMACIÓN HERO ====================================
==========================================================================================
========================================================================================== */
// ← OPTIMIZAR: Función modular para hero animation
function initHeroAnimation() {
  const { heroHighlight } = getElements();

  if (!heroHighlight) return;

  // Intersection Observer para will-change dinámico
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '50px'
  };

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.willChange = 'background-position, filter';
      } else {
        entry.target.style.willChange = 'auto';
      }
    });
  }, observerOptions);

  heroObserver.observe(heroHighlight);
  cleanupManager.addObserver(heroObserver);

  // Pausar animación si la pestaña no está activa
  const visibilityChangeHandler = () => {
    heroHighlight.style.animationPlayState = document.hidden ? 'paused' : 'running';
  };

  cleanupManager.addListener(document, 'visibilitychange', visibilityChangeHandler);

  // Detectar dispositivos con batería baja
  if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
      function updateAnimationBasedOnBattery() {
        if (battery.level < 0.2 && !battery.charging) {
          heroHighlight.style.animationPlayState = 'paused';
          heroHighlight.style.willChange = 'auto';
        } else {
          heroHighlight.style.animationPlayState = 'running';
        }
      }

      cleanupManager.addListener(battery, 'levelchange', updateAnimationBasedOnBattery);
      cleanupManager.addListener(battery, 'chargingchange', updateAnimationBasedOnBattery);
      updateAnimationBasedOnBattery();
    });
  }
}

// ← OPTIMIZACIÓN CRÍTICA: LAZY INITIALIZATION - NO bloquear TTI
let isInitialized = false;

function init() {
  if (isInitialized) return;
  isInitialized = true;
  
  try {
    initHamburgerMenu();
    initScrollNavbar();
    initLogoClick();
    initHeroAnimation();
  } catch (error) {
    console.warn('Error initializing modules:', error);
  }
}

// ← OPTIMIZACIÓN CRÍTICA: DEFER JavaScript execution con Intersection Observer
function initLazyLoading() {
  // Observer para inicializar cuando el usuario interactúe o el hero sea visible
  const lazyInitObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        init();
        lazyInitObserver.disconnect();
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '200px'
  });

  // Observar el hero section para lazy loading
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    lazyInitObserver.observe(heroSection);
  }

  // Fallback: inicializar después de 100ms si no hay interacción
  const fallbackTimer = setTimeout(() => {
    init();
    lazyInitObserver.disconnect();
  }, 100);

  // Inicializar inmediatamente en primera interacción del usuario
  const userInteractionEvents = ['click', 'touchstart', 'keydown', 'scroll'];
  const handleFirstInteraction = () => {
    clearTimeout(fallbackTimer);
    init();
    lazyInitObserver.disconnect();
    userInteractionEvents.forEach(event => {
      document.removeEventListener(event, handleFirstInteraction, { passive: true });
    });
  };

  userInteractionEvents.forEach(event => {
    document.addEventListener(event, handleFirstInteraction, { passive: true, once: true });
  });
}

// ← OPTIMIZACIÓN: Inicializar lazy loading cuando DOM esté listo
const domReadyHandler = () => {
  initLazyLoading();
};

if (document.readyState === 'loading') {
  cleanupManager.addListener(document, 'DOMContentLoaded', domReadyHandler);
} else {
  initLazyLoading();
}



