/*****************************************************************************************************/
/* ========================================== MENU HAMBURGUER ====================================== */
/*****************************************************************************************************/

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  // Bloquea el scroll del body cuando el menú está abierto
  if (navMenu.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

// Cerrar menú al hacer click en un link del menú
document.querySelectorAll('.nav-menu__link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});
//Cerrar menú al hacer click en cualquier parte fuera del menu movil
document.addEventListener('click', (event) => {
  if (!navMenu.contains(event.target) && !hamburger.contains(event.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});
//Cerrar menú al hacer click en cualquier parte dentro del nav-menu
navMenu.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
});
/*****************************************************************************************************/
/* ============================================ NAVBAR ANIMATION =================================== */
/*****************************************************************************************************/
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.height = '50px';
    /*navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';*/
  } else {
    navbar.style.height = '70px';
    /*navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';*/
  }
});

/******************************************SECTION DIVIDER**************************************/
/* ======================================= HERO IMAGE LOAD =================================== */
/******************************************GALLERY SWIPE LOAD**********************************/
/******************************************SECTION TITLE LOAD**********************************/
/******************************************TABS OOPTION LOAD**********************************/
/*******************************************WHATSAPP LOAD*****************************************/
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero__image');
  if (hero) {
    setTimeout(() => {
      hero.classList.add('visible');
    }, 125);
  }
  const divider = document.querySelector('.section__divider');
  if (divider) {
    setTimeout(() => {
      divider.classList.add('visible');
    }, 125);
  }

  // Animación de carga solo cuando .section__title entra en pantalla
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Solo animar una vez
      }
    }), 500;
  }, {
    threshold: 0.10 // El 10% del elemento debe estar visible
  });

  document.querySelectorAll('.section__title').forEach(title => {
    observer.observe(title);
  });


  // Animación de entrada solo cuando Swiper entra en pantalla
  const swiperObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, { threshold: 0.10 }); // Ajusta el threshold si quieres

  const swiperEl = document.querySelector('.swiper');
  if (swiperEl) {
    swiperObserver.observe(swiperEl);
  }


  // Animación de carga solo cuando .tabs__container entra en pantalla
  const tabsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Solo animar una vez
      }
    }), 500;
  }, {
    threshold: 0.1 // El 10% del elemento debe estar visible
  });

  document.querySelectorAll('.tabs__container').forEach(container => {
    tabsObserver.observe(container);
  });
  // Animación de carga solo cuando .option__tabs entra en pantalla
  const optionTabsObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target); // Solo animar una vez
      }
    });
  }, {
    threshold: 0.1 // El 10% del elemento debe estar visible
  });

  document.querySelectorAll('.option__tabs').forEach(tabs => {
    optionTabsObserver.observe(tabs);
  });

  // Animación de carga de la sección de contacto
  const contactInfo = document.querySelector('.contact__info');
  if (contactInfo) {
    setTimeout(() => {
      contactInfo.classList.add('visible');
    }, 250); // Aparece primero
  }

  const contactForm = document.querySelector('.contact__form');
  if (contactForm) {
    setTimeout(() => {
      contactForm.classList.add('visible');
    }, 450); // Aparece después, más suave
  }

  // Animación de carga del botón de WhatsApp
  setTimeout(() => {
    const wa = document.querySelector('.whatsapp-float');
    if (wa) wa.classList.add('show');
  }, 700); // Espera 1 segundo antes de mostrar y animar

});


/*****************************************************************************************************/
/* ============================================ GALLERY SWIPE =================================== ****/
/*****************************************************************************************************/
const sliderCardsData = [
  {
    nombre: "Inicial",
    subtitulo: "Oportuno para los emprendedores que inician su camino digital y quieren tener presencia en la web.",
    img: "./assets/img/pack-s.jpg",
    precio: "$200.000",
    precioNota: "Precio Final",
    items: {
      página: 1,
      secciones: 3,
      productos: 10,
      /*multidispositivos: true,
      whatsapp: true,
      redes: true,
      formulario: true,
      instalacion: true*/
    }
  },
  {
    nombre: "Mediano",
    subtitulo: "Pack ideal para los indecisos y emprendedores en crecimiento que buscan una web más completa.",
    img: "./assets/img/pack-m.jpg",
    precio: "$300.000",
    precioNota: "Precio Final",
    precioNotaInfo: "./assets/icons/info-icon.svg",
    items: {
      paginas: 3,
      secciones: 9,
      productos: 25
    }
  },
  {
    nombre: "Full",
    subtitulo: "Perfecto para tu negocio y para quienes buscan una web completa y profesional con todo lo necesario.",
    img: "./assets/img/pack-g.svg",
    precio: "$400.000",
    precioNota: "Precio Final",
    items: {
      paginas: 5,
      secciones: 15,
      productos: 50
    }
  }
];

// Renderiza las cartas en el swiper-wrapper
function renderSlides() {
  const wrapper = document.querySelector('.swiper-wrapper');
  wrapper.innerHTML = sliderCardsData.map((card, idx) => `
    <div class="swiper-slide">
      <div class="card card--${idx + 1}">
        <div class="card__header card__header--${idx + 1}">
            <h3 class="card__title">${card.nombre}</h3>
        </div>
        <p class="card__sub card__sub--${idx + 1}">${card.subtitulo}</p>
        <div class="container-card__items">
          <ul class="card__items card__items--${idx + 1}">
            ${Object.entries(card.items).map(([key, value], i) => {
    // Personaliza el label si quieres mostrar "Páginas", "Secciones", etc.
    let label = '';
    if (key === 'paginas') label = 'Páginas';
    else if (key === 'secciones') label = 'Secciones';
    else if (key === 'productos') label = 'Productos';
    else label = key.charAt(0).toUpperCase() + key.slice(1);

    return `<li>
  <div class="card__item-value card__item-value--${idx + 1}">
    <span>${value}</span>
  </div>
  <span>${label}</span>
</li>`;
  }).join('')
    }
          </ul>
        </div>
        
                    <div class="card__price card__price--${idx + 1}">
            <span>${card.precio}</span>
            <small>${card.precioNota}</small>
          </div>
          <div class="card__price-info-icon">
            <img src="${card.precioNotaInfo || './assets/icons/info-icon.svg'}" alt="Info Icon">
          </div>
          <div class="card__price-info">
            <div class="card__price-info-text">
              <ul>
                <li>Multidispositivo</li>
                <li>Formulario de contacto</li>
                <li>Botón WhatsApp flotante</li>
                <li>Conexion a Redes Sociales</li>
                <li>Instalacion en servidor</li>
                <li>No incluye dominio ni hosting</li>
              </ul>
            </div>
          </div>

      </div>
    </div>
  `).join('');
}


function addPriceInfoListeners() {
  document.querySelectorAll('.card__price-info-icon').forEach(iconDiv => {
    iconDiv.addEventListener('click', function(e) {
      e.stopPropagation();
      const card = iconDiv.closest('.card');
      const priceInfo = card.querySelector('.card__price-info');
      priceInfo.classList.toggle('open');
    });
  });
}

renderSlides();
addPriceInfoListeners();


const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 'auto',
  initialSlide: 1, // <-- Esto selecciona la 2da carta al cargar
  spaceBetween: 25,
  centeredSlides: true, // <-- Esto centra la slide activa
  centerInsufficientSlides: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  touchEventsTarget: 'container',
  breakpoints: {
    501: {
      slidesPerView: 'auto',
      spaceBetween: 25,
      centeredSlides: false,
      centerInsufficientSlides: true,
    }
  }
});



/*****************************************************************************************************/
/* ======================================== TABS SERVICES ======================================= */
/*****************************************************************************************************/
const servicesData = [
  {
    key: "paginas",
    icon: "./assets/icons/pages-icon.svg",
    title: "Páginas",
    desc: "Cada página está diseñada para contener las secciones que sean necesarias, cada una contiene una parte clave de la información del negocio.",
    bg: "./assets/img/google-banner.jpg"
  },
  {
    key: "secciones",
    icon: "./assets/icons/section-icon.svg",
    title: "Secciones",
    desc: "Cada sección cuenta con una altura aproximada a la pantalla, garantizando una presentación óptima de la información almacenada.",
    bg: "./assets/img/google-banner.jpg"
  },
  {
    key: "productos",
    icon: "./assets/icons/package-icon.svg",
    title: "Productos",
    desc: "Antes del despliegue de la página web, precargaremos la cantidad de productos correspondiente al pack elegido, asegurando que la tienda esté lista para operar",
    bg: "./assets/img/google-banner.jpg"
  },
  {
    key: "google",
    icon: "./assets/icons/magnifier-icon.svg",
    title: "Google",
    desc: "Optimizamos tu sitio web para motores de búsqueda mediante técnicas avanzadas de SEO. Esto mejora su visibilidad en Google y otros buscadores.",
    bg: "./assets/img/google-banner.jpg"
  },
  {
    key: "multidispositivos",
    icon: "./assets/icons/mobile-phone_icon.svg",
    title: "Multidispositivos",
    desc: "Ofrecemos un diseño responsive que garantiza una experiencia óptima en cualquier dispositivo. Se adaptará automáticamente a móviles, tablets y escritorios.",
    bg: "./assets/img/google-banner.jpg"
  },
  {
    key: "hosting",
    icon: "./assets/icons/hosting-icon.svg",
    title: "Hosting",
    desc: "Ofrecemos como parte del servicio la instalación y puesta en marcha del sitio web asegurando su funcionamiento.",
    bg: "./assets/img/google-banner.jpg"
  },
  {
    key: "mantenimiento",
    icon: "./assets/icons/setting-icon.svg",
    title: "Mantenimiento",
    desc: "Si lo deseas estaremos a cargo del funcionamiento y mantenimiento del hosting, abonando una tarifa mensual para poder seguir estando en linea.",
    bg: "./assets/img/google-banner.jpg"
  }
];

// Renderiza la tarjeta del servicio seleccionado
function renderServiceCard(serviceKey) {
  const service = servicesData.find(s => s.key === serviceKey);
  const body = document.querySelector('.tabs__body');
  const tabs = document.querySelector('.option__tabs');
  if (!service || !body || !tabs) return;
  body.innerHTML = `
    <div class="tab__card active">
      <div class="title__tab__container">
        <h3>${service.title}</h3>
      </div>
      <p>${service.desc}</p>
    </div>
  `;
  // Mueve .option__tabs dentro de .tab__card
  const tabCard = body.querySelector('.tab__card');
  tabCard.appendChild(tabs);

  // Asigna el fondo dinámico
  if (service.bg) {
    tabCard.style.backgroundImage = `url('${service.bg}')`;
    tabCard.style.backgroundSize = 'cover';
    tabCard.style.backgroundPosition = 'center';
  } else {
    tabCard.style.backgroundImage = '';
  }
}

// Genera dinámicamente los tabs de servicios
function renderServiceTabs() {
  const tabsContainer = document.querySelector('.option__tabs');
  if (!tabsContainer) return;
  tabsContainer.innerHTML = servicesData.map((service, idx) => `
    <button class="option__tab${idx === 0 ? ' active' : ''}" data-service="${service.key}">
      <img src="${service.icon}" alt="${service.title}">
    </button>
  `).join('');
}

// Maneja el cambio de tab
function handleTabClick(e) {
  const clicked = e.currentTarget;
  // Si ya está activo, no hagas nada
  if (clicked.classList.contains('active')) return;
  // Quitar clase active de todos los tabs
  document.querySelectorAll('.option__tab').forEach(tab => tab.classList.remove('active'));
  // Agregar clase active al tab clickeado
  clicked.classList.add('active');
  // Renderizar la tarjeta correspondiente
  renderServiceCard(clicked.dataset.service);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  // Render inicial
  const initialTab = document.querySelector('.option__tab.active') || document.querySelector('.option__tab');
  if (initialTab) {
    renderServiceCard(initialTab.dataset.service);
  }
  // Listeners
  document.querySelectorAll('.option__tab').forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });
});

// animación de cambio de tarjeta de servicio
// Esta función se llama al hacer click en un tab
// y anima el cambio de tarjeta de servicio
function animateTabCardChange(serviceKey) {
  const service = servicesData.find(s => s.key === serviceKey);
  const body = document.querySelector('.tabs__body');
  if (!service || !body) return;

  let card = body.querySelector('.tab__card');
  if (!card) {
    body.innerHTML = `
      <div class="tab__card active">
        <div class="title__tab__container">
          <h3>${service.title}</h3>
        </div>
        <p>${service.desc}</p>
      </div>
    `;
    card = body.querySelector('.tab__card');
  }

  // Elementos actuales
  const prevTitle = card.querySelector('.title__tab__container');
  const prevP = card.querySelector('p');

  prevTitle.classList.add('tab-anim-out');
  prevP.classList.add('tab-anim-out');

  setTimeout(() => {
    prevTitle.classList.remove('tab-anim-out');
    prevP.classList.remove('tab-anim-out');

    prevTitle.innerHTML = `<h3>${service.title}</h3>`;
    prevP.textContent = service.desc;

    prevTitle.classList.add('tab-anim-in');
    prevP.classList.add('tab-anim-in');

    setTimeout(() => {
      prevTitle.classList.remove('tab-anim-in');
      prevP.classList.remove('tab-anim-in');
    }, 350);

    // Asigna el fondo dinámico
    if (service.bg) {
      card.style.backgroundImage = `url('${service.bg}')`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';
    } else {
      card.style.backgroundImage = '';
    }
  }, 350);
}

// Cambia el manejador de tabs:
function handleTabClick(e) {
  const clicked = e.currentTarget;
  if (clicked.classList.contains('active')) return;
  document.querySelectorAll('.option__tab').forEach(tab => tab.classList.remove('active'));
  clicked.classList.add('active');
  animateTabCardChange(clicked.dataset.service);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  const initialTab = document.querySelector('.option__tab.active') || document.querySelector('.option__tab');
  if (initialTab) {
    animateTabCardChange(initialTab.dataset.service);
  }
  document.querySelectorAll('.option__tab').forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });
});

// Llama a la función después de definir servicesData y antes de los listeners
renderServiceTabs();


/* =======================================================================================================
   =================================FAQ TEMPLATE==========================================================
   =======================================================================================================*/
const faqData = [
  {
    question: "¿Qué incluye el desarrollo de mi página web?",
    answer: "Tu web incluye diseño moderno y adaptable a todos los dispositivos, estructura optimizada para buscadores, secciones personalizadas, formulario de contacto funcional, enlaces a redes sociales y carga rápida. Todo pensado para que tu marca se vea profesional desde el primer clic."
  },
  {
    question: "¿Puedo modificar el contenido después de publicada?",
    answer: "Sí. Incluimos una actualización gratuita con cambios menores (textos, imágenes o productos). Si necesitás cambios más grandes o nuevas funcionalidades, podemos cotizarlos sin compromiso."
  },
  {
    question: "¿Cuánto tiempo tarda en estar lista mi web?",
    answer: "Depende del pack y la cantidad de contenido, pero en general el desarrollo toma entre 7 y 20 días hábiles desde que recibimos toda la información necesaria."
  },
  {
    question: "¿El hosting está incluido?",
    answer: "Sí. Todos los planes incluyen 1 año de hosting gratuito en servidores rápidos y seguros. Después podés renovarlo con nosotros o migrar tu sitio donde prefieras."
  },
  {
    question: "¿Qué necesito para empezar?",
    answer: "Solo tenés que enviarnos el contenido (textos, imágenes, logo) y contarnos de qué estilo o referencias tiene tu página deseada. Nosotros nos encargamos del resto."
  },
  {
    question: "¿Mi sitio será visible en Google?",
    answer: "Sí. Aplicamos tecnicas para que tu web sea indexada correctamente y tenga una base sólida para posicionarse en buscadores."
  }
];

// Render FAQ solo si existe el contenedor
function renderFAQ() {
  const faqList = document.getElementById('faqList');

  if (!faqList) return;
  faqList.innerHTML = faqData.map((item, idx) => `
    <div class="faq__item" data-idx="${idx}">
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





