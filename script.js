// ═══════════════════════════════════════════════════════════════
// WAIT FOR DOM TO LOAD
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {

// ═══════════════════════════════════════════════════════════════
// HEADER & NAVIGATION
// ═══════════════════════════════════════════════════════════════

const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const header = document.querySelector('.header');

if (hamburger && nav) {
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      nav.classList.remove('open');
      
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
          const headerHeight = 100;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// SCROLL TO BOTTOM BUTTON
// ═══════════════════════════════════════════════════════════════

const scrollToBottomBtn = document.getElementById('scrollToBottom');

if (scrollToBottomBtn) {
  console.log('Buton găsit!'); // Debug
  
  // Show/hide pe scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToBottomBtn.classList.add('visible');
    } else {
      scrollToBottomBtn.classList.remove('visible');
    }
  });

  // Click
  scrollToBottomBtn.addEventListener('click', () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// PORTOFOLIU - CAROUSEL (doar dacă există)
// ═══════════════════════════════════════════════════════════════

const carouselTrack = document.getElementById('carousel-track');

if (carouselTrack) {
  // ... tot codul de carousel existent
  const projects = [
    {
      title: 'Baie eleganta',
      description: 'MDF vopsit in culoarea verde maslina',
      images: [
        'assets/proiecte/Baie - OvidiuFalamas/Baie-OF1.jpeg',
        'assets/proiecte/Baie - OvidiuFalamas/Baie-OF2.jpeg',
        'assets/proiecte/Baie - OvidiuFalamas/Baie-OF3.jpeg',
        'assets/proiecte/Baie - OvidiuFalamas/Baie-OF4.jpeg'
      ]
    },
    {
      title: 'Bucătărie gri antracit',
      description: 'MDF vopsit + blat stejar natural',
      images: [
        'assets/proiecte/Bucatarie - Darius/Bucatarie-D1.jpeg',
        'assets/proiecte/Bucatarie - Darius/Bucatarie-D2.jpeg',
        'assets/proiecte/Bucatarie - Darius/Bucatarie-D3.jpeg',
        'assets/proiecte/Bucatarie - Darius/Bucatarie-D4.jpeg',
        'assets/proiecte/Bucatarie - Darius/Bucatarie-D5.jpeg'
      ]
    },
    {
      title: 'Dressing modern',
      description: 'MDF vopsit, compartimentare inteligentă',
      images: [
        'assets/proiect3-main.jpg',
        'assets/proiect3-2.jpg',
        'assets/proiect3-3.jpg',
      ]
    }
  ];

  const carouselPrev = document.querySelector('.carousel-prev-btn');
  const carouselNext = document.querySelector('.carousel-next-btn');

  const totalProjects = projects.length;
  let currentIndex = 0;
  let isTransitioning = false;

  function setupInfiniteCarousel() {
    const items = Array.from(carouselTrack.children);
    
    for (let i = totalProjects; i < totalProjects; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add('clone');
      carouselTrack.insertBefore(clone, carouselTrack.firstChild);
    }
    
    for (let i = 0; i < 3; i++) {
      const clone = items[i].cloneNode(true);
      clone.classList.add('clone');
      carouselTrack.appendChild(clone);
    }
    
    currentIndex = 3;
    updateCarouselPosition(false);
  }

  function updateCarouselPosition(animate = true) {
    const isMobile = window.innerWidth <= 768;
    const itemWidth = isMobile ? 270 : 400;
    const gap = isMobile ? 16 : 32;
    const offset = (currentIndex - 3) * (itemWidth + gap);
    
    carouselTrack.style.transition = animate ? 'transform 0.5s ease' : 'none';
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

  window.addEventListener('resize', () => {
    updateCarouselPosition(false);
  });

  setupInfiniteCarousel();

  // Modal
  const modal = document.getElementById('project-modal');
  
  if (modal) {
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
      if (projectIndex < 0 || projectIndex >= totalProjects) return;
      
      currentProjectIndex = projectIndex;
      currentImageIndex = 0;
      
      const project = projects[projectIndex];
      
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
      
      document.querySelectorAll('.modal-thumbnail').forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
      });
    }

    setTimeout(() => {
      document.querySelectorAll('.carousel-item').forEach((item, visualIndex) => {
        item.addEventListener('click', () => {
          let realIndex;
          
          if (visualIndex < 3) {
            realIndex = totalProjects - (3 - visualIndex);
          } else if (visualIndex >= totalProjects + 3) {
            realIndex = visualIndex - totalProjects - 3;
          } else {
            realIndex = visualIndex - 3;
          }
          
          openProjectModal(realIndex);
        });
      });
    }, 100);

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

    document.addEventListener('keydown', (e) => {
      if (modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') modalPrevBtn.click();
        else if (e.key === 'ArrowRight') modalNextBtn.click();
        else if (e.key === 'Escape') modalClose.click();
      }
    });
  }
}

// ═══════════════════════════════════════════════════════════════
// SERVICII CAROUSEL (MOBIL) - doar dacă există
// ═══════════════════════════════════════════════════════════════

const serviciiTrack = document.getElementById('servicii-track');

if (serviciiTrack) {
  const serviciiDots = document.querySelectorAll('.servicii-dot');
  let currentServiceIndex = 0;

  function updateServiceDots() {
    if (window.innerWidth > 768) return;
    
    const scrollLeft = serviciiTrack.scrollLeft;
    const cardWidth = serviciiTrack.querySelector('.serviciu-card').offsetWidth + 16;
    const index = Math.round(scrollLeft / cardWidth);
    
    serviciiDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    currentServiceIndex = index;
  }

  serviciiTrack.addEventListener('scroll', updateServiceDots);
  
  serviciiDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        const cardWidth = serviciiTrack.querySelector('.serviciu-card').offsetWidth + 16;
        serviciiTrack.scrollTo({
          left: cardWidth * index,
          behavior: 'smooth'
        });
      }
    });
  });
  
  window.addEventListener('resize', updateServiceDots);
}

// ═══════════════════════════════════════════════════════════════
// CONTACT FORM - doar dacă există
// ═══════════════════════════════════════════════════════════════

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const formMessage = document.getElementById('form-message');

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Se trimite...';
    submitBtn.disabled = true;
    
    const formData = new FormData(contactForm);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        formMessage.style.display = 'block';
        formMessage.style.color = '#5C3D2E';
        formMessage.style.backgroundColor = '#E8F5E9';
        formMessage.style.padding = '1rem';
        formMessage.style.borderRadius = '12px';
        formMessage.style.marginTop = '1rem';
        formMessage.textContent = '✓ Mulțumim! Mesajul tău a fost trimis cu succes. Te vom contacta în curând.';
        
        contactForm.reset();
        
        setTimeout(() => {
          formMessage.style.display = 'none';
        }, 5000);
      } else {
        throw new Error(data.message || `Eroare: ${response.status}`);
      }
    } catch (error) {
      formMessage.style.display = 'block';
      formMessage.style.color = '#8B0000';
      formMessage.style.backgroundColor = '#FFEBEE';
      formMessage.style.padding = '1rem';
      formMessage.style.borderRadius = '12px';
      formMessage.style.marginTop = '1rem';
      formMessage.textContent = '✗ A apărut o eroare. Te rugăm să încerci din nou.';
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// ═══════════════════════════════════════════════════════════════
// END OF DOMContentLoaded
// ═══════════════════════════════════════════════════════════════

}); // Închide DOMContentLoaded