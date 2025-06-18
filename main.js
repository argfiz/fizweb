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
    navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.height = '70px';
    navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  }
});

/******************************************SECTION DIVIDER**************************************/
/* ======================================= HERO IMAGE LOAD =================================== */
/******************************************GALLERY SWIPE LOAD**********************************/
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
    }, 125); // Un pequeño delay para que aparezca después del hero
  }
  const swiper = document.querySelector('.swiper');
  if (swiper) {
    setTimeout(() => {
      swiper.classList.add('visible');
    }, 250); // Pequeño delay para suavidad
  }
});


/*****************************************************************************************************/
/* ============================================ GALLERY SWIPE =================================== ****/
/*****************************************************************************************************/
const sliderCardsData = [
  {
    nombre: "Pack - Pequeño",
    subtitulo: "Oportuno para los emprendedores que inician su camino digital y quieren tener presencia en la web",
    img: "./assets/img/pack-s.jpg",
    precio: "$200.000 ARS",
    precioNota: "Precio Final",
    items: [
      "1 Página",
      "3 Secciones",
      "10 Productos",
      "Multidispositivos",
      "Flotante de WhatsApp",
      "Enlaces a redes sociales",
      "Formulario de contacto",
      "Instalación en servidor",
      "Hosting, año de regalo."
    ]
  },
  {
    nombre: "Pack - Mediano",
    subtitulo: "Este pack ideal para los indecisos y emprendedores en crecimiento que buscan una web más completa",
    img: "./assets/img/pack-m.jpg",
    precio: "$300.0000 ARS",
    precioNota: "Precio Final",
    items: [
      "3 Páginas",
      "9 Secciones",
      "25 Productos",
      "Multidispositivos",
      "Flotante de WhatsApp",
      "Enlaces a redes sociales",
      "Formulario de contacto",
      "Instalación en servidor",
      "Hosting, año de regalo."
    ]
  },
  {
    nombre: "Pack - Grande",
    subtitulo: "Este pack perfecto para tu negocio y para quienes buscan una web completa y profesional",
    img: "./assets/img/pack-g.jpg",
    precio: "$400.000 ARS",
    precioNota: "Precio Final",
    items: [
      "5 Páginas",
      "15 Secciones",
      "50 Productos",
      "Multidispositivos",
      "Flotante de WhatsApp",
      "Enlaces a redes sociales",
      "Formulario de contacto",
      "Instalación en servidor",
      "Hosting, año de regalo."
    ]
  }
];

// Renderiza las cartas en el swiper-wrapper
function renderSlides() {
  const wrapper = document.querySelector('.swiper-wrapper');
  wrapper.innerHTML = sliderCardsData.map((card, idx) => `
    <div class="swiper-slide">
      <div class="card">
        <img src="${card.img}" alt="${card.nombre}" class="card__img" />
        <div class="card__header card__header--${idx + 1}">
            <h3 class="card__title">${card.nombre}</h3>
            <p class="card__sub">${card.subtitulo}</p>
        </div>
        <ul class="card__items">
          ${card.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <div class="card__price card__price-${idx + 1}">
          <span>${card.precio}</span>
          <small>${card.precioNota}</small>
        </div>
      </div>
    </div>
  `).join('')
}

renderSlides();

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 'auto',
  spaceBetween: 25,
  centeredSlides: false,
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
    desc: "Cada página está diseñada para contener las secciones que sean necesarias, cada una contiene una parte clave de la información del negocio."
  },
  {
    key: "secciones",
    icon: "./assets/icons/section-icon.svg",
    title: "Secciones",
    desc: "Cada sección cuenta con una altura aproximada a la pantalla, garantizando una presentación óptima de la información almacenada."
  },
  {
    key: "productos",
    icon: "./assets/icons/package-icon.svg",
    title: "Productos",
    desc: "Antes del despliegue de la página web, precargaremos la cantidad de productos correspondiente al pack elegido, asegurando que la tienda esté lista para operar"
  },
  {
    key: "seo",
    icon: "./assets/icons/magnifier-icon.svg",
    title: "SEO",
    desc: "Optimizamos tu sitio web para motores de búsqueda mediante técnicas avanzadas de SEO. Esto mejora su visibilidad en Google y otros buscadores."
  },
  {
    key: "multidispositivos",
    icon: "./assets/icons/mobile-phone_icon.svg",
    title: "Multidispositivos",
    desc: "Ofrecemos un diseño responsive que garantiza una experiencia óptima en cualquier dispositivo. Se adaptará automáticamente a móviles, tablets y escritorios."
  },
  {
    key: "hosting",
    icon: "./assets/icons/hosting-icon.svg",
    title: "Hosting",
    desc: "Ofrecemos instalación y alojamiento web en AWS como parte del servicio, garantizando alto rendimiento y estabilidad asegurando su funcionamiento."
  },
  {
    key: "mantenimiento",
    icon: "./assets/icons/setting-icon.svg",
    title: "Mantenimiento",
    desc: "Mientras estemos a cargo del Hosting nos encargamos de su funcionamiento, realizamos copias de seguridad para proteger tu sitio ante cualquier problema y evitar pérdida de datos."
  }
];

// Renderiza la tarjeta del servicio seleccionado
function renderServiceCard(serviceKey) {
  const service = servicesData.find(s => s.key === serviceKey);
  const body = document.querySelector('.tabs__body');
  if (!service || !body) return;
  body.innerHTML = `
    <div class="tab__card active">
      <div class="title__tab__container">
        <h3>${service.title}</h3>
      </div>
      <p>${service.desc}</p>
    </div>
  `;
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

// Llama a la función después de definir servicesData y antes de los listeners
renderServiceTabs();


/* =======================================================================================================
   =================================FAQ TEMPLATE==========================================================
   =======================================================================================================*/
   const faqData = [
  {
    question: "¿Qué incluye el desarrollo de mi página web?",
    answer: "Incluye un atractivo diseño, desarrollo responsive, integración de secciones, productos, formulario de contacto, enlaces a redes sociales y optimización para buscadores."
  },
  {
    question: "¿Puedo modificar el contenido de mi web después de publicada?",
    answer: "Sí, hasta una actualización gratuita con cambios menores para que puedas modificar textos, imágenes o productos. Los cambios mayores tendran costo adicional."
  },
  {
    question: "¿Cuánto tiempo tarda en estar lista mi web?",
    answer: "El tiempo depende del pack y la cantidad de contenido, pero normalmente entre 7 y 20 días hábiles desde la entrega de la información."
  },
  {
    question: "¿El hosting está incluido en el servicio?",
    answer: "Sí, todos los packs incluyen un año de hosting gratuito en servidores de alta calidad. Luego puedes renovar el servicio si lo deseas."
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



