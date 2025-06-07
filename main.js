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
    }, 50);
  }
  const divider = document.querySelector('.section__divider');
  if (divider) {
    setTimeout(() => {
      divider.classList.add('visible');
    }, 50); // Un pequeño delay para que aparezca después del hero
  }
  const slider = document.querySelector('.slider-gallery__container');
  if (slider) {
    setTimeout(() => {
      slider.classList.add('visible');
    }, 250); // Un pequeño delay para que aparezca después del divider
  }
});


/*****************************************************************************************************/
/* ============================================ GALLERY SWIPE =================================== ****/
/*****************************************************************************************************/
const sliderCardsData = [
  {
    nombre: "Pack - Emprendedores",
    subtitulo: "Pack oportuno para los ",
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
    nombre: "Pack - Indecisos",
    subtitulo: "Este pack ideal para los indecisos",
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
    nombre: "Pack - Empresa",
    subtitulo: "Este pack perfecto para tu negocio",
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

const cardsData = sliderCardsData;

const track = document.getElementById('sliderGalleryTrack');
const dotsContainer = document.getElementById('sliderGalleryDots');
let current = 0;

function renderCards() {
  track.innerHTML = cardsData.map((card, idx) => `
    <article class="card card__${idx + 1}">
      <aside class="card__aside">
        <figure class="card__figure">
          <img src="${card.img}" alt="Dummy Image" class="card__image">
        </figure>
      </aside>
      <header class="card__header">
        <h2 class="card__title">${card.nombre}</h2>
        <h3 class="card__subtitle">${card.subtitulo}</h3>
      </header>
      <div class="card__body">
        <ul>
          ${card.items.map(item => `<li>${item}</li>`).join('')}
        </ul>
      </div>
      <footer class="card__footer">
          <p class="card__precio">${card.precio} <span>${card.precioNota}</span> </p>
      </footer>
    </article>
  `).join('');
}

function renderDots() {
  dotsContainer.innerHTML = cardsData.map((_, idx) =>
    `<button class="slider-gallery__dot${idx === current ? ' active' : ''}" data-idx="${idx}" aria-label="Ir a la carta ${idx + 1}"></button>`
  ).join('');
  dotsContainer.querySelectorAll('button').forEach(btn => {
    btn.onclick = () => {
      current = Number(btn.dataset.idx);
      updateSlider();
    };
  });
}

function updateSlider() {
  const cardWidth = track.children[0].offsetWidth;
  const gap = parseInt(getComputedStyle(track).gap) || 0;
  const containerWidth = track.parentElement.offsetWidth;
  let translateX = 0;

  if (current === 0) {
    // Primera carta: pegada a la izquierda
    translateX = 0;
  } else if (current === cardsData.length - 1) {
    // Última carta: pegada a la derecha
    translateX = ((cardWidth + gap) * (cardsData.length - 1)) - (containerWidth - cardWidth);
  } else {
    // Carta del medio: centrada
    translateX = ((cardWidth + gap) * current) - ((containerWidth - cardWidth) / 2);
  }

  track.style.transform = `translateX(${-translateX}px)`;
  renderDots();
}

function nextCard() {
  current = (current + 1) % cardsData.length;
  updateSlider();
}
function prevCard() {
  current = (current - 1 + cardsData.length) % cardsData.length;
  updateSlider();
}

// Inicialización
renderCards();
renderDots();
updateSlider();

window.addEventListener('resize', updateSlider);

// Implementación del arrastre
let startX = 0;
let isDragging = false;
let swipeEnabled = window.innerWidth < 850;

function handleSwipeListeners() {
  swipeEnabled = window.innerWidth < 850;
}

window.addEventListener('resize', handleSwipeListeners);

// Modifica los listeners para que solo funcionen si swipeEnabled es true
track.addEventListener('pointerdown', (e) => {
  if (!swipeEnabled) return;
  isDragging = true;
  startX = e.clientX;
  track.style.cursor = 'grabbing';
});

track.addEventListener('pointermove', (e) => {
  if (!swipeEnabled || !isDragging) return;
  const dx = e.clientX - startX;
  track.style.transform = `translateX(${-current * track.children[0].offsetWidth + dx}px)`;
});

track.addEventListener('pointerup', (e) => {
  if (!swipeEnabled || !isDragging) return;
  isDragging = false;
  track.style.cursor = '';
  const dx = e.clientX - startX;
  const threshold = track.children[0].offsetWidth / 4;
  if (dx > threshold) {
    prevCard();
  } else if (dx < -threshold) {
    nextCard();
  } else {
    updateSlider();
  }
});

track.addEventListener('pointerleave', () => {
  if (!swipeEnabled || !isDragging) return;
  isDragging = false;
  track.style.cursor = '';
  updateSlider();
});

