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
/*******************************************banner-welcome LOAD*****************************************/
/**************************Función de animación de tipeo**************************************/
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando página...');

    // ===== HERO =====
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

    // ===== TYPEWRITER OPTIMIZADO =====
    setTimeout(() => {
        const typewriterCleanup = initTypewriter();
        
        // Cleanup al cerrar/recargar la página
        window.addEventListener('beforeunload', () => {
            if (typewriterCleanup) {
                typewriterCleanup();
            }
        });
    }, 200);

    // ===== WELCOME BANNER CON INDICADORES =====
    setTimeout(() => {
        loadWelcomeBanner(); // ✅ Esta función YA genera los indicadores
    }, 400);

    // ===== FLECHAS DEL BANNER (SOLO AQUÍ) =====
    const welcomeArrow = document.querySelector('.welcome__banner-arrow');
    if (welcomeArrow) {
        welcomeArrow.addEventListener('click', () => {
            changeBanner(); // Avanzar
        });
    }

    const welcomeArrowLeft = document.querySelector('.welcome__banner-arrow--left');
    if (welcomeArrowLeft) {
        welcomeArrowLeft.addEventListener('click', () => {
            changeBannerPrevious(); // Retroceder
        });
    }

    
  
    // ===== CONTACT =====
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

    // ===== WHATSAPP =====
    setTimeout(() => {
        const wa = document.querySelector('.whatsapp-float');
        if (wa) wa.classList.add('show');
    }, 700);

    // ===== INICIALIZAR RESTO =====
    renderSlides();
    addPriceInfoListeners();
    renderFAQ();
    animateFaqItemsOnScroll();
    animateTabCardChange(servicesData[0].key);

    console.log('✅ Inicialización completada');
});

/*****************************************************************************************************/
/* ======================================== WELCOME BANNER ================================ */   
/*****************************************************************************************************/
const bannerData = [
  "./assets/img/welcome-banner.png",
  "./assets/img/welcome-banner2.png",
  "./assets/img/welcome-banner3.png",
  "./assets/img/welcome-banner4.png",
  "./assets/img/welcome-banner6.png",
  "./assets/img/welcome-banner7.png",
];

// Variables para controlar el banner
let currentBannerIndex = 0;

// ✅ FUNCIÓN PARA GENERAR INDICADORES DINÁMICAMENTE
function generateBannerIndicators() {
  const indicatorsContainer = document.querySelector('.welcome__banner-indicators');
  if (!indicatorsContainer) return;
  
  // Limpiar indicadores existentes
  indicatorsContainer.innerHTML = '';
  
  // Generar indicadores basados en bannerData
  bannerData.forEach((banner, index) => {
    const indicator = document.createElement('div');
    indicator.className = `welcome__banner-indicator${index === 0 ? ' active' : ''}`;
    indicator.setAttribute('data-index', index);
    
    // Agregar evento click para navegar directamente al banner
    indicator.addEventListener('click', () => {
      currentBannerIndex = index;
      changeBannerToIndex(index);
    });
    
    indicatorsContainer.appendChild(indicator);
  });
  
  console.log(`✅ Generados ${bannerData.length} indicadores del banner`);
}

// ✅ FUNCIÓN PARA CAMBIAR A UN ÍNDICE ESPECÍFICO
function changeBannerToIndex(targetIndex) {
  const welcomeImg = document.querySelector('.welcome__banner');
  const indicators = document.querySelectorAll('.welcome__banner-indicator');
  if (!welcomeImg) return;
  
  // Cambiar imagen
  welcomeImg.src = bannerData[targetIndex];
  
  // Actualizar indicadores
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === targetIndex);
  });
}

// ✅ FUNCIÓN PARA CARGAR WELCOME BANNER CON INDICADORES
function loadWelcomeBanner() {
  const welcomeContainer = document.querySelector('.welcome__banner-container');
  const welcomeImg = document.querySelector('.welcome__banner');
  
  if (!welcomeContainer || !welcomeImg) return;
  
  // ✅ AQUÍ SE GENERAN LOS INDICADORES
  generateBannerIndicators();
  
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
  
  console.log('✅ Welcome banner cargado con indicadores dinámicos');
}

// Función para cambiar banner (siguiente)
function changeBanner() {
  currentBannerIndex = (currentBannerIndex + 1) % bannerData.length;
  changeBannerToIndex(currentBannerIndex);
}

// ✅ FUNCIÓN PARA BANNER ANTERIOR
function changeBannerPrevious() {
  currentBannerIndex = (currentBannerIndex - 1 + bannerData.length) % bannerData.length;
  changeBannerToIndex(currentBannerIndex);
}

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
    paymentLink: "https://link.mercadopago.com.ar/1", // ✅ Link de pago
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
    precio: "$400.000",
    precioNota: "Precio Final",
    precioNotaInfo: "./assets/icons/info-icon.svg",
    precioMensual: "$30.000",
    paymentLink: "https://link.mercadopago.com.ar/2", // ✅ Link de pago
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
    precio: "$600.000",
    precioNota: "Precio Final",
    precioMensual: "$45.000",
    paymentLink: "https://link.mercadopago.com.ar/3", // ✅ Link de pago
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
        
        <!-- ✅ CONTENEDOR PARA LOS BOTONES -->
        <div class="card__buttons-container">
          <!-- ✅ BOTÓN DE INFORMACIÓN -->   
          <div class="card__price-info-icon">
            <img src="${card.precioNotaInfo || './assets/icons/info-icon.svg'}" alt="Info Icon">
          </div>

          <!-- ✅ BOTÓN DE MANTENIMIENTO -->
          <div class="card__maintenance-button">
            <img src="./assets/icons/setting-icon.svg" alt="Mantenimiento">
          </div>

          <!-- ✅ BOTÓN DE PAGO SIN DATA ATTRIBUTE -->
          <div class="card__pay-button">
            <img src="./assets/icons/payment-icon.svg" alt="Pagar">
          </div> 
        </div>
        
        <!-- ✅CAPA DE INFORMACION... -->
        <div class="card__price-info">
          <div class="card__price-info-text">
            
            <h4>Pack incluye:</h4>
            <p> Cada pack incluye todo lo necesario para que tu sitio web esté listo para vender.</p>
             </span>
            <ul>
              <li>Multidispositivos</li>
              <li>Sección de contacto</li>
              <li>Botón WhatsApp flotante</li>
              <li>Conexion a Redes Sociales</li>
              <li>Instalacion en servidor</li>
              <li>No incluye mantenimiento</li>
            </ul>
            
          </div>
        </div>

        <!-- ✅ CAPA DE MANTENIMIENTO ... -->
        <div class="card__price-maintenance">
          <div class="card__price-info-text">
          
             <h4>Mantenimiento:<span id="recommended">RECOMENDADO</span></h4>
             <p>Mientras vos vendés, nosotros cuidamos que tu sitio web esté siempre online y actualizada.</p>
             <ul class="list-card__price-info-text-bottom">
                <li>QR personalizado</li>
                <li>Hosting y Dominio </li>
                <li>Actualizacion anual </li>
                <li>Solución de errores</li>
              </ul>
            <div class="container-card__price-info">
              <p class="card__price-info-text-bottom">
                  ${card.precioMensual ? `
                  <span>${card.precioMensual}</span>/mes <br>` : ''}
              </p>
            </div>
          </div>
        </div>

         <!-- ✅ CAPA DE PAGO ... -->
        <div class="card__price-payment">
          <div class="card__price-info-text">
             <h4>Eleginos:</h4>
             <p> Seleccioná lo que deseas y comenzá con tranquilidad tu incursion a lo digital.</p> 
             
             <p>  
                <span>Podés comenzar aqui:</span>  
                  <a href="${card.paymentLink}" class="card__pay-link" target="_blank">
                    <button class="card__pay-button--2">Pagar sitio web</button>
                  </a>
              </p>

              <p>  
               <span>Mantenimiento:</span>  
                <a href="${card.paymentLink}" class="card__pay-link" target="_blank">
                  <button class="card__pay-button--3">Suscribite ahora</button>
                </a>
              </p>
            
          </div>
        </div>           


      </div>
    </div>
  `).join('');
}


function addPriceInfoListeners() {
    // ✅ FUNCIÓN DE TAP ULTRA RÁPIDA PARA MÓVILES
    function handleInstantTap(element, callback) {
        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', (e) => {
                e.preventDefault();
                element.style.transform = 'translateZ(0) scale(0.95)';
                element.style.transition = 'none';
            }, { passive: false });
            
            element.addEventListener('touchend', (e) => {
                e.preventDefault();
                element.style.transform = 'translateZ(0) scale(1)';
                element.style.transition = 'none';
                if (callback) callback();
            }, { passive: false });
        } else {
            element.addEventListener('click', callback);
        }
    }

    // ✅ BOTÓN DE INFORMACIÓN - INSTANTÁNEO
    document.querySelectorAll('.card__price-info-icon').forEach(iconDiv => {
        handleInstantTap(iconDiv, () => {
            const card = iconDiv.closest('.card');
            const layers = card.querySelectorAll('.card__price-maintenance, .card__price-payment');
            
            // Cerrar otras capas instantáneamente
            layers.forEach(layer => layer.classList.remove('open'));
            
            // Toggle información instantáneamente
            card.querySelector('.card__price-info').classList.toggle('open');
        });
    });

    // ✅ BOTÓN DE MANTENIMIENTO - INSTANTÁNEO
    document.querySelectorAll('.card__maintenance-button').forEach(maintenanceButton => {
        handleInstantTap(maintenanceButton, () => {
            const card = maintenanceButton.closest('.card');
            const layers = card.querySelectorAll('.card__price-info, .card__price-payment');
            
            // Cerrar otras capas instantáneamente
            layers.forEach(layer => layer.classList.remove('open'));
            
            // Toggle mantenimiento instantáneamente
            card.querySelector('.card__price-maintenance').classList.toggle('open');
        });
    });

    // ✅ BOTÓN DE PAGO - INSTANTÁNEO
    document.querySelectorAll('.card__pay-button').forEach(payButton => {
        handleInstantTap(payButton, () => {
            const card = payButton.closest('.card');
            const layers = card.querySelectorAll('.card__price-info, .card__price-maintenance');
            
            // Cerrar otras capas instantáneamente
            layers.forEach(layer => layer.classList.remove('open'));
            
            // Toggle pago instantáneamente
            card.querySelector('.card__price-payment').classList.toggle('open');
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
    desc: "Cada página de tu sitio está pensada para mostrar una parte importante de tu negocio. Incluye solo las secciones que realmente necesitás, organizadas para que tus clientes entiendan quién sos y qué ofrecés.",
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
    desc: "Antes de lanzar tu sitio, cargamos los productos incluidos en el plan que elijas. Así tu tienda queda lista para funcionar desde el primer día, con todo lo que tus clientes necesitan ver.",
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
    desc: "Si querés, podemos ocuparnos del hosting y del dominio. Con una tarifa mensual, nos aseguramos de que tu página siga funcionando correctamente y sin interrupciones. Además obtendras tu QR y una actualizacion anual para usarlo cuando gustes.",
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
        <div class="content__tab__container">
          <p>${service.desc}</p>
        </div>
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

  // ✅ EVITAR MÚLTIPLES ANIMACIONES SIMULTÁNEAS
  if (card.classList.contains('animating')) {
    return;
  }
  
  card.classList.add('animating');

  // Elementos del contenido
  const titleContainer = card.querySelector('.title__tab__container');
  const contentContainer = card.querySelector('.content__tab__container') || card.querySelector('p').parentElement;
  const tabsContainer = card.querySelector('.option__tabs');

  // ✅ CREAR CONTENEDOR PARA EL PÁRRAFO SI NO EXISTE
  if (!card.querySelector('.content__tab__container')) {
    const pElement = card.querySelector('p');
    const contentDiv = document.createElement('div');
    contentDiv.className = 'content__tab__container';
    contentDiv.appendChild(pElement);
    titleContainer.parentNode.insertBefore(contentDiv, titleContainer.nextSibling);
  }

  // Actualizar el tab activo SIN animación
  tabsContainer.querySelectorAll('.option__tab').forEach(tab => {
    tab.classList.toggle('active', tab.dataset.service === serviceKey);
  });

  // ✅ PRECARGAR la nueva imagen
  const newImage = new Image();
  newImage.src = service.bg;
  
  newImage.onload = () => {
    // ✅ PASO 1: Animar salida del contenido
    titleContainer.style.opacity = '0';
    titleContainer.style.transform = 'translateY(-10px)';
    titleContainer.style.filter = 'blur(3px)';
    titleContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease';
    
    contentContainer.style.opacity = '0';
    contentContainer.style.transform = 'translateY(-10px)';
    contentContainer.style.filter = 'blur(3px)';
    contentContainer.style.transition = 'opacity 0.3s ease, transform 0.3s ease, filter 0.3s ease';

    // ✅ PASO 2: Después de la animación de salida, cambiar contenido
    setTimeout(() => {
      // Cambiar el fondo
      if (service.bg) {
        card.style.backgroundImage = `url('${service.bg}')`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
      }

      // Cambiar contenido
      titleContainer.innerHTML = `<h3>${service.title}</h3>`;
      contentContainer.innerHTML = `<p>${service.desc}</p>`;

      // ✅ PASO 3: Animar entrada del nuevo contenido
      setTimeout(() => {
        titleContainer.style.opacity = '1';
        titleContainer.style.transform = 'translateY(0)';
        titleContainer.style.filter = 'blur(0)';
        
        contentContainer.style.opacity = '1';
        contentContainer.style.transform = 'translateY(0)';
        contentContainer.style.filter = 'blur(0)';

        // ✅ PASO 4: Limpiar estilos y permitir nuevas animaciones
        setTimeout(() => {
          titleContainer.style.transition = '';
          titleContainer.style.opacity = '';
          titleContainer.style.transform = '';
          titleContainer.style.filter = '';
          
          contentContainer.style.transition = '';
          contentContainer.style.opacity = '';
          contentContainer.style.transform = '';
          contentContainer.style.filter = '';
          
          card.classList.remove('animating');
        }, 350);
      }, 50);
    }, 350);
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
    question: "¿Qué incluye el desarrollo de mi sitio web?",
    answer: "Tu sitio va a tener un diseño moderno que se adapta a cualquier pantalla, secciones personalizadas, enlaces a tus redes y carga rápida. Todo listo para que tu marca se vea profesional desde el primer momento."
  },
  {
    question: "¿Cuánto tiempo tarda en estar lista?",
    answer: "Depende del plan y de cuánto contenido tengas, pero en general la web está lista entre 7 y 30 días hábiles desde que nos pasás todo lo necesario."
  },
   {
    question: "¿Puedo ver un avance?",
    answer: "Sí, durante el proceso de desarrollo podrás ver avances. Queremos que estés al tanto de cómo va tomando forma tu sitio."
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
    answer: "Si no querés el mantenimiento, te facilitamos los links del Hosting y del Dominio que recomendamos para que puedas gestionarlo por tu cuenta y podamos avanzar con la instalacion del sitio web en el servidor de tu preferencia. Pero si te suscribis, nos ocupamos nosotros para que no te compliques con temas técnicos."
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

/*****************************************************************************************************/
/* ========================================== TYPEWRITER ANIMATED ================================== */
/*****************************************************************************************************/

// ✅ FUNCIÓN initTypewriter()
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const words = typewriterElement.getAttribute('data-words').split(',');
    let currentWordIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typeSpeed = 200;
    let deleteSpeed = 50;
    let pauseTime = 2500;
    let animationId;
    let isPaused = false;

    // ✅ Variables para detectar scroll y touch
    let isScrolling = false;
    let isTouching = false;
    let scrollTimeout;
    let touchTimeout;
    let lastScrollTime = 0;
    let lastTouchTime = 0;

    // ✅ Usar requestAnimationFrame para mejor rendimiento
    let lastTime = 0;
    let nextUpdateTime = 0;

    function type(currentTime) {
        // Solo actualizar cuando sea necesario y no esté pausado
        if (currentTime >= nextUpdateTime && !isPaused) {
            const currentWord = words[currentWordIndex];
            
            if (isDeleting) {
                currentText = currentWord.substring(0, currentText.length - 1);
                nextUpdateTime = currentTime + deleteSpeed;
            } else {
                currentText = currentWord.substring(0, currentText.length + 1);
                nextUpdateTime = currentTime + 150;
            }

            // ✅ Batch DOM update - solo si cambió el contenido
            const newContent = `${currentText}<span class="typewriter-cursor">|</span>`;
            if (typewriterElement.innerHTML !== newContent) {
                typewriterElement.innerHTML = newContent;
            }

            if (!isDeleting && currentText === currentWord) {
                nextUpdateTime = currentTime + pauseTime;
                isDeleting = true;
            } else if (isDeleting && currentText === '') {
                isDeleting = false;
                currentWordIndex = (currentWordIndex + 1) % words.length;
                nextUpdateTime = currentTime + 500;
            }
        }

        // ✅ Continuar solo si no está pausado
        if (!isPaused) {
            animationId = requestAnimationFrame(type);
        }
    }

    // ✅ Función para pausar animación
    function pauseAnimation() {
        if (!isPaused) {
            isPaused = true;
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        }
    }

    // ✅ Función para reanudar animación
    function resumeAnimation() {
        if (isPaused) {
            isPaused = false;
            if (!animationId) {
                animationId = requestAnimationFrame(type);
            }
        }
    }

    // ✅ MANEJO DE SCROLL OPTIMIZADO
    function handleScroll() {
        const now = Date.now();
        lastScrollTime = now;
        
        if (!isScrolling) {
            isScrolling = true;
            pauseAnimation();
        }

        // Limpiar timeout previo
        clearTimeout(scrollTimeout);
        
        // Reanudar después de que pare el scroll
        scrollTimeout = setTimeout(() => {
            if (Date.now() - lastScrollTime >= 150) {
                isScrolling = false;
                if (!isTouching) {
                    resumeAnimation();
                }
            }
        }, 150);
    }

    // ✅ MANEJO DE TOUCH PARA MÓVILES
    function handleTouchStart(e) {
        lastTouchTime = Date.now();
        isTouching = true;
        pauseAnimation();
    }

    function handleTouchMove(e) {
        lastTouchTime = Date.now();
        if (!isTouching) {
            isTouching = true;
            pauseAnimation();
        }
    }

    function handleTouchEnd(e) {
        clearTimeout(touchTimeout);
        
        // Reanudar después de un pequeño delay
        touchTimeout = setTimeout(() => {
            if (Date.now() - lastTouchTime >= 200) {
                isTouching = false;
                if (!isScrolling) {
                    resumeAnimation();
                }
            }
        }, 200);
    }

    // ✅ MANEJO DE VISIBILIDAD
    function handleVisibilityChange() {
        if (document.hidden) {
            pauseAnimation();
        } else if (!isScrolling && !isTouching) {
            resumeAnimation();
        }
    }

    // ✅ Intersection Observer para pausar cuando no sea visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!isPaused && !isScrolling && !isTouching) {
                    resumeAnimation();
                }
            } else {
                pauseAnimation();
            }
        });
    }, { threshold: 0.1 });

    observer.observe(typewriterElement);

    // ✅ AGREGAR TODOS LOS EVENT LISTENERS
    
    // Scroll listeners (pasivo para mejor rendimiento)
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Touch listeners para móviles
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchcancel', handleTouchEnd, { passive: true });
    
    // Visibilidad de la página
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Pausar durante resize
    window.addEventListener('resize', () => {
        pauseAnimation();
        setTimeout(() => {
            if (!isScrolling && !isTouching) {
                resumeAnimation();
            }
        }, 300);
    });

    // ✅ INICIAR DESPUÉS DE UN DELAY
    setTimeout(() => {
        if (!isPaused) {
            animationId = requestAnimationFrame(type);
        }
    }, 1000);

    // ✅ CLEANUP FUNCTION
    return () => {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
        document.removeEventListener('touchcancel', handleTouchEnd);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        observer.disconnect();
        clearTimeout(scrollTimeout);
        clearTimeout(touchTimeout);
    };
}

// ✅ TYPEWRITER ULTRA SIMPLIFICADO
function initTypewriterOptimized() {
    const element = document.querySelector('.typewriter');
    if (!element) return;

    const words = element.getAttribute('data-words').split(',');
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeStep() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        element.innerHTML = `${currentWord.substring(0, charIndex)}<span class="typewriter-cursor">|</span>`;

        let delay = isDeleting ? 50 : 150;

        if (!isDeleting && charIndex === currentWord.length) {
            delay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 300;
        }

        setTimeout(typeStep, delay);
    }

    setTimeout(typeStep, 1000);
}

// ✅ UN SOLO OBSERVER UNIVERSAL
const universalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            universalObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

// Observar todo de una vez
document.querySelectorAll('.section__title, .swiper, .tabs__container, .option__tabs, .contact__info, .contact__form')
    .forEach(el => universalObserver.observe(el));









