import './style.css'
import './location.css'

document.addEventListener('DOMContentLoaded', () => {

  // 1. Before / After Slider
  const slider = document.getElementById('before-after-slider');
  if (slider) {
    const beforeWrapper = slider.querySelector('.before-wrapper');
    const handle = slider.querySelector('.slider-handle');
    let isDown = false;

    // Auto-slide animation
    const autoSlideParams = { percent: 50 };
    const autoSlideAnim = gsap.fromTo(autoSlideParams, { percent: 30 }, {
      percent: 70,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      onUpdate: () => {
        if (!isDown) {
          beforeWrapper.style.clipPath = `inset(0 ${100 - autoSlideParams.percent}% 0 0)`;
          handle.style.left = `${autoSlideParams.percent}%`;
        }
      }
    });

    const moveSlider = (e) => {
      if (!isDown) return;
      autoSlideAnim.pause();
      const rect = slider.getBoundingClientRect();
      let x = (e.clientX || e.touches[0].clientX) - rect.left;
      let percent = Math.max(0, Math.min(x / rect.width * 100, 100));
      beforeWrapper.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      handle.style.left = `${percent}%`;
    };

    slider.addEventListener('mousedown', () => { isDown = true; autoSlideAnim.pause(); });
    slider.addEventListener('touchstart', () => { isDown = true; autoSlideAnim.pause(); }, { passive: true });
    
    window.addEventListener('mouseup', () => isDown = false);
    window.addEventListener('touchend', () => isDown = false);
    
    window.addEventListener('mousemove', moveSlider);
    window.addEventListener('touchmove', moveSlider, { passive: true });
  }

  // 2. Intersection Observer for Scroll Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, observerOptions);

  const sections = document.querySelectorAll('.landing-section');
  sections.forEach(section => {
    if (section.id !== 'accueil') {
      sectionObserver.observe(section);
    }
  });

  // 3. Navbar Shrink on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      document.body.classList.add('header-scrolled');
    } else {
      document.body.classList.remove('header-scrolled');
    }
  });

  // 4. Mobile Menu Toggle
  const burgerMenu = document.getElementById('burgerMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

  if (burgerMenu && mobileMenu) {
    burgerMenu.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-open');
      document.body.classList.toggle('menu-open'); // blocks scroll underneath
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  // 5. Cursor Glow Effect (follows mouse)
  const cursorGlow = document.querySelector('.motion-cursor-glow');
  document.addEventListener('mousemove', (e) => {
    if (cursorGlow) {
      requestAnimationFrame(() => {
        cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      });
    }
  });

  // 6. Contact Form WhatsApp Redirect
  const devisForm = document.getElementById('devis-form');
  if (devisForm) {
    devisForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nom = document.getElementById('devis-nom').value;
      const tel = document.getElementById('devis-tel').value;
      const localisation = document.getElementById('devis-localisation').value;
      const message = document.getElementById('devis-message').value;
      
      const whatsappMessage = `*NOUVELLE DEMANDE DE DEVIS*\n\n*Nom :* ${nom}\n*Téléphone :* ${tel}\n*Localisation :* ${localisation}\n\n*Description du projet :*\n${message}`;
      
      const whatsappUrl = `https://wa.me/237694235957?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 7. Location d'engins Quote Form WhatsApp Redirect
  const locationForm = document.getElementById('location-quote-form');
  if (locationForm) {
    locationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nom = document.getElementById('location-nom').value.trim();
      const tel = document.getElementById('location-tel').value.trim();
      const email = document.getElementById('location-email').value.trim();
      const engin = document.getElementById('location-engin-type').value;
      const travaux = document.getElementById('location-travaux').value;
      const localisation = document.getElementById('location-localisation').value.trim();
      const date = document.getElementById('location-date').value;
      const duree = document.getElementById('location-duree').value;
      const message = document.getElementById('location-message').value.trim();

      let text = `🚜 *DEMANDE DE LOCATION D'ENGIN LOURD - CAK CONSTRUCTION*\n\n`;
      text += `👤 *Client :* ${nom}\n`;
      text += `📞 *Téléphone :* ${tel}\n`;
      if (email) text += `📧 *E-mail :* ${email}\n`;
      text += `🚜 *Type d'engin :* ${engin}\n`;
      text += `🏗️ *Nature des travaux :* ${travaux}\n`;
      text += `📍 *Chantier :* ${localisation}\n`;
      if (date) text += `📅 *Date début souhaitée :* ${date}\n`;
      if (duree) text += `⏱️ *Durée estimée :* ${duree}\n`;
      if (message) text += `\n💬 *Message complémentaire :*\n${message}\n`;

      const statusEl = document.getElementById('location-form-status');
      if (statusEl) {
        statusEl.className = 'location-form-status success';
        statusEl.textContent = 'Votre demande est prête ! Redirection vers WhatsApp pour transmission immédiate à notre équipe commerciale...';
      }

      const whatsappUrl = `https://wa.me/237694235957?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // 8. Gallery Category Filter
  const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
  const galleryItems = document.querySelectorAll('#portfolio-grid .gallery-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('is-hidden');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(item, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
          }
        } else {
          item.classList.add('is-hidden');
        }
      });
    });
  });

  // 9. Interactive Lightbox Modal (Images & Videos)
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxMedia = document.getElementById('lightbox-media-container');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxBackdrop = document.querySelector('.lightbox-backdrop');

  const openLightbox = (type, src, title, desc) => {
    if (!lightboxModal || !lightboxMedia) return;
    lightboxMedia.innerHTML = '';

    if (type === 'video') {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      lightboxMedia.appendChild(video);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title || 'Réalisation CAK Construction';
      lightboxMedia.appendChild(img);
    }

    if (lightboxTitle) lightboxTitle.textContent = title || 'Chantier CAK Construction';
    if (lightboxDesc) lightboxDesc.textContent = desc || '';

    lightboxModal.classList.add('is-active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('menu-open');
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    const activeVideo = lightboxMedia.querySelector('video');
    if (activeVideo) activeVideo.pause();

    lightboxModal.classList.remove('is-active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
    setTimeout(() => {
      if (lightboxMedia) lightboxMedia.innerHTML = '';
    }, 300);
  };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('is-active')) {
      closeLightbox();
    }
  });

  galleryItems.forEach(item => {
    if (item.classList.contains('before-after-container')) return; // handled by slider
    item.addEventListener('click', () => {
      const type = item.getAttribute('data-media-type') || 'image';
      const src = item.getAttribute('data-media-src');
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');
      if (src) {
        openLightbox(type, src, title, desc);
      }
    });
  });

  // 10. Engin Video Sound Toggle
  const soundBtn = document.querySelector('.btn-video-sound');
  const enginVideo = document.querySelector('.engin-video-player');
  if (soundBtn && enginVideo) {
    soundBtn.addEventListener('click', () => {
      enginVideo.muted = !enginVideo.muted;
      const isMuted = enginVideo.muted;
      soundBtn.classList.toggle('is-unmuted', !isMuted);
      const span = soundBtn.querySelector('span');
      if (span) {
        span.textContent = isMuted ? 'Activer le son' : 'Couper le son';
      }
    });
  }

});

// Global function to prefill form when clicking a product
window.prefillDevis = function(productName) {
  const contactSection = document.getElementById('contact');
  const messageInput = document.getElementById('devis-message');
  
  if (contactSection && messageInput) {
    messageInput.value = `Bonjour, je souhaite obtenir un devis ou le prix pour : ${productName}`;
    contactSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      messageInput.focus();
    }, 800);
  }
};

// Global function to prefill location quote form when clicking an equipment card
window.prefillLocationEngin = function(enginName) {
  const quoteSection = document.getElementById('devis-location');
  const enginSelect = document.getElementById('location-engin-type');
  
  if (quoteSection) {
    if (enginSelect) {
      for (let i = 0; i < enginSelect.options.length; i++) {
        if (enginSelect.options[i].value.toLowerCase().includes(enginName.toLowerCase()) || 
            enginSelect.options[i].text.toLowerCase().includes(enginName.toLowerCase())) {
          enginSelect.selectedIndex = i;
          break;
        }
      }
    }
    quoteSection.scrollIntoView({ behavior: 'smooth' });
    const nomInput = document.getElementById('location-nom');
    if (nomInput) {
      setTimeout(() => nomInput.focus(), 800);
    }
  }
};
