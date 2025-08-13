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
    if (currentPath !== '/inicio.html' && currentPath !== '/') {
      window.location.href = './inicio.html';
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


/* =======================================================================================================
   =================================FAQ TEMPLATE==========================================================
   =======================================================================================================*/
const faqData = [
  {
    question: "¿Qué incluye el desarrollo de mi sitio web?",
    answer: "Tu sitio va a tener un diseño moderno que se adapta a cualquier pantalla, secciones personalizadas, enlaces a tus redes y carga rápida. Todo listo para que tu marca se vea profesional desde el primer momento."
  },
  {
    question: "¿Cuánto tiempo tarda en estar lista?",
    answer: "Por lo general la web está lista entre 7 y 30 días hábiles desde que nos pasás todo lo necesario, si deseas animaciones personalizadas puede llevar un poco más de tiempo."
  },
  {
    question: "¿Puedo ver un avance?",
    answer: "Sí, durante el proceso de desarrollo podrás ver hasta dos avances. Queremos que estés al tanto de cómo va tomando forma tu sitio."
  },
  {
    question: "¿Puedo modificar el contenido después de publicada?",
    answer: "Si te suscribis al mantenimiento, dispones de una actualizacion anual para cambios menores como textos, imágenes o productos. Posteriormente, si querés hacer cambios más grandes, te pasamos un presupuesto sin compromiso "
  },
  {
    question: "¿El Hosting, Dominio y QR están incluido?",
    answer: "No, el precio es por el desarrollo del sitio web. Pero si te suscribis al mantenimiento podemos encargarnos de eso por una tarifa mensual. Así nos ocupamos de que tu sitio esté siempre online y funcionando correctamente."
  },
  {
    question: "¿Por que te recomendamos suscribirte al mantenimiento?",
    answer: "Porque el mantenimiento garantiza que tu sitio web esté siempre actualizado, seguro y funcionando correctamente. Además, te ahorra tiempo y preocupaciones, permitiéndote enfocarte en hacer crecer tu negocio.",
    important: true
  },
  {
    question: "¿Qué pasa si no me suscribo al mantenimiento?",
    answer: "Si no querés el mantenimiento, te facilitamos los links del proveedor del Hosting y de Dominios que recomendamos para que puedas gestionarlo por tu cuenta y podamos avanzar con la instalacion del sitio web en el servidor de tu preferencia. Pero si te suscribis, nos ocupamos nosotros para que no te compliques."
  },
  {
    question: "¿Qué necesito para empezar?",
    answer: "Solo tenés que enviarnos los textos, imágenes, tu logo y contarnos qué estilo te gusta. Con eso, nosotros nos encargamos de todo lo demás."
  },
  {
    question: "¿Qué pasa si me arrepiento?",
    answer: "Si te arrepentís, podés contactarnos y veremos cómo resolver la situación. Siempre buscamos la satisfacción del cliente. Si ya empezamos el trabajo, te pasaremos un presupuesto por lo realizado hasta ese momento y te devolvemos la diferencia."
  }
];

// Render FAQ solo si existe el contenedor
function renderFAQ() {
  const faqList = document.getElementById('faqList');

  if (!faqList) return;
  faqList.innerHTML = faqData.map((item, idx) => `
    <div class="faq__item${item.important ? ' faq__item--important' : ''}" data-idx="${idx}">
      <button class="faq__question" aria-expanded="false" type="button">
        ${item.question}
        <span class="faq__icon"><img src="assets/icons/right-arrow.svg" alt="Arrow"></span>
      </button>
      <div class="faq__answer">${item.answer}</div>
    </div>
  `).join('');

  // Toggle logic
  faqList.querySelectorAll('.faq__question').forEach((btn, idx) => {
    btn.addEventListener('click', function () {
      const item = btn.closest('.faq__item');
      const isOpen = item.classList.contains('open');
      // Quita la clase just-closed de todos los items
      faqList.querySelectorAll('.faq__item').forEach(i => {
        i.classList.remove('just-closed');
      });
      // Cierra todos los items
      faqList.querySelectorAll('.faq__item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq__question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        // Si el actual NO estaba abierto, lo abre
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        // Si ya estaba abierto, lo acabas de cerrar: marca como just-closed
        item.classList.add('just-closed');
      }
    });
  });
}

// Ejecutar SIEMPRE al cargar el archivo JS (no uses DOMContentLoaded porque el script está al final)
renderFAQ();
function animateFaqItemsOnScroll() {
  const faqItems = document.querySelectorAll('#faqSection .faq__item');
  if (!faqItems.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Alterna la animación según el índice
        const idx = Array.from(faqItems).indexOf(entry.target);
        if (idx % 2 === 0) {
          entry.target.classList.add('faq-animate-left');
        } else {
          entry.target.classList.add('faq-animate-right');
        }
        entry.target.style.opacity = '1';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  faqItems.forEach(item => observer.observe(item));
}

// Llama a la función después de renderFAQ()
renderFAQ();
animateFaqItemsOnScroll();

// Inicialización - Renderizar la primera tarjeta con tabs dentro
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar la tarjeta inicial (por defecto el primer servicio)
  animateTabCardChange(servicesData[0].key);
});




//=========================================================================================================
// ===== CONTACT ==========================================================================================
//=============================================================================================================
  const contactInfo = document.querySelector('.contact__info');
  if (contactInfo) {
    setTimeout(() => {
      contactInfo.classList.add('visible');
    }, 250);
  }

  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    setTimeout(() => {
      contactForm.classList.add('visible');
    }, 450);
  }


  /*===========================================================================
==================================TABS=======================================
=============================================================================*/
document.addEventListener('DOMContentLoaded', function () {
  const tabLinks = document.querySelectorAll('.tabs__link');
  const tabSections = document.querySelectorAll('.tabs__section');

  tabLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Desactivar todos los tabs y secciones
      tabLinks.forEach(l => {
        l.classList.remove('active');
        l.setAttribute('aria-selected', 'false');
      });
      tabSections.forEach(s => s.classList.remove('active'));

      // Activar el tab y sección correspondiente
      link.classList.add('active');
      link.setAttribute('aria-selected', 'true');
      const section = document.querySelector(link.getAttribute('href'));
      if (section) section.classList.add('active');
    });
  });

  // Activar el primer tab por defecto
  if (tabLinks.length && tabSections.length) {
    tabLinks[0].classList.add('active');
    tabLinks[0].setAttribute('aria-selected', 'true');
    tabSections[0].classList.add('active');
  }
});

// Cambia al siguiente tab al hacer click en .arrow-icon
document.addEventListener('DOMContentLoaded', function () {
  const arrowIcon = document.querySelector('.arrow-icon');
  const tabLinks = Array.from(document.querySelectorAll('.tabs__link'));
  if (!arrowIcon || tabLinks.length < 2) return;

  arrowIcon.addEventListener('click', function () {
    // Encuentra el tab actualmente activo
    const currentIdx = tabLinks.findIndex(link => link.classList.contains('active'));
    // Calcula el índice del siguiente tab (cíclico)
    const nextIdx = (currentIdx + 1) % tabLinks.length;
    tabLinks[nextIdx].click();
  });
});