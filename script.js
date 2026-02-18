// ── Meniu hamburger (mobil) ──
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Închide meniul când dai click pe un link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

// ── Shadow pe header la scroll ──
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ── PORTOFOLIU: Carusel Grid + Modal Galerie ──

// Date proiecte (fiecare cu poză principală + poze secundare)
const projects = [
  {
    title: 'Bucătărie modernă',
    description: 'MDF alb lucios cu blat stejar',
    images: [
      'assets/proiect1-main.jpg',
      'assets/proiect1-2.jpg',
      'assets/proiect1-3.jpg',
    ]
  },
  {
    title: 'Bucătărie gri antracit',
    description: 'MDF vopsit + blat stejar natural',
    images: [
      'assets/proiect2-main.jpg',
      'assets/proiect2-2.jpg',
      'assets/proiect2-3.jpg'
    ]
  },
  {
    title: 'Dressing modern',
    description: 'MDF vopsit, compartimentare inteligentă',
    images: [
      'assets/proiect1-main.jpg',
      'assets/proiect1-2.jpg',
      'assets/proiect1-3.jpg',
    ]
  }
];

// ═══ CARUSEL GRID ═══
const carouselTrack = document.getElementById('carousel-track');
const carouselPrev = document.querySelector('.carousel-prev-btn');
const carouselNext = document.querySelector('.carousel-next-btn');

const totalProjects = projects.length;
let currentIndex = 0;
let isTransitioning = false;

function setupInfiniteCarousel() {
  const items = Array.from(carouselTrack.children);
  
  // Clonează ultimele 3 și pune-le la început
  for (let i = totalProjects - 3; i < totalProjects; i++) {
    const clone = items[i].cloneNode(true);
    clone.classList.add('clone');
    carouselTrack.insertBefore(clone, carouselTrack.firstChild);
  }
  
  // Clonează primele 3 și pune-le la final
  for (let i = 0; i < 3; i++) {
    const clone = items[i].cloneNode(true);
    clone.classList.add('clone');
    carouselTrack.appendChild(clone);
  }
  
  currentIndex = 3;
  updateCarouselPosition(false);
}

function updateCarouselPosition(animate = true) {
  const itemWidth = 400;
  const gap = 32;
  const offset = currentIndex * (itemWidth + gap);
  
  if (animate) {
    carouselTrack.style.transition = 'transform 0.5s ease';
  } else {
    carouselTrack.style.transition = 'none';
  }
  
  carouselTrack.style.transform = `translateX(-${offset}px)`;
}

function handleTransitionEnd() {
  isTransitioning = false;
  
  if (currentIndex >= totalProjects + 3) {
    currentIndex = 3;
    updateCarouselPosition(false);
  }
  
  if (currentIndex < 3) {
    currentIndex = totalProjects + 2;
    updateCarouselPosition(false);
  }
}

carouselTrack.addEventListener('transitionend', handleTransitionEnd);

carouselPrev.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex--;
  updateCarouselPosition(true);
});

carouselNext.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex++;
  updateCarouselPosition(true);
});

setupInfiniteCarousel();

// ═══ MODAL GALERIE ═══
const modal = document.getElementById('project-modal');
const modalClose = document.querySelector('.modal-close');
const modalTitle = document.getElementById('modal-project-title');
const modalDescription = document.getElementById('modal-project-description');
const modalMainImg = document.getElementById('modal-main-img');
const modalThumbnails = document.getElementById('modal-thumbnails');
const modalPrevBtn = document.querySelector('.modal-prev-btn');
const modalNextBtn = document.querySelector('.modal-next-btn');

let currentProjectIndex = 0;
let currentImageIndex = 0;

function openProjectModal(projectIndex) {
  console.log('openProjectModal called with index:', projectIndex);
  
  if (projectIndex < 0 || projectIndex >= totalProjects) {
    console.error('Index invalid:', projectIndex);
    return;
  }
  
  currentProjectIndex = projectIndex;
  currentImageIndex = 0;
  
  const project = projects[projectIndex];
  console.log('Project:', project);
  
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalMainImg.src = project.images[0];
  
  modalThumbnails.innerHTML = '';
  project.images.forEach((img, index) => {
    const thumb = document.createElement('div');
    thumb.className = 'modal-thumbnail' + (index === 0 ? ' active' : '');
    thumb.innerHTML = `<img src="${img}" alt="" />`;
    
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(index);
    });
    
    modalThumbnails.appendChild(thumb);
  });
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function showImage(index) {
  const project = projects[currentProjectIndex];
  currentImageIndex = index;
  
  modalMainImg.src = project.images[index];
  
  const thumbs = document.querySelectorAll('.modal-thumbnail');
  thumbs.forEach((thumb, i) => {
    thumb.classList.toggle('active', i === index);
  });
}

// Attach click listeners DUPĂ ce caruselul e setat
setTimeout(() => {
  const allItems = document.querySelectorAll('.carousel-item');
  console.log('Total items (cu clone):', allItems.length);
  
  allItems.forEach((item, visualIndex) => {
    item.addEventListener('click', () => {
      console.log('Click pe visual index:', visualIndex);
      
      let realIndex;
      
      if (visualIndex < 3) {
        realIndex = totalProjects - (3 - visualIndex);
      } else if (visualIndex >= totalProjects + 3) {
        realIndex = visualIndex - totalProjects - 3;
      } else {
        realIndex = visualIndex - 3;
      }
      
      console.log('Real index calculat:', realIndex);
      openProjectModal(realIndex);
    });
  });
}, 100);

// Închide modal
modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Navigare în modal
modalPrevBtn.addEventListener('click', () => {
  const project = projects[currentProjectIndex];
  const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : project.images.length - 1;
  showImage(newIndex);
});

modalNextBtn.addEventListener('click', () => {
  const project = projects[currentProjectIndex];
  const newIndex = currentImageIndex < project.images.length - 1 ? currentImageIndex + 1 : 0;
  showImage(newIndex);
});

// Taste săgeți în modal
document.addEventListener('keydown', (e) => {
  if (modal.classList.contains('active')) {
    if (e.key === 'ArrowLeft') modalPrevBtn.click();
    else if (e.key === 'ArrowRight') modalNextBtn.click();
    else if (e.key === 'Escape') modalClose.click();
  }
});
