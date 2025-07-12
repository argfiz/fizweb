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
// Resalta el nav-menu__link activo
document.querySelectorAll('.nav-menu__link').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.nav-menu__link').forEach(l => l.classList.remove('active'));
    this.classList.add('active');
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

// Animación de carga del welcome banner con preload de imagen
function loadWelcomeBanner() {
  const welcomeContainer = document.querySelector('.welcome__banner-container');
  const welcomeImg = document.querySelector('.welcome__banner');
  
  if (!welcomeContainer || !welcomeImg) return;
  
  // Crear una imagen para precargar
  const img = new Image();
  img.src = welcomeImg.src;
  
  // Cuando la imagen esté cargada, ejecutar la animación
  img.onload = () => {
    welcomeContainer.classList.add('show');
  };
  
  // Fallback: Si la imagen ya está en caché, ejecutar inmediatamente
  if (img.complete) {
    welcomeContainer.classList.add('show');
  }
  
  // Timeout de seguridad: mostrar después de 1 segundo máximo
  setTimeout(() => {
    if (!welcomeContainer.classList.contains('show')) {
      welcomeContainer.classList.add('show');
    }
  }, 1000);
}

// Ejecutar la función con un pequeño retraso
setTimeout(loadWelcomeBanner, 400);

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
    precioMensual: "$15.000",
    items: {
      página: 1,
      secciones: 3,
      productos: 10,
    }
  },
  {
    nombre: "Mediano",
    subtitulo: "Ideal para los indecisos y emprendedores en crecimiento que buscan una web más completa.",
    img: "./assets/img/pack-m.jpg",
    precio: "$300.000",
    precioNota: "Precio Final",
    precioNotaInfo: "./assets/icons/info-icon.svg",
    precioMensual: "$30.000",
    items: {
      paginas: 3,
      secciones: 9,
      productos: 25
    }
  },
  {
    nombre: "Full",
    subtitulo: "Perfecto para quienes buscan una web completa y profesional con todo lo necesario.",
    img: "./assets/img/pack-g.svg",
    precio: "$400.000",
    precioNota: "Precio Final",
    precioMensual: "$45.000",
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
                  <li>Multidispositivos</li>
                  <li>Botón WhatsApp flotante</li>
                  <li>Conexion a Redes Sociales</li>
                  <li>Instalacion en servidor</li>
                  <li>No incluye mantenimiento</li>
                </ul>
                <div class="container-card__price-info">
                  <p class="card__price-info-text-bottom">
                      ${card.precioMensual ? `Mantenimiento <br>
                      <span>${card.precioMensual}</span> /mes <br>
                      <span id="recommended">RECOMENDADO</span>` : ''}
                  </p>
                
                <ul class="list-card__price-info-text-bottom">
                  <li>Codigo QR</li>
                  <li>Hosting y Dominio</li>
                  <li>Actualizacion anual</li>
                </ul>
                </div>
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
      
      // Función para manejar el tap en móviles
      function handleMobileIconTap(icon) {
        // Solo en móviles (ancho menor a 700px)
        if (window.innerWidth <= 700) {
          // Agregar clase de animación
          icon.classList.add('tap-animation');
          
          // Remover la clase después de la animación
          setTimeout(() => {
            icon.classList.remove('tap-animation');
          }, 300);
        }
      }
      
      // Ejecutar animación de tap
      handleMobileIconTap(this);
      
      // Lógica original para mostrar/ocultar info
      const card = this.closest('.card');
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

window.addEventListener('resize', () => {
  // Actualizar listeners si cambia el tamaño de pantalla
  const icons = document.querySelectorAll('.card__price-info-icon');
  icons.forEach(icon => {
    icon.classList.remove('tap-animation');
  });
});

/*****************************************************************************************************/
/* ======================================== TABS SERVICES ======================================= */
/*****************************************************************************************************/
const servicesData = [
  {
    key: "paginas",
    icon: "./assets/icons/pages-icon.svg",
    title: "Páginas",
    desc: "Cada página de tu sitio está pensada para mostrar una parte importante de tu negocio. Incluye solo las secciones que realmente necesitás, organizadas para que tus clientes entiendan quién sos y qué ofrecés, sin vueltas.",
    bg: "./assets/img/pages-banner.jpg"
  },
  {
    key: "secciones",
    icon: "./assets/icons/section-icon.svg",
    title: "Secciones",
    desc: "Cada sección ocupa un espacio similar al de una pantalla completa. Esto hace que la información se vea bien, sin saturar, y que tus clientes puedan recorrer el sitio de forma cómoda y ordenada.",
    bg: "./assets/img/sections-banner.jpg"
  },
  {
    key: "productos",
    icon: "./assets/icons/package-icon.svg",
    title: "Productos",
    desc: "Antes de lanzar tu sitio, cargamos los productos incluidos en el plan que elijas. Así tu tienda queda lista para funcionar desde el primer día, sin que tengas que preocuparte por nada técnico.",
    bg: "./assets/img/products-banner.jpg"
  },
  {
    key: "google",
    icon: "./assets/icons/magnifier-icon.svg",
    title: "Google",
    desc: "Preparamos tu sitio para que aparezca en Google y otros buscadores. Usamos técnicas de SEO que ayudan a que más personas te encuentren cuando buscan lo que ofrecés.",
    bg: "./assets/img/google-banner.jpg"
  },
  {
    key: "multidispositivos",
    icon: "./assets/icons/mobile-phone_icon.svg",
    title: "Multidispositivos",
    desc: "Tu sitio se va a ver bien en todos lados: celulares, tablets y computadoras. El diseño se adapta automáticamente para que tus clientes tengan una experiencia cómoda, sin importar desde dónde te visiten.",
    bg: "./assets/img/multidispositivos-banner.jpg"
  },
  {
    key: "hosting",
    icon: "./assets/icons/hosting-icon.svg",
    title: "Instalacion",
    desc: "Nos encargamos de instalar y poner en marcha tu sitio web, para que funcione correctamente desde el primer momento. Vos no tenés que preocuparte por nada técnico, lo dejamos todo listo para que empieces a recibir visitas.",
    bg: "./assets/img/hosting-banner.jpg"
  },
  {
    key: "mantenimiento",
    icon: "./assets/icons/setting-icon.svg",
    title: "Mantenimiento",
    desc: "Si querés, podemos ocuparnos del hosting y del dominio. Con una tarifa mensual, nos aseguramos de que tu página siga funcionando sin interrupciones y siempre esté en línea. Además obtendras tu QR y una actualizacion anual gratis.",
    bg: "./assets/img/mantenimiento-banner.jpg"
  }
];

// Maneja el cambio de tab
function handleTabClick(e) {
  const clicked = e.currentTarget;
  // Si ya está activo, no hagas nada
  if (clicked.classList.contains('active')) return;
  
  // Llamar a la animación
  animateTabCardChange(clicked.dataset.service);
}

// animación de cambio de tarjeta de servicio
// Esta función se llama al hacer click en un tab
// y anima el cambio de tarjeta de servicio
// animación de cambio de tarjeta de servicio MEJORADA
function animateTabCardChange(serviceKey) {
  const service = servicesData.find(s => s.key === serviceKey);
  const body = document.querySelector('.tabs__body');
  if (!service || !body) return;

  let card = body.querySelector('.tab__card');
  
  if (!card) {
    // Crear la tarjeta inicial CON los tabs dentro
    body.innerHTML = `
      <div class="tab__card active">
        <div class="title__tab__container">
          <h3>${service.title}</h3>
        </div>
        <p>${service.desc}</p>
        <div class="option__tabs">
          ${servicesData.map((srv, idx) => `
            <button class="option__tab${srv.key === serviceKey ? ' active' : ''}" data-service="${srv.key}">
              <img src="${srv.icon}" alt="${srv.title}">
            </button>
          `).join('')}
        </div>
      </div>
    `;
    card = body.querySelector('.tab__card');
    
    // Aplicar fondo inicial
    if (service.bg) {
      card.style.backgroundImage = `url('${service.bg}')`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';
    }

    // Agregar listeners a los nuevos tabs
    addTabListeners();
    return;
  }

  // Elementos del contenido (NO los tabs)
  const titleContainer = card.querySelector('.title__tab__container');
  const descParagraph = card.querySelector('p');
  const tabsContainer = card.querySelector('.option__tabs');

  // Actualizar el tab activo SIN animación
  tabsContainer.querySelectorAll('.option__tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.service === serviceKey);
  });

  // PRECARGAR la nueva imagen antes de la transición
  const newImage = new Image();
  newImage.src = service.bg;
  
  // Cuando la imagen esté cargada, hacer la transición
  newImage.onload = () => {
    // Crear overlay para transición de fondo
    const bgOverlay = document.createElement('div');
    bgOverlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: url('${service.bg}');
      background-size: cover;
      background-position: center;
      opacity: 0;
      z-index: 1;
      transition: opacity 0.8s ease;
      pointer-events: none;
    `;
    
    card.style.position = 'relative';
    card.appendChild(bgOverlay);

    // Animar salida del contenido
    titleContainer.classList.add('tab-anim-out');
    descParagraph.classList.add('tab-anim-out');

    // Mostrar el overlay del fondo (MÁS LENTO)
    setTimeout(() => {
      bgOverlay.style.opacity = '1';
    }, 100);

    // Después de la animación de salida, cambiar contenido
    setTimeout(() => {
      // Limpiar clases de salida
      titleContainer.classList.remove('tab-anim-out');
      descParagraph.classList.remove('tab-anim-out');

      // Cambiar contenido
      titleContainer.innerHTML = `<h3>${service.title}</h3>`;
      descParagraph.textContent = service.desc;

      // Aplicar el nuevo fondo a la tarjeta principal
      if (service.bg) {
        card.style.backgroundImage = `url('${service.bg}')`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
      }

      // Animar entrada del nuevo contenido
      titleContainer.classList.add('tab-anim-in');
      descParagraph.classList.add('tab-anim-in');

      // Limpiar después de la animación de entrada
      setTimeout(() => {
        titleContainer.classList.remove('tab-anim-in');
        descParagraph.classList.remove('tab-anim-in');
        bgOverlay.remove();
      }, 450); // Más tiempo para transición suave

    }, 450); // Más tiempo para la salida
  };

  // Si la imagen ya está en caché, ejecutar inmediatamente
  if (newImage.complete) {
    newImage.onload();
  }
}

// Función para agregar listeners a los tabs dentro de la tarjeta
function addTabListeners() {
  document.querySelectorAll('.option__tab').forEach(tab => {
    tab.addEventListener('click', handleTabClick);
  });
}

/* =======================================================================================================
   =================================FAQ TEMPLATE==========================================================
   =======================================================================================================*/
const faqData = [
  {
    question: "¿Qué incluye el desarrollo de mi página web?",
    answer: "Tu sitio va a tener un diseño moderno que se adapta a cualquier pantalla, secciones personalizadas, enlaces a tus redes y carga rápida. Todo listo para que tu marca se vea profesional desde el primer momento."
  },
  {
    question: "¿Cuánto tiempo tarda en estar lista mi web?",
    answer: "Depende del plan y de cuánto contenido tengas, pero en general la web está lista entre 7 y 30 días hábiles desde que nos pasás todo lo necesario."
  },
  {
    question: "¿Puedo modificar el contenido después de publicada?",
    answer: "Si estamos a cargo del mantenimiento, dispones de una actualizacion anual gratis para cambios menores como textos, imágenes o productos. Si más adelante querés agregar cosas nuevas o hacer cambios grandes, te pasamos un presupuesto sin compromiso "
  },
  {
    question: "¿El Hosting y el Dominio están incluido?",
    answer: "No, el precio es por el desarrollo del sitio web. Pero si querés, podemos encargarnos de eso por una tarifa mensual. Así nos ocupamos de que tu sitio esté siempre online y funcionando bien."
  },
  {
    question: "¿Por que te recomendamos contratar el mantenimiento?",
    answer: "Porque el mantenimiento garantiza que tu sitio web esté siempre actualizado, seguro y funcionando correctamente. Además, te ahorra tiempo y preocupaciones, permitiéndote enfocarte en hacer crecer tu negocio."
  },
  {
    question: "¿Qué pasa si no contrato el mantenimiento?",
    answer: "Si no querés el mantenimiento, te facilitamos los links del Hosting y del Dominio que recomendamos para que puedas gestionarlo por tu cuenta y avanzar con la instalacion del sitio web en el servidor de tu preferencia. Pero si lo contratás, nos ocupamos nosotros para que no te compliques con temas técnicos."
  },
  {
    question: "¿Qué necesito para empezar?",
    answer: "Solo tenés que enviarnos los textos, imágenes, tu logo y contarnos qué estilo te gusta. Con eso, nosotros nos encargamos de todo lo demás."
  },
  {
    question: "¿Qué pasa si me arrepiento?",
    answer: "Si te arrepentís, podés contactarnos y veremos cómo resolver la situación. Siempre buscamos la satisfacción del cliente. Si ya empezamos el trabajo, te pasaremos un presupuesto por lo realizado hasta ese momento."
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

// Inicialización - Renderizar la primera tarjeta con tabs dentro
document.addEventListener('DOMContentLoaded', () => {
  // Renderizar la tarjeta inicial (por defecto el primer servicio)
  animateTabCardChange(servicesData[0].key);
});





